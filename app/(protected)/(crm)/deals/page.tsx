import { currentUser } from "@/lib/auth";
import { showDeals } from "@/actions/deal/show-deals";
import HeadBody from "@/components/cast-ui/head-body";
import { showUsers } from "@/actions/personal/show-users";
import { columns } from "@/components/tables/deals/columns";
import FiltersDeal from "@/components/tables/deals/filters-deal";
import { DealDataTable } from "@/components/tables/deals/deal-data-table";
import DataTablePagination from "@/components/page/case/data-table-pagination";
import FormError from "@/components/ui/form-error";
import { StageDeal } from "@prisma/client";

const DealsPage = async ({
  searchParams,
}: {
  searchParams: {
    responsible: string;
    stage: StageDeal | "NOT_DIS";
    date: string;
    dateEnd: string;
    take: string;
    page: string;
  };
}) => {
  const user = await currentUser();
  const users = await showUsers({ user });
  const { deals, count, success, error } = await showDeals({
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
      take: searchParams?.take,
      page: searchParams?.page,
    },
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-4">
        <HeadBody>Сделки</HeadBody>
      </div>
      {success ? (
        <>
          <FiltersDeal
            users={users}
            permission={["ADMIN", "SALES_MANAGER"].includes(
              user?.role || "USER"
            )}
          />
          <div className="relative  h-full max-w-full flex flex-col justify-end">
            <DealDataTable
              data={deals}
              columns={columns}
              role={user?.role}
              users={users}
            />
            <DataTablePagination
              className="mt-auto pt-4"
              allCount={count || 0}
            />
          </div>
        </>
      ) : (
        <FormError message={error} />
      )}
    </div>
  );
};

export default DealsPage;
