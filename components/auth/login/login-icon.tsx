"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";

const LogInIcon = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };
  return (
    <User onClick={onClick} className="cursor-pointer w-6 h-6 text-white" />
  );
};

export default LogInIcon;
