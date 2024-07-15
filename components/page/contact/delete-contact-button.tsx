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

const DeleteContactButton = ({
  contactId,
  children,
  close,
}: {
  contactId: string;
  children: React.ReactNode;
  close?: () => void;
}) => {
  const [isPanding, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      dropContact(contactId).then((data) => {
        if (data?.success && close) {
          close();
        }
      });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the contact?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once deleted, the contact data cannot be restored.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContactButton;
