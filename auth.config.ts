import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Ya from "next-auth/providers/yandex";
// import Vk from "next-auth/providers/vk";
// import GitHub from "next-auth/providers/github";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/auth/user";

export default {
  trustHost: true,
  providers: [
    // Vk({
    //   clientId: process.env.VK_CLIENT_SECRET,
    //   clientSecret: process.env.VK_CLIENT_SECRET,
    // }),
    // Ya({
    //   clientId: process.env.YANDEX_CLIENT_ID,
    //   clientSecret: process.env.YANDEX_CLIENT_SECRET,
    // }),
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const validateField = LoginSchema.safeParse(credentials);
        if (validateField.success) {
          const { email, password } = validateField.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = password === user.password;
          if (passwordsMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
