"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const blokedUserById = async (userId: string) => {
  const user = await currentUser();
  if (
    userId === user?.id ||
    !["ADMIN", "SALES_MANAGER"].includes(user?.role || "")
  ) {
    return null;
  }

  try {
    const targetUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser || targetUser.role === UserRole.ADMIN) {
      return null;
    }

    await db.user.update({
      where: { id: userId },
      data: { bloked: !targetUser.bloked },
    });

    revalidatePath("/personal");
  } catch (error) {
    throw new Error("Error while changing user role");
  }
};
