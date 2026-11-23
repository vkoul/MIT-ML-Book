# MITML — Interactive Machine Learning Textbook

An interactive companion textbook designed to follow along with **MIT 6.86x: Machine Learning with Python — From Linear Models to Deep Learning** on edX. Built with React, TypeScript, and Vite. This is an unofficial, community-created resource — not endorsed by MIT or edX.

## Features

- **10 chapters** covering the full MIT 6.86x curriculum (linear classifiers → CNNs)
- **73 concept definitions** with prerequisite DAG and hoverable tooltips
- **KaTeX math rendering** — 20+ key formulas rendered inline and in display mode
- **Interactive quizzes** — MCQs with instant feedback and explanations
- **Decision scenarios** — real-world dilemmas with guided reasoning
- **100 flashcards** — flip-animated, filterable by chapter
- **Full-text search** — Ctrl+K modal with keyboard navigation
- **Dark mode** — system-aware with manual toggle and localStorage persistence
- **Reading progress bar** — scroll-tracking per page
- **Keyboard navigation** — arrow keys between chapters
- **5 resource pages** — Glossary, Formula Sheet, Flashcards, Case Studies, Concept Map
- **Mobile-responsive** — collapsible sidebar with hamburger toggle
- **Code-split** — lazy-loaded routes, production build <1.1 MB gzipped

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript 7 |
| Build | Vite 8.3 |
| Styling | Tailwind CSS 3 |
| Math | KaTeX 0.16 |
| Charts | Recharts 2 |
| Animation | Framer Motion 11 |
| Tooltips | @floating-ui/react 0.26 |
| State | Zustand 5 |
| Routing | react-router-dom 7 (HashRouter) |

## Getting Started

```bash
npm install
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build to dist/
npx vite preview   # Preview production build at http://localhost:4173
```

## Project Structure

```
src/
├── chapters/          # Ch1.tsx – Ch10.tsx (chapter content)
├── components/
│   ├── content/       # MathBlock, ChapterLayout, ExpandableReading,
│   │                  # KeyTakeaways, DecisionScenario, QuizSection, FlashCard
│   ├── layout/        # AppShell, SidebarNav, SearchModal
│   └── tooltip/       # ConceptLink, NestedTooltip, TooltipProvider
├── data/
│   ├── conceptDefinitions.tsx   # 73 concepts with definitions & prerequisites
│   ├── conceptGraph.ts          # DAG-validated prerequisite graph
│   ├── flashcardData.ts         # 100 flashcards (10 per chapter)
│   └── searchIndex.ts           # Full-text search index
├── hooks/
│   ├── useDarkMode.ts           # Dark mode with localStorage + system pref
│   ├── useReadingProgress.ts    # Scroll progress tracking
│   └── useKeyboardNav.ts        # Arrow-key chapter navigation
├── pages/             # Glossary, Formulas, Flashcards, CaseStudies, ConceptMap
├── App.tsx            # Routes + lazy loading
└── main.tsx           # Entry point (HashRouter)
```

## Chapter Index

| # | Title | Topics |
|---|-------|--------|
| 1 | Introduction to ML | Supervised/unsupervised learning, features, generalization |
| 2 | Linear Classifiers & Perceptron | Decision boundaries, perceptron algorithm, convergence |
| 3 | Hinge Loss & Regularization | Margin, SVM, L2 regularization, gradient descent |
| 4 | Linear Regression | MSE, OLS, ridge regression, bias-variance tradeoff |
| 5 | Nonlinear Classification & Kernels | Feature maps, kernel trick, RBF, polynomial kernels |
| 6 | Neural Networks — Neurons to Layers | Neurons, activations, ReLU/sigmoid/tanh, deep learning |
| 7 | Training NNs — SGD & Backprop | SGD, backpropagation, initialization, dropout |
| 8 | RNNs — Encoding Sequences | Sequential data, RNN, hidden state, BPTT |
| 9 | RNNs — Decoding & LSTMs | Language models, LSTM/GRU, encoder-decoder, beam search |
| 10 | Convolutional Neural Networks | Convolution, filters, pooling, stride, padding, CNNs |

## Component API Reference

### MathBlock
```tsx
<MathBlock math="\theta \cdot x + \theta_0" />          // display mode (default)
<MathBlock math="y = f(x)" inline />                     // inline mode
```

### QuizSection
```tsx
<QuizSection questions={[
  { question: "...", options: ["A", "B", "C", "D"], correctIndex: 1, explanation: "..." }
]} />
```

### DecisionScenario
```tsx
<DecisionScenario
  title="Choosing a Classifier"
  scenario="You have a small, linearly separable dataset..."
  options={[
    { label: "Option A", feedback: "Why A is/isn't right...", isCorrect: false },
    { label: "Option B", feedback: "Why B works...", isCorrect: true },
  ]}
/>
```

## Deployment

Push to GitHub and enable GitHub Pages (Actions workflow included):

```bash
git init && git add -A && git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

The `.github/workflows/deploy.yml` handles build + deploy automatically.

## License

Educational use. Based on MIT 6.86x course material.
