import { BookmarkManagerClient } from '@/components/bookmark-manager-client'
import { getBookmarks } from '@/lib/data'

export default async function BookmarkManagerPage(props: { searchParams: Promise<{ sort?: string; tags?: string }> }) {
  const searchParams = await props.searchParams
  const sort = searchParams.sort || 'recent'
  const filterTags = searchParams.tags ? searchParams.tags.split(',') : []
  const bookmarks = await getBookmarks(sort, filterTags)

  return <BookmarkManagerClient initialBookmarks={bookmarks} />
}
