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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserSchema, UpdateUserFormValues } from "@/lib/schemas";
import { updateUser } from "@/actions/update-user";
import { toast } from "sonner";
import { UserWithRelations } from "@/types";

// --------------------------- TODO --------------------------- //
// Adicionar opção de esconder a senha enquanto o usuário digita (ícone de olho para mostrar/ocultar senha)
export function UpdateUserForm({
  user,
  setOpen,
}: {
  user: UserWithRelations;
  setOpen?: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      password: "",
    },
  });

  const onSubmit = async (values: UpdateUserFormValues) => {
    //console.log("Submitting form with values:", values); // Log dos valores do formulário
    startTransition(async () => {
      const result = await updateUser(user.id, values);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Usuário editado com sucesso!");
        setOpen?.(false);
      }
    });
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Editar Usuário</DialogTitle>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full max-w-55 cursor-pointer">
                      <SelectValue placeholder="Selecione o papel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Papéis</SelectLabel>
                      <SelectItem className="cursor-pointer" value="USER">
                        Usuário
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="ADMIN">
                        Administrador
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
          <FormField
            control={form.control}
            name="accountStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status da Conta</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem className="cursor-pointer" value="ACTIVE">
                        Ativo
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="INACTIVE">
                        Inativo
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600"
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Editar Usuário"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
