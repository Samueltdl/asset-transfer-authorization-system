"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteAuthorization } from "@/actions/delete-authorization";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PencilIcon,
  TrashIcon,
  Eye,
  CircleChevronDown,
  PrinterIcon,
} from "lucide-react";
import { AuthorizationWithRelations } from "@/types";
import { AuthorizationDetailsDialog } from "./authorization-details-dialog";
import Link from "next/link";

export function DropdownMenuAuthorizationActions({
  authorization,
  currentUserId,
  currentUserRole,
}: {
  authorization: AuthorizationWithRelations;
  currentUserId: number;
  currentUserRole: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAuthorization(authorization.id);
      if (result.success) {
        toast.success("Autorização deletada com sucesso!");
      } else {
        toast.error("Erro ao deletar autorização.");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <CircleChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <AuthorizationDetailsDialog authorization={authorization}>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <Eye />
              Ver Detalhes
            </DropdownMenuItem>
          </AuthorizationDetailsDialog>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href={`/print-authorization/${authorization.id}`}
              target="_blank"
            >
              <PrinterIcon />
              Imprimir Termo
            </Link>
          </DropdownMenuItem>
          {(currentUserRole === "ADMIN" ||
            authorization.userId === currentUserId) && (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <PencilIcon />
                Editar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        {(currentUserRole === "ADMIN" ||
          authorization.userId === currentUserId) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={handleDelete}
                disabled={isPending}
                onSelect={(e) => e.preventDefault()}
              >
                <TrashIcon />
                Deletar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
