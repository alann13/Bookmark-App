'use client'

import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import { AddBookmarkDialog } from './add-bookmark-dialog'

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="h-[78px] flex items-center justify-between border-b border-neutral-300 bg-white px-8">
      {/* Search Bar */}
      <div className="w-[320px]">
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
