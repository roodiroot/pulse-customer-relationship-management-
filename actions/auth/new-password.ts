"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/auth/password-reset-token";
import { getUserByEmail } from "@/data/auth/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Токен не найден" };
  }

  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      error: "Введены не верные данные",
    };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Токен не найден" };
  }
  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return { error: "Токен истек" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email не найден" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Пароль изменен" };
};
