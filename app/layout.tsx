import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { syncUser } from '@/lib/auth'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bookmark Manager',
  description: 'Organize your bookmarks',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await syncUser()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16"></header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
