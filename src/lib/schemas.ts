import * as z from "zod";

// Validação do formulário de autorização de saída
export const authorizationSchema = z.object({
  origin: z.string().min(2, "Origem obrigatória").max(50, "Origem muito longa"),
  destination: z
    .string()
    .min(2, "Destino obrigatório")
    .max(50, "Destino muito longo"),
  responsible: z
    .string()
    .min(2, "Responsável obrigatório")
    .max(50, "Responsável muito longo"),
  motive: z
    .string()
    .min(5, "Motivo muito curto")
    .max(100, "Motivo muito longo"),
  items: z
    .array(
      z.object({
        assetNumber: z
          .string()
          .min(1, "Patrimônio obrigatório")
          .max(20, "Patrimônio muito longo"),
        itemDescription: z
          .string()
          .min(2, "Descrição obrigatória")
          .max(100, "Descrição muito longa"),
        amount: z
          .number()
          .min(1, "Mínimo 1")
          .max(999999, "Quantidade muito alta"),
      }),
    )
    .min(1, "Adicione pelo menos um item"),
});

export type AuthorizationFormValues = z.infer<typeof authorizationSchema>;

// Validação do formulário de login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(5, "A senha deve conter no mínimo 5 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Validação do formulário de criação de usuário
export const createUserSchema = z.object({
  name: z.string().min(2, "Nome obrigatório").max(50, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  password: z.string().min(5, "A senha deve conter no mínimo 5 caracteres"),
  role: z.enum(["USER", "ADMIN"], "Papel inválido"),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
