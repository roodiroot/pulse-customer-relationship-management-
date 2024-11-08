import dayjs from "dayjs";
import { useEffect, useRef } from "react";

import { timeToNumber } from "@/lib/calendar/calendar";

const TimeLine = () => {
  const ref = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (ref?.current) {
      ref.current?.scrollIntoView({ block: "center" });
    }
  }, [ref]);
  const momentNumber = timeToNumber(new Date());
  return (
    <li
      ref={ref}
      className="relative z-10 flex mt-[1px]"
      style={{
        gridColumnStart: `${dayjs().day() + 1}`,
        gridRow: `${momentNumber} / ${momentNumber}`,
      }}
    >
      <div className="relative h-[2px] w-full bg-red-500 shadow-md before:w-4 before:h-4 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-2 before:rounded-full before:bg-red-500 before:shadow-md"></div>
    </li>
  );
};

export default TimeLine;
