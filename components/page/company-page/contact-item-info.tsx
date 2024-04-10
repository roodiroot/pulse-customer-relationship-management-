import InputPhoneMask from "@/components/mask/input-phone-mask";
import { Input } from "@/components/ui/input";
import { CheckCheck, Copy, CopyCheck, CopyCheckIcon } from "lucide-react";
import { useState } from "react";

interface ContactItemInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  phone: string;
  mail: string;
  comment: string;
}

const ContactItemInfo: React.FC<ContactItemInfoProps> = ({
  name,
  phone,
  mail,
  comment,
  ...props
}) => {
  const [copy, setCopy] = useState(false);
  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopy(true);
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };
  return (
    <div {...props} className="space-y-3">
      <input
        defaultValue={name}
        disabled
        className="w-full  px-4 py-2 focus-visible:outline-none rounded-md disabled:bg-inherit  h-10"
      />
      <div className="w-full h-10 flex gap-4 items-center">
        <input
          defaultValue={phone}
          disabled
          className="max-w-[150px] h-full bg-inherit  px-4 py-2 focus-visible:outline-none rounded-md disabled:bg-inherit  "
        />
        {copy ? (
          <CheckCheck
            className="w-4 h-4 text-green-400 cursor-pointer"
            onClick={() => copyTextToClipboard(phone)}
          />
        ) : (
          <Copy
            className="w-4 h-4 text-muted-foreground cursor-pointer"
            onClick={() => copyTextToClipboard(phone)}
          />
        )}
      </div>
      <input
        defaultValue={mail}
        disabled
        className="w-full  px-4 py-2 focus-visible:outline-none rounded-md disabled:bg-inherit  h-10"
      />
      <input
        defaultValue={comment}
        disabled
        className="w-full  px-4 py-2 focus-visible:outline-none rounded-md disabled:bg-inherit  h-10"
      />
    </div>
  );
};

export default ContactItemInfo;
