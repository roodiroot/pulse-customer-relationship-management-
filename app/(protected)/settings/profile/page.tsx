import ProfileForm from "@/components/page/settings/profile/profile-form";
import WrapperSettings from "@/components/page/settings/wrapper-settings";

const SettingsGeneralPage = () => {
  return (
    <WrapperSettings title="Profile">
      <div className="w-full max-w-sm">
        <ProfileForm />
      </div>
    </WrapperSettings>
  );
};
export default SettingsGeneralPage;
