import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
      <CardHeader className="flex flex-row items-start gap-4 bg-muted/40">
        <div className="flex gap-2 items-center font-medium">
          <Info className="w-5 h-5 " />
          {companyName}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm  pt-6 line-clamp-5">
          {comment && comment.trim() !== "" ? (
            comment
          ) : (
            <span className="text-muted-foreground">
              Enter brief company information to be displayed here.{comment}
            </span>
          )}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="gap-1 p-0 h-auto">
          <Link href={`/companies/${companyId}`}>More...</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommentCompany;
