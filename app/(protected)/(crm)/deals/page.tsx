import Link from "next/link";
import { ActionType, Company, Deal } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { changeDate } from "@/lib/change-date";
import { CaseRes } from "@/queries/cases";
import { actionType } from "@/lib/changing-types-action";
import { showCases } from "@/actions/case/show-cases";
import Filters from "@/components/page/case/filters";
import StatusBadge from "@/components/page/case/status-badge";
import { StageBadge } from "@/components/page/company-page/stage-badge";
import DataTablePagination from "@/components/page/case/data-table-pagination";
import { ROW_TABLE } from "@/constance/row-table";
import { showDeals } from "@/actions/deal/show-deals";

interface DealsList extends Deal {
  company: Company;
}

const DealsPage = async ({
  searchParams,
}: {
  searchParams: {
    date: string;
    createdAt: string;
    take: string;
    page: string;
  };
}) => {
  const res = await showDeals();

  return (
    <div className="flex flex-col gap-6 h-full">
      <Card>
        <CardHeader className="px-4">
          <CardTitle>Сделки</CardTitle>
          <Filters />
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
