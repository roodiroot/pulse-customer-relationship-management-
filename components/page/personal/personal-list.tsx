import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";

interface PersonalListProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  usersList: User[] | null;
}

const PersonalList: React.FC<PersonalListProps> = ({ usersList, ...props }) => {
  return (
    <Table {...props}>
      <TableCaption>Список менеджеров.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Имя</TableHead>
          <TableHead className="w-[101px]">Email</TableHead>
          <TableHead className="w-[95px]">Права</TableHead>
          <TableHead>Комментарий</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersList?.map((company) => (
          <TableRow
            className="cursor-pointer transition-colors"
            key={company.id}
          >
            <TableCell className="font-medium">
              <div className="line-clamp-1">{company.name}</div>
            </TableCell>
            <TableCell className="font-medium">{company.email}</TableCell>
            <TableCell>{company.role}</TableCell>
            <TableCell>
              <div className="s line-clamp-1">...</div>
            </TableCell>
            <TableCell className="text-right">...</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PersonalList;
