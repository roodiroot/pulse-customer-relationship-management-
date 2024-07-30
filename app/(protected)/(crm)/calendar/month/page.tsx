import { showCases } from "@/actions/case/show-cases";
import MonthCalendarBlock from "@/components/calendar/month/month-calendar-block";
import { currentUser } from "@/lib/auth";
import { ActionType, Case, StageDeal } from "@prisma/client";

const MonthCalendarPage = async ({
  searchParams,
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
  const {
    cases,
    count: countCase,
    success: successCase,
    error: errorCase,
  } = await showCases({
    user: {
      userId: user?.id,
      userRole: user?.role,
      bloked: user?.bloked,
    },
    params: {
      finished: searchParams?.finished,
      type: searchParams?.type,
      date: searchParams?.date,
      dateEnd: searchParams?.dateEnd,
      take: "99999",
      page: searchParams?.page,
      responsible: searchParams.responsible,
    },
  });
  return <MonthCalendarBlock tasks={cases} />;
};

export default MonthCalendarPage;
