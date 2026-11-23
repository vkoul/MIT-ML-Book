import { useState, useEffect, useCallback } from 'react'
import { quizData } from '../../data/quizData'

interface InlineQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface QuizSectionProps {
  chapterId?: string
  questions?: InlineQuestion[]
}

function loadQuizState(storageKey: string): { answers: Record<number, string>; revealed: Record<number, boolean> } {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) return JSON.parse(raw)
  } catch { /* private browsing or quota exceeded */ }
  return { answers: {}, revealed: {} }
}

function saveQuizState(storageKey: string, answers: Record<number, string>, revealed: Record<number, boolean>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ answers, revealed }))
  } catch { /* private browsing or quota exceeded */ }
}

export function QuizSection({ chapterId, questions: inlineQuestions }: QuizSectionProps) {
  const storeQuestions = chapterId ? (quizData[chapterId] ?? []) : []

  const normalised = inlineQuestions
    ? inlineQuestions.map((q, i) => ({
        id: `inline-${i}`,
        text: q.question,
        opts: q.options.map((text, j) => ({ id: `o${j}`, text })),
        correctId: `o${q.correctIndex}`,
        explanation: q.explanation,
      }))
    : storeQuestions.map(q => ({
        id: q.id,
        text: q.question,
        opts: q.options,
        correctId: q.correctId,
        explanation: q.explanation,
      }))

  const storageKey = `mitml-quiz-${chapterId ?? 'inline-' + normalised.map(q => q.id).join(',')}`

  const [answers, setAnswers] = useState<Record<number, string>>(() => loadQuizState(storageKey).answers)
  const [revealed, setRevealed] = useState<Record<number, boolean>>(() => loadQuizState(storageKey).revealed)

  useEffect(() => {
    saveQuizState(storageKey, answers, revealed)
  }, [storageKey, answers, revealed])

  const handleSelect = useCallback((qi: number, optId: string) => {
    if (revealed[qi]) return
    setAnswers(prev => ({ ...prev, [qi]: optId }))
  }, [revealed])

  const handleCheck = useCallback((qi: number) => {
    setRevealed(prev => ({ ...prev, [qi]: true }))
  }, [])

  const handleReset = useCallback(() => {
    setAnswers({})
    setRevealed({})
    try { localStorage.removeItem(storageKey) } catch { /* ignore */ }
  }, [storageKey])

  if (normalised.length === 0) return null

  const totalRevealed = Object.keys(revealed).length
  const totalCorrect = Object.entries(revealed).filter(([qi]) => answers[Number(qi)] === normalised[Number(qi)]?.correctId).length

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Quiz</h2>
        {totalRevealed > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalCorrect}/{totalRevealed} correct
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {normalised.map((q, qi) => {
          const isRevealed = revealed[qi]
          const selectedId = answers[qi]
          const isCorrect = selectedId === q.correctId

          return (
            <div key={q.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                {qi + 1}. {q.text}
              </p>
              <div className="space-y-2">
                {q.opts.map(opt => {
                  let optClass = 'border-gray-200 dark:border-gray-600'
                  if (isRevealed) {
                    if (opt.id === q.correctId) optClass = 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    else if (opt.id === selectedId) optClass = 'border-red-400 bg-red-50 dark:bg-red-900/30'
                  } else if (opt.id === selectedId) {
                    optClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(qi, opt.id)}
                      className={`w-full text-left p-3 rounded border transition-colors ${optClass} ${!isRevealed ? 'hover:bg-gray-100 dark:hover:bg-gray-750 cursor-pointer' : ''}`}
                      disabled={isRevealed}
                    >
                      <span className="text-gray-700 dark:text-gray-300">{opt.text}</span>
                    </button>
                  )
                })}
              </div>
              {selectedId !== undefined && !isRevealed && (
                <button
                  onClick={() => handleCheck(qi)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  Check Answer
                </button>
              )}
              {isRevealed && (
                <div className={`mt-3 p-3 rounded text-sm ${isCorrect ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'}`}>
                  {isCorrect ? 'Correct! ' : 'Incorrect. '}
                  {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
