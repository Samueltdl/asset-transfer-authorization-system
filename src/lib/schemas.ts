import * as z from "zod";

export const authorizationSchema = z.object({
  origin: z.string().min(2, "Origem obrigatória"),
  destination: z.string().min(2, "Destino obrigatório"),
  responsible: z.string().min(2, "Responsável obrigatório"),
  motive: z.string().min(5, "Motivo muito curto"),
  items: z
    .array(
      z.object({
        assetNumber: z.string().min(1, "Patrimônio obrigatório"),
        itemDescription: z.string().min(2, "Descrição obrigatória"),
        amount: z.number().min(1, "Mínimo 1"),
      }),
    )
    .min(1, "Adicione pelo menos um item"),
});

export type AuthorizationFormValues = z.infer<typeof authorizationSchema>;
