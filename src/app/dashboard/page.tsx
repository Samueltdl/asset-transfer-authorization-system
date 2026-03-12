import { getAuthorizations } from "@/actions/get-authorizations";
import { AuthorizationsTable } from "@/components/authorizations-table";
import { OpenCreateAuthorizationDialogButton } from "@/components/create-authorization-button";

export default async function DashboardPage() {
  const authorizations = await getAuthorizations();

  return (
    <div className="px-6 pb-4">
      <div className="space-y-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Autorizações de Saída</h1>
          <OpenCreateAuthorizationDialogButton />
        </div>

        {authorizations.length === 0 ? (
          <div className="p-10 text-center border rounded-lg bg-white">
            <p className="text-muted-foreground">
              Nenhuma autorização encontrada.
            </p>
          </div>
        ) : (
          <AuthorizationsTable data={authorizations} />
        )}
      </div>
    </div>
  );
}
