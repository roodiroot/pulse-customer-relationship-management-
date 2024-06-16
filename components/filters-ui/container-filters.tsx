import { cn } from "@/lib/utils";

interface ContainerFiltersProps extends React.HTMLAttributes<HTMLDivElement> {}
const ContainerFilters: React.FC<ContainerFiltersProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "pt-3 grid  gap-x-4 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    />
  );
};

export default ContainerFilters;
