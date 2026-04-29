import { getUsers } from "@/actions/get-users";
import { UsersTable } from "@/components/users/users-table";
import { auth } from "@/auth";
import { CreateUserForm } from "@/components/users/create-user-form";

export default async function UsersManagementPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const users = await getUsers();

  return (
    <div className="px-6 pb-4">
      <div className="space-y-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Painel de Gestão de Usuários</h1>
          {isAdmin && <CreateUserForm />}
        </div>

        {users.length === 0 ? (
          <div className="p-10 text-center border rounded-lg bg-white">
            <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <UsersTable
            data={users}
            currentUserRole={String(session?.user?.role)}
          />
        )}
      </div>
    </div>
  );
}
