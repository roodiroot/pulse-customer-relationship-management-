import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CommentCompanyProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  companyName?: string | null;
  companyId?: string | null;
  comment?: string | null;
}

const CommentCompany: React.FC<CommentCompanyProps> = ({
  companyName,
  companyId,
  comment,
}) => {
  return (
    <Card x-chunk="dashboard-01-chunk-4" className="rounded-md">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="grid gap-2">
          <CardTitle>{companyName}</CardTitle>
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
