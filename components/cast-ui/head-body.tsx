interface HeadBodyProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}
const HeadBody: React.FC<HeadBodyProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-4 mb-2 sm:mb-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{children}</h1>
      </div>
    </div>
  );
};

export default HeadBody;
