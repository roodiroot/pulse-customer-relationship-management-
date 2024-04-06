"use client";

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
import { Company } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CompanyListProps extends React.TableHTMLAttributes<HTMLTableElement> {
  companyesList: Company[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companyesList }) => {
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
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companyesList.map((company) => (
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
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompanyList;
