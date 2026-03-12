"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { hash } from "bcryptjs";
import { createUserSchema, CreateUserFormValues } from "@/lib/schemas";

//------------------ TODO ------------------ //
// Adicionar revalidação de caminho após criação do usuário (página de gerenciamento de usuários ainda não existe)

export async function createUser(data: CreateUserFormValues) {
  const session = await auth();

  // Verificar se o usuário está logado
  if (!session?.user?.id) {
    return { error: "Não autorizado. Faça login novamente." };
  }

  // Verificar se o usuário logado é admin
  if (session?.user?.role !== "ADMIN") {
    return {
      error:
        "Não autorizado. Apenas administradores podem cadastrar novos usuários.",
    };
  }

  // Validar os dados do formulário
  const validatedData = createUserSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Dados inválidos. Verifique os campos e tente novamente." };
  }

  const validatedValues = validatedData.data;

  try {
    // Hash da senha antes de salvar no banco
    const hashedPassword = await hash(validatedValues.password, 10);

    await prisma.user.create({
      data: {
        name: validatedValues.name,
        email: validatedValues.email,
        password: hashedPassword,
        role: validatedValues.role || "USER", // Admin pode escolher se cria outro admin ou user
      },
    });

    // ------------------- REVALIDAÇÃO DE CAMINHO AQUI -------------------- //
    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return { error: "Erro ao cadastrar usuário." };
  }
}
