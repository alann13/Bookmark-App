import { Sidebar } from '@/components/sidebar'
import { SidebarProvider } from '@/components/sidebar-context'
import { SidebarWrapper } from '@/components/sidebar-wrapper'

export default function BookmarkManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-neutral-100 overflow-hidden">
        {/* Sidebar - Responsive */}
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-100">{children}</main>
      </div>
    </SidebarProvider>
  )
}
