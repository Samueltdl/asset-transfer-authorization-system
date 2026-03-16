"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteAuthorization(id: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Não autorizado." };
  }

  try {
    const authorization = await prisma.authorization.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!authorization) {
      return { error: "Autorização não encontrada." };
    }

    // Verificar se o usuário logado é o proprietário da autorização ou um admin
    if (
      authorization.userId !== Number(session.user.id) &&
      session.user.role !== "ADMIN"
    ) {
      return { error: "Não autorizado." };
    }

    await prisma.authorization.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // Atualiza a tabela para a linha sumir da tela
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar autorização:", error);
    return { error: "Falha ao excluir a autorização." };
  }
}
