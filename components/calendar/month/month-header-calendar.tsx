import { Dayjs } from "dayjs";

import { months } from "@/lib/calendar/calendar";
import HeaderWrapperCalendar from "@/components/calendar/header-wrapper";
import MonthTimeSwich from "@/components/calendar/month/month-time-swich";

const MonthHeaderCalendar = ({
  today,
  setToday,
  currenntDate,
  countAllCase,
}: {
  today: Dayjs;
  setToday: (time: Dayjs) => void;
  currenntDate: Dayjs;
  countAllCase: number;
}) => {
  return (
    <HeaderWrapperCalendar
      countAllCase={countAllCase}
      title={months[today.month()] + " " + today.year()}
    >
      <MonthTimeSwich
        today={today}
        setToday={setToday}
        currenntDate={currenntDate}
      />
    </HeaderWrapperCalendar>
  );
};

export default MonthHeaderCalendar;
