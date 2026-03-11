"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { authorizationSchema, AuthorizationFormValues } from "@/lib/schemas";

export async function createAuthorization(data: AuthorizationFormValues) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Não autorizado. Faça login novamente." };
  }

  const validatedData = authorizationSchema.safeParse(data);
  if (!validatedData.success) return { error: "Dados inválidos." };

  const validatedValues = validatedData.data;
  try {
    await prisma.authorization.create({
      data: {
        origin: validatedValues.origin,
        destination: validatedValues.destination,
        responsible: validatedValues.responsible,
        motive: validatedValues.motive,
        userId: Number(session.user.id), // Convertendo para number
        items: {
          create: validatedValues.items,
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return { error: "Falha ao salvar a autorização no banco de dados." };
  }
}
