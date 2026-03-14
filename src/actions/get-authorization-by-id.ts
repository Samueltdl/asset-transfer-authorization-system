"use server";
import prisma from "@/lib/prisma";

export const getAuthorizationById = async (id: number) => {
  try {
    const authorization = await prisma.authorization.findUnique({
      where: { id },
      include: {
        items: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return authorization || null;
  } catch (error) {
    console.error("Erro ao buscar autorização:", error);
    return null;
  }
};
