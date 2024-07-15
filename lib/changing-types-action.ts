import { ActionType } from "@prisma/client";

export const actionType = (value: ActionType) => {
  if (value === ActionType.Brief) return "Briefing";
  if (value === ActionType.Call) return "Call";
  if (value === ActionType.Meet) return "Meeting";
  if (value === ActionType.Email) return "Email";
  if (value === ActionType.Task) return "Task";
};
