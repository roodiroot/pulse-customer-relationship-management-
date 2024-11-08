import dayjs from "dayjs";
import { ActionType, Case } from "@prisma/client";

export const generateDate = (today = dayjs(), tasks: Case[]) => {
  const firstDateOfMonth = dayjs(today).startOf("month");
  const lastDateOfMonth = dayjs(today).endOf("month");

  const arrayOfDate = [];

  const prefixDays = (firstDateOfMonth.day() + 6) % 7;

  // Создаем префиксные даты
  for (let i = 0; i < prefixDays; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: firstDateOfMonth.date(i),
    });
  }

  // console.log(groupedTasks);

  // Генерация дат текущего месяца и задачь на каждый день
  for (let i = 1; i <= lastDateOfMonth.date(); i++) {
    const currentDate = firstDateOfMonth.date(i);

    const groupedTasks = tasks.reduce((acc: any, task) => {
      const taskDate = dayjs(new Date(task.date || "")).format("DD/MM/YYYY");
      if (taskDate === dayjs(currentDate).format("DD/MM/YYYY")) {
        const { type } = task;
        acc[type] = acc[type] || [];
        acc[type].push(task);
      }
      return acc;
    }, {});

    arrayOfDate.push({
      currentMonth: true,
      date: currentDate,
      today: currentDate.isSame(dayjs(), "day"),
      tasks: groupedTasks,
    });
  }

  // Генерация суффиксных дат
  const remaining = 42 - arrayOfDate.length;

  for (let i = 1; i <= remaining; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.add(i, "day"),
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
