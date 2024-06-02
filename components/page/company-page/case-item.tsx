import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { changeDate } from "@/lib/change-date";
import { actionType } from "@/lib/changing-types-action";
import { cn } from "@/lib/utils";
import { Case } from "@prisma/client";
import CaseItemChanging from "./case-item-changing";
import { Badge } from "@/components/ui/badge";

interface CaseItemProps extends React.HTMLAttributes<HTMLDivElement> {
  caseItem: Case;
}
export const CaseItem: React.FC<CaseItemProps> = ({ className, caseItem }) => {
  if (caseItem.finished) {
    return (
      <Card
        className={cn("bg-muted pt-3 overflow-hidden opacity-80", className)}
      >
        <CardContent className="text-sm pb-3">{caseItem.comment}</CardContent>
        <CardFooter className="bg-background pt-3 pb-2 border-t">
          <div className="text-xs text-muted-foreground w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div>
                <span>{changeDate(caseItem.date).date}</span>{" "}
                <span>{changeDate(caseItem.date).time}</span>{" "}
                <span>{changeDate(caseItem.date).dayWeek}</span>{" "}
              </div>
              <div className="">{caseItem.responsible}</div>
            </div>
            <Badge variant="secondary">{actionType(caseItem.type)}</Badge>
          </div>
        </CardFooter>
      </Card>
    );
  }
  return (
    <CaseItemChanging
      caseId={caseItem.id}
      comment={caseItem.comment}
      date={caseItem.date}
      type={caseItem.type}
      responsible={caseItem.responsible}
    />
  );
};

export default CaseItem;
