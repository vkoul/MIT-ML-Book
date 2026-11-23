import { useEffect, useRef } from 'react'
import katex from 'katex'

interface MathBlockProps {
  tex?: string
  math?: string
  display?: boolean
  inline?: boolean
}

export function MathBlock({ tex, math, display, inline }: MathBlockProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const source = tex ?? math ?? ''
  const isDisplay = display ?? (inline !== undefined ? !inline : false)

  useEffect(() => {
    if (ref.current) {
      katex.render(source, ref.current, {
        displayMode: isDisplay,
        throwOnError: false,
        strict: false,
      })
    }
  }, [source, isDisplay])

  if (isDisplay) {
    return (
      <div className="my-4 overflow-x-auto text-center">
        <span ref={ref} />
      </div>
    )
  }

  return <span ref={ref} className="mx-0.5" />
}
