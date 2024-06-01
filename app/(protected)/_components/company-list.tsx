"use client";

import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { changeDate } from "@/lib/change-date";
import { ResCompany } from "@/data/companies/get-companies";

interface CompanyListProps extends React.TableHTMLAttributes<HTMLTableElement> {
  data: ResCompany[];
}

const CompanyList: React.FC<CompanyListProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>Список компаний.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Название</TableHead>
          <TableHead className="w-[101px]">ИНН</TableHead>
          <TableHead className="w-[95px]">Дата создания</TableHead>
          <TableHead>Комментарий</TableHead>
          <TableHead className="text-right">Ответственный</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((company) => (
          <TableRow
            className="cursor-pointer transition-colors"
            onClick={() => router.push(`/companies/${company.id}`)}
            key={company.id}
          >
            <TableCell className="font-medium">
              <div className="line-clamp-1">{company.name}</div>
            </TableCell>
            <TableCell className="font-medium">{company.TIN}</TableCell>
            <TableCell>{changeDate(company.createdAt).date}</TableCell>
            <TableCell>
              <div className="s line-clamp-1">{company.comment}</div>
            </TableCell>
            <TableCell className="text-right">{company?.user?.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompanyList;
