"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

import { CreateTelegramNotification, SettingsSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/auth/user";
import { revalidatePath } from "next/cache";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user || !user.id)
    return { error: "Access denied. You need to be logged in to proceed." };

  const dbUser = await getUserById(user.id);
  if (!dbUser)
    return { error: "Access denied. You need to be logged in to proceed." };

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

    if (!passwordMatch)
      return {
        error:
          "Error: Current password does not match our records. Please try again.",
      };

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
    success: "Data successfully updated.",
  };
};

// Изменение настроек User
export const setTelegramApi = async (
  value: z.infer<typeof CreateTelegramNotification>
) => {
  const user = await currentUser();
  if (!user || !user.id)
    return { error: "Access denied. You need to be logged in to proceed." };

  const dbUser = await getUserById(user.id);
  if (!dbUser)
    return { error: "Access denied. You need to be logged in to proceed." };

  try {
    await db.settings.update({
      where: { userId: dbUser.id },
      data: {
        telegramChatId: value.telegramChatId,
      },
    });
  } catch (error) {
    return { error: "Error writing to the database." };
  }
  return {
    success: "Data successfully updated.",
  };
};

// Переключение чека работы телеграм боты
export const toggleTelegrmsender = async (value: boolean) => {
  const user = await currentUser();
  if (!user || !user.id)
    return { error: "Access denied. You need to be logged in to proceed." };

  const dbUser = await getUserById(user.id);
  if (!dbUser)
    return { error: "Access denied. You need to be logged in to proceed." };

  try {
    await db.settings.update({
      where: { userId: dbUser.id },
      data: {
        telegramSendMessage: value,
      },
    });
    return { success: "ok." };
  } catch (error) {
    return { error: "Error writing to the database." };
  }
};
