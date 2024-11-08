"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import MonthCalendar from "@/components/calendar/month/month-calendar";
import MonthHeaderCalendar from "@/components/calendar/month/month-header-calendar";

import { Case } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CalendarProps {
  tasks: Case[];
  countAllCase: number;
}

const MonthCalendarBlock: React.FC<CalendarProps> = ({
  tasks,
  countAllCase,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentDate = dayjs();

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const updateUrlParams = useCallback(
    (keys: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // Remove page parameter to reset to first page
      keys.forEach((key, index) => {
        params.set(key, values[index]);
      });
      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    updateStartAndEndDate();
  }, [selectedDate]);

  const updateStartAndEndDate = () => {
    const firstDay = dayjs(selectedDate).startOf("month").toDate();
    const lastDay = dayjs(selectedDate).endOf("month").toDate();

    updateUrlParams(
      ["date", "dateEnd"],
      [firstDay.toISOString(), lastDay.toISOString()]
    );
  };

  return (
    <>
      <MonthHeaderCalendar
        today={selectedDate}
        setToday={setSelectedDate}
        currenntDate={currentDate}
        countAllCase={countAllCase}
      />
      <MonthCalendar tasks={tasks} today={selectedDate} />
    </>
  );
};

export default MonthCalendarBlock;
