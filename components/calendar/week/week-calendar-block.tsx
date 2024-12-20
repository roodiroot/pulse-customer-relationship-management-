"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import WeekCalendar from "@/components/calendar/week/week-calendar";
import WeekHeaderCalendar from "@/components/calendar/week/week-header-calendar";

import { Case } from "@prisma/client";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export type Task = {
  id: string;
  createdAt: string;
  type: "Call" | "Meet" | "Brief";
  comment: string;
  date: string;
  responsible: string | null;
  finished: boolean;
  dealId: string;
};

interface WeekCalendarProps {
  tasks: Case[];
  counCase?: number;
}

const WeekCalendarBlock: React.FC<WeekCalendarProps> = ({
  tasks,
  counCase,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentDate = dayjs();

  const [offset, setOffset] = useState(0);

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
  }, [offset]);

  const updateStartAndEndDate = () => {
    const firstDay = dayjs(currentDate.add(offset, "week"))
      .startOf("isoWeek")
      .toDate();
    const lastDay = dayjs(currentDate.add(offset, "week"))
      .endOf("isoWeek")
      .toDate();

    updateUrlParams(
      ["date", "dateEnd"],
      [firstDay.toISOString(), lastDay.toISOString()]
    );
  };

  return (
    <div className="absolute inset-0 w-full h-full px-4 pb-4">
      <WeekHeaderCalendar
        offset={offset}
        currentDate={currentDate}
        setOffset={setOffset}
        countAllCase={counCase}
      />
      <WeekCalendar tasks={tasks} offset={offset} />
    </div>
  );
};

export default WeekCalendarBlock;
