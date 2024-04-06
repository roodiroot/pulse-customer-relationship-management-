"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      size="icon"
      className={cn("h-7 w-7", className)}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Назад</span>
    </Button>
  );
};

export default BackButton;
