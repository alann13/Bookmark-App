'use client'

import { Archive, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarNav() {
  const pathname = usePathname()

  const links = [
    { href: '/bookmark-manager', label: 'Home', icon: Home },
    { href: '/bookmark-manager/archive', label: 'Archive', icon: Archive },
  ]

  return (
    <nav className="flex flex-col gap-1 px-4 py-4">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href

        return (
          <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}>
            <Icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
