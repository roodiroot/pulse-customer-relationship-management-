import { updateComletedContact } from "@/actions/contact/update-completed-contact";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

interface ChangeCompletedContactProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  confirmed: boolean;
  contactId: string;
}

const ChangeCompletedContact: React.FC<ChangeCompletedContactProps> = ({
  confirmed,
  contactId,
  ...props
}) => {
  const [checked, setChecked] = useState(confirmed);
  const [isPending, setTransition] = useTransition();

  const submit = () => {
    setChecked(!checked);
    setTransition(() => {
      updateComletedContact(!checked, contactId);
    });
  };

  return (
    <CheckCheck
      onClick={submit}
      className={cn(
        "w-4 h-4 text-xs text-muted-foreground cursor-pointer hover:underline ",
        !confirmed && "text-primary"
      )}
    />
  );
};

export default ChangeCompletedContact;
