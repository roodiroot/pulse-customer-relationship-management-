import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface CheckboxWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: () => void;
}

const SwitchWrapper: React.FC<CheckboxWrapperProps> = ({
  title,
  description,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-start space-x-2">
      <Switch
        id="terms"
        className="mt-1"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <div className="">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title}
        </label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SwitchWrapper;
