import PersonalList from "@/components/page/personal/personal-list";
import FormError from "@/components/ui/form-error";
import { getAllUsers } from "@/data/personal/get-users";
import { currentRole } from "@/lib/auth";

const PersolnalPage = async () => {
  const role = await currentRole();
  const users = await getAllUsers();
  if (role === "ADMIN") return <PersonalList usersList={users} />;
  return <FormError message="Не достаточно прав на просмотр данного ресурса" />;
};

export default PersolnalPage;
