import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticate } from "../domain/authenticate";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const username = typeof credentials?.username === "string" ? credentials.username : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        const result = authenticate({ username, password });
        if (result.isErr()) return null;
        return { id: result.value.username, name: result.value.username };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
};
