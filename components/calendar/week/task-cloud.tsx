import { cn } from "@/lib/utils";

import dayjs from "dayjs";

import { timeToNumber, typeToNumber } from "@/lib/calendar";

import { Case } from "@prisma/client";

const TaskCloud = ({ task }: { task: Case }) => {
  return (
    <li
      className="relative flex mt-[1px]"
      style={{
        gridColumnStart: `${dayjs(task.date).day() + 1}`,
        gridRow: `${timeToNumber(
          task.date || new Date()
        )} / span ${typeToNumber(task.type)}`,
      }}
    >
      <div
        className={cn(
          "absolute inset-1 flex gap-2 items-start shadow-sm overflow-y-auto font-semibold rounded-md p-2 text-xs leading-5 hover:z-30 cursor-pointer",
          task.type === "Call" && "bg-[hsl(var(--chart-2))]",
          task.type === "Meet" && "bg-[hsl(var(--chart-4))]",
          task.type === "Brief" && "bg-[hsl(var(--chart-5))]"
        )}
      >
        <div className="flex gap-2 items-baseline">
          {task.type}{" "}
          {/* <span className=" opacity-60 text-xs">
            (
            {new Date(task.date || new Date()).toLocaleString("en-En", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            )
          </span> */}
        </div>
      </div>
    </li>
  );
};

export default TaskCloud;
