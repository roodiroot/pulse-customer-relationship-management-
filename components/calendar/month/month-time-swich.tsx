import { Dayjs } from "dayjs";
import { Button } from "@/components/ui/button";

const MonthTimeSwich = ({
  today,
  setToday,
  currenntDate,
}: {
  today: Dayjs;
  setToday: (time: Dayjs) => void;
  currenntDate: Dayjs;
}) => {
  return (
    <div className="">
      <Button
        onClick={() => setToday(today.month(today.month() - 1))}
        variant="outline"
        className="rounded-r-none border-r-0"
      >
        &lsaquo;
      </Button>
      <Button
        onClick={() => setToday(currenntDate)}
        variant="outline"
        className="rounded-none border-x-0"
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
