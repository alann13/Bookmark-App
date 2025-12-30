'use client'

import { Archive, ArchiveRestore, Calendar, Clock, Copy, ExternalLink, Eye, MoreVertical, Pin, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'
import type { BookmarkWithTags } from '@/db/types'
import { archiveBookmark, deleteBookmark, unarchiveBookmark, updateBookmarkPin } from '@/lib/actions'

interface BookmarkCardProps {
  bookmark: BookmarkWithTags
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { id, title, url, description, tags, isPinned, visitedCount, lastVisited, createdAt, isArchived } = bookmark
  const hostname = new URL(url).hostname

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isPending, startTransition] = useTransition()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleVisit = () => {
    window.open(url, '_blank')
    setIsDropdownOpen(false)
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      // Optional: Show toast
    } catch (err) {
      console.error('Failed to copy', err)
    }
    setIsDropdownOpen(false)
  }

  const handleArchiveToggle = () => {
    startTransition(async () => {
      if (isArchived) {
        await unarchiveBookmark(id)
      } else {
        await archiveBookmark(id)
      }
    })
    setIsDropdownOpen(false)
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBookmark(id)
    })
    setShowDeleteDialog(false)
  }

  const handlePinToggle = () => {
    startTransition(async () => {
      await updateBookmarkPin(id, !isPinned)
    })
  }

  return (
    <>
      <div className="relative flex flex-col h-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-all">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            {/* Favicon Placeholder */}
            <div className="w-12 h-12 shrink-0 bg-white rounded-xl flex items-center justify-center border border-neutral-200 text-xl font-bold text-neutral-500 shadow-sm">{title.charAt(0).toUpperCase()}</div>

            <div className="flex flex-col">
              <h3 className="font-bold text-lg text-neutral-900 leading-tight mb-0.5 line-clamp-1" title={title}>
                {title}
              </h3>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-neutral-700 hover:underline">
                {hostname}
              </a>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-100 z-10 py-1 overflow-hidden">
                <button type="button" onClick={handleVisit} className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-neutral-500" />
                  Visit
                </button>
                <button type="button" onClick={handleCopyUrl} className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                  <Copy className="w-4 h-4 text-neutral-500" />
                  Copy URL
                </button>
                <button type="button" onClick={handleArchiveToggle} disabled={isPending} className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 disabled:opacity-50">
                  {isArchived ? <ArchiveRestore className="w-4 h-4 text-neutral-500" /> : <Archive className="w-4 h-4 text-neutral-500" />}
                  {isArchived ? 'Unarchive' : 'Archive'}
                </button>
                <div className="h-px bg-neutral-100 my-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    setShowDeleteDialog(true)
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete permanently
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 flex-1 border-t border-neutral-100 pt-4">
          <p className="text-neutral-600 leading-relaxed text-[15px]">{description}</p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-md hover:bg-neutral-200 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-neutral-500">
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5" title="Visit count">
              <Eye className="w-4 h-4" />
              <span>{visitedCount}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Created at">
              <Clock className="w-4 h-4" />
              <span>{new Date(createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
            </div>
            {lastVisited && (
              <div className="flex items-center gap-1.5" title="Last visited">
                <Calendar className="w-4 h-4" />
                <span>{new Date(lastVisited).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
              </div>
            )}
          </div>

          <button type="button" onClick={handlePinToggle} disabled={isPending} className={`hover:text-neutral-900 transition-colors ${isPinned ? 'text-neutral-900' : 'text-neutral-400'} disabled:opacity-50`} title={isPinned ? 'Unpin bookmark' : 'Pin bookmark'}>
            <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default border-none" onClick={() => setShowDeleteDialog(false)} aria-label="Close dialog" />
          <div className="relative z-10 w-full max-w-144 bg-white rounded-2xl shadow-2xl p-6 m-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Delete bookmark?</h3>
              <button type="button" onClick={() => setShowDeleteDialog(false)} className="text-neutral-400 hover:text-neutral-600 transition-colors" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-neutral-600 mb-6 text-sm">Are you sure you want to delete this bookmark? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowDeleteDialog(false)} className="px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200">
                Cancel
              </button>
              <button type="button" onClick={handleDelete} disabled={isPending} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm disabled:opacity-50">
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
