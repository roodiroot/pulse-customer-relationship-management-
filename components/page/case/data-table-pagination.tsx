"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ROW_TABLE } from "@/constance/row-table";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  allCount: number;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  allCount,
  className,
  ...props
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [take, setTake] = useState<string | null>(ROW_TABLE.toString() || null);
  const [page, setPage] = useState<string | null>("1" || null);

  const searchtake = searchParams.get("take");
  const searchpage = searchParams.get("page");

  const start = useCallback(
    (key: string, value: string, deletePage?: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      if (deletePage) {
        params.delete("page");
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  const del = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  const addingTake = (e: string) => {
    setTake(e);
    setPage("1");
    if (!e) return del("take");
    start("take", e, true);
    return;
  };

  const addingPage = (e: string) => {
    setPage(e);
    if (!e) return del("page");
    return start("page", e);
  };

  useEffect(() => {
    setTake(Number(searchtake) ? searchtake : ROW_TABLE.toString());
    setPage(Number(searchpage) ? searchpage : "1");
  }, [searchtake, searchpage, router, pathname]);

  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="flex-1 text-sm whitespace-nowrap text-muted-foreground">
        Нашлось: {allCount}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="hidden sm:flex items-center space-x-2">
          <p className="text-sm font-medium">Показывать по:</p>
          <Select value={take?.toString()} onValueChange={addingTake}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="11" />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-1 w-[100px] items-center justify-center text-sm font-medium">
          {page}
          <span className="text-muted-foreground">
            / {Math.ceil(allCount / Number(take))}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => addingPage(String(1))}
            disabled={Number(page) <= 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => addingPage(String(Number(page) - 1))}
            disabled={Number(page) <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => addingPage(String(Number(page) + 1))}
            disabled={Number(page) >= Math.ceil(allCount / Number(take))}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              addingPage(String(Math.ceil(allCount / Number(take))))
            }
            disabled={Number(page) >= Math.ceil(allCount / Number(take))}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
