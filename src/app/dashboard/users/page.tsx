import { getUsers } from "@/actions/get-users";
import { UsersTable } from "@/components/users/users-table";
import { OpenCreateUserDialogButton } from "@/components/users/open-create-user-dialog-button";

export default async function UsersManagementPage() {
  const users = await getUsers();

  return (
    <div className="px-6 pb-4">
      <div className="space-y-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Painel de Gestão de Usuários</h1>
          <OpenCreateUserDialogButton />
        </div>

        {users.length === 0 ? (
          <div className="p-10 text-center border rounded-lg bg-white">
            <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <UsersTable data={users} />
        )}
      </div>
    </div>
  );
}
