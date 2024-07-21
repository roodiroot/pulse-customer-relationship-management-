import { cn } from "@/lib/utils";

interface ColOneContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const ColOneContainer: React.FC<ColOneContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "order-1 lg:order-2 h-full overflow-y-auto py-6 px-4 space-y-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ColOneContainer;
