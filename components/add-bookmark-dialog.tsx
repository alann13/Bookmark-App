'use client'

import { Plus, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import { createBookmark } from '@/lib/actions'

export function AddBookmarkDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [descriptionCount, setDescriptionCount] = useState(0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await createBookmark(formData)
      if (result?.error) {
        setError(result.error as string)
      } else {
        setIsOpen(false)
        setDescriptionCount(0) // Reset count
        // Note: Form reset happens automatically when the modal unmounts/remounts next time it opens,
        // OR we should force a reset if we want to keep the modal generic.
        // With conditional rendering {isOpen && ...}, the form is destroyed on close.
      }
    })
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white p-2.5 md:px-4 md:py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer">
        <Plus className="w-5 h-5" />
        <span className="hidden md:inline">Add bookmark</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop - using button for a11y */}
          <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default w-full h-full border-none p-0" onClick={() => setIsOpen(false)} aria-label="Close dialog" />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-[36rem] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Add a bookmark</h2>
                <p className="text-sm text-neutral-500 mt-1">Save a link with details to keep your collection organized.</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-50 transition-colors" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-neutral-900 mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="title" name="title" required className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium" />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-neutral-900 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      maxLength={280}
                      onChange={(e) => setDescriptionCount(e.target.value.length)}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium resize-none"
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-neutral-400 pointer-events-none">{descriptionCount}/280</div>
                  </div>
                </div>

                {/* Website URL */}
                <div>
                  <label htmlFor="url" className="block text-sm font-semibold text-neutral-900 mb-1.5">
                    Website URL <span className="text-red-500">*</span>
                  </label>
                  <input type="url" id="url" name="url" required className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium" />
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-neutral-900 mb-1.5">
                    Tags <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder="e.g. Design, Learning, Tools"
                    className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium"
                  />
                </div>
              </div>

              {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

              <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-neutral-100">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="px-4 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isPending ? 'Adding...' : 'Add Bookmark'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
