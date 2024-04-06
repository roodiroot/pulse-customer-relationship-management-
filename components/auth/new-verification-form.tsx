"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import CardWrapper from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/auth/new-verification";
import FormSuccess from "../ui/form-success";
import FormError from "../ui/form-error";

const NewVerificationForm_1 = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }
    if (!token) {
      setError("Токен2 не найден");
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch((error) => {
        setError(error);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Новая верификация"
      backButtonLabek="Вернуться на страницу логина"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

const NewVerificationForm = () => {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <NewVerificationForm_1 />
    </Suspense>
  );
};

export default NewVerificationForm;
