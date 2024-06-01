import Link from "next/link";
import { Company, Deal, User } from "@prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { changeDate } from "@/lib/change-date";
import { StageBadge } from "@/components/page/company-page/stage-badge";
import DataTablePagination from "@/components/page/case/data-table-pagination";
import { ROW_TABLE } from "@/constance/row-table";
import { showDeals } from "@/actions/deal/show-deals";
import { currentUser } from "@/lib/auth";
import { showUsers } from "@/actions/personal/show-users";
import FilterDeals from "@/components/page/deals/filter-deals";

interface CompanyName extends Company {
  user: User | null;
}

interface DealsList extends Deal {
  company: CompanyName;
}

const DealsPage = async ({
  searchParams,
}: {
  searchParams: {
    responsible: string;
    date: string;
    finished: string;
    take: string;
    page: string;
  };
}) => {
  // сколько скипнуть
  const s = () => {
    const page = Number(searchParams.page);
    const take = isNaN(Number(searchParams.take))
      ? ROW_TABLE
      : Number(searchParams.take);
    if (isNaN(page)) {
      return 0;
    }
    return page * take - take;
  };

  const user = await currentUser();
  const res = await showDeals({
    userId:
      user?.role !== "ADMIN"
        ? user?.id
        : searchParams.responsible === "null"
        ? null
        : searchParams.responsible,
    start: searchParams.date,
    // end,
    take: isNaN(Number(searchParams.take))
      ? ROW_TABLE
      : Number(searchParams.take),
    skip: s(),
  });
  const users = await showUsers();

  return (
    <div className="flex flex-col gap-6 h-full">
      <Card>
        <CardHeader className="px-4">
          <CardTitle>Сделки</CardTitle>
          <FilterDeals users={users} permission={user?.role === "ADMIN"} />
        </CardHeader>
      </Card>
      <Card className="flex-1">
        <CardContent className="py-4 flex flex-col h-full gap-4 justify-between">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] table-cell">Название</TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Дата создания
                </TableHead>
                <TableHead className="w-[130px] table-cell">Этап</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Комментарий
                </TableHead>
                <TableHead className="w-[100px] sm:table-cell">
                  Ответственный
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {res?.deals?.map((dealItem: DealsList) => (
                <TableRow key={dealItem.id} className="relative">
                  <TableCell>
                    <div className="font-medium">
                      <Link
                        href={`/companies/${dealItem.companyId}/deal/${dealItem.id}`}
                        className="absolute inset-0"
                      />
                      {dealItem.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {dealItem.company.name}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {changeDate(dealItem.createdAt).date}
                  </TableCell>
                  <TableCell>
                    <StageBadge stage={dealItem.stage} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {/* <div className=" line-clamp-2 text-muted-foreground">
                      {caseItem.comment}
                    </div> */}
                  </TableCell>
                  <TableCell className="sm:table-cell">
                    {dealItem.company?.user?.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DataTablePagination className="mt-auto" allCount={res?.count || 0} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsPage;
