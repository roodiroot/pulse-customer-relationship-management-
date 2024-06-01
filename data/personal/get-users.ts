import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";

export const getAllUsers = async (take?: number, skip?: number) => {
  const role = await currentRole();
  if (role !== "ADMIN") return null;
  try {
    const users = await db.user.findMany({ take, skip });
    return users;
  } catch {
    return null;
  }
};
