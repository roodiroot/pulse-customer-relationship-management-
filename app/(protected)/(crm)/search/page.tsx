import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { search } from "@/actions/company/search-company";
import Link from "next/link";
import BackButton from "@/components/back-button";
import Icon from "@/components/icons";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [text: string]: string | undefined };
}) => {
  const searchResult = await search({ text: searchParams?.text?.trim() ?? "" });

  return (
    <>
      <div className="flex items-center gap-4 lg:col-span-3">
        <BackButton />
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Результаты поиска
        </h1>
      </div>
      <Card className="h-full">
        <CardContent className="py-4 w-full h-full">
          {searchResult?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col gap-4 items-center">
                <Icon.cat className="w-20 fill-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  К сожалению поиск не дал резкльтатов...
                </span>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] table-cell">
                    Название
                  </TableHead>
                  <TableHead className="hidden sm:table-cell sm:text-right">
                    Комментарий
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResult?.map((company) => (
                  <TableRow className="relative" key={company.id}>
                    <TableCell className="table-cell">
                      <Link
                        href={`/companies/${company.id}`}
                        className="absolute inset-0"
                      ></Link>
                      <div className="font-medium">{company.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {company.TIN}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell sm:text-right">
                      <div className=" line-clamp-2">{company.comment}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SearchPage;
