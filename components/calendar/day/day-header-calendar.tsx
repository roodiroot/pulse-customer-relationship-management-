import { Dayjs } from "dayjs";

import DayTimeSwich from "@/components/calendar/day/day-time-swich";
import HeaderWrapperCalendar from "@/components/calendar/header-wrapper";

const DayHeaderCalendar = ({
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
  return (
    <HeaderWrapperCalendar
      countAllCase={countAllCase}
      title={
        currentDate.add(offset, "day").format("dddd") +
        " " +
        currentDate.add(offset, "day").format("DD/MM/YYYY")
      }
    >
      <DayTimeSwich setOffset={setOffset} offset={offset} />
    </HeaderWrapperCalendar>
  );
};

export default DayHeaderCalendar;
