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
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="md:col-span-2 ">
            <div className="grid auto-rows-max items-start gap-4  md:sticky md:top-0">
              <div className="flex items-center gap-4 ">
                <BackButton />
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Создание компании
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button
                    disabled={isPending}
                    onClick={form.handleSubmit(onSubmit)}
                    variant="outline"
                    size="sm"
                  >
                    Сохранить
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={form.handleSubmit(onSubmitAndGo)}
                    size="sm"
                  >
                    Сохранить и перейти
                  </Button>
                </div>
              </div>
              <AddMainInfoCompany
                form={form}
                error={error}
                success={success}
                className=""
              />
            </div>
          </div>
          <CreateContact
            control={control}
            fields={fields}
            remove={remove}
            append={append}
            className="grid auto-rows-max items-start gap-4 lg:gap-8"
          />
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            variant="outline"
            size="sm"
          >
            Сохранить
          </Button>
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(onSubmitAndGo)}
            size="sm"
          >
            Сохранить и перейти
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateForm;
