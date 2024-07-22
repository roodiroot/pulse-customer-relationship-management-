import { cn } from "@/lib/utils";

interface ColOneContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const ColOneContainer: React.FC<ColOneContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "order-1 lg:order-2 h-full overflow-y-auto px-2 py-4 sm:py-6 sm:px-4 space-y-4 border-b",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ColOneContainer;
