import Link from "next/link";
import { ActionType } from "@prisma/client";

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

const AffairsPage = async ({
  searchParams,
}: {
  searchParams: {
    date: string;
    finished: string;
    type: ActionType;
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
  s();
  //определение типа по строке
  const f = () => {
    if (searchParams.finished === "1") {
      return true;
    }
    if (searchParams.finished === "2") {
      return false;
    }
    return undefined;
  };
  const res = await showCases({
    type: searchParams.type,
    finished: f(),
    start: searchParams.date,
    // end,
    take: isNaN(Number(searchParams.take))
      ? ROW_TABLE
      : Number(searchParams.take),
    skip: s(),
  });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="px-4">
          <CardTitle>Мои дела</CardTitle>
          <CardDescription>
            Отфильтруйте дела что посмотреть что у вас сегодня.
          </CardDescription>
          <Filters />
        </CardHeader>
      </Card>
      <Card className="h-full">
        <CardContent className="py-4 space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:w-[200px] sm:table-cell">
                  Название
                </TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Сделка
                </TableHead>
                <TableHead className="hidden w-[130px] sm:table-cell">
                  Статус события
                </TableHead>
                <TableHead className="hidden w-[120px] sm:table-cell">
                  Этап сделки
                </TableHead>
                <TableHead className="hidden md:table-cell w-[100px]">
                  Дата
                </TableHead>
                <TableHead className=" sm:text-right">Комментарий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {res?.cases?.map((caseItem: CaseRes) => (
                <TableRow key={caseItem.id} className="relative">
                  <TableCell className="hidden sm:table-cell">
                    <div className="font-medium">
                      <Link
                        href={`/companies/${caseItem.deals.companyId}/deal/${caseItem.dealId}`}
                        className="absolute inset-0"
                      />
                      {actionType(caseItem.type)}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {caseItem.deals.company.name}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {caseItem.deals.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusBadge
                      status={caseItem.finished}
                      date={caseItem.date}
                    />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StageBadge stage={caseItem.deals.stage} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {changeDate(caseItem.date).date}
                  </TableCell>
                  <TableCell className="sm:text-right">
                    <div className=" line-clamp-2 text-muted-foreground">
                      {caseItem.comment}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DataTablePagination allCount={res?.count || 0} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AffairsPage;
