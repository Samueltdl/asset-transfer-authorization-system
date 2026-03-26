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
import { Trash2Icon } from "lucide-react";
import { deleteAuthorization } from "@/actions/delete-authorization";
import { ReactNode, useTransition } from "react";
import { AuthorizationWithRelations } from "@/types";
import { toast } from "sonner";

export function DeleteAuthorizationAlertDialog({
  children,
  authorization,
}: {
  children: ReactNode;
  authorization: AuthorizationWithRelations;
}) {
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteAuthorization(authorization.id);
      if (result.success) {
        toast.success("Autorização deletada com sucesso!");
      } else {
        toast.error("Erro ao deletar autorização.");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Excluir autorização?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação excluirá permanentemente essa autorização!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" variant="outline">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="cursor-pointer"
            variant="destructive"
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
