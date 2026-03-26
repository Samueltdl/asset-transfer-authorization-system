import { getAuthorizations } from "@/actions/get-authorizations";
import { AuthorizationsTable } from "@/components/authorizations/authorizations-table";
import { auth } from "@/auth";
import { CreateAuthorizationForm } from "@/components/authorizations/create-authorization-form";

export default async function AuthorizationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page
    ? Number(resolvedSearchParams.page)
    : 1;
  const limit = 15;

  const response = await getAuthorizations(currentPage, limit, "desc");

  return (
    <div className="px-6 pb-4">
      <div className="space-y-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Autorizações de Saída</h1>
          <CreateAuthorizationForm />
        </div>

        {response.data.length === 0 ? (
          <div className="p-10 text-center border rounded-lg bg-white">
            <p className="text-muted-foreground">
              Nenhuma autorização encontrada.
            </p>
          </div>
        ) : (
          <AuthorizationsTable
            data={response.data}
            metadata={response.metadata}
            currentUserId={Number(session?.user?.id)}
            currentUserRole={session?.user?.role as string}
          />
        )}
      </div>
    </div>
  );
}
