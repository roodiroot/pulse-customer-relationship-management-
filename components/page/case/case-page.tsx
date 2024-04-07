"use client";

import Link from "next/link";
import { useState } from "react";
import { ActionType } from "@prisma/client";
import { useRouter } from "next/navigation";

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
import StatusBadge from "./status-badge";
import CaseFilters from "./case-filters";
import { changeDate } from "@/lib/change-date";
import { Button } from "@/components/ui/button";
import { CaseRes, useFetchCases } from "@/queries/cases";
import { actionType } from "@/lib/changing-types-action";

interface CaseListProps extends React.HTMLAttributes<HTMLDivElement> {}

const CasePage: React.FC<CaseListProps> = () => {
  const router = useRouter();
  const [type, setType] = useState<ActionType | undefined>();
  const [finished, setFinished] = useState<boolean | undefined>();
  const [date, setDate] = useState<Date>();

  const {
    data: casesList,
    isLoading,
    error,
  } = useFetchCases({ type, finished, start: date, end: undefined });

  if (casesList === null) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Вы ленив</h3>
          <p className="text-sm text-muted-foreground">
            Но вы всегда можете создать новое дело.
          </p>
          <Button asChild className="mt-4">
            <Link href={"/affairs/create"}>Создать дело</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="px-4">
          <CardTitle>Мои дела</CardTitle>
          <CardDescription>
            Отфильтруйте дела что посмотреть что у вас сегодня.
          </CardDescription>
          <CaseFilters
            setType={setType}
            type={type}
            setFinished={setFinished}
            finished={finished}
            setDate={setDate}
            date={date}
          />
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:w-[200px] sm:table-cell">
                  Название
                </TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Тип события
                </TableHead>
                <TableHead className="hidden w-[150px] sm:table-cell">
                  Статус события
                </TableHead>
                <TableHead className="hidden md:table-cell w-[100px]">
                  Дата
                </TableHead>
                <TableHead className=" sm:text-right">Комментарий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!error &&
                casesList?.map((caseItem: CaseRes) => (
                  <TableRow
                    key={caseItem.id}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/companies/${caseItem.company.id}/affairs`)
                    }
                  >
                    <TableCell className="hidden sm:table-cell">
                      <div className="font-medium">{caseItem.company.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {caseItem.company.TIN}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {actionType(caseItem.type)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <StatusBadge
                        status={caseItem.finished}
                        date={caseItem.date}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {changeDate(caseItem.date).date}
                    </TableCell>
                    <TableCell className="sm:text-right">
                      {caseItem.comment}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasePage;
