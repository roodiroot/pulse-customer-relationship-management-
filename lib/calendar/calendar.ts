import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { ActionType, Case } from "@prisma/client";

dayjs.extend(isoWeek);

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

//генерация даты для месячного календаря с тасками
export const generateDate = (today = dayjs(), tasks: Case[]) => {
  const firstDateOfMonth = dayjs(today).startOf("month");
  const lastDateOfMonth = dayjs(today).endOf("month");

  const arrayOfDate = [];

  // Создаем префиксные даты
  const firstWeekday = firstDateOfMonth.isoWeekday();
  const daysToAdd = firstWeekday - 1;
  const lastDayOfPrevMonth = firstDateOfMonth.subtract(1, "day");

  for (let i = daysToAdd; i > 0; i--) {
    const prefixDate = lastDayOfPrevMonth.subtract(i - 1, "day");
    arrayOfDate.push({
      currentMonth: false,
      date: prefixDate,
    });
  }

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

//генерация шапки недельного календаря
export const generateWeekDays = (
  offset = 0
): Array<{
  dayNumber: number;
  dayName: string;
  date: dayjs.Dayjs;
  today: boolean;
}> => {
  const startDate = dayjs().startOf("isoWeek").add(offset, "week");
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = startDate.add(i, "day");
    return {
      dayNumber: day.isoWeekday(),
      dayName: day.format("dddd"),
      date: day,
      today: day.isSame(dayjs(), "day"),
    };
  });

  return weekDays;
};

export function timeToNumber(time: string | Date): number {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const totalMinutes = hours * 60 + minutes;
  return Math.floor(totalMinutes / 5) + 2;
}
