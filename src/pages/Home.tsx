import { Link } from 'react-router-dom'

const chapters = [
  { path: '/ch1', num: 1, title: 'Introduction to Machine Learning', desc: 'Supervised & unsupervised learning, features, generalization, overfitting' },
  { path: '/ch2', num: 2, title: 'Linear Classifiers & Perceptron', desc: 'Decision boundaries, perceptron algorithm, convergence theorem' },
  { path: '/ch3', num: 3, title: 'Hinge Loss & Regularization', desc: 'Margin maximization, SVM, L2 regularization, gradient descent' },
  { path: '/ch4', num: 4, title: 'Linear Regression', desc: 'MSE, ordinary least squares, ridge regression, bias-variance tradeoff' },
  { path: '/ch5', num: 5, title: 'Nonlinear Classification & Kernels', desc: 'Feature maps, kernel trick, RBF & polynomial kernels' },
  { path: '/ch6', num: 6, title: 'Neural Networks — Neurons to Layers', desc: 'Artificial neurons, activations (ReLU, sigmoid, tanh), deep networks' },
  { path: '/ch7', num: 7, title: 'Training NNs — SGD & Backprop', desc: 'Stochastic gradient descent, backpropagation, dropout, weight init' },
  { path: '/ch8', num: 8, title: 'RNNs — Encoding Sequences', desc: 'Sequential data, recurrent networks, hidden state, BPTT' },
  { path: '/ch9', num: 9, title: 'RNNs — Decoding & LSTMs', desc: 'Language models, LSTM/GRU, encoder-decoder, beam search' },
  { path: '/ch10', num: 10, title: 'Convolutional Neural Networks', desc: 'Convolution, filters, pooling, stride, padding, translation invariance' },
]

const resources = [
  { path: '/glossary', label: 'Glossary', desc: '73 key terms with definitions' },
  { path: '/formulas', label: 'Formula Sheet', desc: '20+ essential equations in one place' },
  { path: '/flashcards', label: 'Flashcards', desc: '100 flip-animated review cards' },
  { path: '/case-studies', label: 'Case Studies', desc: 'Real-world ML applications by chapter' },
  { path: '/map', label: 'Concept Map', desc: 'Prerequisite DAG across all concepts' },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          MITML Interactive Textbook
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A companion guide to machine learning — from linear models to deep learning
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 max-w-xl mx-auto">
          Designed to follow along with MIT&apos;s 6.86x course on edX
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/ch1"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Reading
          </Link>
          <Link
            to="/flashcards"
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Review Flashcards
          </Link>
        </div>
      </div>

      {/* About */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">About This Textbook</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This interactive textbook is designed to follow along with MIT&apos;s 6.86x
          &ldquo;Machine Learning with Python&rdquo; course on edX. It covers the mathematical
          foundations and practical intuitions behind machine learning — from linear classifiers
          and SVMs through neural networks, RNNs, LSTMs, and CNNs. The material is structured
          to mirror the course curriculum, but this is an independent, community-created resource
          — not official MIT or edX content.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
          Each chapter includes interactive quizzes, decision scenarios, expandable deep-dives,
          and hoverable concept tooltips with a full prerequisite graph.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { num: '10', label: 'Chapters' },
            { num: '73', label: 'Concepts' },
            { num: '100', label: 'Flashcards' },
            { num: '20+', label: 'Formulas' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{s.num}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
        <div className="space-y-2">
          {chapters.map(ch => (
            <Link
              key={ch.path}
              to={ch.path}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-semibold">
                {ch.num}
              </span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ch.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{ch.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resources.map(r => (
            <Link
              key={r.path}
              to={r.path}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white">{r.label}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{r.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            ['Concept Tooltips', 'Hover any linked term to see its definition, with nested prerequisite chains'],
            ['Interactive Quizzes', 'Multiple-choice questions with instant feedback and explanations'],
            ['Decision Scenarios', 'Real-world dilemmas that test your engineering intuition'],
            ['KaTeX Math', 'Beautiful typeset equations — display and inline — throughout every chapter'],
            ['Dark Mode', 'System-aware with manual toggle, persisted across sessions'],
            ['Full-Text Search', 'Ctrl+K to search all chapters and resources instantly'],
            ['Keyboard Navigation', 'Arrow keys to move between chapters'],
            ['Mobile Responsive', 'Collapsible sidebar for comfortable reading on any device'],
          ].map(([title, desc]) => (
            <div key={title} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="font-medium text-gray-900 dark:text-white">{title}</div>
              <div className="text-gray-500 dark:text-gray-400 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-10 p-5 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">Disclaimer</h2>
        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
          <li>
            This is an <strong>unofficial, community-created</strong> companion resource.
            It is designed to follow along with MIT&apos;s 6.86x course but is <strong>not
            the course itself</strong>. It is not endorsed by, affiliated with, or certified
            by MIT, MITx, or edX.
          </li>
          <li>
            The content draws on publicly available course material and the author&apos;s
            understanding of the topics. It may contain errors, simplifications, or omissions.
            Always refer to the official course lectures, notes, and assignments as the
            authoritative source of truth.
          </li>
          <li>
            This textbook is provided <strong>as-is for educational purposes only</strong>.
            No warranty of accuracy or completeness is implied. Use at your own discretion
            as a supplementary study aid.
          </li>
          <li>
            If you find any errors, please open an issue on the GitHub repository.
          </li>
        </ul>
      </section>

      {/* Footer credit */}
      <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pb-8">
        Built with React, TypeScript, Vite, and Tailwind CSS
      </footer>
    </div>
  )
}
