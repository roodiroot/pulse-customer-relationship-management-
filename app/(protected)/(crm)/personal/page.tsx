import { currentUser } from "@/lib/auth";

import FormError from "@/components/ui/form-error";
import HeadBody from "@/components/cast-ui/head-body";
import { showUsers } from "@/actions/personal/show-users";
import { createColumns } from "@/components/tables/personal/columns";
import { UsersDataTable } from "@/components/tables/personal/users-data-table";
import DataTablePagination from "@/components/page/case/data-table-pagination";
import TableContainer from "@/components/utils/table-container";

const PersolnalPage = async ({
  searchParams,
}: {
  searchParams: {
    take: string;
    page: string;
  };
}) => {
  const user = await currentUser();
  const data = await showUsers({
    user,
    params: { take: searchParams?.take, page: searchParams?.page },
  });

  return (
    <TableContainer>
      <HeadBody>Team</HeadBody>
      {["SALES_REP", "USER"].includes(user?.role || "USER") || user?.bloked ? (
        <FormError message="У вас нет разрешения на доступ к этой странице" />
      ) : (
        <div className="relative  h-full max-w-full flex flex-col justify-end">
          {data?.users && (
            <UsersDataTable data={data.users} createColumns={createColumns} />
          )}
          <DataTablePagination
            className="mt-auto pt-4"
            allCount={data?.count || 0}
          />
        </div>
      )}
    </TableContainer>
  );
};

export default PersolnalPage;
