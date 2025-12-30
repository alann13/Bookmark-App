import Link from 'next/link'
import { getTags } from '@/lib/data'
import { SidebarNav } from './sidebar-nav'
import { TagFilter } from './tag-filter'

export async function Sidebar() {
  const tags = await getTags()

  return (
    <aside className="w-[296px] h-full flex flex-col border-r border-neutral-200 bg-white">
      {/* Logo Section */}
      <div className="p-8 pb-4">
        <Link href="/bookmark-manager" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
            {/* Simple logo placeholder relying on Lucide or shape */}
            <div className="w-4 h-5 border-2 border-white rounded-[1px]" />
          </div>
          <span className="text-xl font-bold text-neutral-900 tracking-tight">Bookmark Manager</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <SidebarNav />

      {/* Tags Section */}
      <div className="mt-4 px-4">
        <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Tags</h3>
        <TagFilter tags={tags} />
      </div>
    </aside>
  )
}
