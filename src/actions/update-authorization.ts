"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { authorizationSchema, AuthorizationFormValues } from "@/lib/schemas";

export async function updateAuthorization(
  id: number,
  values: AuthorizationFormValues,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Não autorizado. Faça login novamente." };
  }

  const validatedData = authorizationSchema.safeParse(values);
  if (!validatedData.success) return { error: "Dados inválidos." };

  const validatedValues = validatedData.data;

  try {
    // 2. Busca para validar permissões
    const existingAuth = await prisma.authorization.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existingAuth) return { error: "Autorização não encontrada." };

    const isOwner = existingAuth.userId === Number(session.user.id);
    const isAdmin = session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return {
        error:
          "Acesso negado. Apenas o criador ou Administradores podem editar.",
      };
    }

    // Atualiza os dados da autorização e recria os itens
    await prisma.authorization.update({
      where: { id },
      data: {
        origin: validatedValues.origin,
        destination: validatedValues.destination,
        responsible: validatedValues.responsible,
        motive: validatedValues.motive,
        authorizationStatus: "PENDING", // O status volta a ser pendente, já que a autorização for editada
        items: {
          deleteMany: {}, // Apaga os itens antigos desta autorização
          create: validatedValues.items.map((item) => ({
            assetNumber: item.assetNumber,
            itemDescription: item.itemDescription,
            amount: item.amount,
          })),
        },
      },
    });

    revalidatePath("/dashboard/authorizations");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar autorização:", error);
    return { error: "Falha ao atualizar os dados no sistema." };
  }
}
