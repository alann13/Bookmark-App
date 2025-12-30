import { auth } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/db/index'
import { bookmarks } from '@/db/schema'
import { bookmarkWithTagsSchema } from '@/db/types'

export async function getBookmarks() {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const userBookmarks = await db.query.bookmarks.findMany({
    where: eq(bookmarks.userId, userId),
    with: {
      bookmarksTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(bookmarks.createdAt)],
  })

  const formattedBookmarks = userBookmarks.map((bookmark) => ({
    ...bookmark,
    tags: bookmark.bookmarksTags.map((bt) => bt.tag.name),
  }))

  return z.array(bookmarkWithTagsSchema).parse(formattedBookmarks)
}
