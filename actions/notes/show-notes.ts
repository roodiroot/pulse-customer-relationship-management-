"use server";

import { getNotesByContactId } from "@/data/notes/data-notes";

export const showNotes = async (contactId: string) => {
  const data = await getNotesByContactId(contactId);
  return data;
};
