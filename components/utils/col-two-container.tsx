import { cn } from "@/lib/utils";

interface ColTwoContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const ColTwoContainer: React.FC<ColTwoContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "auto-rows-max items-start lg:col-span-2 order-2 lg:order-1 h-full overflow-y-auto py-6 px-4 space-y-4 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ColTwoContainer;
