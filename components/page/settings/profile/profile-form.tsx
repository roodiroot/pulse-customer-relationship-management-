import GeneralProfile from "./general-profil";
import TelegramNotification from "./telegram-notification";
import ThemeSwitchForSettings from "./theme-swich-for-settings";

const ProfileForm = () => {
  return (
    <div className="space-y-6">
      <GeneralProfile />
      <ThemeSwitchForSettings />
      <TelegramNotification />
    </div>
  );
};

export default ProfileForm;
