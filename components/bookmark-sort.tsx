'use client'

import { ArrowUpDown, Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const sortOptions = [
  { label: 'Recently added', value: 'recent' },
  { label: 'Recently visited', value: 'visited' },
  { label: 'Most visited', value: 'top' },
] as const

export function BookmarkSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'recent'
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = sortOptions.find((option) => option.value === currentSort) || sortOptions[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    router.push(`?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors text-sm font-semibold shadow-xs">
        <ArrowUpDown className="w-4 h-4" />
        <span>{selectedOption.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-10">
          {sortOptions.map((option) => (
            <button key={option.value} type="button" onClick={() => handleSelect(option.value)} className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-neutral-50 transition-colors ${option.value === currentSort ? 'text-neutral-900 font-medium' : 'text-neutral-700'}`}>
              <span>{option.label}</span>
              {option.value === currentSort && <Check className="w-4 h-4 text-teal-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
