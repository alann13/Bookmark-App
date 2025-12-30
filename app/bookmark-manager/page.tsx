import { BookmarkList } from '@/components/bookmark-list'
import { Header } from '@/components/header'
import { getBookmarks } from '@/lib/data'

export default async function BookmarkManagerPage() {
  const bookmarks = await getBookmarks()

  return (
    <>
      <Header />
      <div className="flex-1 overflow-y-auto">
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </>
  )
}
