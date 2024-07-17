import { actionType } from "@/lib/changing-types-action";
import { getRelativeDateString } from "@/lib/get-relative-date-string";
import { ActionType } from "@prisma/client";
import StatusCase from "./status-case";
import { PhoneCall } from "lucide-react";

interface CaseItemHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  type: ActionType | "ai";
  responsible: string;
  date: Date;
  status?: boolean;
}

const CaseItemHeader: React.FC<CaseItemHeaderProps> = ({
  type,
  responsible,
  date,
  status = false,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex gap-1 items-center">
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          <span className="text-foreground">{type}</span>{" "}
          <span>
            assigned to <span className="text-foreground">{responsible}</span>
          </span>
        </div>
        {status && <StatusCase date={date} />}
      </div>
      <div className="text-xs">{getRelativeDateString(date || new Date())}</div>
    </div>
  );
};

export default CaseItemHeader;
