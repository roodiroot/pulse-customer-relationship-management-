import { ContactRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Contact } from "@prisma/client";
import AddContactButton from "@/components/ui/add-contact-button";
import { createColumnsWidget } from "@/components/tables/contacts/columns-widget";
import { ContactWidgetDataTable } from "@/components/tables/contacts/contact-widget-data-table";

interface ContactsListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  contacts?: Contact[];
  companyId?: string;
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, companyId }) => {
  return (
    <Card className="rounded-md">
      <CardHeader className="bg-muted/40 flex-row justify-between">
        <div className="flex gap-2 items-center font-medium">
          <ContactRound className="w-5 h-5 " />
          Contacts
        </div>
        <div className="text-xs font-light text-muted-foreground mt-4">
          Total:{" "}
          <span className="text-foreground">{contacts?.length || 0}</span>
        </div>
      </CardHeader>
      <CardContent className="min-h-[200px]">
        {contacts && (
          <ContactWidgetDataTable
            data={contacts}
            columns={createColumnsWidget}
          />
        )}
      </CardContent>
      <CardFooter className="border-t">
        <AddContactButton companyId={companyId} className="mt-4" />
      </CardFooter>
    </Card>
  );
};

export default ContactsList;
