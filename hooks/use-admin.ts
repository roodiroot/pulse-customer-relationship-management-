import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';

export const useAdmin = () => {
  const session = useSession();
  return session.data?.user.role === UserRole.ADMIN;
};
