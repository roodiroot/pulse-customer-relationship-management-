import { createNote } from "@/actions/notes/create-note";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useCreateNote } from "@/queries/notes";

import { CreateNoteSchema, UpdateContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateNoteFieldProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  contactId?: string | null;
}

const CreateNoteField: React.FC<CreateNoteFieldProps> = ({
  contactId,
  className,
}) => {
  const user = useCurrentUser();
  const { mutate: createNote } = useCreateNote();

  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleSubmit = (formData: z.infer<typeof CreateNoteSchema>) => {
    createNote({ value: formData, contactId: contactId || "" });
    form.reset();
  };
  return (
    <>
      <div className={cn("flex gap-4 items-start", className)}>
        <Avatar className="w-8 h-8">
          <AvatarFallback>{user?.name?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex gap-1"
            >
              <FormField
                control={form.control}
                name="text"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Add your note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Separator className="mt-6" />
    </>
  );
};

export default CreateNoteField;
