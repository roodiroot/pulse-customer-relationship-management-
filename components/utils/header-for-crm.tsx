import { cn } from "@/lib/utils";

interface HeaderForCRMProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string | null;
}

const HeaderForCRM: React.FC<HeaderForCRMProps> = ({
  text = "__name__",
  className,
}) => (
  <h1
    className={cn(
      "flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 leading-8",
      className
    )}
  >
    {text}
  </h1>
);

export default HeaderForCRM;
