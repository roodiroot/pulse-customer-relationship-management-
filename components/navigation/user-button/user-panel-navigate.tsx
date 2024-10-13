import Link from "next/link";
import UserButton from "./user-button";
import { currentUser } from "@/lib/auth";

const UserPanelNavigate = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center gap-4">
      <Link className="font-mono text-sm" href="/profile">
        {user?.name || "Гость"}
      </Link>
      <UserButton />
    </div>
  );
};

export default UserPanelNavigate;
