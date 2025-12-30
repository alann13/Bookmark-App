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
