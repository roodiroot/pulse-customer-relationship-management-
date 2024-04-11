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
import { Pen, PenLine, PhoneCall, User } from "lucide-react";
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
import ChangeCompletedContact from "./change-completed-contact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      mail: mail || "",
      comment: comment || "",
      phone: phone || "",
    },
  });

  const submit = (value: z.infer<typeof UpdateContactSchema>) => {
    startTransition(() => {
      updateContact(value, contactId).then((data) => {
        if (!data.error) {
          setUpdate(false);
        }
      });
    });
  };

  return (
    <Card>
      <Form {...form}>
        <CardHeader className="flex flex-row items-center justify-between pl-2 pt-4 pb-1">
          <FormField
            control={form.control}
            name="name"
            disabled={!update}
            render={({ field }) => (
              <FormItem className="h-5">
                <FormControl>
                  <input
                    {...field}
                    className="h-5 px-4 text-sm font-semibold bg-muted rounded-sm focus-visible:outline-none disabled:bg-inherit"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <PhoneCall
            className={cn(
              "h-4 w-4",
              confirmed ? "text-green-500" : "text-muted-foreground"
            )}
          />
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-2 gap-x-4 text-muted-foreground">
            <FormField
              control={form.control}
              name="phone"
              disabled={!update}
              render={({ field }) => (
                <FormItem className=" grid-cols-1">
                  <FormControl>
                    <InputPhoneMask
                      disabled={!update}
                      value={field.value}
                      setValue={field.onChange}
                      className="text-sm px-4 py-0.5 border-none bg-muted/70 h-auto rounded-sm focus-visible:outline-none disabled:text-muted-foreground disabled:bg-inherit disabled:cursor-default disabled:opacity-100"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={!update}
              name="mail"
              render={({ field }) => (
                <FormItem className="grid-cols-1">
                  <FormControl>
                    <input
                      {...field}
                      className="w-full text-sm px-4 py-0.5 border-none bg-muted/70 rounded-sm focus-visible:outline-none disabled:bg-inherit"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={!update}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full col-span-2">
                  <FormControl>
                    <input
                      {...field}
                      className="w-full text-sm px-4 py-0.5 border-none bg-muted/70  h-auto  rounded-sm focus-visible:outline-none disabled:bg-inherit"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 pt-3 pb-4">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <PenLine
                className={cn(
                  "w-4 h-4 cursor-pointer text-xs",
                  update ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setUpdate(!update)}
              />
              {update && (
                <Badge
                  onClick={form.handleSubmit(submit)}
                  className="text-xs cursor-pointer"
                >
                  Подтвердить
                </Badge>
              )}
            </div>
            <div className="gap-4 flex">
              <ChangeCompletedContact
                confirmed={confirmed || false}
                contactId={contactId}
              />
              <DropContact contactId={contactId} />
            </div>
          </div>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default ContactItem;
