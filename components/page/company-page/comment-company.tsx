import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CommentCompanyProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  comment?: string | null;
}

const CommentCompany: React.FC<CommentCompanyProps> = ({ comment }) => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Коментарий о компании</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {comment}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CommentCompany;
