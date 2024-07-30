"use client";

import { useState } from "react";

import WeekCalendar from "@/components/calendar/week/week-calendar";
import WeekHeaderCalendar from "@/components/calendar/week/week-header-calendar";
import { Case } from "@prisma/client";

export type Task = {
  id: string;
  createdAt: string;
  type: "Call" | "Meet" | "Brief";
  comment: string;
  date: string;
  responsible: string | null;
  finished: boolean;
  dealId: string;
};

interface WeekCalendarProps {
  tasks: Case[];
}

// const tasksForWeek: Case[] = [
//   {
//     id: "clupzflek000a5ld8lq9ly0fz",
//     createdAt: "2024-04-07T20:34:44.635Z",
//     type: "Meet",
//     comment: "тнб",
//     date: "2024-08-01T08:26:21.274Z",
//     responsible: null,
//     finished: true,
//     dealId: "clupzdiw600065ld8aqcuxo54",
//   },
//   {
//     id: "clupzflek000a5ld8lq9ly0fz",
//     createdAt: "2024-04-07T20:34:44.635Z",
//     type: "Meet",
//     comment: "тнб",
//     date: "2024-08-01T09:00:21.274Z",
//     responsible: null,
//     finished: true,
//     dealId: "clupzdiw600065ld8aqcuxo54",
//   },
//   {
//     id: "clupzflek000a5ld8lq9ly0fz",
//     createdAt: "2024-04-07T20:34:44.635Z",
//     type: "Meet",
//     comment: "тнб",
//     date: "2024-08-01T09:15:21.274Z",
//     responsible: null,
//     finished: true,
//     dealId: "clupzdiw600065ld8aqcuxo54",
//   },
//   {
//     id: "clupzflek000a5ld8lq9ly0fz",
//     createdAt: "2024-04-07T20:34:44.635Z",
//     type: "Call",
//     comment: "тнб",
//     date: "2024-07-28T07:00:21.274Z",
//     responsible: null,
//     finished: true,
//     dealId: "clupzdiw600065ld8aqcuxo54",
//   },
//   {
//     id: "clupzflek000a5ld8lq9ly0fz",
//     createdAt: "2024-04-07T20:34:44.635Z",
//     type: "Brief",
//     comment: "тнб",
//     date: "2024-07-29T09:30:21.274Z",
//     responsible: null,
//     finished: true,
//     dealId: "clupzdiw600065ld8aqcuxo54",
//   },
// ];

const WeekCalendarBlock: React.FC<WeekCalendarProps> = ({ tasks }) => {
  const [offset, setOffset] = useState(0);

  return (
    <>
      <WeekHeaderCalendar offset={offset} setOffset={setOffset} />
      <WeekCalendar tasks={tasks} offset={offset} />
    </>
  );
};

export default WeekCalendarBlock;
