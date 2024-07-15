"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  LucideExpand,
  Mail,
  PhoneCall,
  SquareArrowOutUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateComletedContact } from "@/actions/contact/update-completed-contact";

import { ResDeals } from "@/data/deal/data-deal";
import { StageBadge } from "@/components/page/company-page/stage-badge";
import { Deal } from "@prisma/client";

export const createColumnsWidget = (): ColumnDef<Deal>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link
        href={`/companies/${row.original.companyId}/deal/${row.original.id}`}
        className="line-clamp-1 min-w-[120px]"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    header: "Created",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div>
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    ),
  },
  {
    header: "Stage",
    accessorKey: "stage",
    cell: ({ row }) => (
      <div className="w-[40px]">
        <StageBadge stage={row.original.stage} />
      </div>
    ),
  },
  {
    header: () => (
      <span className="flex flex-row justify-end">Total amount</span>
    ),
    accessorKey: "contractPrice",
    cell: ({ row }) => (
      <div className="whitespace-nowrap flex flex-row justify-end">
        {row.original.contractPrice?.toLocaleString("en-US") ?? ""} $
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex flex-row gap-1 justify-end">
        <Button asChild size="icon" variant="outline" className="w-6 h-6">
          <Link
            href={`/companies/${row.original.companyId}/deal/${row.original.id}`}
          >
            <SquareArrowOutUpRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>
    ),
  },
];
