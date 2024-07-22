import { currentUser } from "@/lib/auth";
import { DealOverview } from "./_components/deal-overview";
import FormError from "@/components/ui/form-error";
import HeadBody from "@/components/cast-ui/head-body";
import { showCases } from "@/actions/case/show-cases";
import { showDeals } from "@/actions/deal/show-deals";
import { showUsers } from "@/actions/personal/show-users";
import DatasCardWrapper from "./_components/datas-card-wrapper";
import { showCompanies } from "@/actions/company/show-companyes";
import FiltersAnalytics from "@/components/tables/analytics/filters-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ActionType, StageDeal } from "@prisma/client";
import { CaseOverview } from "./_components/case-overview";

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
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-4">
        <HeadBody>Аналитика</HeadBody>
      </div>
      {successDeals ? (
        <>
          <FiltersAnalytics
            users={users}
            permission={["ADMIN", "SALES_MANAGER"].includes(
              user?.role || "USER"
            )}
          />
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DatasCardWrapper
                title="Организаций в работе"
                count={countCompany}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </DatasCardWrapper>
              <DatasCardWrapper title="Сделок в работе" count={countDeals}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </DatasCardWrapper>
              <DatasCardWrapper title="Дел в работе" count={countCase}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </DatasCardWrapper>
            </div>
            <div className="grid gap-4 md:grid-cols-12">
              {/* <div className="relative  h-full max-w-full flex flex-col justify-end col-span-12  2xl:col-span-6">
                <Card className="rounded-md">
                  <CardHeader>
                    <CardTitle>Дела</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CaseOverview cases={cases} />
                  </CardContent>
                </Card>
              </div> */}
              <div className="relative  h-full max-w-full flex flex-col justify-end col-span-12  2xl:col-span-6">
                <Card className="rounded-md">
                  <CardHeader>
                    <CardTitle>Сделки</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <DealOverview deals={deals} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <FormError message={errorDeals} />
      )}
    </div>
  );
};

export default AnalyticsPage;
