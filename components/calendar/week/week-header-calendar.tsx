import dayjs, { Dayjs } from "dayjs";

import { months } from "@/lib/calendar/calendar";
import WeekTimeSwich from "@/components/calendar/week/week-time-swich";
import HeaderWrapperCalendar from "@/components/calendar/header-wrapper";

const WeekHeaderCalendar = ({
  offset,
  setOffset,
  countAllCase,
  currentDate,
}: {
  offset: number;
  setOffset: (value: number) => void;
  countAllCase?: number;
  currentDate: Dayjs;
}) => {
  const startOfWeek = currentDate.startOf("week").add(offset, "week");
  return (
    <HeaderWrapperCalendar
      countAllCase={countAllCase}
      title={months[startOfWeek.month()] + " " + startOfWeek.year()}
    >
      <WeekTimeSwich setOffset={setOffset} offset={offset} />
    </HeaderWrapperCalendar>
  );
};

export default WeekHeaderCalendar;
