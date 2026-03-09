"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "E-mail ou senha incorretos.";
        case "CallbackRouteError":
          return "Erro na verificação das credenciais.";
        default:
          return "Ocorreu um erro ao tentar entrar.";
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
