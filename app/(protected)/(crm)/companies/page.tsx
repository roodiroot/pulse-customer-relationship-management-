import Link from "next/link";

import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import HeadBody from "@/components/cast-ui/head-body";
import { showUsers } from "@/actions/personal/show-users";
import TableContainer from "@/components/utils/table-container";
import { columns } from "@/components/tables/companies/columns";
import { showCompanies } from "@/actions/company/show-companyes";
import FiltersCompany from "@/components/tables/companies/filters-company";
import DataTablePagination from "@/components/page/case/data-table-pagination";
import { CompanyDataTable } from "@/components/tables/companies/company-data-table";

const CompanyesPage = async ({
  searchParams,
}: {
  searchParams: {
    take: string;
    page: string;
    date: string;
    dateEnd: string;
    responsible: string;
  };
}) => {
  const user = await currentUser();
  const { success, error, companies, count } = await showCompanies({
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
  const users = await showUsers({ user });
  return (
    <TableContainer>
      <div className="flex items-center gap-4">
        <HeadBody>List of Companies</HeadBody>
        {success && (
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button asChild size="sm">
              <Link href="/companies/create">Create</Link>
            </Button>
          </div>
        )}
      </div>
      {success ? (
        <>
          <FiltersCompany
            permission={["ADMIN", "SALES_MANAGER"].includes(
              user?.role || "USER"
            )}
            users={users}
          />
          <div className="relative  h-full max-w-full flex flex-col justify-end">
            <CompanyDataTable
              data={companies}
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
    </TableContainer>
  );
};

export default CompanyesPage;
