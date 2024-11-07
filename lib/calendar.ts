import { ActionType, Case } from "@prisma/client";
import dayjs from "dayjs";

type TasksForDate = {
  Call: Case[];
  Meet: Case[];
  Brief: Case[];
};

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year(),
  tasks: Case[]
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  //create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: firstDateOfMonth.date(i),
    });
  }

  //generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const currentDate = firstDateOfMonth.date(i);
    const formattedDate = currentDate.format("YYYY-MM-DD");

    // Initialize task categories
    const tasksForDate: TasksForDate = {
      Call: [],
      Meet: [],
      Brief: [],
    };
    console.log(tasks);

    // Filter and categorize tasks for the current date
    tasks?.forEach((task) => {
      if (dayjs(task.date).format("YYYY-MM-DD") === formattedDate) {
        if (task.type in tasksForDate) {
          tasksForDate[task.type as keyof TasksForDate].push(task);
        }
      }
    });

    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
      tasks: tasksForDate,
    });
  }

  //generate suffix date
  const remaining = 42 - arrayOfDate.length;
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: firstDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function timeToNumber(time: string | Date) {
  time = new Date(time).toLocaleString("en-En", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  let [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  return Math.floor(totalMinutes / 5) + 2;
}

export function typeToNumber(type: ActionType) {
  switch (type) {
    case ActionType.Brief:
      return 8;
    case ActionType.Meet:
      return 12;
    case ActionType.Call:
      return 6;
    default:
      return null;
  }
}

export const generateWeekDays = (currentDate = dayjs(), offset = 0) => {
  const startOfWeek = currentDate.startOf("week").add(offset, "week");
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.add(i, "day");
    weekDays.push({
      dayNumber: day.day(),
      dayName: day.format("dddd"),
      date: day,
      today: day.isSame(dayjs(), "day"),
    });
  }

  return weekDays;
};

export const taskForWeek = (
  currentDate = dayjs(),
  offset = 0,
  tasks: Case[]
) => {
  const startOfWeek = currentDate.startOf("week").add(offset, "week");
  const endOfWeek = startOfWeek.add(6, "day").endOf("day");

  return tasks.filter((task) => {
    const taskDate = dayjs(task.date);
    return taskDate.isAfter(startOfWeek) && taskDate.isBefore(endOfWeek);
  });
};
