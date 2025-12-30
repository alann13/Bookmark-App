'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { TagWithCount } from '@/db/types'

interface TagFilterProps {
  tags: TagWithCount[]
}

export function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || []

  const toggleTag = (tagName: string) => {
    const newTags = selectedTags.includes(tagName) ? selectedTags.filter((t) => t !== tagName) : [...selectedTags, tagName]

    const params = new URLSearchParams(searchParams.toString())
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','))
    } else {
      params.delete('tags')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-1">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag.name)
        return (
          <label key={tag.id} className="flex items-center justify-between px-3 py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg cursor-pointer transition-colors group">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900 focus:ring-offset-0 accent-neutral-900" checked={isSelected} onChange={() => toggleTag(tag.name)} />
              <span className="font-medium text-sm">{tag.name}</span>
            </div>
            <span className="text-xs text-neutral-400 font-medium group-hover:text-neutral-600 transition-colors">{tag.count}</span>
          </label>
        )
      })}
    </div>
  )
}
