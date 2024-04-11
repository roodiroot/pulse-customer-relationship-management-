"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { dropContact } from "@/actions/contact/drop-contact";
import { cn } from "@/lib/utils";
import { date } from "zod";
import { X } from "lucide-react";

const DropContact = ({ contactId }: { contactId: string }) => {
  const [isPanding, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      dropContact(contactId).then((data) => {
        console.log(data);
      });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <X
          className={cn(
            "w-4 h-4 text-xs text-red-400 cursor-pointer hover:underline",
            isPanding && "opacity-50"
          )}
        >
          удалить
        </X>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить контакт?
          </AlertDialogTitle>
          <AlertDialogDescription>
            После удаления данные контактане возможно будет восстанавить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DropContact;
