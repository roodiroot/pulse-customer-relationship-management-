"use client";

import { cn } from "@/lib/utils";
import CaseItem from "../blocks/case-item/case-item";
import { Case } from "@prisma/client";

interface ComanyCaseListProps extends React.HTMLAttributes<HTMLDivElement> {
  companyCase?: Case[];
}

const CompanyCaseList: React.FC<ComanyCaseListProps> = ({
  companyCase,
  className,
}) => {
  if (!companyCase || companyCase.length === 0) {
    return (
      <div className={className}>You have no business with this company.</div>
    );
  }
  return (
    <div className={cn("flex flex-col-reverse gap-y-6", className)}>
      {companyCase?.map((c: Case) => (
        <CaseItem caseItem={c} key={c.id} />
      ))}
    </div>
  );
};

export default CompanyCaseList;
