'use client'

import { X } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import type { BookmarkWithTags } from '@/db/types'
import { useToast } from '@/hooks/use-toast'
import { updateBookmark } from '@/lib/actions'

interface UpdateBookmarkDialogProps {
  bookmark: BookmarkWithTags
  isOpen: boolean
  onClose: () => void
}

export function UpdateBookmarkDialog({ bookmark, isOpen, onClose }: UpdateBookmarkDialogProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [descriptionCount, setDescriptionCount] = useState(bookmark.description?.length || 0)
  const { toast } = useToast()

  // Reset state when dialog opens with a new bookmark or same bookmark
  useEffect(() => {
    if (isOpen) {
      setError(null)
      setDescriptionCount(bookmark.description?.length || 0)
    }
  }, [isOpen, bookmark])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await updateBookmark(bookmark.id, formData)
      if (result?.error) {
        setError(result.error as string)
      } else {
        onClose()
        toast({ title: 'Changes saved.' })
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default w-full h-full border-none p-0" onClick={onClose} aria-label="Close dialog" />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-144 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Update bookmark</h2>
            <p className="text-sm text-neutral-500 mt-1">Update the details of your bookmark.</p>
          </div>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-50 transition-colors" aria-label="Close">
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
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={bookmark.title}
                required
                className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium"
              />
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
                  defaultValue={bookmark.description || ''}
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
              <input
                type="url"
                id="url"
                name="url"
                defaultValue={bookmark.url}
                required
                className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium"
              />
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
                defaultValue={bookmark.tags.join(', ')}
                placeholder="e.g. Design, Learning, Tools"
                className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all font-medium"
              />
            </div>
          </div>

          {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

          <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-neutral-100">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="px-4 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? 'Updating...' : 'Update Bookmark'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
