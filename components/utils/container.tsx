import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 grid items-start gap-y-4 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
