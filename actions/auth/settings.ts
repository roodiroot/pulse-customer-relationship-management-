"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

import { SettingsSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/auth/user";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: "Не авторизован" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Не авторизован" };

  if (user?.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.newPassword && values.password && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) return { error: "Неверный пароль" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return {
    success: "Данные успешно обновлены",
  };
};
