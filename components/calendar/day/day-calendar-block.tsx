"use client";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DayCalendar from "@/components/calendar/day/day-calendar";
import DayHeaderCalendar from "@/components/calendar/day/day-header-calendar";

import { Case } from "@prisma/client";

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

const DayCalendarBlock: React.FC<WeekCalendarProps> = ({ tasks, counCase }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentDate = dayjs();

  const [offset, setOffset] = useState(0);

  const updateUrlParams = useCallback(
    (keys: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // Remove page parameter to reset to first page
      params.delete("dateEnd"); // Remove page parameter to reset to dateEnd
      keys.forEach((key, index) => {
        params.set(key, values[index]);
      });
      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname, router, offset]
  );

  useEffect(() => {
    updateStartAndEndDate();
  }, [offset]);

  const updateStartAndEndDate = () => {
    const firstDay = currentDate.add(offset, "day").startOf("day");
    updateUrlParams(["date"], [firstDay.toISOString()]);
  };

  return (
    <div className="absolute inset-0 w-full h-full pb-4">
      <DayHeaderCalendar
        offset={offset}
        currentDate={currentDate}
        setOffset={setOffset}
        countAllCase={counCase}
      />
      <DayCalendar currentDate={currentDate} tasks={tasks} offset={offset} />
    </div>
  );
};

export default DayCalendarBlock;
