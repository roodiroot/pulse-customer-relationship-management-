import IconCase from "@/components/page/blocks/case-item/icon-case";
import TextCloud from "@/components/page/blocks/case-item/text-cloud";

import { ActionType } from "@prisma/client";
import AiItemHeader from "./ai-item-header";
import { LoaderCircle } from "lucide-react";

interface CompletedCaseProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: string | null;
  date: Date | null;
  pending?: boolean;
}
const AiGeneratedCase: React.FC<CompletedCaseProps> = ({
  date,
  comment,
  pending,
}) => {
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="">
          <IconCase type="ai" />
        </div>
        <AiItemHeader date={date || new Date()} />
      </div>
      <div>
        <div className="relative w-full border border-green-300/40 rounded-md py-4 px-6 bg-muted/40">
          <TextCloud text={comment} />
          {pending && (
            <div className="absolute inset-0 bg-black/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <LoaderCircle className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiGeneratedCase;
