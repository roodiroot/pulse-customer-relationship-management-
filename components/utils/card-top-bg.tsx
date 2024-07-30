import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { LucideIcon, LucideInfo } from "lucide-react";

interface CardTopBgProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
  Icon: LucideIcon;
}
export const CardTopBg: React.FC<CardTopBgProps> = ({
  title,
  Icon,
  children,
  className,
}) => {
  return (
    <Card className={cn("rounded-md", className)}>
      <CardHeader className="bg-muted/40">
        <div className="flex gap-2 items-center font-medium">
          <Icon className="w-5 h-5 " />
          {title}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardTopBg;
