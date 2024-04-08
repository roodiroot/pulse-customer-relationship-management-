import { updateComletedContact } from "@/actions/contact/update-completed-contact";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";

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
      updateComletedContact(false, contactId);
    });
  };

  return (
    <div {...props}>
      <Switch disabled={isPending} checked={checked} onCheckedChange={submit} />
    </div>
  );
};

export default ChangeCompletedContact;
