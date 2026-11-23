import { useState, useMemo } from 'react'
import { getAllConcepts, type ConceptDefinition } from '../data/conceptDefinitions'

export default function Glossary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')

  const concepts = useMemo(() => getAllConcepts(), [])

  const filtered = useMemo(() => {
    let list = concepts
    if (category !== 'all') list = list.filter(c => c.category === category)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(c =>
        c.displayName.toLowerCase().includes(q) ||
        c.shortDefinition.toLowerCase().includes(q)
      )
    }
    return list.sort((a, b) => a.displayName.localeCompare(b.displayName))
  }, [concepts, category, query])

  const categories = ['all', 'fundamentals', 'classification', 'regression', 'optimization', 'neural-networks', 'unsupervised']

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Glossary</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {concepts.length} concepts across all chapters.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search concepts..."
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none focus:border-primary-500"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          {concepts.length === 0 ? 'Concepts will be added in Sprint 3.' : 'No matching concepts.'}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((c: ConceptDefinition) => (
            <div key={c.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{c.displayName}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  {c.category} · {c.chapterOrigin}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{c.shortDefinition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
