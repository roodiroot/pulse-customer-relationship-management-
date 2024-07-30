"use client";

import dayjs from "dayjs";
import { useState } from "react";

import MonthCalendar from "@/components/calendar/month/month-calendar";
import MonthHeaderCalendar from "@/components/calendar/month/month-header-calendar";

import { Case } from "@prisma/client";

interface CalendarProps {
  tasks: Case[];
}

const MonthCalendarBlock: React.FC<CalendarProps> = ({ tasks }) => {
  const currenntDate = dayjs();
  const [today, setToday] = useState(currenntDate);

  return (
    <>
      <MonthHeaderCalendar
        today={today}
        setToday={setToday}
        currenntDate={currenntDate}
      />
      <MonthCalendar tasks={tasks} today={today} />
    </>
  );
};

export default MonthCalendarBlock;
