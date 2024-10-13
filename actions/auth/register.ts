"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/auth/user";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFiled = RegisterSchema.safeParse(value);

  if (!validatedFiled.success) {
    return { error: "Введены не верные данные" };
  }

  const { name, email, password } = validatedFiled.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Этот email уже зарегестрирован" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // register settings
  await db.settings.create({
    data: {
      userId: user.id,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { succsess: "Письмо с подтверждением отправлено на ваш email" };
};
