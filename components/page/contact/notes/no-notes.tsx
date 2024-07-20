import { cn } from "@/lib/utils";

const NoNotes = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "h-[100px] w-full rounded-md bg-muted/30 flex items-center justify-center",
      className
    )}
  >
    <p className="text-sm text-muted-foreground">
      Add a comment to the contact
    </p>
  </div>
);

export default NoNotes;
