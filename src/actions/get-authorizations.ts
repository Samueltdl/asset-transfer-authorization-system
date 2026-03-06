"use server";
import prisma from "@/lib/prisma";

const getAuthorizations = async () => {
    const authorizations = await prisma.authorization.findMany()

    if (!authorizations || authorizations.length === 0) {
        throw new Error("No authorizations found");
    }

    return authorizations;
}

export default getAuthorizations;
