import { useState, useMemo, useCallback, useEffect } from 'react'
import { FlashCard } from '../components/content/FlashCard'
import { flashcardData } from '../data/flashcardData'

const STORAGE_KEY = 'mitml-flashcard-progress'

type CardStatus = 'got-it' | 'review'

function loadProgress(): Record<string, CardStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        const migrated: Record<string, CardStatus> = {}
        for (const k of parsed) migrated[k] = 'got-it'
        return migrated
      }
      return parsed
    }
  } catch { /* ignore */ }
  return {}
}

function saveProgress(progress: Record<string, CardStatus>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch { /* ignore */ }
}

function toKey(card: { chapter: string; front: string }) {
  return `${card.chapter}:${card.front.slice(0, 40)}`
}

const chapters = [
  { id: 'all', label: 'All Chapters' },
  { id: 'ch1', label: 'Ch 1' }, { id: 'ch2', label: 'Ch 2' },
  { id: 'ch3', label: 'Ch 3' }, { id: 'ch4', label: 'Ch 4' },
  { id: 'ch5', label: 'Ch 5' }, { id: 'ch6', label: 'Ch 6' },
  { id: 'ch7', label: 'Ch 7' }, { id: 'ch8', label: 'Ch 8' },
  { id: 'ch9', label: 'Ch 9' }, { id: 'ch10', label: 'Ch 10' },
]

const statusFilters = [
  { id: 'all-status', label: 'All' },
  { id: 'unseen', label: 'Unseen' },
  { id: 'review', label: 'Needs Review' },
  { id: 'got-it', label: 'Got It' },
]

export default function Flashcards() {
  const [filter, setFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all-status')
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState<Record<string, CardStatus>>(loadProgress)

  useEffect(() => { saveProgress(progress) }, [progress])

  const cards = useMemo(() => {
    let filtered = filter === 'all' ? flashcardData : flashcardData.filter(c => c.chapter === filter)
    if (statusFilter !== 'all-status') {
      filtered = filtered.filter(c => {
        const s = progress[toKey(c)]
        if (statusFilter === 'unseen') return !s
        return s === statusFilter
      })
    }
    return filtered
  }, [filter, statusFilter, progress])

  const card = cards[idx]
  const cardStatus = card ? progress[toKey(card)] : undefined

  const gotItCount = Object.values(progress).filter(s => s === 'got-it').length
  const reviewCount = Object.values(progress).filter(s => s === 'review').length

  const markCard = useCallback((status: CardStatus) => {
    if (!card) return
    setProgress(prev => ({ ...prev, [toKey(card)]: status }))
    if (idx < cards.length - 1) setIdx(i => i + 1)
  }, [card, idx, cards.length])

  const resetProgress = useCallback(() => {
    setProgress({})
    setIdx(0)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Flashcards</h1>

      {/* Progress summary */}
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span className="text-green-600 dark:text-green-400">{gotItCount} got it</span>
        <span className="text-amber-600 dark:text-amber-400">{reviewCount} review</span>
        <span>{flashcardData.length - gotItCount - reviewCount} unseen</span>
        {(gotItCount > 0 || reviewCount > 0) && (
          <button onClick={resetProgress} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            Reset
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-5 overflow-hidden flex">
        {gotItCount > 0 && <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${(gotItCount / flashcardData.length) * 100}%` }} />}
        {reviewCount > 0 && <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${(reviewCount / flashcardData.length) * 100}%` }} />}
      </div>

      {/* Chapter filter */}
      <div className="flex flex-wrap gap-2 mb-2">
        {chapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => { setFilter(ch.id); setIdx(0) }}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              filter === ch.id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map(sf => (
          <button
            key={sf.id}
            onClick={() => { setStatusFilter(sf.id); setIdx(0) }}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              statusFilter === sf.id
                ? 'bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 border-gray-700 dark:border-gray-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {sf.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {cards.length} cards{filter !== 'all' || statusFilter !== 'all-status' ? ' (filtered)' : ''}. Click a card to flip.
      </p>

      {card ? (
        <>
          <div className="mb-4">
            <FlashCard front={card.front} back={card.back} />
          </div>

          {/* Got It / Needs Review */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => markCard('review')}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                cardStatus === 'review'
                  ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300'
                  : 'border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              Needs Review
            </button>
            <button
              onClick={() => markCard('got-it')}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                cardStatus === 'got-it'
                  ? 'bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600 text-green-700 dark:text-green-300'
                  : 'border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
            >
              Got It
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIdx(i => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="px-4 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {idx + 1} / {cards.length}
            </span>
            <button
              onClick={() => setIdx(i => Math.min(cards.length - 1, i + 1))}
              disabled={idx === cards.length - 1}
              className="px-4 py-2 text-sm rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-400 text-center py-8">No cards for this filter.</p>
      )}
    </div>
  )
}
