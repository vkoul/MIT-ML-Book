import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface TooltipState {
  id: string
  parentId: string | null
  referenceRect: DOMRect
}

interface TooltipContextValue {
  chain: TooltipState[]
  openTooltip: (id: string, parentId: string | null, rect: DOMRect) => void
  closeTooltip: (id: string) => void
  closeAll: () => void
  isInChain: (id: string) => boolean
  wouldCycle: (id: string) => boolean
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

const MAX_DEPTH = 5

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [chain, setChain] = useState<TooltipState[]>([])

  const openTooltip = useCallback((id: string, parentId: string | null, rect: DOMRect) => {
    setChain(prev => {
      if (prev.some(t => t.id === id)) return prev

      if (parentId) {
        const parentIdx = prev.findIndex(t => t.id === parentId)
        if (parentIdx === -1) return prev
        const trimmed = prev.slice(0, parentIdx + 1)
        if (trimmed.length >= MAX_DEPTH) {
          return [...trimmed.slice(1), { id, parentId, referenceRect: rect }]
        }
        return [...trimmed, { id, parentId, referenceRect: rect }]
      }

      return [{ id, parentId: null, referenceRect: rect }]
    })
  }, [])

  const closeTooltip = useCallback((id: string) => {
    setChain(prev => {
      const idx = prev.findIndex(t => t.id === id)
      if (idx === -1) return prev
      return prev.slice(0, idx)
    })
  }, [])

  const closeAll = useCallback(() => setChain([]), [])

  const isInChain = useCallback((id: string) => chain.some(t => t.id === id), [chain])

  const wouldCycle = useCallback((id: string) => chain.some(t => t.id === id), [chain])

  return (
    <TooltipContext.Provider value={{ chain, openTooltip, closeTooltip, closeAll, isInChain, wouldCycle }}>
      {children}
    </TooltipContext.Provider>
  )
}

export function useTooltipContext() {
  const ctx = useContext(TooltipContext)
  if (!ctx) throw new Error('useTooltipContext must be used within TooltipProvider')
  return ctx
}
