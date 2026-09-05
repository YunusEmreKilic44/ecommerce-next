import AdminLayoutComp from "@/components/layouts/AdminLayout";
import  { ReactNode } from "react";

const AdminLayout = ({children}: {children: ReactNode}) => {
  return <AdminLayoutComp>
    {children}
  </AdminLayoutComp>;
};

export default AdminLayout;
