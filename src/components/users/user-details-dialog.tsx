import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReactNode } from "react";
import { UserWithRelations } from "@/types";

export function UserDetailsDialog({
  user,
  children,
}: {
  user: UserWithRelations;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-5 pt-3">
            <div className="flex flex-col space-y-2">
              <DialogTitle className="text-xl">
                Detalhes do Usuário #{user.id}
              </DialogTitle>
              <Badge
                className={
                  user.accountStatus === "INACTIVE"
                    ? "bg-yellow-100 text-yellow-800"
                    : user.accountStatus === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                }
              >
                {user.accountStatus === "INACTIVE"
                  ? "INATIVO"
                  : user.accountStatus === "ACTIVE"
                    ? "ATIVO"
                    : "DECONHECIDO"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border">
            <div>
              <p className="text-muted-foreground font-medium">Nome</p>
              <p className="font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">E-mail</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Papel</p>
              <p className="font-semibold">
                {user.role === "ADMIN" ? "ADMINISTRADOR" : "USUÁRIO"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                Data de criação
              </p>
              <p>
                {format(
                  new Date(user.createdAt),
                  "dd 'de' MMMM 'de' yyyy, HH:mm",
                  { locale: ptBR },
                )}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
