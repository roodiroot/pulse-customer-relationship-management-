"use client";

import { LucideInfo } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChangeField from "@/components/page/company-create/change-field/change-field";

import { Company, Contact } from "@prisma/client";

interface CompanyList extends Company {
  contacts: Contact[];
}

interface UpdateFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  company: CompanyList | null;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ company }) => {
  if (company === null) {
    return <div>Loading...</div>;
  }

  const regExp = /^\d+$/;
  return (
    <Card className="rounded-md">
      <CardHeader className="bg-muted/40">
        <div className="flex gap-2 items-center font-medium">
          <LucideInfo className="w-5 h-5 " />
          Company info
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <ChangeField
            title="Name company"
            companyId={company.id}
            field="name"
            value={company.name}
          />
          <ChangeField
            title="TIN company"
            companyId={company.id}
            field="TIN"
            value={company.TIN || ""}
            pattern={regExp}
          />
          <ChangeField
            title="Date of creation"
            companyId={company.id}
            field="dateRegistr"
            value={company.dateRegistr || ""}
          />
          <ChangeField
            title="Address"
            companyId={company.id}
            field="address"
            value={company.address || ""}
          />
          <ChangeField
            title="Supervisor"
            companyId={company.id}
            field="owner"
            value={company.owner || ""}
          />
          <ChangeField
            title="UNSD"
            companyId={company.id}
            field="mainOKVED"
            value={company.mainOKVED || ""}
          />
          <ChangeField
            title="Сomment"
            companyId={company.id}
            field="comment"
            value={company.comment || ""}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateForm;
