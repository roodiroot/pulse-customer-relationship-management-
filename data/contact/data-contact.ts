import { db } from "@/lib/db";
import { Contact } from "@prisma/client";

export const getContactById = async (
  contactId: string
): Promise<Contact | null> => {
  try {
    const contact = await db.contact.findUnique({ where: { id: contactId } });
    return contact;
  } catch {
    throw new Error("Error fetching contact");
  }
};
