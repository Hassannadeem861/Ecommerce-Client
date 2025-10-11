// components/DashboardLayout.jsx
import { AppSidebar } from "./app-sidebar.jsx";
import { SiteHeader } from "./site-header.jsx";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
