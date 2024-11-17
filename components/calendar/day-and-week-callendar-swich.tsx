"use client";

import DayCalendarBlock from "@/components/calendar/day/day-calendar-block";
import WeekCalendarBlock from "@/components/calendar/week/week-calendar-block";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Case } from "@prisma/client";

interface DayAndWeekCalendarSwichProps {
  tasks: Case[];
  countCase?: number;
}

const DayAndWeekCalendarSwich: React.FC<DayAndWeekCalendarSwichProps> = ({
  tasks,
  countCase,
}) => {
  const isDesctop = useMediaQuery("(min-width: 640px)");
  if (isDesctop)
    return <WeekCalendarBlock tasks={tasks} counCase={countCase} />;
  return <DayCalendarBlock tasks={tasks} counCase={countCase} />;
};

export default DayAndWeekCalendarSwich;
