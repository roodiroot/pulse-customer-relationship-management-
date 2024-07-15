"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUniquiContactById } from "@/actions/contact/get-ubiqui-contact-by-id";

import { Contact } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  BookOpenText,
  Building2,
  LucideInfo,
  Mail,
  Phone,
  Trash2,
} from "lucide-react";
import ChangeFieldContact from "../page/contact/change-field-contact";
import DeleteContactButton from "../page/contact/delete-contact-button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ShowContactSheetProps {}

const ShowContactSheet: React.FC<ShowContactSheetProps> = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [dataContact, setDataContact] = useState<Contact>();

  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();
  const contactParam = param.get("showContactId");

  useEffect(() => {
    if (contactParam) {
      getUniquiContactById(contactParam)
        .then((data) => {
          if (data) {
            setDataContact(data);
            setTitle(data?.name || "");
            setDescription(data?.comment || "");
          }
        })
        .finally(() => {
          setOpen(true);
        });
    }
  }, [contactParam]);

  const handleClose = async () => {
    const params = new URLSearchParams(param.toString());
    params.delete("showContactId");
    router.push(`${pathname}?${params}`);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={() => handleClose()}>
      <SheetContent style={{ minWidth: "700px" }} className="flex flex-col">
        <SheetHeader>
          <div className="flex gap-4 items-start">
            <Avatar>
              <AvatarFallback>
                {dataContact?.name?.split(" ")[0][0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="mt-4 space-y-4 w-full h-[calc(100% - 48px)] flex-1 flex-col">
          <Card className="rounded-md ">
            <CardHeader className="bg-muted/40">
              <div className="flex gap-2 items-center font-medium">
                <LucideInfo className="w-5 h-5 " />
                Contact info
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-3">
                <ChangeFieldContact
                  title="Name company"
                  contactId={contactParam || ""}
                  field="name"
                  value={dataContact?.name || ""}
                  callback={setTitle}
                >
                  <Building2 className="w-4 h-4" />
                </ChangeFieldContact>
                <ChangeFieldContact
                  title="Email"
                  contactId={contactParam || ""}
                  field="mail"
                  value={dataContact?.mail || ""}
                >
                  <Mail className="w-4 h-4" />
                </ChangeFieldContact>
                <ChangeFieldContact
                  title="Phone"
                  contactId={contactParam || ""}
                  field="phone"
                  value={dataContact?.phone || ""}
                >
                  <Phone className="w-4 h-4" />
                </ChangeFieldContact>
                <ChangeFieldContact
                  title="Comment"
                  contactId={contactParam || ""}
                  field="comment"
                  value={dataContact?.comment || ""}
                  callback={setDescription}
                >
                  <BookOpenText className="w-4 h-4" />
                </ChangeFieldContact>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex-1 flex items-end">
                <div className="w-full flex justify-between items-end text-xs font-light mt-auto text-muted-foreground">
                  Created on:{" "}
                  {new Date("2024-07-07T12:34:56Z").toLocaleDateString(
                    "en-En",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
                <DeleteContactButton
                  contactId={dataContact?.id || ""}
                  close={handleClose}
                >
                  <Button asChild variant="link" className="text-destructive ">
                    <div className="flex gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Contact
                    </div>
                  </Button>
                </DeleteContactButton>
              </div>
            </CardFooter>
          </Card>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShowContactSheet;
