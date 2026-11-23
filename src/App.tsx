import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { TooltipProvider } from './components/tooltip/TooltipProvider'
import { AppShell } from './components/layout/AppShell'

const Ch1 = lazy(() => import('./chapters/Ch1'))
const Ch2 = lazy(() => import('./chapters/Ch2'))
const Ch3 = lazy(() => import('./chapters/Ch3'))
const Ch4 = lazy(() => import('./chapters/Ch4'))
const Ch5 = lazy(() => import('./chapters/Ch5'))
const Ch6 = lazy(() => import('./chapters/Ch6'))
const Ch7 = lazy(() => import('./chapters/Ch7'))
const Ch8 = lazy(() => import('./chapters/Ch8'))
const Ch9 = lazy(() => import('./chapters/Ch9'))
const Ch10 = lazy(() => import('./chapters/Ch10'))

const Glossary = lazy(() => import('./pages/Glossary'))
const Formulas = lazy(() => import('./pages/Formulas'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const ConceptMap = lazy(() => import('./pages/ConceptMap'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Home = lazy(() => import('./pages/Home'))

const Loading = () => (
  <div className="p-8 text-gray-400 flex items-center justify-center min-h-[50vh]">
    <div className="animate-pulse">Loading...</div>
  </div>
)

function App() {
  return (
    <TooltipProvider>
      <AppShell>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ch1" element={<Ch1 />} />
            <Route path="/ch2" element={<Ch2 />} />
            <Route path="/ch3" element={<Ch3 />} />
            <Route path="/ch4" element={<Ch4 />} />
            <Route path="/ch5" element={<Ch5 />} />
            <Route path="/ch6" element={<Ch6 />} />
            <Route path="/ch7" element={<Ch7 />} />
            <Route path="/ch8" element={<Ch8 />} />
            <Route path="/ch9" element={<Ch9 />} />
            <Route path="/ch10" element={<Ch10 />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/formulas" element={<Formulas />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/map" element={<ConceptMap />} />
            <Route path="/case-studies" element={<CaseStudies />} />
          </Routes>
        </Suspense>
      </AppShell>
    </TooltipProvider>
  )
}

export default App
