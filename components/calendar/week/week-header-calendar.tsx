import dayjs from "dayjs";

import { months } from "@/lib/calendar";
import WeekTimeSwich from "@/components/calendar/week/week-time-swich";
import HeaderWrapperCalendar from "@/components/calendar/header-wrapper";

const WeekHeaderCalendar = ({
  offset,
  setOffset,
}: {
  offset: number;
  setOffset: (value: number) => void;
}) => {
  const currenntDate = dayjs();
  const startOfWeek = currenntDate.startOf("week").add(offset, "week");
  return (
    <HeaderWrapperCalendar
      title={months[startOfWeek.month()] + " " + startOfWeek.year()}
    >
      <WeekTimeSwich setOffset={setOffset} offset={offset} />
    </HeaderWrapperCalendar>
  );
};

export default WeekHeaderCalendar;
