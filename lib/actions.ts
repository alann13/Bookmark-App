'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db/index'
import { bookmarks, bookmarksTags, tags } from '@/db/schema'
import { insertBookmarkSchema } from '@/db/types'

export async function createBookmark(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const description = formData.get('description') as string
  const tagsString = formData.get('tags') as string

  // Validate basic fields
  const parsed = insertBookmarkSchema.safeParse({
    title,
    url,
    description,
  })

  if (!parsed.success) {
    return { error: 'Invalid input data', details: parsed.error.flatten() }
  }

  const { data } = parsed
  const tagNames = tagsString
    ? tagsString
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  try {
    // 1. Create Bookmark
    const [newBookmark] = await db
      .insert(bookmarks)
      .values({
        userId,
        title: data.title,
        url: data.url,
        description: data.description,
      })
      .returning()

    if (!newBookmark) {
      throw new Error('Failed to create bookmark')
    }

    // 2. Handle Tags
    if (tagNames.length > 0) {
      for (const tagName of tagNames) {
        // Check if tag exists for this user
        let tagId: string

        const existingTag = await db.query.tags.findFirst({
          where: (tags, { eq, and }) => and(eq(tags.name, tagName), eq(tags.userId, userId)),
        })

        if (existingTag) {
          tagId = existingTag.id
        } else {
          const [newTag] = await db
            .insert(tags)
            .values({
              userId,
              name: tagName,
            })
            .returning()
          tagId = newTag.id
        }

        // Link tag to bookmark
        await db.insert(bookmarksTags).values({
          bookmarkId: newBookmark.id,
          tagId,
        })
      }
    }

    revalidatePath('/bookmark-manager')
    return { success: true }
  } catch (error) {
    console.error('Failed to create bookmark:', error)
    return { error: 'Failed to create bookmark' }
  }
}
