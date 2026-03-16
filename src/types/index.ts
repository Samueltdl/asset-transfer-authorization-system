import { Prisma } from "@/generated/prisma/client";

// Tipo para representar uma autorização com seus relacionamentos
export type AuthorizationWithRelations = Prisma.AuthorizationGetPayload<{
  include: {
    items: true;
    user: { select: { name: true } };
  };
}>;

// Tipo para representar um usuário com suas autorizações
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    authorizations: {
      select: {
        id: true; // Apenas para mostrar o número de autorizações, não precisa de mais detalhes aqui
      };
    };
  };
}>;
