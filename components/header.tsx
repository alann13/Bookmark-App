'use client'

import { UserButton } from '@clerk/nextjs'
import { Menu, Search } from 'lucide-react'
import { AddBookmarkDialog } from './add-bookmark-dialog'

interface HeaderProps {
  onSearch?: (query: string) => void
}

import { useSidebar } from './sidebar-context'

export function Header({ onSearch }: HeaderProps) {
  const { toggle } = useSidebar()
  return (
    <header className="h-[78px] flex items-center justify-between border-b border-neutral-300 bg-white px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="lg:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors" aria-label="Toggle sidebar" type="button">
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="w-[240px] md:w-[320px]">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all shadow-xs"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-4">
        <AddBookmarkDialog />

        <div className="h-8 w-[1px] bg-neutral-300 mx-2" />

        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10',
            },
          }}
        />
      </div>
    </header>
  )
}
