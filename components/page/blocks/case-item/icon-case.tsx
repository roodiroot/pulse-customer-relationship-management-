import { ActionType } from "@prisma/client";
import {
  ClipboardList,
  FileQuestion,
  Mail,
  PhoneCall,
  Presentation,
} from "lucide-react";

const IconCase = ({ type }: { type: ActionType | "ai" }) => {
  switch (type) {
    case ActionType.Call:
      return <PhoneCall className="w-4 h-4" />;
    case "ai":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.898.855a.4.4 0 0 0-.795 0c-.123 1.064-.44 1.802-.943 2.305-.503.503-1.241.82-2.306.943a.4.4 0 0 0 .001.794c1.047.119 1.801.436 2.317.942.512.504.836 1.241.93 2.296a.4.4 0 0 0 .796 0c.09-1.038.413-1.792.93-2.308.515-.516 1.269-.839 2.306-.928a.4.4 0 0 0 .001-.797c-1.055-.094-1.792-.418-2.296-.93-.506-.516-.823-1.27-.941-2.317Z"
          ></path>
          <path
            fill="currentColor"
            d="M12.001 1.5a1 1 0 0 1 .993.887c.313 2.77 1.153 4.775 2.5 6.146 1.34 1.366 3.3 2.223 6.095 2.47a1 1 0 0 1-.003 1.993c-2.747.238-4.75 1.094-6.123 2.467-1.373 1.374-2.229 3.376-2.467 6.123a1 1 0 0 1-1.992.003c-.248-2.795-1.105-4.754-2.47-6.095-1.372-1.347-3.376-2.187-6.147-2.5a1 1 0 0 1-.002-1.987c2.818-.325 4.779-1.165 6.118-2.504 1.339-1.34 2.179-3.3 2.504-6.118A1 1 0 0 1 12 1.5ZM6.725 11.998c1.234.503 2.309 1.184 3.21 2.069.877.861 1.56 1.888 2.063 3.076.5-1.187 1.18-2.223 2.051-3.094.871-.87 1.907-1.55 3.094-2.05-1.188-.503-2.215-1.187-3.076-2.064-.885-.901-1.566-1.976-2.069-3.21-.505 1.235-1.19 2.3-2.081 3.192-.891.89-1.957 1.576-3.192 2.082Z"
          ></path>
        </svg>
      );
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
