import type { BookmarkWithTags } from '@/db/types'
import { BookmarkCard } from './bookmark-card'
import { BookmarkSort } from './bookmark-sort'

interface BookmarkListProps {
  bookmarks: BookmarkWithTags[]
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <div className="p-8 pt-6">
      {/* List Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">All bookmarks</h2>

        <BookmarkSort />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  )
}
