import CompletedCase from "@/components/page/blocks/case-item/completed-case";
import CaseItemChanging from "@/components/page/blocks/case-item/case-item-changing";

import { Case } from "@prisma/client";

interface CaseItemProps extends React.HTMLAttributes<HTMLDivElement> {
  caseItem: Case;
}
export const CaseItem: React.FC<CaseItemProps> = ({ caseItem }) => {
  if (caseItem.finished) {
    return (
      <CompletedCase
        comment={caseItem.comment}
        date={caseItem.date}
        type={caseItem.type}
        responsible={caseItem.responsible}
      />
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
