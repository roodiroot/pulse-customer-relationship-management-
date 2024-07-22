import { currentUser } from "@/lib/auth";
import { ActionType } from "@prisma/client";
import { showCases } from "@/actions/case/show-cases";
import HeadBody from "@/components/cast-ui/head-body";
import { columns } from "@/components/tables/affairs/columns";
import FiltersAffair from "@/components/tables/affairs/filters-affair";
import DataTablePagination from "@/components/page/case/data-table-pagination";
import { AffairDataTable } from "@/components/tables/affairs/affair-data-table";
import { showUsers } from "@/actions/personal/show-users";
import FormError from "@/components/ui/form-error";
import TableContainer from "@/components/utils/table-container";

const AffairsPage = async ({
  searchParams,
}: {
  searchParams: {
    date: string;
    dateEnd: string;
    finished: string;
    type: ActionType;
    take: string;
    page: string;
    responsible: string;
  };
}) => {
  const user = await currentUser();
  const users = await showUsers({ user });
  const { cases, count, success, error } = await showCases({
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
      take: searchParams?.take,
      page: searchParams?.page,
      responsible: searchParams.responsible,
    },
  });

  return (
    <TableContainer>
      <HeadBody>My Tasks</HeadBody>
      {success ? (
        <>
          <FiltersAffair
            permission={["ADMIN", "SALES_MANAGER"].includes(
              user?.role || "USER"
            )}
            users={users}
          />
          <div className="relative  h-full max-w-full flex flex-col justify-end">
            <AffairDataTable data={cases} columns={columns} role={user?.role} />
            <DataTablePagination
              className="mt-auto pt-4"
              allCount={count || 0}
            />
          </div>
        </>
      ) : (
        <FormError message={error} />
      )}
    </TableContainer>
  );
};

export default AffairsPage;
