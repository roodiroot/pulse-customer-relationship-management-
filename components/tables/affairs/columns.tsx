"use client";

import React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { StageDeal } from "@prisma/client";
import { ResCase } from "@/data/cases/data-case";
import { Checkbox } from "@/components/ui/checkbox";
import { actionType } from "@/lib/changing-types-action";
import StatusBadge from "@/components/page/case/status-badge";
import DropdownActions from "@/components/tables/dropdown-actions";
import { StageBadge } from "@/components/page/company-page/stage-badge";

function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

export const columns: ColumnDef<ResCase>[] = [
  {
    header: "Название",
    accessorKey: "type",
    cell: ({ row }) => (
      <Link
        href={`/companies/${row.original.deals?.companyId}/deal/${row.original.dealId}`}
        className="line-clamp-1 w-[150px]"
      >
        {actionType(row.getValue("type"))}{" "}
        <i className="text-sm opacity-55">
          {new Date(row.original.date || "").toLocaleDateString()}
        </i>
      </Link>
    ),
  },
  {
    header: "Компания",
    accessorKey: "deals.company.name",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">
        {row.original?.deals?.company?.name}
      </div>
    ),
  },
  {
    header: "Сделка",
    accessorKey: "deals.name",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[150px]">{row.original?.deals?.name}</div>
    ),
  },
  {
    header: "Этап",
    accessorKey: "deals.stage",
    cell: ({ row }) => (
      <div className="line-clamp-1  w-[130px]">
        <StageBadge stage={row.original?.deals?.stage as StageDeal} />
      </div>
    ),
  },
  {
    header: "Статус",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-full space-x-2 min-w-[500px]">
        <StatusBadge
          status={row.original?.finished}
          date={row.original?.date}
        />
        <span className="text-sm opacity-55 italic">
          {stripHtmlTags(row.original?.comment || "")}
        </span>
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
