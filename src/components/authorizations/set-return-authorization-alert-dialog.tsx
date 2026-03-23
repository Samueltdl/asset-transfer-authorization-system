import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Undo2Icon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useTransition } from "react";
import { AuthorizationWithRelations } from "@/types";
import { toast } from "sonner";
import { setReturn } from "@/actions/set-authorization-status";

export function SetReturnAuthorizationAlertDialog({
  authorization,
}: {
  authorization: AuthorizationWithRelations;
}) {
  const [isReturning, startReturnTransition] = useTransition();

  const handleReturn = () => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <Undo2Icon />
          Registrar Devolução
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Undo2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Registrar devolução?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação marcará a autorização como devolvida!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" variant="outline">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReturn}
            disabled={isReturning}
            className="cursor-pointer"
            variant="default"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
