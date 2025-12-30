import { Sidebar } from '@/components/sidebar'

export default function BookmarkManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-100">{children}</main>
    </div>
  )
}
