import { ActionType } from "@prisma/client";

export const actionType = (value: ActionType) => {
  if (value === ActionType.Brief) return "Бриффинг";
  if (value === ActionType.Call) return "Звонок";
  if (value === ActionType.Meet) return "Встреча";
};
