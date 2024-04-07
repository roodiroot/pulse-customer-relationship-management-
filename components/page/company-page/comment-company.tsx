import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CommentCompanyProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  companyId: string;
  comment?: string | null;
}

const CommentCompany: React.FC<CommentCompanyProps> = ({
  companyId,
  comment,
}) => {
  return (
    <Card x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="grid gap-2">
          <CardTitle>Комментарий.</CardTitle>
          <CardDescription>
            Для подробной информации о компаии нажмите еще.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href={`/companies/${companyId}`}>
            Ещё
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>{comment}</CardContent>
    </Card>
  );
};

export default CommentCompany;
