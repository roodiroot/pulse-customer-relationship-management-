interface TextCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string | null;
}

const TextCloud: React.FC<TextCloudProps> = ({ text }) => {
  return (
    <div
      className="*:list-revert text-sm text-muted-foreground font-light"
      dangerouslySetInnerHTML={{
        __html: text as TrustedHTML,
      }}
    />
  );
};

export default TextCloud;
