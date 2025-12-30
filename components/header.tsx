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
    <header className="flex items-center justify-between border-b border-neutral-300 bg-white px-4 py-3 md:py-0 md:h-[78px] md:px-8 gap-2.5">
      <div className="flex items-center gap-2.5 flex-1 md:flex-none md:gap-4">
        <button onClick={toggle} className="lg:hidden p-2.5 text-neutral-500 border border-neutral-300 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors bg-white shrink-0 cursor-pointer" aria-label="Toggle sidebar" type="button">
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 md:w-[320px] md:flex-none">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all shadow-xs"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
        <AddBookmarkDialog />

        <div className="hidden md:block h-8 w-px bg-neutral-300 mx-2" />
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
