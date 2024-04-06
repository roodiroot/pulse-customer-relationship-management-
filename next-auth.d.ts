import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & { role: UserRole };

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
