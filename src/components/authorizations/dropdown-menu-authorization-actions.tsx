"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
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
  Eye,
  CircleChevronDown,
  PrinterIcon,
  Undo2Icon,
} from "lucide-react";
import { AuthorizationWithRelations } from "@/types";
import { AuthorizationDetailsDialog } from "./authorization-details-dialog";
import { setApproved, setReturn } from "@/actions/set-authorization-status";
import { UpdateAuthorizationForm } from "./update-authorization-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DeleteAuthorizationAlertDialog } from "./delete-authorization-alert-dialog";

export function DropdownMenuAuthorizationActions({
  authorization,
  currentUserId,
  currentUserRole,
}: {
  authorization: AuthorizationWithRelations;
  currentUserId: number;
  currentUserRole: string;
}) {
  const [isPrinting, startPrintTransition] = useTransition();
  const [isReturning, startReturnTransition] = useTransition();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handlePrint = () => {
    startPrintTransition(async () => {
      if (authorization.authorizationStatus === "PENDING") {
        const result = await setApproved(authorization.id);
        if (result.error) {
          toast.error("Erro ao aprovar autorização.");
        } else {
          // Redireciona para a página de impressão
          window.open(`/print-authorization/${authorization.id}`, "_blank");
          toast.success("Autorização aprovada e pronta para impressão!");
        }
      } else {
        // Redireciona para a página de impressão
        window.open(`/print-authorization/${authorization.id}`, "_blank");
      }
    });
  };

  const handleReturn = () => {
    const confirmed = window.confirm(
      "Confirmar a devolução de todos os itens desta autorização?",
    );
    if (!confirmed) return;

    startReturnTransition(async () => {
      const result = await setReturn(authorization.id);
      if (result.error) toast.error("Erro", { description: result.error });
      else
        toast.success("Devolvido", {
          description: "A devolução foi registada com sucesso.",
        });
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
          {authorization.authorizationStatus !== "REJECTED" && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handlePrint}
              disabled={isPrinting}
              //onSelect={(e) => e.preventDefault()}
            >
              <PrinterIcon />
              Imprimir Termo
            </DropdownMenuItem>
          )}
          {authorization.authorizationStatus === "APPROVED" && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleReturn}
              disabled={isReturning}
              //onSelect={(e) => e.preventDefault()}
            >
              <Undo2Icon />
              Registrar Devolução
            </DropdownMenuItem>
          )}

          {(currentUserRole === "ADMIN" ||
            authorization.userId === currentUserId) && (
            <>
              <Dialog
                open={isUpdateDialogOpen}
                onOpenChange={setIsUpdateDialogOpen}
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <PencilIcon />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <UpdateAuthorizationForm
                  authorization={authorization}
                  setOpen={setIsUpdateDialogOpen}
                />
              </Dialog>
            </>
          )}
        </DropdownMenuGroup>
        {(currentUserRole === "ADMIN" ||
          authorization.userId === currentUserId) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DeleteAuthorizationAlertDialog authorization={authorization} />
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
