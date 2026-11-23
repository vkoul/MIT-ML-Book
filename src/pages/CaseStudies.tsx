export default function CaseStudies() {
  const cases = [
    {
      title: 'Spam Detection with Perceptron',
      chapter: 'Ch 2',
      summary: 'Build a binary email classifier using the perceptron algorithm. Explores feature engineering (bag-of-words, TF-IDF) and evaluates convergence on a linearly separable dataset.',
      takeaway: 'Linear classifiers work surprisingly well when features are well-engineered.',
    },
    {
      title: 'Housing Price Prediction',
      chapter: 'Ch 4',
      summary: 'Predict median house values using linear and ridge regression. Demonstrates the bias-variance tradeoff: an unregularized model overfits on small datasets while ridge regression generalizes better.',
      takeaway: 'Regularization is essential when features outnumber samples.',
    },
    {
      title: 'Handwritten Digit Classification (MNIST)',
      chapter: 'Ch 5 & 10',
      summary: 'Compare kernel SVMs and CNNs on the MNIST dataset. Kernel methods achieve ~98% accuracy; a simple CNN reaches 99%+ by learning spatial features automatically.',
      takeaway: 'CNNs learn better features than hand-crafted kernels for image tasks.',
    },
    {
      title: 'Sentiment Analysis with RNNs',
      chapter: 'Ch 8–9',
      summary: 'Classify movie reviews as positive/negative using a vanilla RNN, then upgrade to an LSTM. The LSTM captures long-range dependencies (e.g., negation words far from the adjective they modify).',
      takeaway: 'Gating mechanisms are critical for tasks requiring long-range context.',
    },
    {
      title: 'Neural Network Training Dynamics',
      chapter: 'Ch 7',
      summary: 'Visualize the loss landscape of a 2-layer network, comparing SGD with different learning rates, batch sizes, and initializations. Observe saddle points, learning rate warmup, and the effect of momentum.',
      takeaway: 'Training dynamics are highly sensitive to hyperparameters — small changes in learning rate can mean the difference between convergence and divergence.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Case Studies</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Real-world applications that connect theory to practice.
      </p>
      <div className="space-y-5">
        {cases.map((c, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">{c.title}</h2>
              <span className="text-xs text-gray-400 shrink-0 ml-3">{c.chapter}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{c.summary}</p>
            <div className="text-sm bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded px-3 py-2 text-primary-800 dark:text-primary-200">
              <span className="font-medium">Key Takeaway:</span> {c.takeaway}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
