import { useState } from 'react'

interface ChoiceStyle {
  label: string
  explanation: string
  isRecommended: boolean
}

interface OptionStyle {
  label: string
  feedback: string
  isCorrect: boolean
}

interface DecisionScenarioProps {
  title?: string
  scenario?: string
  description?: string
  choices?: ChoiceStyle[]
  options?: OptionStyle[]
}

export function DecisionScenario({ title, scenario, description, choices, options }: DecisionScenarioProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const text = scenario ?? description ?? ''
  const items = (choices ?? []).length > 0
    ? (choices ?? []).map(c => ({ label: c.label, detail: c.explanation, best: c.isRecommended }))
    : (options ?? []).map(o => ({ label: o.label, detail: o.feedback, best: o.isCorrect }))

  return (
    <div className="my-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
      {title && <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">{title}</h3>}
      <p className="text-amber-700 dark:text-amber-300 mb-4">{text}</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selected === null
                ? 'border-amber-200 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                : selected === i
                  ? item.best
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : 'border-red-400 bg-red-50 dark:bg-red-900/30'
                  : item.best
                    ? 'border-green-400 bg-green-50/50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 opacity-60'
            }`}
          >
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {item.label}
              {selected !== null && item.best && (
                <span className="ml-2 text-green-600 dark:text-green-400 text-sm">&#10003; Recommended</span>
              )}
            </div>
            {selected !== null && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.detail}</p>
            )}
          </button>
        ))}
      </div>
      {selected !== null && (
        <button
          onClick={() => setSelected(null)}
          className="mt-3 text-sm text-amber-600 dark:text-amber-400 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  )
}
