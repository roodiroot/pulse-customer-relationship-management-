import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import DropContact from "./contact-drop";

interface ContactItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  phone: string;
  name: string | null;
  mail: string | null;
  comment: string | null;
  contactId: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  phone,
  name = "",
  mail = "",
  comment = "",
  contactId,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {comment ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <User className="cursor-pointer h-4 w-4 text-muted-foreground" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="text-sm font-medium text-muted-foreground">
                {comment}
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <User className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div>{phone}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {mail ? mail : "Email отсутствует"}
          </p>
          <DropContact contactId={contactId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactItem;
