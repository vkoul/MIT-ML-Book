import { useRef, useCallback, type ReactNode } from 'react'
import { useTooltipContext } from './TooltipProvider'
import { NestedTooltip } from './NestedTooltip'
import { getConcept } from '../../data/conceptDefinitions'

interface ConceptLinkProps {
  conceptId: string
  children: ReactNode
  parentTooltipId?: string
}

export function ConceptLink({ conceptId, children, parentTooltipId }: ConceptLinkProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const { chain, openTooltip, closeAll, isInChain, wouldCycle } = useTooltipContext()

  const concept = getConcept(conceptId)
  const isOpen = isInChain(conceptId)
  const isCyclic = parentTooltipId ? wouldCycle(conceptId) : false

  const handleMouseEnter = useCallback(() => {
    if (isCyclic) return
    timerRef.current = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        openTooltip(conceptId, parentTooltipId || null, rect)
      }
    }, 300)
  }, [conceptId, parentTooltipId, openTooltip, isCyclic])

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timerRef.current)
  }, [])

  const tooltipEntry = chain.find(t => t.id === conceptId)

  return (
    <>
      <span
        ref={ref}
        className={isCyclic ? 'concept-link--cyclic' : isOpen ? 'concept-link--in-chain' : 'concept-link'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => { if (e.key === 'Escape') closeAll() }}
        tabIndex={0}
        role="button"
        title={isCyclic ? `${concept?.displayName ?? conceptId} (already in chain)` : undefined}
      >
        {children}{isCyclic && ' ↻'}
      </span>
      {isOpen && tooltipEntry && concept && (
        <NestedTooltip
          id={conceptId}
          title={concept.displayName}
          shortDefinition={concept.shortDefinition}
          referenceRect={tooltipEntry.referenceRect}
        >
          {concept.content}
        </NestedTooltip>
      )}
    </>
  )
}
