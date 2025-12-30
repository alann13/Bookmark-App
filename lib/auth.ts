import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'

export async function syncUser() {
  try {
    const clerkUser = await currentUser()

    // If not logged in, do nothing
    if (!clerkUser) return null

    // Check if user exists in DB
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, clerkUser.id),
    })

    if (existingUser) {
      // Optional: Update user details if they changed (e.g. email/username)
      // For now, we return the existing user
      return existingUser
    }

    // Prepare user data
    const email = clerkUser.emailAddresses[0]?.emailAddress
    if (!email) {
      // This should be rare if email is required in Clerk
      console.error('User has no email address', clerkUser.id)
      return null
    }

    // Determine username: Clerk username > First Name > "user_[id]"
    let username = clerkUser.username
    if (!username) {
      if (clerkUser.firstName) {
        // Check if first name is taken?
        // Better to append a random string or just use ID to be safe
        username = `${clerkUser.firstName}_${clerkUser.id.slice(0, 5)}`.toLowerCase()
      } else {
        username = `user_${clerkUser.id.slice(0, 15)}`
      }
    }

    // Create new user
    const newUser = await db
      .insert(users)
      .values({
        id: clerkUser.id,
        username: username,
        email: email,
      })
      .returning()

    return newUser[0]
  } catch (error) {
    console.error('Failed to sync user:', error)
    // Don't crash the app, return null
    return null
  }
}
