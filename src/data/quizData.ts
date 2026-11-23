export interface QuizQuestion {
  id: string
  question: string
  options: { id: string; text: string }[]
  correctId: string
  explanation: string
}

export const quizData: Record<string, QuizQuestion[]> = {
  ch1: [
    {
      id: 'ch1-q1',
      question: 'Which type of learning uses labelled training data to learn a mapping from inputs to outputs?',
      options: [
        { id: 'a', text: 'Unsupervised learning' },
        { id: 'b', text: 'Supervised learning' },
        { id: 'c', text: 'Reinforcement learning' },
        { id: 'd', text: 'Self-supervised learning' },
      ],
      correctId: 'b',
      explanation: 'Supervised learning is defined by the use of labelled examples (x, y) where the algorithm learns to predict y from x.',
    },
    {
      id: 'ch1-q2',
      question: 'What does "generalization" refer to in machine learning?',
      options: [
        { id: 'a', text: 'Memorizing all training examples perfectly' },
        { id: 'b', text: 'Performing well on unseen data not in the training set' },
        { id: 'c', text: 'Increasing the size of the training set' },
        { id: 'd', text: 'Using more features in the model' },
      ],
      correctId: 'b',
      explanation: 'Generalization measures how well a model performs on new, previously unseen examples rather than just memorizing training data.',
    },
    {
      id: 'ch1-q3',
      question: 'What is overfitting?',
      options: [
        { id: 'a', text: 'The model performs equally well on training and test data' },
        { id: 'b', text: 'The model is too simple to capture patterns in the data' },
        { id: 'c', text: 'The model fits training data too closely and fails to generalize' },
        { id: 'd', text: 'The model has too few parameters' },
      ],
      correctId: 'c',
      explanation: 'Overfitting occurs when a model learns noise and specifics of the training data rather than the underlying pattern, leading to poor test performance.',
    },
    {
      id: 'ch1-q4',
      question: 'A feature vector is best described as:',
      options: [
        { id: 'a', text: 'The label assigned to each data point' },
        { id: 'b', text: 'A numerical representation of an input example' },
        { id: 'c', text: 'The output of a trained model' },
        { id: 'd', text: 'A list of all possible classes' },
      ],
      correctId: 'b',
      explanation: 'A feature vector is the numerical representation x ∈ ℝᵈ that encodes the measurable attributes of a data point.',
    },
    {
      id: 'ch1-q5',
      question: 'The hypothesis class H refers to:',
      options: [
        { id: 'a', text: 'The set of all possible datasets' },
        { id: 'b', text: 'The set of functions the learning algorithm considers' },
        { id: 'c', text: 'The error rate of the model' },
        { id: 'd', text: 'The number of training examples needed' },
      ],
      correctId: 'b',
      explanation: 'The hypothesis class is the set of candidate functions (e.g., all linear classifiers) from which the algorithm selects the best fit.',
    },
  ],

  ch2: [
    {
      id: 'ch2-q1',
      question: 'A linear classifier makes predictions based on:',
      options: [
        { id: 'a', text: 'The distance to the nearest training point' },
        { id: 'b', text: 'The sign of θ·x + θ₀' },
        { id: 'c', text: 'A decision tree structure' },
        { id: 'd', text: 'The average of all feature values' },
      ],
      correctId: 'b',
      explanation: 'A linear classifier predicts y = sign(θ·x + θ₀), where θ is the weight vector and θ₀ is the offset (bias).',
    },
    {
      id: 'ch2-q2',
      question: 'The perceptron algorithm updates its weights only when:',
      options: [
        { id: 'a', text: 'Every training example is processed' },
        { id: 'b', text: 'The current example is correctly classified' },
        { id: 'c', text: 'The current example is misclassified' },
        { id: 'd', text: 'The learning rate exceeds a threshold' },
      ],
      correctId: 'c',
      explanation: 'The perceptron only updates θ and θ₀ when it makes a mistake: θ ← θ + y·x, θ₀ ← θ₀ + y.',
    },
    {
      id: 'ch2-q3',
      question: 'What does it mean for data to be linearly separable?',
      options: [
        { id: 'a', text: 'The data can be split into exactly two clusters' },
        { id: 'b', text: 'A hyperplane can perfectly separate the positive and negative examples' },
        { id: 'c', text: 'All features are linearly correlated' },
        { id: 'd', text: 'The perceptron converges in one pass' },
      ],
      correctId: 'b',
      explanation: 'Data is linearly separable if there exists a hyperplane θ·x + θ₀ = 0 such that all positive examples are on one side and all negative examples on the other.',
    },
    {
      id: 'ch2-q4',
      question: 'The decision boundary of a linear classifier in 2D is:',
      options: [
        { id: 'a', text: 'A point' },
        { id: 'b', text: 'A line' },
        { id: 'c', text: 'A parabola' },
        { id: 'd', text: 'A circle' },
      ],
      correctId: 'b',
      explanation: 'In 2D, the decision boundary θ·x + θ₀ = 0 is a line. In general d dimensions, it is a (d−1)-dimensional hyperplane.',
    },
    {
      id: 'ch2-q5',
      question: 'The margin of a linear classifier measures:',
      options: [
        { id: 'a', text: 'The number of misclassified points' },
        { id: 'b', text: 'The distance from the decision boundary to the nearest data point(s)' },
        { id: 'c', text: 'The accuracy on the test set' },
        { id: 'd', text: 'The norm of the weight vector' },
      ],
      correctId: 'b',
      explanation: 'The margin is the minimum distance from the decision boundary to the closest training point. A larger margin generally indicates better generalization.',
    },
  ],

  ch3: [
    {
      id: 'ch3-q1',
      question: 'The hinge loss for a correctly classified point with margin > 1 is:',
      options: [
        { id: 'a', text: '1' },
        { id: 'b', text: 'The margin value' },
        { id: 'c', text: '0' },
        { id: 'd', text: 'Negative of the margin' },
      ],
      correctId: 'c',
      explanation: 'Hinge loss = max(0, 1 − y(θ·x + θ₀)). When the point is correctly classified with margin ≥ 1, the expression inside max is ≤ 0, so the loss is 0.',
    },
    {
      id: 'ch3-q2',
      question: 'What is the primary purpose of regularization?',
      options: [
        { id: 'a', text: 'To increase training accuracy' },
        { id: 'b', text: 'To speed up training' },
        { id: 'c', text: 'To prevent overfitting by penalizing model complexity' },
        { id: 'd', text: 'To add more features to the model' },
      ],
      correctId: 'c',
      explanation: 'Regularization adds a penalty term (like λ/2·‖θ‖²) to discourage overly complex models, improving generalization.',
    },
    {
      id: 'ch3-q3',
      question: 'An SVM finds the classifier that:',
      options: [
        { id: 'a', text: 'Minimizes the number of support vectors' },
        { id: 'b', text: 'Maximizes the margin between classes' },
        { id: 'c', text: 'Minimizes the total distance of all points to the boundary' },
        { id: 'd', text: 'Uses the fewest features possible' },
      ],
      correctId: 'b',
      explanation: 'A Support Vector Machine finds the hyperplane that maximizes the margin (2/‖θ‖) between the two classes, yielding better generalization.',
    },
    {
      id: 'ch3-q4',
      question: 'Gradient descent updates parameters by moving in the direction of:',
      options: [
        { id: 'a', text: 'The gradient of the loss' },
        { id: 'b', text: 'The negative gradient of the loss' },
        { id: 'c', text: 'A random direction' },
        { id: 'd', text: 'The largest feature value' },
      ],
      correctId: 'b',
      explanation: 'Gradient descent moves parameters in the direction of steepest decrease: θ ← θ − η·∇J(θ), where η is the learning rate.',
    },
    {
      id: 'ch3-q5',
      question: 'A hyperparameter differs from a model parameter because:',
      options: [
        { id: 'a', text: 'Hyperparameters are learned from data' },
        { id: 'b', text: 'Hyperparameters are set before training and not learned from data' },
        { id: 'c', text: 'Hyperparameters are always integers' },
        { id: 'd', text: 'There is no difference' },
      ],
      correctId: 'b',
      explanation: 'Hyperparameters (e.g., learning rate λ, regularization strength) are set by the practitioner before training, unlike model parameters (θ) which are learned.',
    },
  ],

  ch4: [
    {
      id: 'ch4-q1',
      question: 'The closed-form solution for ordinary least squares regression is:',
      options: [
        { id: 'a', text: 'θ = X⊤y' },
        { id: 'b', text: 'θ = (X⊤X)⁻¹ X⊤y' },
        { id: 'c', text: 'θ = X(X⊤X)⁻¹' },
        { id: 'd', text: 'θ = y⊤X' },
      ],
      correctId: 'b',
      explanation: 'Setting the gradient of the MSE to zero and solving yields θ = (X⊤X)⁻¹X⊤y, the normal equation.',
    },
    {
      id: 'ch4-q2',
      question: 'Ridge regression modifies OLS by:',
      options: [
        { id: 'a', text: 'Adding an L1 penalty to the loss' },
        { id: 'b', text: 'Adding λI to X⊤X before inversion' },
        { id: 'c', text: 'Removing features with low variance' },
        { id: 'd', text: 'Using a different loss function entirely' },
      ],
      correctId: 'b',
      explanation: 'Ridge regression adds L2 regularization, giving θ = (X⊤X + λI)⁻¹X⊤y. The λI term shrinks weights and ensures invertibility.',
    },
    {
      id: 'ch4-q3',
      question: 'Mean Squared Error (MSE) is defined as:',
      options: [
        { id: 'a', text: 'The sum of absolute differences between predictions and targets' },
        { id: 'b', text: 'The average of squared differences between predictions and targets' },
        { id: 'c', text: 'The maximum prediction error' },
        { id: 'd', text: 'The median of all errors' },
      ],
      correctId: 'b',
      explanation: 'MSE = (1/n) Σᵢ (yᵢ − θ·xᵢ)², averaging the squared residuals across all n training examples.',
    },
    {
      id: 'ch4-q4',
      question: 'The bias-variance tradeoff states that:',
      options: [
        { id: 'a', text: 'Increasing model complexity always improves performance' },
        { id: 'b', text: 'Low-complexity models have high bias but low variance, and vice versa' },
        { id: 'c', text: 'Bias and variance are always equal' },
        { id: 'd', text: 'Variance only matters for classification tasks' },
      ],
      correctId: 'b',
      explanation: 'Simple models underfit (high bias, low variance); complex models overfit (low bias, high variance). The best model balances both.',
    },
    {
      id: 'ch4-q5',
      question: 'When X⊤X is singular (not invertible), which approach still works?',
      options: [
        { id: 'a', text: 'Ordinary least squares' },
        { id: 'b', text: 'Ridge regression' },
        { id: 'c', text: 'Removing the bias term' },
        { id: 'd', text: 'Using fewer data points' },
      ],
      correctId: 'b',
      explanation: 'Ridge regression adds λI to X⊤X, making (X⊤X + λI) always invertible even when features are collinear.',
    },
  ],

  ch5: [
    {
      id: 'ch5-q1',
      question: 'Feature mapping (φ) is used to:',
      options: [
        { id: 'a', text: 'Reduce the number of features' },
        { id: 'b', text: 'Transform inputs into a higher-dimensional space where they may be linearly separable' },
        { id: 'c', text: 'Normalize features to unit length' },
        { id: 'd', text: 'Remove outliers from the dataset' },
      ],
      correctId: 'b',
      explanation: 'A feature map φ: ℝᵈ → ℝᴰ (D > d) lifts data to a space where a linear separator can capture nonlinear decision boundaries in the original space.',
    },
    {
      id: 'ch5-q2',
      question: 'The kernel trick avoids explicitly computing φ(x) by:',
      options: [
        { id: 'a', text: 'Using only a subset of training examples' },
        { id: 'b', text: 'Computing K(x, x\') = φ(x)·φ(x\') directly' },
        { id: 'c', text: 'Reducing all features to one dimension' },
        { id: 'd', text: 'Approximating the mapping with random projections' },
      ],
      correctId: 'b',
      explanation: 'The kernel trick computes the dot product in the high-dimensional space φ(x)·φ(x\') via a kernel function K(x, x\') without ever materializing φ(x).',
    },
    {
      id: 'ch5-q3',
      question: 'The RBF (Gaussian) kernel is defined as:',
      options: [
        { id: 'a', text: 'K(x, x\') = (x·x\' + c)ᵖ' },
        { id: 'b', text: 'K(x, x\') = x·x\'' },
        { id: 'c', text: 'K(x, x\') = exp(−‖x − x\'‖² / (2σ²))' },
        { id: 'd', text: 'K(x, x\') = max(0, x·x\')' },
      ],
      correctId: 'c',
      explanation: 'The RBF kernel measures similarity as a Gaussian function of the distance between points. It implicitly maps to an infinite-dimensional feature space.',
    },
    {
      id: 'ch5-q4',
      question: 'The polynomial kernel K(x, x\') = (x·x\' + c)ᵖ with p = 2 corresponds to:',
      options: [
        { id: 'a', text: 'A linear classifier' },
        { id: 'b', text: 'A feature space containing all monomials up to degree 2' },
        { id: 'c', text: 'A nearest-neighbor classifier' },
        { id: 'd', text: 'An infinite-dimensional feature space' },
      ],
      correctId: 'b',
      explanation: 'A degree-2 polynomial kernel implicitly maps to a space of all degree-0, 1, and 2 monomial features, enabling quadratic decision boundaries.',
    },
    {
      id: 'ch5-q5',
      question: 'Compared to explicit feature mapping, kernels are advantageous when:',
      options: [
        { id: 'a', text: 'The feature space dimension D is very large or infinite' },
        { id: 'b', text: 'The dataset has very few examples' },
        { id: 'c', text: 'The data is already linearly separable' },
        { id: 'd', text: 'Only two features exist' },
      ],
      correctId: 'a',
      explanation: 'Kernels shine when φ(x) would be extremely high-dimensional (or infinite, as with RBF). Computing K(x, x\') is O(d) regardless of D.',
    },
  ],
}
