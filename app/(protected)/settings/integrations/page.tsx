import IntegrationsForm from "@/components/page/settings/integrations/integrations-form";
import WrapperSettings from "@/components/page/settings/wrapper-settings";

const SettingsIntegrationsPage = () => {
  return (
    <WrapperSettings title="Integrations">
      <div className="w-full max-w-sm">
        <IntegrationsForm />
      </div>
    </WrapperSettings>
  );
};
export default SettingsIntegrationsPage;
