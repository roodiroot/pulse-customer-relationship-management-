import { format } from "date-fns";

const daysWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export const changeDate = (date: Date | null) => {
  if (!date) {
    return {
      date: "1/01/2001",
      time: "01:10",
      dayWeek: "Пн",
    };
  }
  const today = new Date();
  const newDate = new Date(date);
  newDate.getDay();
  return {
    date:
      format(newDate, "dd/MM/yyyy") === format(today, "dd/MM/yyyy")
        ? "Сегодня"
        : format(newDate, "dd/MM/yyyy"),
    time: format(newDate, "HH:mm"),
    dayWeek: daysWeek[newDate.getDay()],
  };
};
