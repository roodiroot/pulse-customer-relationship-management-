import { db } from "@/lib/db";

import { User } from "@prisma/client";

export interface ResUsers {
  users: null;
}

export const getAllUsers = async (
  take?: number,
  skip?: number
): Promise<{ users: User[]; count: number }> => {
  try {
    const searchParams = {};
    const users = await db.user.findMany({
      where: { ...searchParams },
      take,
      skip,
    });
    const count = await db.user.count({ where: { ...searchParams } });
    return { users, count };
  } catch {
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch {
    throw new Error("Failed to fetch user");
  }
};
