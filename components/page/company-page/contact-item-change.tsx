import InputPhoneMask from "@/components/mask/input-phone-mask";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ContactItemChangeProps {
  form: any;
}

const ContactItemChange: React.FC<ContactItemChangeProps> = ({ form }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <input
                {...field}
                className="w-full  px-4 py-2  bg-muted/70 focus-visible:outline-none rounded-md h-10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <InputPhoneMask
                value={field.value}
                setValue={field.onChange}
                className="border-none text-base px-4 py-2  bg-muted/70 h-10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="mail"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <input
                {...field}
                className="w-full  px-4 py-2  bg-muted/70 focus-visible:outline-none rounded-md  h-10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <input
                {...field}
                className="w-full  px-4 py-2  bg-muted/70 focus-visible:outline-none rounded-md  h-10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactItemChange;
