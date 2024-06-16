"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import DropdownActions from "@/components/tables/dropdown-actions";

import { User } from "@prisma/client";
import { blokedUserById } from "@/actions/personal/bloked-user";

export const createColumns = (
  handleAction: (user: { id: string; name: string }) => void
): ColumnDef<User>[] => [
  {
    header: "Логин",
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
    header: "ID в системе",
    accessorKey: "id",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">{row.original.id}</div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">{row.original.email}</div>
    ),
  },
  {
    header: "Верификация",
    accessorKey: "emailVerified",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">
        {new Date(row.original?.emailVerified || 0).toLocaleDateString()}
      </div>
    ),
  },
  {
    header: "Роль",
    accessorKey: "role",
    cell: ({ row }) => <div className="w-[150px]">{row.original?.role}</div>,
  },
  {
    header: "Бан",
    accessorKey: "bloked",
    cell: ({ row }) => (
      <div className="w-[50px]">{`${row.original?.bloked}`}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deal = row.original;

      const actionsList = [
        {
          name: "Копировать id пользователя",
          onClick: () => {
            navigator.clipboard.writeText(deal.id || "");
          },
        },
        {
          name: "Изменить роль",
          onClick: () => {
            handleAction({ id: deal.id, name: deal.name || "" });
          },
        },
        {
          name: deal.bloked ? "Включить доступ" : "Отключить доступ",
          onClick: async () => {
            await blokedUserById(deal.id);
          },
        },
      ];

      return <DropdownActions actionsList={actionsList} />;
    },
  },
];
