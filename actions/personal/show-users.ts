"use server";

import { getAllUsers } from "@/data/personal/get-users";

export const showUsers = async (params?: any) => {
  const users = await getAllUsers(params);
  return users;
};
