"use client";

import { LucideInfo } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChangeField from "@/components/page/company-create/change-field/change-field";

import { Company, Contact, Deal } from "@prisma/client";
import ChangeFieldDeal from "./change-field-deal";
import { Separator } from "@/components/ui/separator";
import { StageBadge } from "../company-page/stage-badge";

interface UpdateFormDealProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  deal: Deal;
}

const UpdateFormDeal: React.FC<UpdateFormDealProps> = ({ deal }) => {
  if (deal === null) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="rounded-md">
      <CardHeader className="bg-muted/40">
        <div className="flex gap-2 items-center font-medium">
          <LucideInfo className="w-5 h-5 " />
          Deal info
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <ChangeFieldDeal
            title="Deal Name"
            dealId={deal.id}
            field="name"
            value={deal.name}
          />
          <ChangeFieldDeal
            title="Contract Price"
            dealId={deal.id}
            field="contractPrice"
            value={String(deal?.contractPrice)}
          />
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1 w-full">
              <div className="text-xs font-light text-muted-foreground">
                Deal Creation Date
              </div>
              <div className="w-full flex justify-between items-center text-sm">
                <p className="text-muted-foreground">
                  {new Date(deal.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1 w-full">
              <div className="text-xs font-light text-muted-foreground">
                Deal Stage
              </div>
              <div className="w-full flex justify-between items-center text-sm">
                <StageBadge stage={deal.stage} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateFormDeal;
