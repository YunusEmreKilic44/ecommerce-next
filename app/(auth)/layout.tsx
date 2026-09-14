import { getCurrentUser } from "@/server-actions/auth/getCurrentUser";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/account");
  }

  return <>{children}</>;
};

export default AuthLayout;
