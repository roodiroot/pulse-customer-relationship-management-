import { getRelativeDateString } from "@/lib/get-relative-date-string";

interface AiItemHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  date: Date;
}

const AiItemHeader: React.FC<AiItemHeaderProps> = ({ date }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex gap-1 items-center">
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          AI-Generated Summary
        </p>
      </div>
      <div className="text-xs">{getRelativeDateString(date)}</div>
    </div>
  );
};

export default AiItemHeader;
