import dayjs from "dayjs";

import { currentUser } from "@/lib/auth";
import { showCases } from "@/actions/case/show-cases";
import MonthCalendarBlock from "@/components/calendar/month/month-calendar-block";

import { ActionType, StageDeal } from "@prisma/client";

const isValidDate = (dateString: string): string | undefined => {
  if (!dateString) {
    return undefined;
  }
  const date = dayjs(dateString);
  return date.isValid() ? date.toString() : undefined;
};

const MonthCalendarPage = async ({
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
    isValidDate(dateString) ?? currentDate.startOf("month").toISOString();
  const endDate =
    isValidDate(dateEndString) ?? currentDate.endOf("month").toISOString();

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

  // console.log(count);

  return <MonthCalendarBlock tasks={cases} countAllCase={count} />;
};

export default MonthCalendarPage;
