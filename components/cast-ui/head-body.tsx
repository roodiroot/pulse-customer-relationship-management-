interface HeadBodyProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}
const HeadBody: React.FC<HeadBodyProps> = ({ children }) => {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{children}</h1>
    </div>
  );
};

export default HeadBody;
