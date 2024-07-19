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
        <main className="flex max-h-[calc(100vh-60px)] overflow-y-auto flex-1 flex-col gap-4 p-2 sm:p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutContainer;
