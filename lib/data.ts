import { auth } from '@clerk/nextjs/server'
import { and, desc, eq, inArray, type SQL, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/db/index'
import { bookmarks, bookmarksTags, tags } from '@/db/schema'
import { bookmarkWithTagsSchema, tagWithCountSchema } from '@/db/types'

export async function getBookmarks(sortBy: string = 'recent', filterTags: string[] = [], isArchived: boolean = false) {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  let orderBy: any = [desc(bookmarks.createdAt)]
  if (sortBy === 'visited') {
    // Determine sort order based on input
    orderBy = [desc(bookmarks.lastVisited)]
  } else if (sortBy === 'top') {
    orderBy = [desc(bookmarks.visitedCount)]
  }

  let whereClause: SQL | undefined = and(eq(bookmarks.userId, userId), eq(bookmarks.isArchived, isArchived))

  if (filterTags.length > 0) {
    const matchingBookmarks = db.select({ id: bookmarksTags.bookmarkId }).from(bookmarksTags).innerJoin(tags, eq(bookmarksTags.tagId, tags.id)).where(inArray(tags.name, filterTags))

    whereClause = and(whereClause, inArray(bookmarks.id, matchingBookmarks))
  }

  const userBookmarks = await db.query.bookmarks.findMany({
    where: whereClause,
    with: {
      bookmarksTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy,
  })

  const formattedBookmarks = userBookmarks.map((bookmark) => ({
    ...bookmark,
    tags: bookmark.bookmarksTags.map((bt) => bt.tag.name),
  }))

  return z.array(bookmarkWithTagsSchema).parse(formattedBookmarks)
}

export async function getTags() {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const userTags = await db
    .select({
      id: tags.id,
      name: tags.name,
      count: sql<number>`count(${bookmarksTags.bookmarkId})`.mapWith(Number),
    })
    .from(tags)
    .leftJoin(bookmarksTags, eq(tags.id, bookmarksTags.tagId))
    .where(eq(tags.userId, userId))
    .groupBy(tags.id, tags.name)

  return z.array(tagWithCountSchema).parse(userTags)
}
