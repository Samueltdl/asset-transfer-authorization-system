"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export type AuthState =
  | {
      message: string;
      timestamp: number;
    }
  | undefined;

export async function authenticate(prevState: AuthState, formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "E-mail ou senha incorretos.",
            timestamp: Date.now(),
          };
        case "CallbackRouteError":
          return {
            message: "Erro na verificação das credenciais.",
            timestamp: Date.now(),
          };
        default:
          return {
            message: "Ocorreu um erro ao tentar entrar.",
            timestamp: Date.now(),
          };
      }
    }
    throw error;
  }
}

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/login" });
  } catch (error) {
    throw error;
  }
};
