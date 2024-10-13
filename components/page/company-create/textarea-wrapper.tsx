import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CheckboxWrapperProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  description: string;
  require?: boolean;
}

const TextAreaWrapper: React.FC<CheckboxWrapperProps> = ({
  title,
  description,
  require,
  ...props
}) => {
  return (
    <div className="flex items-start space-x-2">
      <div className="">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title} {require && <span className="text-destructive">*</span>}
        </label>
        <Textarea className="w-[440px] mt-1.5" {...props} />
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default TextAreaWrapper;
