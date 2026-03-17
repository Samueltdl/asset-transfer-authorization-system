"use server";
import prisma from "@/lib/prisma";

// Adicionar paginação com número de itens por página e número da página
// Adicionar variável para que o usuário escolha a ordenação (asc ou desc)
export const getAuthorizations = async () => {
  try {
    const authorizations = await prisma.authorization.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        items: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return authorizations || [];
  } catch (error) {
    console.error("Erro ao buscar autorizações:", error);
    return [];
  }
};
