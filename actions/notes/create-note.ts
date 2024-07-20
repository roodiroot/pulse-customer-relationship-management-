"use server";

import { getContactById } from "@/data/contact/data-contact";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateNoteSchema } from "@/schemas";
import { z } from "zod";

export const createNote = async ({
  value,
  contactId,
}: {
  value: z.infer<typeof CreateNoteSchema>;
  contactId?: string | null;
}): Promise<{ success: string }> => {
  const validated = CreateNoteSchema.parse(value);
  if (!validated) {
    throw new Error("Введены не правильные данные.");
  }
  if (!contactId) throw new Error("Не указае Id контакта");
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new Error("Такого контакта не найдено");
  }

  const user = await currentUser();

  try {
    await db.notes.create({
      data: {
        text: validated.text,
        contactId,
        userId: user?.id || null,
      },
    });
    return {
      success: "Success",
    };
  } catch (error) {
    throw error;
  }
};
