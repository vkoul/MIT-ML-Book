export interface ConceptNode {
  id: string
  prerequisites: string[]
  chapterOrigin: string
  category: string
}

export const conceptGraph: Record<string, ConceptNode> = {
  // ── Ch1: Introduction to ML ──
  'supervised-learning': { id: 'supervised-learning', prerequisites: [], chapterOrigin: 'ch1', category: 'fundamentals' },
  'unsupervised-learning': { id: 'unsupervised-learning', prerequisites: [], chapterOrigin: 'ch1', category: 'fundamentals' },
  'feature-vector': { id: 'feature-vector', prerequisites: [], chapterOrigin: 'ch1', category: 'fundamentals' },
  'training-set': { id: 'training-set', prerequisites: ['feature-vector'], chapterOrigin: 'ch1', category: 'fundamentals' },
  'generalization': { id: 'generalization', prerequisites: ['training-set'], chapterOrigin: 'ch1', category: 'fundamentals' },
  'overfitting': { id: 'overfitting', prerequisites: ['generalization'], chapterOrigin: 'ch1', category: 'fundamentals' },
  'hypothesis-class': { id: 'hypothesis-class', prerequisites: [], chapterOrigin: 'ch1', category: 'fundamentals' },

  // ── Ch2: Linear Classifiers & Perceptron ──
  'linear-classifier': { id: 'linear-classifier', prerequisites: ['feature-vector'], chapterOrigin: 'ch2', category: 'classification' },
  'perceptron': { id: 'perceptron', prerequisites: ['linear-classifier'], chapterOrigin: 'ch2', category: 'classification' },
  'linear-separability': { id: 'linear-separability', prerequisites: ['linear-classifier'], chapterOrigin: 'ch2', category: 'classification' },
  'decision-boundary': { id: 'decision-boundary', prerequisites: [], chapterOrigin: 'ch2', category: 'classification' },
  'margin': { id: 'margin', prerequisites: ['linear-classifier', 'decision-boundary'], chapterOrigin: 'ch2', category: 'classification' },

  // ── Ch3: Hinge Loss & Regularization ──
  'hinge-loss': { id: 'hinge-loss', prerequisites: ['margin'], chapterOrigin: 'ch3', category: 'classification' },
  'regularization': { id: 'regularization', prerequisites: ['overfitting'], chapterOrigin: 'ch3', category: 'optimization' },
  'svm': { id: 'svm', prerequisites: ['hinge-loss', 'regularization', 'margin'], chapterOrigin: 'ch3', category: 'classification' },
  'gradient-descent': { id: 'gradient-descent', prerequisites: [], chapterOrigin: 'ch3', category: 'optimization' },
  'hyperparameter': { id: 'hyperparameter', prerequisites: [], chapterOrigin: 'ch3', category: 'fundamentals' },

  // ── Ch4: Linear Regression ──
  'linear-regression': { id: 'linear-regression', prerequisites: ['feature-vector'], chapterOrigin: 'ch4', category: 'regression' },
  'mse': { id: 'mse', prerequisites: [], chapterOrigin: 'ch4', category: 'regression' },
  'closed-form-solution': { id: 'closed-form-solution', prerequisites: ['linear-regression', 'mse'], chapterOrigin: 'ch4', category: 'regression' },
  'ridge-regression': { id: 'ridge-regression', prerequisites: ['closed-form-solution', 'regularization'], chapterOrigin: 'ch4', category: 'regression' },
  'bias-variance-tradeoff': { id: 'bias-variance-tradeoff', prerequisites: ['overfitting', 'generalization'], chapterOrigin: 'ch4', category: 'fundamentals' },

  // ── Ch5: Nonlinear Classification & Kernels ──
  'feature-mapping': { id: 'feature-mapping', prerequisites: ['linear-classifier', 'linear-separability'], chapterOrigin: 'ch5', category: 'classification' },
  'kernel-function': { id: 'kernel-function', prerequisites: ['feature-mapping'], chapterOrigin: 'ch5', category: 'classification' },
  'kernel-trick': { id: 'kernel-trick', prerequisites: ['kernel-function'], chapterOrigin: 'ch5', category: 'classification' },
  'rbf-kernel': { id: 'rbf-kernel', prerequisites: ['kernel-function'], chapterOrigin: 'ch5', category: 'classification' },
  'polynomial-kernel': { id: 'polynomial-kernel', prerequisites: ['kernel-function'], chapterOrigin: 'ch5', category: 'classification' },

  // ── Ch6: Neural Networks — Neurons to Layers ──
  'activation-function': { id: 'activation-function', prerequisites: [], chapterOrigin: 'ch6', category: 'neural-networks' },
  'artificial-neuron': { id: 'artificial-neuron', prerequisites: ['activation-function'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'hidden-layer': { id: 'hidden-layer', prerequisites: ['artificial-neuron'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'feed-forward-network': { id: 'feed-forward-network', prerequisites: ['artificial-neuron', 'hidden-layer'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'weight-matrix': { id: 'weight-matrix', prerequisites: [], chapterOrigin: 'ch6', category: 'neural-networks' },
  'relu': { id: 'relu', prerequisites: ['activation-function'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'sigmoid': { id: 'sigmoid', prerequisites: ['activation-function'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'tanh-activation': { id: 'tanh-activation', prerequisites: ['activation-function'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'vanishing-gradient': { id: 'vanishing-gradient', prerequisites: ['backpropagation'], chapterOrigin: 'ch6', category: 'neural-networks' },
  'deep-learning': { id: 'deep-learning', prerequisites: ['feed-forward-network'], chapterOrigin: 'ch6', category: 'neural-networks' },

  // ── Ch7: Training NNs — SGD & Backprop ──
  'loss-function': { id: 'loss-function', prerequisites: [], chapterOrigin: 'ch7', category: 'optimization' },
  'learning-rate': { id: 'learning-rate', prerequisites: [], chapterOrigin: 'ch7', category: 'optimization' },
  'sgd': { id: 'sgd', prerequisites: ['loss-function', 'learning-rate'], chapterOrigin: 'ch7', category: 'optimization' },
  'forward-pass': { id: 'forward-pass', prerequisites: ['feed-forward-network'], chapterOrigin: 'ch7', category: 'neural-networks' },
  'backpropagation': { id: 'backpropagation', prerequisites: ['forward-pass', 'loss-function'], chapterOrigin: 'ch7', category: 'neural-networks' },
  'backward-pass': { id: 'backward-pass', prerequisites: ['backpropagation', 'forward-pass'], chapterOrigin: 'ch7', category: 'neural-networks' },
  'non-convex-optimization': { id: 'non-convex-optimization', prerequisites: ['loss-function'], chapterOrigin: 'ch7', category: 'optimization' },
  'saddle-point': { id: 'saddle-point', prerequisites: ['non-convex-optimization'], chapterOrigin: 'ch7', category: 'optimization' },
  'weight-initialization': { id: 'weight-initialization', prerequisites: ['weight-matrix'], chapterOrigin: 'ch7', category: 'neural-networks' },
  'xavier-init': { id: 'xavier-init', prerequisites: ['weight-initialization'], chapterOrigin: 'ch7', category: 'neural-networks' },
  'epoch': { id: 'epoch', prerequisites: ['sgd'], chapterOrigin: 'ch7', category: 'optimization' },
  'mini-batch': { id: 'mini-batch', prerequisites: ['sgd'], chapterOrigin: 'ch7', category: 'optimization' },
  'dropout': { id: 'dropout', prerequisites: ['hidden-layer'], chapterOrigin: 'ch7', category: 'neural-networks' },
  'weight-decay': { id: 'weight-decay', prerequisites: ['loss-function'], chapterOrigin: 'ch7', category: 'optimization' },

  // ── Ch8: RNNs — Encoding Sequences ──
  'sequential-data': { id: 'sequential-data', prerequisites: [], chapterOrigin: 'ch8', category: 'neural-networks' },
  'one-hot-encoding': { id: 'one-hot-encoding', prerequisites: [], chapterOrigin: 'ch8', category: 'fundamentals' },
  'rnn': { id: 'rnn', prerequisites: ['hidden-layer', 'activation-function', 'sequential-data'], chapterOrigin: 'ch8', category: 'neural-networks' },
  'hidden-state': { id: 'hidden-state', prerequisites: ['rnn'], chapterOrigin: 'ch8', category: 'neural-networks' },
  'weight-sharing': { id: 'weight-sharing', prerequisites: [], chapterOrigin: 'ch8', category: 'neural-networks' },
  'bptt': { id: 'bptt', prerequisites: ['rnn', 'backpropagation'], chapterOrigin: 'ch8', category: 'neural-networks' },

  // ── Ch9: RNNs — Decoding & LSTMs ──
  'language-model': { id: 'language-model', prerequisites: ['sequential-data'], chapterOrigin: 'ch9', category: 'neural-networks' },
  'markov-model': { id: 'markov-model', prerequisites: ['language-model'], chapterOrigin: 'ch9', category: 'fundamentals' },
  'maximum-likelihood-estimation': { id: 'maximum-likelihood-estimation', prerequisites: [], chapterOrigin: 'ch9', category: 'fundamentals' },
  'softmax': { id: 'softmax', prerequisites: [], chapterOrigin: 'ch9', category: 'neural-networks' },
  'lstm': { id: 'lstm', prerequisites: ['rnn', 'vanishing-gradient'], chapterOrigin: 'ch9', category: 'neural-networks' },
  'gru': { id: 'gru', prerequisites: ['lstm'], chapterOrigin: 'ch9', category: 'neural-networks' },
  'encoder-decoder': { id: 'encoder-decoder', prerequisites: ['rnn', 'hidden-state'], chapterOrigin: 'ch9', category: 'neural-networks' },
  'beam-search': { id: 'beam-search', prerequisites: ['language-model', 'softmax'], chapterOrigin: 'ch9', category: 'neural-networks' },
  'greedy-decoding': { id: 'greedy-decoding', prerequisites: ['language-model', 'softmax'], chapterOrigin: 'ch9', category: 'neural-networks' },

  // ── Ch10: Convolutional Neural Networks ──
  'cnn': { id: 'cnn', prerequisites: ['feed-forward-network', 'relu'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'filter-kernel': { id: 'filter-kernel', prerequisites: ['weight-matrix'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'convolution': { id: 'convolution', prerequisites: ['filter-kernel'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'feature-map': { id: 'feature-map', prerequisites: ['convolution'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'pooling': { id: 'pooling', prerequisites: ['feature-map'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'max-pooling': { id: 'max-pooling', prerequisites: ['pooling'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'stride': { id: 'stride', prerequisites: ['convolution'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'padding': { id: 'padding', prerequisites: ['convolution'], chapterOrigin: 'ch10', category: 'neural-networks' },
  'translation-invariance': { id: 'translation-invariance', prerequisites: ['pooling'], chapterOrigin: 'ch10', category: 'neural-networks' },
}

export function isDAG(): boolean {
  const visited = new Set<string>()
  const stack = new Set<string>()

  function dfs(id: string): boolean {
    if (stack.has(id)) return false
    if (visited.has(id)) return true
    stack.add(id)
    const node = conceptGraph[id]
    if (node) {
      for (const pre of node.prerequisites) {
        if (!dfs(pre)) return false
      }
    }
    stack.delete(id)
    visited.add(id)
    return true
  }

  for (const id of Object.keys(conceptGraph)) {
    if (!dfs(id)) return false
  }
  return true
}
