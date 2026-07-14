"use server";

import prisma from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";

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

    if (!authorization) {
      return null;
    }

    // Formata as datas de criação e atualização para o padrão brasileiro
    return {
      ...authorization,
      createdAt: formatInTimeZone(
        authorization.createdAt,
        "America/Sao_Paulo",
        "dd/MM/yyyy HH:mm:ss",
      ),
      updatedAt: formatInTimeZone(
        authorization.updatedAt,
        "America/Sao_Paulo",
        "dd/MM/yyyy HH:mm:ss",
      ),
    };
  } catch (error) {
    console.error("Erro ao buscar autorização:", error);
    return null;
  }
};
