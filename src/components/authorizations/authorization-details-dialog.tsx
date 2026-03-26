import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReactNode } from "react";
import { AuthorizationWithRelations } from "@/types";

export function AuthorizationDetailsDialog({
  authorization,
  children,
}: {
  authorization: AuthorizationWithRelations;
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
                Detalhes da Autorização #{authorization.id}
              </DialogTitle>
              <Badge
                className={
                  authorization.authorizationStatus === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : authorization.authorizationStatus === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : authorization.authorizationStatus === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : authorization.authorizationStatus === "RETURNED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                }
              >
                {authorization.authorizationStatus === "PENDING"
                  ? "PENDENTE"
                  : authorization.authorizationStatus === "APPROVED"
                    ? "APROVADA"
                    : authorization.authorizationStatus === "REJECTED"
                      ? "REJEITADA"
                      : authorization.authorizationStatus === "RETURNED"
                        ? "DEVOLVIDA"
                        : "DECONHECIDA"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border">
            <div>
              <p className="text-muted-foreground font-medium">Origem</p>
              <p className="font-semibold">{authorization.origin}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Destino</p>
              <p className="font-semibold">{authorization.destination}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                Responsável pela Retirada
              </p>
              <p>{authorization.responsible}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                Data da Solicitação
              </p>
              <p>
                {format(
                  new Date(authorization.createdAt),
                  "dd 'de' MMMM 'de' yyyy, HH:mm",
                  { locale: ptBR },
                )}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground font-medium">
                Registrado por
              </p>
              <p>{authorization.user.name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground font-medium">Motivo</p>
              <p className="bg-white p-2 border rounded-md mt-1 min-h-9 wrap-break-word whitespace-pre-wrap">
                {authorization.motive}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground font-medium">Observações</p>
              <p className="bg-white p-2 border rounded-md mt-1 min-h-9 wrap-break-word whitespace-pre-wrap">
                {authorization.observations || "Nenhuma observação registrada."}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-3">Itens / Patrimônios</h3>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patrimônio</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authorization.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-blue-600">
                        {item.assetNumber}
                      </TableCell>
                      <TableCell>{item.itemDescription}</TableCell>
                      <TableCell className="text-center">
                        {item.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
