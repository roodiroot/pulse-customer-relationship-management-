"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { CompanySchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { createCompany } from "@/actions/company/create-companyes";
import CreateContact from "@/components/page/company-create/crate-contacts";
import AddMainInfoCompany from "@/app/(protected)/(crm)/companies/create/_components/add-main";

const CreateForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CompanySchema>>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: "",
      TIN: "",
      dateRegistr: "",
      address: "",
      owner: "",
      mainOKVED: "",
      comment: "",
      contacts: [
        {
          name: "",
          phone: "",
          mail: "",
          comment: "",
        },
      ],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = (value: z.infer<typeof CompanySchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      createCompany(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  };
  const onSubmitAndGo = (value: z.infer<typeof CompanySchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      createCompany(value).then((data) => {
        if (data?.error) {
          return setError(data?.error);
        }
        router.push(`/companies/${data.company?.id}`);
        form.reset();
      });
    });
  };
  return (
    <>
      <Form {...form}>
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
          <div className="flex flex-col gap-4">
            <AddMainInfoCompany form={form} error={error} success={success} />
            <div className="hidden items-center gap-2 md:flex">
              <Button
                disabled={isPending}
                onClick={form.handleSubmit(onSubmitAndGo)}
              >
                Сохранить и перейти
              </Button>
              <Button
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                variant="outline"
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
        <CreateContact
          control={control}
          fields={fields}
          remove={remove}
          append={append}
          className="grid gap-4"
        />
        <div className="flex items-center gap-2 md:hidden">
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(onSubmitAndGo)}
          >
            Сохранить и перейти
          </Button>
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            variant="outline"
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateForm;
