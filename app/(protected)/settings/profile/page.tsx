import { showSettingsForUser } from "@/actions/settings/show-settings-for-user";
import ProfileForm from "@/components/page/settings/profile/profile-form";
import WrapperSettings from "@/components/page/settings/wrapper-settings";
import { currentUser } from "@/lib/auth";

const SettingsGeneralPage = async () => {
  const user = await currentUser();
  const settings = await showSettingsForUser(user && user.id);

  return (
    <WrapperSettings title="Profile">
      <ProfileForm settings={settings} />
    </WrapperSettings>
  );
};
export default SettingsGeneralPage;
