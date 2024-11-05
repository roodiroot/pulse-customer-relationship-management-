"use client";

import { useState } from "react";

import SwitchWrapper from "../swich-wrapper";
import { toggleTelegrmsender } from "@/actions/auth/settings";

const SwitchTGSender = ({ value }: { value: boolean }) => {
  const [onSend, setOnSend] = useState(value);

  const toggleSetOnSender = () => {
    toggleTelegrmsender(!onSend).then((data) => {
      if (data.success) setOnSend(!onSend);
    });
  };
  return (
    <SwitchWrapper
      checked={onSend}
      onCheckedChange={toggleSetOnSender}
      title="Telegram Notification Toggle"
      description="Enable or disable the sending of event reminders to Telegram. Switch this option on to receive timely notifications and never miss an important update. Toggle off to pause notifications at your convenience."
    />
  );
};
export default SwitchTGSender;
