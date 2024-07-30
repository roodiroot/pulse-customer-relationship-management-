import { cn } from "@/lib/utils";

interface WindowOneContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const WindowOneContainer: React.FC<WindowOneContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 p-2 sm:p-4 lg:p-6 overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default WindowOneContainer;
