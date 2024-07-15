"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";

type CreateColumnsType<TData> = () => ColumnDef<TData>[];

interface DealWidgetDataTableProps<TValue, TData> {
  columns: CreateColumnsType<TData>;
  data: TData[];
}
export function DealWidgetDataTable<TValue, TData>({
  columns,
  data,
}: DealWidgetDataTableProps<TValue, TData>) {
  const createColumns = columns();
  const table = useReactTable({
    data,
    columns: createColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (table?.getRowModel().rows.length === 0) return null;
  return (
    <div className="relative flex-1 overflow-auto flex flex-col min-h-[166px]">
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
    </div>
  );
}
