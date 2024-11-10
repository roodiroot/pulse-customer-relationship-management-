import Link from "next/link";
import { Dayjs } from "dayjs";

import { cn } from "@/lib/utils";
import { generateDate } from "@/lib/calendar/calendar";

const MonthCalendar = ({ tasks, today }: any) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const taskList = generateDate(today, tasks);

  return (
    <div className="shadow-sm ring-0 lg:flex lg:flex-auto lg:flex-col bg-[hsl(var(--border))]">
      <div className="grid grid-cols-7 gap-[1px] border-b bg-background/40 text-center text-sm text-foreground/80 font-semibold leading-6 lg:flex-none">
        {days.map((i) => (
          <div key={i} className="py-2 ">
            {i[0]}
            <span className="sr-only sm:not-sr-only">{i.slice(1)}</span>
          </div>
        ))}
      </div>
      <div className="flex  text-sm leading-6  lg:flex-auto">
        <div className="isolate w-full grid grid-cols-7 grid-rows-6 gap-[1px] ">
          {taskList.map(({ date, currentMonth, today, tasks }, index) => {
            console.log();
            return (
              <div
                key={index}
                className={cn(
                  "relative h-14 lg:h-auto bg-background gap-[3px]",
                  !currentMonth && "bg-background/60 text-muted-foreground "
                )}
              >
                <div className="relative h-full">
                  <div className="absolute py-2 px-2 flex lg:right-0 bottom-0 lg:flex-col lg:gap-1 lg:items-end lg:px-1 lg:py-1">
                    {tasks &&
                      Object.entries(tasks).map(([key, value]: any) => {
                        return (
                          <ElementTaskForMonthCalendar
                            key={key}
                            taskName={key}
                            date={date}
                            count={value.length}
                          />
                        );
                      })}
                  </div>
                  <ElementNumberDateForMonthCalendar
                    date={date.date()}
                    today={today || false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthCalendar;

const ElementTaskForMonthCalendar = ({
  taskName,
  count,
  date,
}: {
  taskName: string;
  count: number;
  date: Dayjs;
}) => (
  <div className="cursor-pointer ml-auto relative z-10 lg:flex flex-row items-center gap-1 lg:h-3 ">
    <Link
      href={`/affairs?type=${taskName}&date=${date.toISOString()}`}
      className="absolute inset-0 z-10"
    ></Link>
    <div className="hidden lg:flex-1"></div>
    <div
      className={cn(
        "relative pr-3 before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:w-2 before:h-2 lg:before:w-[6px] lg:before:h-[6px] before:bg-sky-500 before:rounded-full",
        taskName === "Meet" && "before:bg-[hsl(var(--chart-4))]",
        taskName === "Brief" && "before:bg-[hsl(var(--chart-5))]",
        taskName === "Task" && "before:bg-[hsl(var(--chart-1))]"
      )}
    >
      <span className="hidden lg:inline-block text-xs font-medium leading-3">
        {taskName}
      </span>{" "}
      <span className="hidden lg:inline-block text-xs ">({count})</span>
    </div>
  </div>
);

const ElementNumberDateForMonthCalendar = ({
  today,
  date,
}: {
  today: boolean;
  date: number;
}) => (
  <time
    dateTime="2021-12-27"
    className={cn(
      " absolute right-3 z-0 lg:ml-0 lg:top-2 lg:left-3 lg:flex lg:w-6 lg:h-6 lg:items-center lg:justify-center lg:rounded-full",
      today &&
        "text-primary font-bold lg:bg-primary lg:text-white lg:font-semibold"
    )}
  >
    {date}
  </time>
);
