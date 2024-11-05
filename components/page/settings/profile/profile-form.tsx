import { Settings } from "@prisma/client";
import GeneralProfile from "./general-profil";
import TelegramNotification from "./telegram-notification";
import ThemeSwitchForSettings from "./theme-swich-for-settings";

interface ProfileFormProps {
  settings?: Settings[];
}
const ProfileForm: React.FC<ProfileFormProps> = ({ settings }) => {
  return (
    <div className="space-y-6">
      <GeneralProfile />
      <ThemeSwitchForSettings />
      <TelegramNotification settings={settings} />
    </div>
  );
};

export default ProfileForm;
