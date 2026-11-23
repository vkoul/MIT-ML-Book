import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const chapterRoutes = [
  '/ch1', '/ch2', '/ch3', '/ch4', '/ch5',
  '/ch6', '/ch7', '/ch8', '/ch9', '/ch10',
]

export function useKeyboardNav() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const idx = chapterRoutes.indexOf(location.pathname)
      if (idx === -1) return

      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault()
        navigate(chapterRoutes[idx - 1])
      } else if (e.key === 'ArrowRight' && idx < chapterRoutes.length - 1) {
        e.preventDefault()
        navigate(chapterRoutes[idx + 1])
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [location.pathname, navigate])
}
