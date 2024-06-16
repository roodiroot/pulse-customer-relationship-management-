"use server";

import { Session } from "next-auth";

import { ROW_TABLE } from "@/constance/row-table";
import { getAllUsers } from "@/data/personal/get-users";

export const showUsers = async ({
  user,
  params,
}: {
  user?: Session["user"];
  params?: {
    take?: string;
    page?: string;
  };
}) => {
  //Проверка роли и бана пользователя
  if (["SALES_REP", "USER"].includes(user?.role || "USER") || user?.bloked)
    return null;

  const take = Number(params?.take) || ROW_TABLE;
  const page = Number(params?.page) || 1;
  const skip = page * take - take;

  const users = await getAllUsers(take, skip);
  if (users?.users && users.users) {
    return users;
  }
  return null;
};
