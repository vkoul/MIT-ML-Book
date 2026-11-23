import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine, Tooltip, Legend } from 'recharts'

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

export function ActivationFunctionWidget() {
  const [xValue, setXValue] = useState(1.0)

  const data = useMemo(() => {
    const points = []
    for (let x = -5; x <= 5.01; x += 0.2) {
      const xr = Math.round(x * 10) / 10
      points.push({
        x: xr,
        relu: Math.max(0, xr),
        sigmoid: sigmoid(xr),
        tanh: Math.tanh(xr),
      })
    }
    return points
  }, [])

  const reluVal = Math.max(0, xValue)
  const sigmoidVal = sigmoid(xValue)
  const tanhVal = Math.tanh(xValue)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Interactive: Activation Function Comparison
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Move the slider to see how ReLU, Sigmoid, and Tanh respond to different input values.
        Notice how each function squashes or clips the input differently.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Input x:
          <input
            type="range"
            min={-5}
            max={5}
            step={0.1}
            value={xValue}
            onChange={(e) => setXValue(Number(e.target.value))}
            className="ml-2 w-40 align-middle accent-blue-500"
          />
          <span className="ml-2 font-mono text-blue-600 dark:text-blue-400 w-12 inline-block">
            {xValue.toFixed(1)}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-2 text-center">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">ReLU</div>
          <div className="font-mono font-semibold text-blue-800 dark:text-blue-200">{reluVal.toFixed(3)}</div>
        </div>
        <div className="rounded-md bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 text-center">
          <div className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">Sigmoid</div>
          <div className="font-mono font-semibold text-emerald-800 dark:text-emerald-200">{sigmoidVal.toFixed(3)}</div>
        </div>
        <div className="rounded-md bg-purple-50 dark:bg-purple-900/30 px-3 py-2 text-center">
          <div className="text-purple-600 dark:text-purple-400 text-xs font-medium">Tanh</div>
          <div className="font-mono font-semibold text-purple-800 dark:text-purple-200">{tanhVal.toFixed(3)}</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="x"
            tick={{ fontSize: 11 }}
            label={{ value: 'Input (x)', position: 'insideBottom', offset: -2, fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            domain={[-1.5, 5.5]}
            label={{ value: 'Output', angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px' }}
            labelStyle={{ color: '#d1d5db' }}
            itemStyle={{ color: '#d1d5db' }}
            formatter={(value: number) => value.toFixed(3)}
          />
          <Legend verticalAlign="top" height={30} />
          <ReferenceLine x={0} stroke="#6b7280" strokeDasharray="3 3" />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
          <ReferenceLine x={xValue} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" />
          <Line
            type="monotone"
            dataKey="relu"
            name="ReLU"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="sigmoid"
            name="Sigmoid"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="tanh"
            name="Tanh"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        ReLU: kills negatives, unbounded positive · Sigmoid: squashes to (0, 1) · Tanh: squashes to (−1, 1)
      </p>
    </div>
  )
}
