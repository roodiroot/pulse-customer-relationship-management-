import { Case } from "@prisma/client";
import CaseItem from "./case-item";

interface ComanyCaseListProps extends React.HTMLAttributes<HTMLDivElement> {
  companyCase?: Case[];
}

const CompanyCaseList: React.FC<ComanyCaseListProps> = ({ companyCase }) => {
  if (!companyCase || companyCase.length === 0) {
    return <div className="">У вас нет дел с этой компанией</div>;
  }
  return (
    <div className="flex flex-col-reverse gap-y-4">
      {companyCase?.map((c: Case) => (
        <CaseItem caseItem={c} key={c.id} />
      ))}
    </div>
  );
};

export default CompanyCaseList;
