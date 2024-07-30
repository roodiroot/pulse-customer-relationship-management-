import { BarChartBigIcon } from "lucide-react";

import { currentUser } from "@/lib/auth";
import FormError from "@/components/ui/form-error";
import { showCases } from "@/actions/case/show-cases";
import { showDeals } from "@/actions/deal/show-deals";
import HeadBody from "@/components/cast-ui/head-body";
import CardTopBg from "@/components/utils/card-top-bg";
import { showUsers } from "@/actions/personal/show-users";
import { showCompanies } from "@/actions/company/show-companyes";
import WindowOneContainer from "@/components/utils/window-container";
import FiltersAnalytics from "@/components/tables/analytics/filters-analytics";
import TaskCardWrapper from "@/components/page/analitic-page/task-card-wrapper";
import DealCardWrapper from "@/components/page/analitic-page/deals-card-wrapper";
import CompanyCardWrapper from "@/components/page/analitic-page/comany-card-wrapper";
import { DealOverview } from "@/components/page/analitic-page/overview/deal-overview";

import { ActionType, StageDeal } from "@prisma/client";

const AnalyticsPage = async ({
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
  const users = await showUsers({ user });
  const {
    deals,
    count: countDeals,
    success: successDeals,
    error: errorDeals,
  } = await showDeals({
    user: {
      userId: user?.id,
      userRole: user?.role,
      bloked: user?.bloked,
    },
    params: {
      responsible: searchParams?.responsible,
      stage: searchParams?.stage,
      date: searchParams?.date,
      dateEnd: searchParams?.dateEnd,
      take: "99999",
      page: searchParams?.page,
    },
  });
  const {
    success: successCompany,
    error: errorCompany,
    companies,
    count: countCompany,
  } = await showCompanies({
    user: {
      userId: user?.id,
      userRole: user?.role,
      bloked: user?.bloked,
    },
    params: {
      take: searchParams.take,
      page: searchParams.page,
      date: searchParams?.date,
      dateEnd: searchParams?.dateEnd,
      responsible: searchParams.responsible,
    },
  });
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
  return (
    <WindowOneContainer>
      <HeadBody>Analytics</HeadBody>
      {successDeals ? (
        <>
          <FiltersAnalytics
            users={users}
            permission={["ADMIN", "SALES_MANAGER"].includes(
              user?.role || "USER"
            )}
          />
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              <CompanyCardWrapper count={countCompany} />
              <DealCardWrapper count={countDeals} />
              <TaskCardWrapper count={countCase} />
            </div>
            <div className="grid gap-4 md:grid-cols-12">
              <CardTopBg
                title="Deals"
                Icon={BarChartBigIcon}
                className="relative col-span-12  2xl:col-span-6"
              >
                <DealOverview deals={deals} className="pt-2" />
              </CardTopBg>
            </div>
          </div>
        </>
      ) : (
        <FormError message={errorDeals} />
      )}
    </WindowOneContainer>
  );
};

export default AnalyticsPage;
