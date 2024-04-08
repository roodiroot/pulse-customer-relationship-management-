"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pen, PhoneCall, User } from "lucide-react";
import DropContact from "./contact-drop";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { UpdateContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { updateContact } from "@/actions/contact/update-contact";
import { cn } from "@/lib/utils";
import InputPhoneMask from "@/components/mask/input-phone-mask";
import { Input } from "@/components/ui/input";
import ContactItemChange from "./contact-item-change";
import ContactItemInfo from "./contact-item-info";
import ChangeCompletedContact from "./change-completed-contact";

interface ContactItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  phone: string;
  name: string | null;
  mail: string | null;
  comment: string | null;
  confirmed: boolean | null;
  contactId: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  phone,
  name = "",
  mail = "",
  comment = "",
  confirmed = false,
  contactId,
}) => {
  const [update, setUpdate] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateContactSchema>>({
    resolver: zodResolver(UpdateContactSchema),
    defaultValues: {
      name: name || "",
      mail: mail || "email",
      comment: comment || "комментарий",
      phone: phone || "-",
    },
  });

  const submit = (value: z.infer<typeof UpdateContactSchema>) => {
    startTransition(() => {
      updateContact(value, contactId);
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-muted-foreground text-sm">Контакт</span>
        <PhoneCall
          className={cn(
            "h-4 w-4",
            confirmed ? "text-green-500" : "text-muted-foreground"
          )}
        />
      </CardHeader>
      <CardContent className="p-2 space-y-4">
        <Form {...form}>
          {update ? (
            <ContactItemChange form={form} />
          ) : (
            <ContactItemInfo
              name={form.getValues().name || ""}
              mail={form.getValues().mail || ""}
              phone={form.getValues().phone || ""}
              comment={form.getValues().comment || ""}
            />
          )}
        </Form>
        <ChangeCompletedContact
          className="ml-4"
          confirmed={confirmed || false}
          contactId={contactId}
        />
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-row justify-between items-end">
          <span
            className={cn(
              "cursor-pointer text-xs",
              update ? "text-primary" : "text-muted-foreground"
            )}
            onClick={() => setUpdate(!update)}
          >
            изменить
          </span>
          <DropContact contactId={contactId} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContactItem;
