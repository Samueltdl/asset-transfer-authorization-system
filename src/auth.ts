import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { loginSchema } from "./lib/schemas";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({ where: { email } });

          if (
            !user ||
            user.accountStatus === "INACTIVE" ||
            user.accountStatus === "SUSPENDED"
          )
            return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          //console.log("User found:", user.email);
          if (passwordsMatch) {
            return {
              ...user,
              id: String(user.id), // Convertido o ID para string, pois o NextAuth espera que seja string
            };
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.name = user.name as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  session: {
    maxAge: 3600, // token expira em 1 hora
  },
});
