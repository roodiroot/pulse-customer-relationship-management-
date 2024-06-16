"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { ResDeals } from "@/data/deal/data-deal";
import DropdownActions from "@/components/tables/dropdown-actions";
import { StageBadge } from "@/components/page/company-page/stage-badge";

export const columns: ColumnDef<ResDeals>[] = [
  {
    header: "Название",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link
        href={`/companies/${row.original.id}`}
        className="line-clamp-1 w-[130px]"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    header: "Компания",
    accessorKey: "company.name",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">
        {row.original?.company?.name}
      </div>
    ),
  },
  {
    header: "Дата создания",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    header: "Этап",
    accessorKey: "stage",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-full">
        <StageBadge stage={row.getValue("stage")} />
      </div>
    ),
  },
  {
    accessorKey: "user.name",
    header: "Ответственный",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[100px]">
        {row.original?.company?.user?.name || "Не указан"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deal = row.original;

      const actionsList = [
        {
          name: "Копировать id сделки",
          onClick: () => {
            navigator.clipboard.writeText(deal.id || "");
          },
        },
      ];

      return <DropdownActions actionsList={actionsList} />;
    },
  },
];
