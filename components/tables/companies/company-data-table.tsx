"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ResCompany } from "@/data/company/data-company";
import DropdownActions from "../dropdown-actions";
import SheetPersonResponsible from "@/components/modals/sheet-person-responsible";
import { User, UserRole } from "@prisma/client";

import DefaultZeroData from "./default-zero-data";

interface CompanyDataTableProps<TValue> {
  columns: ColumnDef<ResCompany, TValue>[];
  data?: ResCompany[];
  role?: UserRole;
  users: { users: User[]; count: number } | null;
}

export function CompanyDataTable<TValue>({
  columns,
  data,
  users,
  role,
}: CompanyDataTableProps<TValue>) {
  const [showModalResponsible, setShowModalResponsible] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      rowSelection,
    },
  });

  const selectedIds = Object.keys(rowSelection).map(
    (rowId) => table.getRowModel()?.rows[Number(rowId)]?.original?.id
  );

  const actionsList = [
    {
      name: "Назначить ответственного",
      onClick: () => {
        setShowModalResponsible(true);
      },
    },
    {
      name: "Тест",
      onClick: () => {
        console.log("hello world");
      },
    },
  ];

  if (table.getRowModel().rows.length === 0) return <DefaultZeroData />;

  return (
    <>
      <div className="relative flex-1 overflow-auto flex flex-col">
        <div className="relative flex-1 overflow-auto">
          <div className="absolute inset-0 w-full ">
            <Table className="h-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="px-2 flex items-center justify-start border-t border-dashed text-sm text-muted-foreground flex-row gap-2 h-11">
          <div>
            {table.getFilteredSelectedRowModel().rows.length} из{" "}
            {table.getFilteredRowModel().rows.length} выбрано
          </div>
          <div className="">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <DropdownActions role={role} actionsList={actionsList} />
            )}
          </div>
        </div>
      </div>
      <SheetPersonResponsible
        setShowModalResponsible={setShowModalResponsible}
        showModalResponsible={showModalResponsible}
        users={users?.users}
        elementsId={selectedIds}
        setRowSelection={setRowSelection}
        role={role}
      />
    </>
  );
}
