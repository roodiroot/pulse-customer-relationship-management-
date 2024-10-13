import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession, type Session } from "next-auth";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/auth/user";
import { getAccoutByUserId } from "@/data/auth/account";
import { getSettingsByUserId } from "./data/auth/settings";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER" | "SALES_MANAGER" | "SALES_REP";
      isOAuth: boolean;
      bloked: boolean;
      settings: {
        aiAssistent?: boolean;
      };
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
      return;
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //Проверяем тип регестрации если не credentials пропускаем
      if (account?.provider !== "credentials") return true;
      if (!user?.id) return false;
      const existingUser = await getUserById(user.id);
      //Если email не верифицирован
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ session, token }: { session: Session; token?: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.bloked = token.bloked as boolean;
        session.user.settings = token.settings;
      }
      // console.log("token", session.user.settings);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccoutByUserId(existingUser.id);
      const settings = await getSettingsByUserId(existingUser.id);
      token.settings = settings || {};
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.bloked = existingUser.bloked;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
