import { NavLink } from 'react-router-dom'

const chapters = [
  { path: '/ch1', label: 'Ch 1: Introduction to ML' },
  { path: '/ch2', label: 'Ch 2: Linear Classifiers & Perceptron' },
  { path: '/ch3', label: 'Ch 3: Hinge Loss & Regularization' },
  { path: '/ch4', label: 'Ch 4: Linear Regression' },
  { path: '/ch5', label: 'Ch 5: Nonlinear Classification & Kernels' },
  { path: '/ch6', label: 'Ch 6: Neural Networks — Neurons to Layers' },
  { path: '/ch7', label: 'Ch 7: Training NNs — SGD & Backprop' },
  { path: '/ch8', label: 'Ch 8: RNNs — Encoding Sequences' },
  { path: '/ch9', label: 'Ch 9: RNNs — Decoding & LSTMs' },
  { path: '/ch10', label: 'Ch 10: Convolutional Neural Networks' },
]

const resources = [
  { path: '/glossary', label: 'Glossary' },
  { path: '/formulas', label: 'Formula Sheet' },
  { path: '/flashcards', label: 'Flashcards' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/map', label: 'Concept Map' },
]

interface SidebarNavProps {
  onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-1.5 rounded text-sm transition-colors ${
      isActive
        ? 'bg-white/15 text-white font-medium'
        : 'text-primary-200 dark:text-gray-300 hover:bg-white/10 hover:text-white'
    }`

  return (
    <nav className="space-y-6">
      <div>
        <NavLink to="/" className={linkClass} onClick={onNavigate} end>
          Home
        </NavLink>
      </div>
      <div>
        <h3 className="px-3 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Chapters
        </h3>
        <ul className="space-y-0.5">
          {chapters.map(ch => (
            <li key={ch.path}>
              <NavLink to={ch.path} className={linkClass} onClick={onNavigate}>
                {ch.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="px-3 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Resources
        </h3>
        <ul className="space-y-0.5">
          {resources.map(r => (
            <li key={r.path}>
              <NavLink to={r.path} className={linkClass} onClick={onNavigate}>
                {r.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
