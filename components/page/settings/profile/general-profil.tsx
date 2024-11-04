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
import { SettingsSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/auth/settings";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import InputWrapper from "@/components/page/settings/input-wrapper";

const GeneralProfile = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
    },
  });
  const submit = (value: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(value)
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWrapper
                    {...field}
                    disabled={isPending}
                    title="Enter Username"
                    description="Please enter your desired username. It must be at least 3 characters long."
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {user?.isOAuth === false && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWrapper
                        {...field}
                        disabled={isPending}
                        type="password"
                        title="Enter Current Password "
                        description="For security reasons, please provide your current password before setting a new one."
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWrapper
                        {...field}
                        disabled={isPending}
                        type="password"
                        title="Set a New Password"
                        description="Create a secure password. It should contain at least 8 characters, including letters, numbers, and special symbols."
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </>
          )}
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
export default GeneralProfile;
