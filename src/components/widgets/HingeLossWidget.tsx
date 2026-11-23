import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine, Tooltip, Legend } from 'recharts'

export function HingeLossWidget() {
  const [zValue, setZValue] = useState(0.5)

  const data = useMemo(() => {
    const points = []
    for (let z = -3; z <= 3.01; z += 0.1) {
      points.push({
        z: Math.round(z * 10) / 10,
        hinge: Math.max(0, 1 - z),
        zeroOne: z < 0 ? 1 : 0,
      })
    }
    return points
  }, [])

  const hingeLoss = Math.max(0, 1 - zValue)
  const zeroOneLoss = zValue < 0 ? 1 : 0

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Interactive: Hinge Loss vs. 0/1 Loss
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Drag the slider to move a data point along the agreement axis (z = y(θ·x + θ₀)).
        Watch how hinge loss provides a smooth, convex upper bound on the 0/1 loss.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Agreement z:
          <input
            type="range"
            min={-3}
            max={3}
            step={0.1}
            value={zValue}
            onChange={(e) => setZValue(Number(e.target.value))}
            className="ml-2 w-40 align-middle accent-blue-500"
          />
          <span className="ml-2 font-mono text-blue-600 dark:text-blue-400 w-12 inline-block">
            {zValue.toFixed(1)}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-2">
          <span className="text-blue-800 dark:text-blue-200">Hinge loss: </span>
          <span className="font-mono font-semibold text-blue-700 dark:text-blue-300">{hingeLoss.toFixed(2)}</span>
        </div>
        <div className="rounded-md bg-orange-50 dark:bg-orange-900/30 px-3 py-2">
          <span className="text-orange-800 dark:text-orange-200">0/1 loss: </span>
          <span className="font-mono font-semibold text-orange-700 dark:text-orange-300">{zeroOneLoss}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="z"
            tick={{ fontSize: 11 }}
            label={{ value: 'Agreement z', position: 'insideBottom', offset: -2, fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            domain={[0, 4]}
            label={{ value: 'Loss', angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px' }}
            labelStyle={{ color: '#d1d5db' }}
            itemStyle={{ color: '#d1d5db' }}
            formatter={(value: number) => value.toFixed(2)}
          />
          <Legend verticalAlign="top" height={30} />
          <Line
            type="monotone"
            dataKey="hinge"
            name="Hinge Loss"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="stepAfter"
            dataKey="zeroOne"
            name="0/1 Loss"
            stroke="#f97316"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
          />
          <ReferenceLine x={zValue} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" />
          <ReferenceLine x={0} stroke="#6b7280" strokeDasharray="3 3" />
          <ReferenceLine x={1} stroke="#6b7280" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        z &lt; 0 = misclassified · z = 0 = on boundary · z = 1 = on margin · z &gt; 1 = safely correct
      </p>
    </div>
  )
}
