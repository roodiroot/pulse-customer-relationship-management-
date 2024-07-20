import { db } from "@/lib/db";
import { Notes, User } from "@prisma/client";

export interface NotesResponce extends Notes {
  user: User | null;
}

export const getNotesByContactId = async (
  contactId: string
): Promise<NotesResponce[] | null> => {
  try {
    const notes = await db.notes.findMany({
      where: { contactId },
      include: { user: true },
    });
    return notes;
  } catch {
    throw new Error("Error fetching contact");
  }
};
