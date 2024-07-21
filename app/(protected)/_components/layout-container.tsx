import Header from "@/components/navigation/header";
import Navigation from "@/components/navigation/navigation";

interface LayoutContainerProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}
const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] xl:grid-cols-[240px_1fr]">
      <Navigation />
      <div className="flex flex-col ">
        <Header />
        <main className="relative flex-1">{children}</main>
      </div>
    </div>
  );
};

export default LayoutContainer;
