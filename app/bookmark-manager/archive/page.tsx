import { BookmarkList } from '@/components/bookmark-list'
import { EmptyState } from '@/components/empty-state'
import { Header } from '@/components/header'
import { getBookmarks } from '@/lib/data'

export default async function ArchivePage(props: { searchParams: Promise<{ sort?: string; tags?: string }> }) {
  const searchParams = await props.searchParams
  const sort = searchParams.sort || 'recent'
  const filterTags = searchParams.tags ? searchParams.tags.split(',') : []
  const bookmarks = await getBookmarks(sort, filterTags, true)

  if (bookmarks.length === 0) {
    return (
      <>
        <Header />
        <div className="flex-1 overflow-y-auto bg-neutral-50/50">
          <EmptyState message="There are no archived bookmarks" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex-1 overflow-y-auto">
        <BookmarkList bookmarks={bookmarks} header="Archived bookmarks" />
      </div>
    </>
  )
}
