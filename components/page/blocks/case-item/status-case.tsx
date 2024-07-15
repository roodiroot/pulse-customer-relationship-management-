import { Badge } from "@/components/ui/badge";

interface StatusCaseProps {
  date: Date;
}
const StatusCase: React.FC<StatusCaseProps> = ({ date }) => {
  return (
    <div className="text-xs text-muted-foreground w-full flex justify-between">
      {date && date < new Date() ? (
        <Badge variant="destructive">Event overdue</Badge>
      ) : (
        <Badge variant="outline">Pending completion</Badge>
      )}
    </div>
  );
};

export default StatusCase;
