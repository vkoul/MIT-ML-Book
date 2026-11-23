import { useEffect, useRef } from 'react'
import katex from 'katex'

interface FormulaEntry {
  name: string
  tex: string
  chapter: string
  note?: string
}

const formulas: FormulaEntry[] = [
  { name: 'Linear Classifier', tex: 'y = \\text{sign}(\\theta \\cdot x + \\theta_0)', chapter: 'Ch 2' },
  { name: 'Perceptron Update', tex: '\\theta \\leftarrow \\theta + y \\cdot x, \\quad \\theta_0 \\leftarrow \\theta_0 + y', chapter: 'Ch 2', note: 'Only on misclassification' },
  { name: 'Hinge Loss', tex: '\\text{Loss}_h = \\max(0,\\, 1 - y(\\theta \\cdot x + \\theta_0))', chapter: 'Ch 3' },
  { name: 'SVM Margin', tex: '\\text{margin} = \\frac{2}{\\|\\theta\\|}', chapter: 'Ch 3' },
  { name: 'Regularized Objective', tex: 'J(\\theta) = \\frac{1}{n}\\sum_{i=1}^{n} \\text{Loss}(y_i (\\theta \\cdot x_i + \\theta_0)) + \\frac{\\lambda}{2}\\|\\theta\\|^2', chapter: 'Ch 3' },
  { name: 'MSE Loss', tex: '\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\theta \\cdot x_i)^2', chapter: 'Ch 4' },
  { name: 'Closed-Form (OLS)', tex: '\\theta = (X^\\top X)^{-1} X^\\top y', chapter: 'Ch 4' },
  { name: 'Ridge Regression', tex: '\\theta = (X^\\top X + \\lambda I)^{-1} X^\\top y', chapter: 'Ch 4' },
  { name: 'Polynomial Kernel', tex: 'K(x, x\') = (x \\cdot x\' + c)^p', chapter: 'Ch 5' },
  { name: 'RBF Kernel', tex: 'K(x, x\') = \\exp\\!\\left(-\\frac{\\|x - x\'\\|^2}{2\\sigma^2}\\right)', chapter: 'Ch 5' },
  { name: 'Neuron Output', tex: 'a = f(w \\cdot x + b)', chapter: 'Ch 6', note: 'f = activation function' },
  { name: 'ReLU', tex: 'f(z) = \\max(0, z)', chapter: 'Ch 6' },
  { name: 'Softmax', tex: '\\sigma(z)_j = \\frac{e^{z_j}}{\\sum_{k} e^{z_k}}', chapter: 'Ch 6' },
  { name: 'SGD Update', tex: '\\theta \\leftarrow \\theta - \\eta \\nabla_{\\theta} \\text{Loss}(\\theta; x_i, y_i)', chapter: 'Ch 7' },
  { name: 'Backprop (chain rule)', tex: '\\frac{\\partial L}{\\partial w^{(l)}} = \\frac{\\partial L}{\\partial a^{(l)}} \\cdot \\frac{\\partial a^{(l)}}{\\partial z^{(l)}} \\cdot \\frac{\\partial z^{(l)}}{\\partial w^{(l)}}', chapter: 'Ch 7' },
  { name: 'RNN Hidden State', tex: 's_t = f(W s_{t-1} + W_x x_t)', chapter: 'Ch 8' },
  { name: 'LSTM Forget Gate', tex: 'f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)', chapter: 'Ch 9' },
  { name: 'LSTM Cell Update', tex: 'c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t', chapter: 'Ch 9' },
  { name: 'Convolution', tex: 'F(i,j) = \\text{ReLU}\\!\\left(\\sum_m \\sum_n I(i+m, j+n)\\, W(m,n) + b\\right)', chapter: 'Ch 10' },
  { name: 'Conv Output Size', tex: '\\text{out} = \\frac{\\text{in} - \\text{filter} + 2 \\cdot \\text{pad}}{\\text{stride}} + 1', chapter: 'Ch 10' },
]

function KaTeX({ tex }: { tex: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (ref.current) katex.render(tex, ref.current, { displayMode: true, throwOnError: false })
  }, [tex])
  return <span ref={ref} />
}

export default function Formulas() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Formula Sheet</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Key equations from all chapters, rendered with KaTeX.
      </p>
      <div className="space-y-4">
        {formulas.map((f, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{f.name}</h3>
              <span className="text-xs text-gray-400">{f.chapter}</span>
            </div>
            <div className="overflow-x-auto text-center">
              <KaTeX tex={f.tex} />
            </div>
            {f.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{f.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
