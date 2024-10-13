"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { CompanySchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createCompany } from "@/actions/company/create-companyes";
import AddCompanyInfo from "@/components/page/company-create/add-company-info";

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
    },
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
            <AddCompanyInfo form={form} error={error} success={success} />
            <div className="items-center gap-2 flex border-b pb-6 ">
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
      </Form>
    </>
  );
};

export default CreateForm;
