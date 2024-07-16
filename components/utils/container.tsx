import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid items-start gap-4 p-1 sm:px-2 sm:py-0 md:gap-x-8 md:gap-y-4 lg:grid-cols-3 xl:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
