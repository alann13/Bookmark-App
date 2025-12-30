import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { z } from 'zod'
import type { bookmarks, bookmarksTags, tags, users } from './schema'

// Types
export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type Bookmark = InferSelectModel<typeof bookmarks>
export type NewBookmark = InferInsertModel<typeof bookmarks>

export type Tag = InferSelectModel<typeof tags>
export type NewTag = InferInsertModel<typeof tags>

export type BookmarkTag = InferSelectModel<typeof bookmarksTags>
export type NewBookmarkTag = InferInsertModel<typeof bookmarksTags>

// Zod Schemas
export const insertBookmarkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL'),
  description: z.string().min(1, 'Description is required'),
  isPinned: z.boolean().optional(),
  isArchived: z.boolean().optional(),
})

export const insertTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required'),
})

export type BookmarkWithTags = Bookmark & {
  tags: string[]
}

export const bookmarkSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  url: z.string().url(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastVisited: z.date().nullable(),
  visitedCount: z.number(),
  isPinned: z.boolean(),
  isArchived: z.boolean(),
})

export const bookmarkWithTagsSchema = bookmarkSchema.extend({
  tags: z.array(z.string()),
})

export const tagWithCountSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  count: z.number(),
})

export type TagWithCount = z.infer<typeof tagWithCountSchema>
