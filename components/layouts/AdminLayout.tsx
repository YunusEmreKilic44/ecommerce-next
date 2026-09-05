import { ReactNode } from "react";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayoutComp = ({ children }: { children: ReactNode }) => {
  return <div className="flex min-h-screen bg-background">
    <AdminSidebar />

    <main className="flex-1 overflow-auto bg-surface">
        <div className="mx-auto max-w-7xl p-4 mt-15 lg:mt-0 sm:p-6 lg:p-8">
            {children}
        </div>
    </main>
  </div>;
};

export default AdminLayoutComp;
