"use server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserById } from "@/data/personal/get-users";

export const changeUserRoleById = async (params: {
  userId: string;
  role: UserRole;
}) => {
  const user = await currentUser();
  if (params.userId === user?.id) return null;
  if (["ADMIN", "SALES_MANAGER"].includes(user?.role || "")) {
    try {
      const user = await getUserById(params.userId);
      if (user?.role === UserRole.ADMIN) return null;
      await db.user.update({
        where: {
          id: params.userId,
        },
        data: {
          role: params.role,
        },
      });
      revalidatePath("/personal");
    } catch (error) {
      throw new Error("Error while changing user role");
    }
  }
};
