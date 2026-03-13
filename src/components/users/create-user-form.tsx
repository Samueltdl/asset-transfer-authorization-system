"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createUserSchema, CreateUserFormValues } from "@/lib/schemas";
import { createUser } from "@/actions/create-user";
import { toast } from "sonner";

// --------------------------- TODO --------------------------- //
// Transformar o campo de papel em um select com opções "USER" e "ADMIN"
// Adicionar opção de esconder a senha enquanto o usuário digita (ícone de olho para mostrar/ocultar senha)
export function CreateUserForm({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "USER",
      password: "",
    },
  });

  const onSubmit = async (values: CreateUserFormValues) => {
    //console.log("Submitting form with values:", values); // Log dos valores do formulário
    startTransition(async () => {
      const result = await createUser(values);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Usuário cadastrado com sucesso!");
        form.reset();
        setOpen?.(false);
      }
    });
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Novo Usuário</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Papel</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="cursor-pointer w-full"
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Cadastrar Usuário"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
