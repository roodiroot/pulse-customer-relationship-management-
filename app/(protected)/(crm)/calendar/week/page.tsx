import { currentUser } from "@/lib/auth";
import { showCases } from "@/actions/case/show-cases";
import { ActionType, StageDeal } from "@prisma/client";
import WeekCalendarBlock from "@/components/calendar/week/week-calendar-block";
import dayjs from "dayjs";

import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const isValidDate = (dateString: string): string | undefined => {
  if (!dateString) {
    return undefined;
  }
  const date = dayjs(dateString);
  return date.isValid() ? date.toString() : undefined;
};

const WeekCalendarPage = async ({
  searchParams: {
    responsible,
    stage,
    date: dateString,
    dateEnd: dateEndString,
    take,
    page,
    finished,
    type,
  },
}: {
  searchParams: {
    responsible: string;
    stage: StageDeal | "NOT_DIS";
    date: string;
    dateEnd: string;
    take: string;
    page: string;
    finished: string;
    type: ActionType;
  };
}) => {
  const user = await currentUser();
  const currentDate = dayjs();

  const startDate =
    isValidDate(dateString) ?? currentDate.startOf("isoWeek").toISOString();
  const endDate =
    isValidDate(dateEndString) ?? currentDate.endOf("isoWeek").toISOString();

  // console.log({
  //   s: startDate,
  //   e: endDate,
  // });

  const { cases, count, success, error } = await showCases({
    user: { userId: user?.id, userRole: user?.role, bloked: user?.bloked },
    params: {
      finished,
      type,
      date: startDate,
      dateEnd: endDate,
      take: "1000",
      page,
      responsible,
    },
  });
  return <WeekCalendarBlock tasks={cases} counCase={count} />;
};

export default WeekCalendarPage;
