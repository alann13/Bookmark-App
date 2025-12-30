import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  children?: ReactNode
}

export function EmptyState({ message, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
      <h3 className="text-lg font-semibold text-neutral-900 mb-6">{message}</h3>
      {children}
    </div>
  )
}
