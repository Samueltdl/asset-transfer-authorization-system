"use client";

import { usePathname, useSearchParams } from "next/navigation";
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
import { DropdownMenuAuthorizationActions } from "./dropdown-menu-authorization-actions";
import { AuthorizationWithRelations } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationMetadata {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
interface AuthorizationsTableProps {
  data: AuthorizationWithRelations[];
  metadata: PaginationMetadata;
  currentUserId: number;
  currentUserRole: string;
}

export function AuthorizationsTable({
  data,
  metadata,
  currentUserId,
  currentUserRole,
}: AuthorizationsTableProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Origem / Destino</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
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
                    className={
                      auth.authorizationStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : auth.authorizationStatus === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : auth.authorizationStatus === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : auth.authorizationStatus === "RETURNED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                    }
                  >
                    {auth.authorizationStatus === "PENDING"
                      ? "PENDENTE"
                      : auth.authorizationStatus === "APPROVED"
                        ? "APROVADA"
                        : auth.authorizationStatus === "REJECTED"
                          ? "REJEITADA"
                          : auth.authorizationStatus === "RETURNED"
                            ? "DEVOLVIDA"
                            : "DECONHECIDA"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenuAuthorizationActions
                    authorization={auth}
                    currentUserId={currentUserId}
                    currentUserRole={currentUserRole}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {metadata.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  metadata.currentPage > 1
                    ? createPageURL(metadata.currentPage - 1)
                    : "#"
                }
                className={
                  metadata.currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            <PaginationItem className="text-sm text-muted-foreground mx-4">
              Página {metadata.currentPage} de {metadata.totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href={
                  metadata.currentPage < metadata.totalPages
                    ? createPageURL(metadata.currentPage + 1)
                    : "#"
                }
                className={
                  metadata.currentPage >= metadata.totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
