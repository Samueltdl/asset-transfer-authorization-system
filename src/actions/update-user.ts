"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { updateUserSchema, UpdateUserFormValues } from "@/lib/schemas";

export async function updateUser(id: number, values: UpdateUserFormValues) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Não autorizado. Faça login novamente." };
  }

  if (session?.user?.role !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  const validatedData = updateUserSchema.safeParse(values);
  if (!validatedData.success) return { error: "Dados inválidos." };

  const validatedValues = validatedData.data;

  try {
    // 2. Busca para validar permissões
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) return { error: "Usuário não encontrado." };

    // Atualiza os dados do usuário
    await prisma.user.update({
      where: { id },
      data: {
        email: validatedValues.email,
        name: validatedValues.name,
        password: validatedValues.password,
        role: validatedValues.role,
        accountStatus: validatedValues.accountStatus,
      },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { error: "Falha ao atualizar os dados no sistema." };
  }
}
