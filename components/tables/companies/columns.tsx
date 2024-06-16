"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ResCompany } from "@/data/company/data-company";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DropdownActions from "../dropdown-actions";

export const columns: ColumnDef<ResCompany>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="relative w-[20px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="absolute top-1/2 left-0 -translate-y-1/2"
        />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="relative">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="absolute top-1/2 left-0 -translate-y-1/2"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Название",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link
        href={`/companies/${row.original.id}`}
        className="line-clamp-1 w-[200px]"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    header: "ИНН",
    accessorKey: "TIN",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[110px]">{row.getValue("TIN")}</div>
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
    header: "Комментарий",
    accessorKey: "comment",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-full">{row.getValue("comment")}</div>
    ),
  },
  {
    header: "Адрес",
    accessorKey: "address",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[300px]">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "user.name",
    header: "Ответственный",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[100px]">{row.original?.user?.name}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const company = row.original;

      const actionsList = [
        {
          name: "Копировать ИНН",
          onClick: () => {
            navigator.clipboard.writeText(company.TIN || "");
          },
        },
      ];

      return <DropdownActions actionsList={actionsList} />;
    },
  },
];
