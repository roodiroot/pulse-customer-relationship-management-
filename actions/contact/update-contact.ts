import { UpdateContactSchema } from "@/schemas";
import { z } from "zod";

export const updateContact = async (
  value: z.infer<typeof UpdateContactSchema>,
  contactId: string
) => {
  const validatedFiled = UpdateContactSchema.safeParse(value);
  if (!validatedFiled) {
    return { error: "Некорректные данные" };
  }

  console.log(validatedFiled, contactId);
};
