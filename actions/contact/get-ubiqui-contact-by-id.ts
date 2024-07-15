"use server";

import { getContactById } from "@/data/contact/data-contact";

export const getUniquiContactById = async (contactId: string) => {
  const contact = await getContactById(contactId);
  return contact;
};
