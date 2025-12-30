import { BookmarkList } from '@/components/bookmark-list'
import { Header } from '@/components/header'
import { getBookmarks } from '@/lib/data'

export default async function BookmarkManagerPage(props: { searchParams: Promise<{ sort?: string; tags?: string }> }) {
  const searchParams = await props.searchParams
  const sort = searchParams.sort || 'recent'
  const filterTags = searchParams.tags ? searchParams.tags.split(',') : []
  const bookmarks = await getBookmarks(sort, filterTags)

  return (
    <>
      <Header />
      <div className="flex-1 overflow-y-auto">
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </>
  )
}
