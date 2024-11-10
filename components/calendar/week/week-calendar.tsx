"use client";

import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { generateWeekDays, timeToNumber } from "@/lib/calendar/calendar";

import { Case } from "@prisma/client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const timeLine = [
  "12AM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

const WeekCalendar = ({ tasks, offset }: { tasks: Case[]; offset: number }) => {
  return (
    <div className=" isolate flex lex-1 flex-col overflow-auto bg-background">
      <div
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full "
        style={{ width: "165%" }}
      >
        <div className="sticky top-0 z-30 flex-none  shadow-sm bg-[hsl(var(--border))] border-b sm:pr-8">
          <div className="-mr-[1px] hidden grid-cols-7 border-r bg-background/40  text-sm leading-6 text-foreground/80 sm:grid">
            <div className="w-14 col-end-1 first:border-x"></div>
            {generateWeekDays(offset).map(({ date, today, dayName }, index) => (
              <CalendarDayHeader
                key={index}
                dayNumber={date.date()}
                isToday={today}
                dayName={dayName}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-auto">
          <div className="sticky left-0 z-10 w-14 flex-none bg-[hsl(var(--border))]"></div>
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            <div
              className="col-start-1 col-end-2 row-start-1 grid"
              style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
            >
              <div className="row-end-1 h-7 border-b"></div>
              {timeLine.map((i) => (
                <div key={i} className="contents">
                  <div className="border-b">
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-foreground/80">
                      {i}
                    </div>
                  </div>
                  <div className="border-b"></div>
                </div>
              ))}
            </div>
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full border-x"></div>
              <div className="col-start-2 row-span-full border-r"></div>
              <div className="col-start-3 row-span-full border-r"></div>
              <div className="col-start-4 row-span-full border-r"></div>
              <div className="col-start-5 row-span-full border-r"></div>
              <div className="col-start-6 row-span-full border-r"></div>
              <div className="col-start-7 row-span-full border-r"></div>
              <div className="col-start-8 row-span-full w-8"></div>
            </div>
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8 "
              style={{
                gridTemplateRows: "1.75rem repeat(288, minmax(0px, 1fr)) auto",
              }}
            >
              {!offset && <TimeLine />}
              {tasks?.map((task, index) => {
                return (
                  <TaskCloud
                    key={index}
                    taskName={task.type}
                    taskDate={task.date || new Date()}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;

//генерация дней недели
const CalendarDayHeader = ({
  isToday,
  dayName,
  dayNumber,
}: {
  isToday: boolean;
  dayName: string;
  dayNumber: number;
}) => {
  return (
    <div className="flex items-center justify-center py-3 border-r">
      <div className="flex items-center">
        <div className={isToday ? "text-primary font-semibold" : undefined}>
          {dayName.slice(0, 3)}
        </div>
        <div
          className={cn(
            "font-medium ml-1.5 text-foreground h-8 w-8 flex items-center justify-center rounded-full",
            isToday ? "bg-primary text-white" : undefined
          )}
        >
          {dayNumber}
        </div>
      </div>
    </div>
  );
};

// ползунок текущего времени
const TimeLine = () => {
  const lineRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.scrollIntoView({ block: "center" });
    }
  }, []);

  const currentTimeSlot = timeToNumber(new Date());

  return (
    <li
      ref={lineRef}
      className="relative z-10 flex mt-[1px]"
      style={{
        gridColumnStart: `${dayjs().isoWeekday()}`,
        gridRow: `${currentTimeSlot} / ${currentTimeSlot}`,
      }}
    >
      <div className="relative h-[2px] w-full bg-red-500 shadow-lg before:w-4 before:h-4 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-2 before:rounded-full before:bg-red-500 before:shadow-lg"></div>
    </li>
  );
};

const TaskCloud = ({
  taskName,
  taskDate,
}: {
  taskName: string;
  taskDate: Date;
}) => {
  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(taskDate);

  return (
    <li
      className="relative h-auto flex mt-[1px]"
      style={{
        gridColumnStart: `${dayjs(taskDate).isoWeekday()}`,
        gridRow: `${timeToNumber(taskDate || new Date())} / span ${timeToNumber(
          taskDate || new Date()
        )}`,
      }}
    >
      <Link
        href={`/affairs?type=${taskName}&date=${taskDate.toISOString()}`}
        className="absolute inset-0 px-1"
      >
        <div className="text-sm items-baseline border bg-white shadow-md rounded-md overflow-hidden">
          <div className="w-full h-full bg-muted/80 px-2.5 pt-2 pb-3 relative">
            <div
              className={cn(
                "absolute bottom-0 inset-x-0 w-full h-1 bg-sky-500 rounded-full",
                taskName === "Meet" && "bg-[hsl(var(--chart-4))]",
                taskName === "Brief" && "bg-[hsl(var(--chart-5))]",
                taskName === "Task" && "bg-[hsl(var(--chart-1))]"
              )}
            ></div>
            <div className="font-medium">{taskName}:</div>
            <div className="text-xs">Starts at {time}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
