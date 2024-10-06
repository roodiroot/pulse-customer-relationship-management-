import { cn } from "@/lib/utils";
import { generateDate } from "@/lib/calendar";

const MonthCalendar = ({ tasks, today }: any) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const taskList = generateDate(today.month(), today.year(), tasks);
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
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 gap-[1px] ">
          {taskList.map(({ date, currentMonth, today, tasks }, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-background flex flex-col justify-end gap-[1px] p-1",
                !currentMonth && "bg-background/60 text-muted-foreground "
              )}
            >
              <div className="h-1/2 flex gap-1">
                {tasks?.Call.length ? (
                  <div className="rounded-md flex-1 bg-[hsl(var(--chart-2))]">
                    <div className="w-full h-full flex flex-col text-xs p-1">
                      <div className="">Call</div>
                      <div className="text-base text-end font-semibold">
                        {tasks?.Call.length}
                      </div>
                    </div>
                  </div>
                ) : null}
                {tasks?.Meet.length ? (
                  <div className="rounded-md flex-1 bg-[hsl(var(--chart-4))]">
                    <div className="w-full h-full flex flex-col text-xs p-1">
                      <div className="">Meet</div>
                      <div className="text-base text-end font-semibold ">
                        {tasks?.Meet.length}
                      </div>
                    </div>
                  </div>
                ) : null}
                {tasks?.Brief.length ? (
                  <div className="rounded-md flex-1 bg-[hsl(var(--chart-5))]">
                    <div className="w-full h-full flex flex-col text-xs p-1">
                      <div className="">Brief</div>
                      <div className="text-base text-end font-semibold ">
                        {tasks?.Brief.length}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <time
                dateTime="2021-12-27"
                className={cn(
                  "absolute top-2 left-3 flex w-6 h-6 items-center justify-center rounded-full",
                  today && "bg-primary text-white font-semibold"
                )}
              >
                {date.date()}
              </time>
            </div>
          ))}
        </div>
        <div className="w-full isolate grid grid-cols-7 grid-rows-6 gap-[1px] lg:hidden">
          {taskList.map(({ date, currentMonth, today, tasks }, index) => (
            <div
              key={index}
              className={cn(
                "relative flex h-14 flex-col bg-background px-3 py-2",
                !currentMonth && "bg-background/60 text-muted-foreground"
              )}
            >
              <time
                dateTime="2021-12-27"
                className={cn("", today && "text-indigo-500 font-bold")}
              >
                {date.date()}
              </time>
              <div className="absolute inset-1 sm:inset-2 flex flex-col justify-end ">
                <div className="flex gap-1 sm:gap-2 justify-end">
                  {tasks?.Call?.length ? (
                    <div className="rounded-full w-3 h-3 bg-[hsl(var(--chart-2))]"></div>
                  ) : null}
                  {tasks?.Meet?.length ? (
                    <div className="rounded-full w-3 h-3 bg-[hsl(var(--chart-4))]"></div>
                  ) : null}
                  {tasks?.Brief?.length ? (
                    <div className="rounded-full w-3 h-3 bg-[hsl(var(--chart-5))]"></div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthCalendar;
