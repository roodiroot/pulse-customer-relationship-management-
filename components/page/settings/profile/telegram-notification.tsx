"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Settings } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { setTelegramApi, settings } from "@/actions/auth/settings";
import InputWrapper from "@/components/page/settings/input-wrapper";
import { CreateTelegramNotification, SettingsSchema } from "@/schemas";
import SwitchTGSender from "./swich-tg-sender";

interface TelegramNotificationProps {
  settings?: Settings[];
}

const TelegramNotification: React.FC<TelegramNotificationProps> = ({
  settings,
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTelegramNotification>>({
    resolver: zodResolver(CreateTelegramNotification),
    defaultValues: {
      telegramChatId:
        settings && settings[0]?.telegramChatId
          ? settings[0]?.telegramChatId
          : "",
    },
  });
  const submit = (value: z.infer<typeof CreateTelegramNotification>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setTelegramApi(value)
        .then((data) => {
          if (data.error) {
            setError(data?.error);
          }
          if (data.success) {
            update();
            setSuccess(data?.success);
          }
        })
        .catch(() => {
          setError("Something went wrong.");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-4 border-b pb-6 "
      >
        <div className="space-y-4">
          <SwitchTGSender
            value={settings ? settings[0].telegramSendMessage : false}
          />
          <FormField
            control={form.control}
            name="telegramChatId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWrapper
                    {...field}
                    disabled={isPending}
                    title="Telegram Chat ID"
                    description="Please enter the chat ID. You will receive the chat ID when you access the bot and press the /start command. Connect to the bot @chat_test_saransk_bot."
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
};
export default TelegramNotification;
