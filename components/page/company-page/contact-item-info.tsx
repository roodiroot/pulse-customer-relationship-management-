import InputPhoneMask from "@/components/mask/input-phone-mask";
import { Input } from "@/components/ui/input";

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
  return (
    <div className="space-y-3">
      <input
        defaultValue={name}
        disabled
        className="w-full  px-4 py-2 focus-visible:outline-none rounded-md disabled:bg-inherit  h-10"
      />
      <input
        defaultValue={phone}
        disabled
        className="w-full  px-4 py-2 focus-visible:outline-none rounded-md disabled:bg-inherit  h-10"
      />
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
