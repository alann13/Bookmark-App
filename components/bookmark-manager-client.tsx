'use client'

import { useState } from 'react'
import type { BookmarkWithTags } from '@/db/types'
import { BookmarkList } from './bookmark-list'
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

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <div className="flex-1 overflow-y-auto">
        <BookmarkList bookmarks={filteredBookmarks} header="Your bookmarks" />
      </div>
    </>
  )
}
