import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1'>
        <SidebarTrigger />
        <div className='max-w-7xl mx-auto px-4'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
