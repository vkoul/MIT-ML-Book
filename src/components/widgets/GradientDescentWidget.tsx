import { useState, useMemo } from 'react'
import { Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend, Scatter, ComposedChart } from 'recharts'

export function GradientDescentWidget() {
  const [learningRate, setLearningRate] = useState(0.1)

  const lossCurve = useMemo(() => {
    const points = []
    for (let t = -1; t <= 7.01; t += 0.1) {
      points.push({
        theta: Math.round(t * 10) / 10,
        loss: (t - 3) * (t - 3),
      })
    }
    return points
  }, [])

  const gdSteps = useMemo(() => {
    const steps: { step: number; theta: number; loss: number }[] = []
    let theta = 0
    for (let i = 0; i <= 15; i++) {
      const loss = (theta - 3) * (theta - 3)
      steps.push({ step: i, theta: Math.round(theta * 1000) / 1000, loss: Math.round(loss * 1000) / 1000 })
      const grad = 2 * (theta - 3)
      theta = theta - learningRate * grad
    }
    return steps
  }, [learningRate])

  const trajectoryOnCurve = useMemo(() => {
    return gdSteps.map(s => ({
      theta: s.theta,
      trajectory: s.loss,
    }))
  }, [gdSteps])

  const converged = gdSteps[gdSteps.length - 1].loss < 0.01
  const diverged = gdSteps[gdSteps.length - 1].loss > gdSteps[0].loss

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Interactive: Gradient Descent — Learning Rate Effect
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Adjust the learning rate to see how it affects convergence on J(θ) = (θ−3)².
        Start at θ=0, watch 15 gradient descent steps. Too small = slow; too large = oscillation or divergence.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-3">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Learning rate η:
          <input
            type="range"
            min={0.01}
            max={1.0}
            step={0.01}
            value={learningRate}
            onChange={(e) => setLearningRate(Number(e.target.value))}
            className="ml-2 w-40 align-middle accent-blue-500"
          />
          <span className="ml-2 font-mono text-blue-600 dark:text-blue-400 w-12 inline-block">
            {learningRate.toFixed(2)}
          </span>
        </label>
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          diverged
            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
            : converged
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
        }`}>
          {diverged ? 'Diverging!' : converged ? 'Converged' : 'Converging...'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
        <div className="rounded bg-gray-50 dark:bg-gray-700/50 px-2 py-1.5 text-center">
          <div className="text-gray-500 dark:text-gray-400">Start</div>
          <div className="font-mono font-semibold text-gray-800 dark:text-gray-200">θ = {gdSteps[0].theta}</div>
        </div>
        <div className="rounded bg-gray-50 dark:bg-gray-700/50 px-2 py-1.5 text-center">
          <div className="text-gray-500 dark:text-gray-400">After 15 steps</div>
          <div className="font-mono font-semibold text-gray-800 dark:text-gray-200">θ = {gdSteps[gdSteps.length - 1].theta.toFixed(3)}</div>
        </div>
        <div className="rounded bg-gray-50 dark:bg-gray-700/50 px-2 py-1.5 text-center">
          <div className="text-gray-500 dark:text-gray-400">Final loss</div>
          <div className="font-mono font-semibold text-gray-800 dark:text-gray-200">{gdSteps[gdSteps.length - 1].loss.toFixed(4)}</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="theta"
            type="number"
            domain={[-1, 7]}
            tick={{ fontSize: 11 }}
            label={{ value: 'θ', position: 'insideBottom', offset: -2, fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            domain={[0, 12]}
            label={{ value: 'J(θ)', angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px' }}
            labelStyle={{ color: '#d1d5db' }}
            itemStyle={{ color: '#d1d5db' }}
            formatter={(value: number) => value.toFixed(3)}
          />
          <Legend verticalAlign="top" height={30} />
          <Line
            data={lossCurve}
            type="monotone"
            dataKey="loss"
            name="J(θ) = (θ−3)²"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={false}
          />
          <Scatter
            data={trajectoryOnCurve}
            dataKey="trajectory"
            name="GD Steps"
            fill="#3b82f6"
            line={{ stroke: '#3b82f6', strokeWidth: 1.5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Try η=0.1 (smooth convergence), η=0.5 (fast but overshoots), η=0.9 (oscillates around minimum), η=1.0 (diverges).
      </p>
    </div>
  )
}
