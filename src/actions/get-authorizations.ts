"use server";

import prisma from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";

// ----------------------------- TODO ----------------------------------//
// Adicionar variável para que o usuário escolha a ordenação (asc ou desc)
export const getAuthorizations = async (
  page: number = 1,
  limit: number = 20,
  sortOrder: "asc" | "desc" = "desc",
) => {
  try {
    const skip = (page - 1) * limit;

    const [authorizations, totalCount] = await prisma.$transaction([
      prisma.authorization.findMany({
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
          createdAt: sortOrder,
        },
        skip: skip,
        take: limit,
      }),
      prisma.authorization.count({
        where: {
          isDeleted: false,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    // Formata as datas de criação e atualização para o padrão brasileiro
    const authorizationsWithDateFormatted = authorizations.map((auth) => ({
      ...auth,
      createdAt: formatInTimeZone(
        auth.createdAt,
        "America/Sao_Paulo",
        "dd/MM/yyyy HH:mm:ss",
      ),
      updatedAt: formatInTimeZone(
        auth.updatedAt,
        "America/Sao_Paulo",
        "dd/MM/yyyy HH:mm:ss",
      ),
    }));

    return {
      data: authorizationsWithDateFormatted,
      metadata: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar autorizações:", error);
    return {
      data: [],
      metadata: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        limit,
      },
    };
  }
};
