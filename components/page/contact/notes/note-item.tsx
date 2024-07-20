import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRelativeDateString } from "@/lib/get-relative-date-string";

interface NoteItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  userName: string;
  date: Date;
  text: string;
}
const NoteItem: React.FC<NoteItemProps> = ({ userName, date, text }) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="w-8 h-8">
        <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="space-y-2 w-full ">
        <div className="flex items-center justify-between text-xs">
          <div className="text-muted-foreground">{userName}</div>
          <div className="text-muted-foreground">
            {getRelativeDateString(date)}
          </div>
        </div>
        <div className="w-full p-4 rounded-md bg-muted/30 text-sm ">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
