"use client";

import SheetChangeUserRole from "@/components/modals/sheet-change-user-role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UserRole } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type CreateColumnsType<TData> = (
  handleAction: (user: { id: string; name: string }) => void
) => ColumnDef<TData>[];

interface UsersDataTableProps<TValue, TData> {
  createColumns: CreateColumnsType<TData>;
  data: TData[] | [];
  role?: UserRole;
  users?: { users: User[]; count: number } | null;
}

export function UsersDataTable<TValue, TData>({
  createColumns,
  data,
  users,
  role,
}: UsersDataTableProps<TValue, TData>) {
  const [openSheetUserRole, setOpenSheetUserRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: "", name: "" });

  const handleAction = (user: { id: string; name: string }) => {
    setSelectedUser(user);
    setOpenSheetUserRole(true);
  };

  const tableColumns = createColumns(handleAction);
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (table.getRowModel().rows.length === 0) return null;
  return (
    <>
      <div className="relative flex-1 overflow-auto flex flex-col">
        <div className="relative flex-1 overflow-auto">
          <div className="absolute inset-0 w-full ">
            <Table className="h-full">
              <TableHeader className="bg-muted/40">
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
      </div>
      <div className="px-2 flex items-center justify-start border-t border-dashed text-sm text-muted-foreground flex-row gap-2 h-11">
        <div>
          {table.getFilteredSelectedRowModel().rows.length} из{" "}
          {table.getFilteredRowModel().rows.length} выбрано
        </div>
      </div>
      <SheetChangeUserRole
        onOpenChange={setOpenSheetUserRole}
        open={openSheetUserRole}
        user={selectedUser}
      />
    </>
  );
}
