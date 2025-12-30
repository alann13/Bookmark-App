import { relations, sql } from 'drizzle-orm'
import { boolean, integer, pgTable, primaryKey, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk ID
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  url: text('url').notNull(),
  description: text('description').notNull(), // Made optional as sometimes description might be empty based on common patterns, though spec says "required fields: title, description, url". I will make it notNull to follow spec STRICTLY.
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastVisited: timestamp('last_visited'),
  visitedCount: integer('visited_count').default(0).notNull(),
  isPinned: boolean('is_pinned').default(false).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
})

// Spec says "description... are required fields". So I will make description notNull.
// Users can only see the bookmarks they create.
// Bookmarks can only be edited or deleted by the user who created it.

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
  },
  (t) => [
    // Unique tag name per user
    // We can't easily do unique index on name + user_id in drizzle helper simply, needs explicit index def or unique() on multiple columns which drizzle supports.
    // actually drizzle supports unique().on(t.userId, t.name)
    {
      unq: {
        name: 'tags_name_user_id_unique',
        columns: [t.name, t.userId],
      },
    },
  ],
)

export const bookmarksTags = pgTable(
  'bookmarks_tags',
  {
    bookmarkId: uuid('bookmark_id')
      .notNull()
      .references(() => bookmarks.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.bookmarkId, t.tagId] }),
    },
  ],
)

// RELATIONS

export const usersRelations = relations(users, ({ many }) => ({
  bookmarks: many(bookmarks),
  tags: many(tags),
}))

export const bookmarksRelations = relations(bookmarks, ({ one, many }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  bookmarksTags: many(bookmarksTags),
}))

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  bookmarksTags: many(bookmarksTags),
}))

export const bookmarksTagsRelations = relations(bookmarksTags, ({ one }) => ({
  bookmark: one(bookmarks, {
    fields: [bookmarksTags.bookmarkId],
    references: [bookmarks.id],
  }),
  tag: one(tags, {
    fields: [bookmarksTags.tagId],
    references: [tags.id],
  }),
}))
