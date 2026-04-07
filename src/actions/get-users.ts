"use server";
import prisma from "@/lib/prisma";

// -------------------------- TODO -------------------------- //
// Adicionar paginação com número de itens por página e número da página
// Adicionar variável para que o usuário escolha a ordenação (asc ou desc)
// Adicionar filtro por nome ou email
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        authorizations: {
          where: {
            isDeleted: false,
          },
          select: {
            id: true, // Apenas para mostrar o número de autorizações, não precisa de mais detalhes aqui
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users || [];
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};
