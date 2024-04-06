//server components or client

import { ExtendedUser } from '@/next-auth';

interface UserInfoProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  label: string;
  user?: ExtendedUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ label, user }) => {
  return (
    <div className="mt-10">
      <p className="text-3xl font-semibold">{label}</p>
      <div className="mt-4 space-y-2">
        <div className="flex flex-row justify-between w-full items-center">
          <p className="font-medium">ID</p>
          <p className="font-mono bg-slate-100 py-1 px-4 rounded-md dark:bg-accent-300">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row justify-between w-full items-center">
          <p className="font-medium">Name</p>
          <p className="font-mono bg-slate-100 py-1 px-4 rounded-md dark:bg-accent-300">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between w-full items-center">
          <p className="font-medium">Email</p>
          <p className="font-mono bg-slate-100 py-1 px-4 rounded-md dark:bg-accent-300">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row justify-between w-full items-center">
          <p className="font-medium">Role</p>
          <p className="font-mono bg-slate-100 py-1 px-4 rounded-md dark:bg-accent-300">
            {user?.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
