import { type ReactNode, useMemo, useEffect, useRef, useState } from 'react'

interface TocEntry {
  id: string
  text: string
}

interface ChapterLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function ChapterLayout({ title, subtitle, children }: ChapterLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [toc, setToc] = useState<TocEntry[]>([])
  const [tocOpen, setTocOpen] = useState(true)

  const readingTime = useMemo(() => {
    const el = document.createElement('div')
    el.innerHTML = typeof children === 'string' ? children : ''
    const text = el.textContent || ''
    const words = text.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const headings = contentRef.current.querySelectorAll('h2')
    const entries: TocEntry[] = []
    headings.forEach((h, i) => {
      const id = h.id || `section-${i}`
      if (!h.id) h.id = id
      entries.push({ id, text: h.textContent || `Section ${i + 1}` })
    })
    setToc(entries)
  }, [children])

  return (
    <article className="max-w-prose mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
        <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{readingTime} min read</span>
        </div>
      </header>

      {toc.length > 0 && (
        <nav className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 w-full"
          >
            <svg
              className={`w-4 h-4 transition-transform ${tocOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            In This Chapter
          </button>
          {tocOpen && (
            <ol className="mt-3 space-y-1 pl-6 list-decimal">
              {toc.map(entry => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </nav>
      )}

      <div ref={contentRef} className="prose-content space-y-4 leading-relaxed text-gray-800 dark:text-gray-200">
        {children}
      </div>
    </article>
  )
}
