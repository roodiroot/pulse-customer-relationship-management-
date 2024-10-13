import GeneralProfile from "./general-profil";
import ThemeSwitchForSettings from "./theme-swich-for-settings";

const ProfileForm = () => {
  return (
    <div className="space-y-6">
      <GeneralProfile />
      <ThemeSwitchForSettings />
    </div>
  );
};

export default ProfileForm;
