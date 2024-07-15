"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { LucideExpand, Mail, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateComletedContact } from "@/actions/contact/update-completed-contact";

import { Contact } from "@prisma/client";

export const createColumnsWidget = (pathname: string): ColumnDef<Contact>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link
        href={`/companies/${row.original?.companyId}/deal/${row?.original?.id}`}
        className="line-clamp-1 min-w-[300px]"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div
        onClick={() => navigator.clipboard.writeText(row?.original?.mail || "")}
        className=""
      >
        {row.original.mail}
      </div>
    ),
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({ row }) => (
      <div
        onClick={() =>
          navigator.clipboard.writeText(row?.original?.phone || "")
        }
        className=""
      >
        {row.original.phone}
      </div>
    ),
  },
  {
    header: "Confirmed",
    accessorKey: "confirmed",
    cell: ({ row }) => (
      <div className="w-[40px]">
        <Switch
          checked={row.original?.confirmed}
          onCheckedChange={async (value) => {
            await updateComletedContact(value, row.original?.id);
          }}
        />
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="flex flex-row gap-1 justify-end">
          <Button asChild size="icon" variant="outline" className="w-6 h-6">
            <a href={`mailto:${contact?.mail}`}>
              <Mail className="w-3 h-3" />
            </a>
          </Button>
          <Button asChild size="icon" variant="outline" className="w-6 h-6">
            <a href={`tel:${contact?.phone}`}>
              <PhoneCall className="w-3 h-3" />
            </a>
          </Button>
          <Button asChild size="icon" variant="outline" className="w-6 h-6">
            <Link href={`${pathname}?showContactId=${contact.id}`}>
              <LucideExpand className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
