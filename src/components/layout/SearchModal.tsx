import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { search, type SearchEntry } from '../../data/searchIndex'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setSelectedIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setResults(search(query))
    setSelectedIdx(0)
  }, [query])

  const go = useCallback((path: string) => {
    navigate(path)
    onClose()
  }, [navigate, onClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      go(results[selectedIdx].path)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search chapters, concepts, topics..."
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />
          <kbd className="text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">Esc</kbd>
        </div>
        {results.length > 0 && (
          <ul className="max-h-64 overflow-y-auto py-2">
            {results.map((r, i) => (
              <li key={r.path}>
                <button
                  onClick={() => go(r.path)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    i === selectedIdx
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                >
                  <span className="font-medium">{r.title}</span>
                  <span className="ml-2 text-xs text-gray-400">{r.type}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-gray-400">No results found.</div>
        )}
      </div>
    </div>
  )
}
