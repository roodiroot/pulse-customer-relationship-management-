import { Case } from "@prisma/client";
import dayjs from "dayjs";

type TasksForDate = {
  Call: Case[];
  Meet: Case[];
  Brief: Case[];
};

const generateTasks = (tasks: Case[], currentDate: string) => {
  // Initialize task categories
  const tasksForDate: TasksForDate = {
    Call: [],
    Meet: [],
    Brief: [],
  };
  // console.log(tasks);

  // Filter and categorize tasks for the current date
  tasks?.forEach((task) => {
    if (dayjs(task.date).format("YYYY-MM-DD") === currentDate) {
      if (task.type in tasksForDate) {
        tasksForDate[task.type as keyof TasksForDate].push(task);
      }
    }
  });
};
