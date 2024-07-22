import { cn } from "@/lib/utils";

interface ContainerFiltersProps extends React.HTMLAttributes<HTMLDivElement> {}
const ContainerFilters: React.FC<ContainerFiltersProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("flex gap-1 py-1 flex-wrap", className)} {...props} />
  );
};

export default ContainerFilters;
