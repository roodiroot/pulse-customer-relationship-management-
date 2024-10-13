"use client";

import { useSession } from "next-auth/react";

import { useCurrentUser } from "@/hooks/use-current-user";
import CheckboxWrapper from "@/components/page/settings/checkbox-wrapper";
import { ai_comment_summarization } from "@/actions/settings/ai-assistant/ai-assistant";

const Summarization = () => {
  const user = useCurrentUser();
  const { update } = useSession();

  const onSubmit = async () => {
    await ai_comment_summarization();
    update();
  };

  return (
    <CheckboxWrapper
      checked={user?.settings.aiAssistent || false}
      onCheckedChange={onSubmit}
      title="AI Comment Summarization"
      description="Enable to allow automatic summarization of all comments using AI. Disable to turn off this feature."
    />
  );
};
export default Summarization;
