import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Deal } from "@prisma/client";
import { DollarSign } from "lucide-react";
import Link from "next/link";

interface DealListProps extends React.HTMLAttributes<HTMLDivElement> {
  dealList?: Deal[];
  companyId?: string;
}

const DealList: React.FC<DealListProps> = ({ dealList, companyId }) => {
  if (!dealList || dealList.length === 0 || !companyId) {
    return <div>С этой компанией еще нет сделок.</div>;
  }
  return (
    <div className="flex flex-col gap-3">
      <h2>Сделки с компанией</h2>
      {dealList.map((deal) => (
        <Card key={deal.id} className="relative bg-muted/50 hover:bg-muted/20">
          <Link
            href={`/companies/${companyId}/deal/${deal.id}`}
            className="absolute inset-0"
          />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Сделка</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deal.name}</div>
            <p className="text-xs text-muted-foreground">
              Дата создания сделки
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DealList;
