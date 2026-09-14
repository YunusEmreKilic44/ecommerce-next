import AdminLayoutComp from "@/components/layouts/AdminLayout";
import { requireAdmin } from "@/server-actions/auth/require-admin";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await requireAdmin();

  return <AdminLayoutComp>{children}</AdminLayoutComp>;
};

export default AdminLayout;
