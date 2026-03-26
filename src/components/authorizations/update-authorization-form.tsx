"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authorizationSchema, AuthorizationFormValues } from "@/lib/schemas";
import { updateAuthorization } from "@/actions/update-authorization";
import { toast } from "sonner";
import { AuthorizationWithRelations } from "@/types";

export function UpdateAuthorizationForm({
  authorization,
  setOpen,
}: {
  authorization: AuthorizationWithRelations;
  setOpen?: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AuthorizationFormValues>({
    resolver: zodResolver(authorizationSchema),
    defaultValues: {
      origin: authorization.origin,
      destination: authorization.destination,
      responsible: authorization.responsible,
      motive: authorization.motive,
      observations: authorization.observations || "",
      items: authorization.items,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (values: AuthorizationFormValues) => {
    startTransition(async () => {
      const result = await updateAuthorization(authorization.id, values);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Autorização editada com sucesso!");
        setOpen?.(false);
      }
    });
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Editar Autorização de Saída</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origem</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="responsible"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável pela Retirada</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo da Saída</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Itens / Patrimônios</h3>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 items-end border p-3 rounded-lg bg-slate-50"
              >
                <div className="grid grid-cols-6 gap-2 flex-1">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.assetNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Nº Patrimônio
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name={`items.${index}.itemDescription`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Descrição</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name={`items.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Qtd</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ assetNumber: "", itemDescription: "", amount: 1 })
              }
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar Item
            </Button>
          </div>
          <Button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Salvar Autorização"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
