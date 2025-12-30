'use client'

import { ReactNode } from 'react'
import { useSidebar } from './sidebar-context'

export function SidebarWrapper({ children }: { children: ReactNode }) {
  const { isOpen, close } = useSidebar()

  return (
    <>
      {/* Overlay for mobile/tablet when open */}
      <div className={`fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={close} aria-hidden="true" />

      {/* Sidebar Container */}
      <div
        className={`
            fixed top-0 left-0 z-50 h-full w-[296px] bg-white transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:z-auto
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {children}
      </div>
    </>
  )
}
