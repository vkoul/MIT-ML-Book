export interface SearchEntry {
  title: string
  path: string
  keywords: string[]
  type: 'chapter' | 'resource'
}

export const searchIndex: SearchEntry[] = [
  { title: 'Ch 1: Introduction to Machine Learning', path: '/ch1', keywords: ['machine learning', 'features', 'labels', 'training', 'test error', 'decision boundary', 'classifier', 'supervised', 'i.i.d.'], type: 'chapter' },
  { title: 'Ch 2: Linear Classifiers & Perceptron', path: '/ch2', keywords: ['perceptron', 'linear classifier', 'hyperplane', 'weight vector', 'convergence', 'update rule', 'linearly separable', 'signed distance'], type: 'chapter' },
  { title: 'Ch 3: Hinge Loss, Margin & Regularization', path: '/ch3', keywords: ['hinge loss', 'margin', 'SVM', 'support vector machine', 'regularization', 'L1', 'L2', 'lambda', 'overfitting', 'objective'], type: 'chapter' },
  { title: 'Ch 4: Linear Regression', path: '/ch4', keywords: ['linear regression', 'least squares', 'closed-form', 'ridge regression', 'MSE', 'normal equation', 'bias-variance', 'regularization'], type: 'chapter' },
  { title: 'Ch 5: Nonlinear Classification & Kernels', path: '/ch5', keywords: ['kernel trick', 'polynomial kernel', 'RBF', 'Gaussian kernel', 'Gram matrix', 'feature map', 'Mercer', 'nonlinear', 'SVM'], type: 'chapter' },
  { title: 'Ch 6: Neural Networks — Neurons to Layers', path: '/ch6', keywords: ['neural network', 'neuron', 'activation', 'ReLU', 'sigmoid', 'hidden layer', 'feedforward', 'universal approximation', 'softmax'], type: 'chapter' },
  { title: 'Ch 7: Training NNs — SGD & Backpropagation', path: '/ch7', keywords: ['SGD', 'stochastic gradient descent', 'backpropagation', 'chain rule', 'learning rate', 'mini-batch', 'vanishing gradient', 'momentum', 'Adam'], type: 'chapter' },
  { title: 'Ch 8: RNNs — Encoding Sequences', path: '/ch8', keywords: ['RNN', 'recurrent', 'hidden state', 'sequence', 'encoding', 'weight sharing', 'time step', 'vanishing gradient', 'BPTT'], type: 'chapter' },
  { title: 'Ch 9: RNNs — Decoding & LSTMs', path: '/ch9', keywords: ['LSTM', 'GRU', 'decoding', 'seq2seq', 'encoder-decoder', 'forget gate', 'input gate', 'output gate', 'cell state', 'teacher forcing'], type: 'chapter' },
  { title: 'Ch 10: Convolutional Neural Networks', path: '/ch10', keywords: ['CNN', 'convolution', 'filter', 'kernel', 'pooling', 'stride', 'padding', 'feature map', 'AlexNet', 'image classification'], type: 'chapter' },
  { title: 'Glossary', path: '/glossary', keywords: ['glossary', 'definitions', 'terms', 'vocabulary'], type: 'resource' },
  { title: 'Formula Sheet', path: '/formulas', keywords: ['formula', 'equation', 'math', 'reference'], type: 'resource' },
  { title: 'Flashcards', path: '/flashcards', keywords: ['flashcard', 'review', 'study', 'quiz'], type: 'resource' },
  { title: 'Concept Map', path: '/map', keywords: ['concept map', 'graph', 'relationships', 'prerequisites'], type: 'resource' },
]

export function search(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  return searchIndex
    .map(entry => {
      let score = 0
      if (entry.title.toLowerCase().includes(q)) score += 10
      for (const kw of entry.keywords) {
        if (kw.includes(q)) score += 5
        if (q.includes(kw)) score += 3
      }
      return { entry, score }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.entry)
}
