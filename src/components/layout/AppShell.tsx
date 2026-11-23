import { useState, useEffect, type ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { SearchModal } from './SearchModal'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isDark, toggle: toggleDark } = useDarkMode()
  const progress = useReadingProgress()
  useKeyboardNav()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen flex">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary-500 z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-3 left-3 z-40 lg:hidden p-2 rounded-lg bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {sidebarOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-primary-900 dark:bg-gray-950 text-white z-30 overflow-y-auto transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shrink-0`}
      >
        <div className="p-4">
          <h1 className="text-lg font-bold text-white mb-1">MITML</h1>
          <p className="text-xs text-primary-200 dark:text-gray-400">Machine Learning — Interactive Textbook</p>
          <button
            onClick={() => { setSearchOpen(true); setSidebarOpen(false) }}
            className="mt-3 flex items-center gap-2 w-full px-3 py-1.5 rounded text-sm text-primary-200 dark:text-gray-400 bg-primary-800/50 dark:bg-gray-900 hover:bg-primary-800 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Search
            <kbd className="ml-auto text-xs opacity-60">Ctrl+K</kbd>
          </button>
        </div>
        <div className="px-2 pb-4">
          <SidebarNav onNavigate={() => setSidebarOpen(false)} />
        </div>
        <div className="px-4 pb-4 mt-auto">
          <button
            onClick={toggleDark}
            className="flex items-center gap-2 text-sm text-primary-200 dark:text-gray-400 hover:text-white transition-colors"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 lg:ml-0">
        {children}
      </main>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
