"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthorizationFormValues } from "@/lib/schemas";

export async function createAuthorization(data: AuthorizationFormValues) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Não autorizado");

  try {
    await prisma.authorization.create({
      data: {
        origin: data.origin,
        destination: data.destination,
        responsible: data.responsible,
        motive: data.motive,
        userId: Number(session.user.id), // Convertendo para number conforme seu schema
        items: {
          create: data.items,
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
