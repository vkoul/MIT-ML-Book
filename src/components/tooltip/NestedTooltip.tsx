import { useRef, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react'
import { useTooltipContext } from './TooltipProvider'

interface NestedTooltipProps {
  id: string
  title: string
  shortDefinition: string
  children: ReactNode
  referenceRect: DOMRect
}

export function NestedTooltip({ id, title, shortDefinition, children, referenceRect }: NestedTooltipProps) {
  const { closeTooltip } = useTooltipContext()
  const [locked, setLocked] = useState(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const dismissTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    refs.setPositionReference({
      getBoundingClientRect: () => referenceRect,
    })
  }, [referenceRect, refs])

  useEffect(() => {
    lockTimer.current = setTimeout(() => setLocked(true), 400)
    return () => {
      clearTimeout(lockTimer.current)
      clearTimeout(dismissTimer.current)
    }
  }, [])

  const handleMouseEnter = () => {
    clearTimeout(dismissTimer.current)
    setLocked(true)
  }

  const handleMouseLeave = () => {
    dismissTimer.current = setTimeout(() => closeTooltip(id), 250)
  }

  const portalRoot = document.getElementById('tooltip-root')
  if (!portalRoot) return null

  return createPortal(
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className={`z-50 max-w-sm rounded-lg shadow-lg border p-4 text-sm transition-colors ${
        locked
          ? 'bg-tooltip-bg border-blue-500 pointer-events-auto'
          : 'bg-tooltip-bg border-tooltip-border pointer-events-none'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="font-semibold text-white mb-1">{title}</div>
      <div className="text-gray-300 text-xs mb-2">{shortDefinition}</div>
      <div className="text-gray-200 space-y-2">{children}</div>
    </div>,
    portalRoot,
  )
}
