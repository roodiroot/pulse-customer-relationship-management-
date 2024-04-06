"use server";

import * as z from "zod";

import { ForgotPasswordSchema } from "@/schemas";

import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/auth/user";

export const reset = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validateFields = ForgotPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      error: "Введены не верные данные",
    };
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "Email не найден",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Письмо с подтверждением отправлено на ваш email" };
};
