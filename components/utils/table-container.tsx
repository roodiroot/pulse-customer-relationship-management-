import { cn } from "@/lib/utils";

interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const TableContainer: React.FC<TableContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between h-full p-2 sm:p-4 lg:p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TableContainer;
