import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changeDate } from "@/lib/change-date";
import { Deal } from "@prisma/client";
import { CircleDollarSign, DollarSign } from "lucide-react";
import Link from "next/link";
import { StageBadge } from "./stage-badge";
import AddDealButton from "@/components/ui/add-deal-button";
import FormError from "@/components/ui/form-error";
import { DealWidgetDataTable } from "@/components/tables/deals/deal-widget-data-table";
import { createColumnsWidget } from "@/components/tables/deals/columns-widget";

interface DealListProps extends React.HTMLAttributes<HTMLDivElement> {
  dealList?: Deal[];
  companyId?: string;
}

const DealList: React.FC<DealListProps> = ({ dealList, companyId }) => {
  if (!companyId) {
    return <FormError message="Company ID not found." />;
  }
  return (
    <Card className="rounded-md">
      <CardHeader className="bg-muted/40 flex-row justify-between">
        <div className="flex gap-2 items-center font-medium">
          <CircleDollarSign className="w-5 h-5 " />
          Deals
        </div>
        <div className="text-xs font-light text-muted-foreground mt-4">
          Total:{" "}
          <span className="text-foreground">
            {dealList
              ?.reduce((sum, current) => {
                // Проверяем, что current.contractPrice не равен null
                if (current.contractPrice !== null) {
                  return sum + current.contractPrice;
                }
                return sum;
              }, 0)
              .toLocaleString("en-En") + " $"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="min-h-[166px]">
        {dealList && (
          <DealWidgetDataTable columns={createColumnsWidget} data={dealList} />
        )}
      </CardContent>
      <CardFooter className="border-t">
        <AddDealButton companyId={companyId} className="mt-4" />
      </CardFooter>
    </Card>
  );
};

export default DealList;
