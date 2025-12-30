'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { BookmarkWithTags } from '@/db/types'
import { AddBookmarkDialog } from './add-bookmark-dialog'
import { BookmarkList } from './bookmark-list'
import { EmptyState } from './empty-state'
import { Header } from './header'

interface BookmarkManagerClientProps {
  initialBookmarks: BookmarkWithTags[]
}

export function BookmarkManagerClient({ initialBookmarks }: BookmarkManagerClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBookmarks = initialBookmarks.filter((bookmark) => {
    if (!searchQuery) return true
    return bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Show empty state if there are absolutely no bookmarks (not just no search results)
  if (initialBookmarks.length === 0) {
    return (
      <>
        <Header onSearch={setSearchQuery} />
        <div className="flex-1 overflow-y-auto bg-neutral-50/50">
          <EmptyState message="You have not bookmarked anything yet.">
            <AddBookmarkDialog
              trigger={
                <button type="button" className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer">
                  <Plus className="w-5 h-5" />
                  <span>Add bookmark</span>
                </button>
              }
            />
          </EmptyState>
        </div>
      </>
    )
  }

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <div className="flex-1 overflow-y-auto">
        <BookmarkList bookmarks={filteredBookmarks} header="Your bookmarks" />
      </div>
    </>
  )
}
