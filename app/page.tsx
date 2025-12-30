import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Simple Logo Placeholder */}
          <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-neutral-900 tracking-tight">Bookmark</span>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button type="button" className="text-neutral-600 hover:text-neutral-900 font-medium px-4 py-2 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button type="button" className="bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg px-5 py-2.5 transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/bookmark-manager" className="text-neutral-600 hover:text-neutral-900 font-medium px-4 py-2 transition-colors mr-2">
              Go to Bookmark Manager
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow">
        {/* Hero Section */}
        <section className="py-20 sm:pt-12 sm:py-32 px-4 text-center bg-linear-to-b from-neutral-0 to-neutral-100/50">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/10 text-teal-700 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-700 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-700"></span>
              </span>
              v1.0 is now live
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
              Your personal <br className="hidden sm:block" />
              <span className="text-teal-700">bookmark manager</span>
            </h1>

            <p className="text-xl text-neutral-500 mx-auto leading-relaxed">Simple. Fast. Organized. Keep all your important links in one secure place with a beautiful, minimalistic interface designed for focus.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <SignedOut>
                <SignUpButton>
                  <button type="button" className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white text-lg font-bold rounded-xl px-8 py-4 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Start Bookmarking
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/bookmark-manager">
                  <button type="button" className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white text-lg font-bold rounded-xl px-8 py-4 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    View My Bookmarks
                  </button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-neutral-100 hover:bg-neutral-50 transition-colors">
                <div className="w-12 h-12 bg-teal-700/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Smart Tagging Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Smart Tagging</h3>
                <p className="text-neutral-500 leading-relaxed">Organize your links with flexible tags. Filter and find what you need in seconds without the clutter.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-neutral-100 hover:bg-neutral-50 transition-colors">
                <div className="w-12 h-12 bg-teal-700/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Instant Search Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Instant Search</h3>
                <p className="text-neutral-500 leading-relaxed">Powerful search functionality that crawls your titles and descriptions to surface the right link instantly.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-neutral-100 hover:bg-neutral-50 transition-colors">
                <div className="w-12 h-12 bg-teal-700/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Private & Secure Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Private & Secure</h3>
                <p className="text-neutral-500 leading-relaxed">Your data is yours. Enterprise-grade security ensures your personal collection stays private and protected.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-neutral-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <span className="text-neutral-100 font-semibold">Bookmark</span>
          </div>
          <div className="text-sm">&copy; {new Date().getFullYear()} Bookmark Manager. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
