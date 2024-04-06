"use client";

import FormError from "@/components/ui/form-error";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps extends React.HTMLAttributes<HTMLDivElement> {
  allowedRole: UserRole;
}

const RoleGate: React.FC<RoleGateProps> = ({ allowedRole, children }) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message="Не достаточно прав на просмотр данного ресурса" />
    );
  }
  return <>{children}</>;
};

export default RoleGate;
