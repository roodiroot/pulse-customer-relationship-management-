import { Dayjs } from "dayjs";

import { months } from "@/lib/calendar";
import HeaderWrapperCalendar from "@/components/calendar/header-wrapper";
import MonthTimeSwich from "@/components/calendar/month/month-time-swich";

const MonthHeaderCalendar = ({
  today,
  setToday,
  currenntDate,
  addDateForURL,
  countAllCase,
}: {
  today: Dayjs;
  setToday: (time: Dayjs) => void;
  currenntDate: Dayjs;
  addDateForURL: () => void;
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
        addDateForURL={addDateForURL}
      />
    </HeaderWrapperCalendar>
  );
};

export default MonthHeaderCalendar;
