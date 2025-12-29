# Technical Specs

This is an app built with nextjs deployed to vercel.
Develop runtime is Bun.

## Libraries to use
- Auth: Clerk
- Database: Neon
- ORM: Drizzle ORM
- Schema validation: Zod 
- Styling: Radix UI with tailwindcss
- Managing bookmarks with react-hook-form

## Testing
Playwright will the tool of choice to do E2E testing.

## Technical Considerations
- There is an auth service that will create our user and we want this user to be link to our user type in our dabatase in neon.
- CSS grid will be used to organize the grid list for the bookmark cards.
- App router will be used instead of page router.
- When entering tags, if there is more than 1 tag, ensure it is written as "design, learning, tools"
- 