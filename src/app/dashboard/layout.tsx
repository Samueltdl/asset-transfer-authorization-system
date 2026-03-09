import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 w-full overflow-x-hidden">
        <header className="flex h-14 items-center px-3 shrink-0">
          <SidebarTrigger />
        </header>

        {children}
      </main>
    </SidebarProvider>
  );
}
