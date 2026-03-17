"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function validUser(id: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Não autorizado. Faça login novamente." };
  }

  try {
    const authorization = await prisma.authorization.findUnique({
      where: { id },
      select: { userId: true, authorizationStatus: true },
    });

    if (!authorization) {
      return { error: "Autorização não encontrada." };
    }

    return { success: true, authorization: authorization };
  } catch (error) {
    console.error("Erro ao validar usuário:", error);
    return { error: "Falha ao validar usuário." };
  }
}

// Função para registrar a devolução de uma autorização, atualizando seu status e data de retorno
export async function setReturn(id: number) {
  // Verificar se o usuário é válido e tem permissão para registrar a devolução
  const validation = await validUser(id);
  if (validation?.error) {
    return { error: validation.error }; // Retorna o erro se a validação falhar
  }

  if (validation.authorization?.authorizationStatus !== "APPROVED") {
    return { error: "Apenas autorizações aprovadas podem ser devolvidas." };
  }

  try {
    // Regista a devolução atualizando o status e a data de retorno
    await prisma.authorization.update({
      where: { id },
      data: {
        authorizationStatus: "RETURNED",
        returnedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/authorizations");
    return { success: true };
  } catch (error) {
    console.error("Erro ao registar devolução:", error);
    return { error: "Falha ao registar a devolução no sistema." };
  }
}

// Função para registrar a aprovação de uma autorização, atualizando seu status
export async function setApproved(id: number) {
  // Verificar se o usuário é válido e tem permissão para registrar a aprovação
  const validation = await validUser(id);
  if (validation?.error) {
    return { error: validation.error }; // Retorna o erro se a validação falhar
  }

  try {
    // Registra a aprovação apenas se o status atual for "PENDING", para evitar requisições desnecessárias ou mudanças de status indevidas
    if (validation.authorization?.authorizationStatus == "PENDING") {
      // Registra a aprovação atualizando o status
      await prisma.authorization.update({
        where: { id },
        data: {
          authorizationStatus: "APPROVED",
        },
      });
    }

    revalidatePath("/dashboard/authorizations");
    return { authorization: validation.authorization };
  } catch (error) {
    console.error("Erro ao registrar aprovação:", error);
    return { error: "Falha ao registrar a aprovação no sistema." };
  }
}
