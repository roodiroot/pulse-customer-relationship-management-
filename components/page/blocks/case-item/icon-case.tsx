import { ActionType } from "@prisma/client";
import {
  ClipboardList,
  FileQuestion,
  Mail,
  PhoneCall,
  Presentation,
} from "lucide-react";

const IconCase = ({ type }: { type: ActionType }) => {
  switch (type) {
    case ActionType.Call:
      return <PhoneCall className="w-4 h-4" />;
    case ActionType.Meet:
      return <Presentation className="w-4 h-4" />;
    case ActionType.Brief:
      return <FileQuestion className="w-4 h-4" />;
    case ActionType.Email:
      return <Mail className="w-4 h-4" />;
    case ActionType.Task:
      return <ClipboardList className="w-4 h-4" />;
    default:
      return null;
  }
};

export default IconCase;
