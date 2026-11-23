import { useMemo } from 'react'
import { getAllConcepts } from '../data/conceptDefinitions'

export default function ConceptMap() {
  const concepts = useMemo(() => getAllConcepts(), [])

  const byChapter = useMemo(() => {
    const map: Record<string, typeof concepts> = {}
    for (const c of concepts) {
      ;(map[c.chapterOrigin] ??= []).push(c)
    }
    return Object.entries(map).sort(([a], [b]) => {
      const numA = parseInt(a.replace('ch', ''))
      const numB = parseInt(b.replace('ch', ''))
      return numA - numB
    })
  }, [concepts])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Concept Map</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        How concepts connect across chapters. Arrows show prerequisites.
      </p>

      {concepts.length === 0 ? (
        <p className="text-gray-400 text-center py-8">Concept data will be added in Sprint 3.</p>
      ) : (
        <div className="space-y-6">
          {byChapter.map(([chapter, items]) => (
            <div key={chapter}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 capitalize">
                {chapter.replace('ch', 'Chapter ')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(c => (
                  <div key={c.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm">{c.displayName}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.shortDefinition}</p>
                    {c.prerequisites.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {c.prerequisites.map(pre => (
                          <span key={pre} className="text-xs px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                            {pre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
