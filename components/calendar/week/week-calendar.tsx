"use client";

import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import TimeLine from "@/components/calendar/week//time-line";
import TaskCloud from "@/components/calendar/week/task-cloud";
import { generateWeekDays, taskForWeek } from "@/lib/calendar/calendar";

import { Case } from "@prisma/client";

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
            {generateWeekDays(dayjs(), offset).map(
              ({ date, today, dayName }, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center py-3 border-r "
                >
                  <div className="flex items-center">
                    <div
                      className={cn(today && "text-indigo-700 font-semibold")}
                    >
                      {dayName.slice(0, 3)}{" "}
                    </div>
                    <div
                      className={cn(
                        "font-medium ml-1.5  text-foreground h-8 w-8 flex items-center justify-center rounded-full",
                        today && " bg-indigo-700 text-white"
                      )}
                    >
                      {date.date()}
                    </div>
                  </div>
                </div>
              )
            )}
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
              {taskForWeek(dayjs(), offset, tasks).map((task, index) => {
                return <TaskCloud key={index} task={task} />;
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
