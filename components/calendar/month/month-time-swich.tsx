import { Dayjs } from "dayjs";
import { Button } from "@/components/ui/button";

const MonthTimeSwich = ({
  today,
  setToday,
  currenntDate,
  addDateForURL,
}: {
  today: Dayjs;
  setToday: (time: Dayjs) => void;
  currenntDate: Dayjs;
  addDateForURL: () => void;
}) => {
  return (
    <div className="flex">
      <Button
        onClick={() => {
          setToday(today.month(today.month() - 1));
        }}
        variant="outline"
        className="rounded-r-none border-r-0"
      >
        &lsaquo;
      </Button>
      <Button
        onClick={() => setToday(currenntDate)}
        variant="outline"
        className="rounded-none border-x-0 hidden sm:inline-flex"
      >
        Today
      </Button>
      <Button
        onClick={() => {
          setToday(today.month(today.month() + 1));
        }}
        variant="outline"
        className="rounded-l-none border-l-0"
      >
        &rsaquo;
      </Button>
    </div>
  );
};

export default MonthTimeSwich;
