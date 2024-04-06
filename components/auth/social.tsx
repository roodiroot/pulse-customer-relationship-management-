"use client";

import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "../ui/button";
import { User } from "lucide-react";

const Social = () => {
  // const onClick = (provider: "github" | "yandex" | "vk") => {
  //   signIn(provider, {
  //     callbackUrl: DEFAULT_LOGIN_REDIRECT,
  //   });
  // };
  return (
    <div className="w-full flex gap-x-2 items-center">
      {/* <Button onClick={() => onClick("yandex")} className="w-full">
        <User className="h-5 w-5 text-red-500" />
      </Button>
      <Button onClick={() => onClick("vk")} className="w-full">
        <User className="h-5 w-5" />
      </Button> */}
    </div>
  );
};

export default Social;
