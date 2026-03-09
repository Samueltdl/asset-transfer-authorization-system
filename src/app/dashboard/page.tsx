import { getAuthorizations } from "@/actions/get-authorizations";
import { AuthorizationsTable } from "@/components/authorizations-table";

export default async function DashboardPage() {
  const authorizations = await getAuthorizations();

  return (
    <div className="p-4">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Autorizações de Saída</h1>

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
