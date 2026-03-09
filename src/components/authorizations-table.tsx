import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@/generated/prisma/client";

type AuthorizationWithRelations = Prisma.AuthorizationGetPayload<{
  include: {
    items: true;
    user: { select: { name: true } };
  };
}>;

interface AuthorizationsTableProps {
  data: AuthorizationWithRelations[];
}

export function AuthorizationsTable({ data }: AuthorizationsTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Origem / Destino</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Itens</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((auth) => (
            <TableRow key={auth.id}>
              <TableCell className="font-medium">
                {format(new Date(auth.createdAt), "dd/MM/yy HH:mm", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-blue-600">
                    {auth.origin}
                  </span>
                  <span className="text-muted-foreground">
                    → {auth.destination}
                  </span>
                </div>
              </TableCell>
              <TableCell>{auth.responsible}</TableCell>
              <TableCell>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                  {auth.items.length}{" "}
                  {auth.items.length === 1 ? "item" : "itens"}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    auth.authorizationStatus === "PENDING"
                      ? "outline"
                      : "default"
                  }
                >
                  {auth.authorizationStatus}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
