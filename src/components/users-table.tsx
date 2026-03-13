import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@/generated/prisma/client";

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    authorizations: {
      select: {
        id: true; // Apenas para mostrar o número de autorizações, não precisa de mais detalhes aqui
      };
    };
  };
}>;

interface UsersTableProps {
  data: UserWithRelations[];
}

export function UsersTable({ data }: UsersTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Autorizações</TableHead>
            <TableHead>Status da Conta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  className={
                    user.role === "ADMIN"
                      ? "bg-blue-100 text-blue-800"
                      : user.role === "USER"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                  {user.authorizations.length}{" "}
                  {user.authorizations.length === 1
                    ? "autorização"
                    : "autorizações"}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    user.accountStatus === "INACTIVE"
                      ? "bg-yellow-100 text-yellow-800"
                      : user.accountStatus === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : user.accountStatus === "SUSPENDED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }
                >
                  {user.accountStatus}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
