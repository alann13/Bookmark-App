import { Calendar, Clock, Eye, MoreVertical, Pin } from 'lucide-react'
import type { BookmarkWithTags } from '@/db/types'

interface BookmarkCardProps {
  bookmark: BookmarkWithTags
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { title, url, description, tags, isPinned, visitedCount, lastVisited, createdAt } = bookmark
  const hostname = new URL(url).hostname

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          {/* Favicon Placeholder */}
          <div className="w-12 h-12 shrink-0 bg-white rounded-xl flex items-center justify-center border border-neutral-200 text-xl font-bold text-neutral-500 shadow-sm">{title.charAt(0).toUpperCase()}</div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-neutral-900 leading-tight mb-0.5" title={title}>
              {title}
            </h3>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-neutral-700 hover:underline">
              {hostname}
            </a>
          </div>
        </div>

        <button type="button" className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
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

        <button type="button" className={`hover:text-neutral-900 transition-colors ${isPinned ? 'text-neutral-900' : 'text-neutral-400'}`} title={isPinned ? 'Unpin bookmark' : 'Pin bookmark'}>
          <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  )
}
