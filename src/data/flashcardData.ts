export interface Flashcard {
  front: string
  back: string
  chapter: string
}

export const flashcardData: Flashcard[] = [
  // Ch 1 — Introduction to ML
  { front: 'What is the difference between training error and test error?', back: 'Training error measures mistakes on the data the model was trained on. Test error measures mistakes on unseen data — it is the true indicator of generalization.', chapter: 'ch1' },
  { front: 'What is a feature vector?', back: 'A numerical representation of an input example, where each dimension captures a measurable property (e.g., pixel intensity, word count, age).', chapter: 'ch1' },
  { front: 'What is a decision boundary?', back: 'The surface in feature space that separates one predicted class from another. For a linear classifier in 2D, it is a line.', chapter: 'ch1' },
  { front: 'What does i.i.d. mean in the ML context?', back: 'Independent and identically distributed — every example is drawn independently from the same underlying probability distribution.', chapter: 'ch1' },
  { front: 'What is the difference between a classifier and a regressor?', back: 'A classifier predicts a discrete label (e.g., spam/not-spam). A regressor predicts a continuous value (e.g., house price).', chapter: 'ch1' },
  { front: 'What is binary classification?', back: 'Predicting one of exactly two categories (e.g., spam/not-spam, sick/healthy). Labels are typically +1 and −1.', chapter: 'ch1' },
  { front: 'Why use +1 and −1 instead of 0 and 1 for labels?', back: 'The product y·(θ·x + θ₀) is positive for correct predictions and negative for wrong ones, regardless of class — one formula captures both.', chapter: 'ch1' },
  { front: 'What is the hypothesis space?', back: 'The set of all classifiers (functions) the learning algorithm is allowed to consider. For linear classifiers, it is all hyperplanes in Rᵈ.', chapter: 'ch1' },
  { front: 'What is generalization in ML?', back: 'The ability of a trained model to perform well on new, unseen data — not just the training examples it was fitted to.', chapter: 'ch1' },
  { front: 'What is the curse of dimensionality?', back: 'As the number of features d grows, the volume of the feature space grows exponentially, making data sparse and distances less meaningful.', chapter: 'ch1' },

  // Ch 2 — Linear Classifiers & Perceptron
  { front: 'What is the perceptron update rule?', back: 'If a point (x, y) is misclassified: θ ← θ + y·x, θ₀ ← θ₀ + y. Only update on mistakes.', chapter: 'ch2' },
  { front: 'What guarantees perceptron convergence?', back: 'If the data is linearly separable, the perceptron converges in at most (R/γ)² updates, where R is the max ‖x‖ and γ is the margin.', chapter: 'ch2' },
  { front: 'What is a linear classifier?', back: 'A model that predicts y = sign(θ·x + θ₀), where θ is the weight vector and θ₀ is the offset (bias). The decision boundary is a hyperplane.', chapter: 'ch2' },
  { front: 'What does "linearly separable" mean?', back: 'A dataset is linearly separable if there exists a hyperplane that correctly separates all positive examples from all negative examples.', chapter: 'ch2' },
  { front: 'What is the signed distance from a point to a hyperplane?', back: 'For hyperplane θ·x + θ₀ = 0, the signed distance of point x is (θ·x + θ₀) / ‖θ‖.', chapter: 'ch2' },
  { front: 'What happens if data is NOT linearly separable and you run the Perceptron?', back: 'The algorithm never converges — it keeps cycling through the data making updates indefinitely. Use a pocket algorithm or switch to soft-margin methods.', chapter: 'ch2' },
  { front: 'What is θ₀ (theta-zero) in a linear classifier?', back: 'The offset or bias term. It shifts the decision boundary away from the origin. Without it, the hyperplane must pass through the origin.', chapter: 'ch2' },
  { front: 'What is the geometric role of the weight vector θ?', back: 'θ is perpendicular (normal) to the decision boundary. It points from the negative side toward the positive side.', chapter: 'ch2' },
  { front: 'How does the Perceptron update work geometrically?', back: 'For a misclassified positive point, θ rotates toward x (θ ← θ + x). For a misclassified negative point, θ rotates away (θ ← θ − x).', chapter: 'ch2' },
  { front: 'What is the XOR problem?', back: 'Four points at (0,0)→−1, (1,1)→−1, (0,1)→+1, (1,0)→+1 cannot be separated by any single line. It proves linear classifiers have limits.', chapter: 'ch2' },

  // Ch 3 — Hinge Loss & Regularization
  { front: 'Write the hinge loss formula.', back: 'Loss_h(y(θ·x + θ₀)) = max(0, 1 − y(θ·x + θ₀)). Zero when the point is on the correct side with margin ≥ 1.', chapter: 'ch3' },
  { front: 'Why add regularization to the objective?', back: 'Regularization penalizes large weights, preventing overfitting by favoring simpler models. It trades a small increase in training error for much better generalization.', chapter: 'ch3' },
  { front: 'What is the difference between L1 and L2 regularization?', back: 'L1 (‖θ‖₁) encourages sparsity — many weights become exactly 0. L2 (‖θ‖²) shrinks all weights evenly toward 0 but rarely makes them exactly 0.', chapter: 'ch3' },
  { front: 'What is the margin in SVM?', back: 'The margin is 2/‖θ‖ — the distance between the two closest points of opposite classes to the decision boundary. SVM maximizes this margin.', chapter: 'ch3' },
  { front: 'What does λ control in regularized loss?', back: 'λ is the regularization strength. Larger λ → simpler model (more bias, less variance). Smaller λ → more complex model (less bias, more variance).', chapter: 'ch3' },
  { front: 'What is the signed agreement?', back: 'y·(θ·x + θ₀) — positive when the classifier is correct, negative when wrong. Its magnitude indicates confidence.', chapter: 'ch3' },
  { front: 'What is the geometric margin of a single point?', back: 'γᵢ = y⁽ⁱ⁾(θ·x⁽ⁱ⁾ + θ₀) / ‖θ‖. It is the signed perpendicular distance from the point to the decision boundary.', chapter: 'ch3' },
  { front: 'What are support vectors?', back: 'Training points that lie exactly on the margin boundary (θ·x + θ₀ = ±1). They alone determine the decision boundary; removing any non-support vector has no effect.', chapter: 'ch3' },
  { front: 'When is hinge loss exactly zero?', back: 'When z = y(θ·x + θ₀) ≥ 1 — the point is correctly classified AND sits on or beyond the margin boundary.', chapter: 'ch3' },
  { front: 'What is the full SVM objective?', back: 'J(θ,θ₀) = (1/n)Σ max(0, 1 − yᵢ(θ·xᵢ + θ₀)) + (λ/2)‖θ‖². It balances hinge loss (fit) with regularization (margin width).', chapter: 'ch3' },

  // Ch 4 — Linear Regression
  { front: 'Write the closed-form solution for linear regression.', back: 'θ = (XᵀX)⁻¹Xᵀy. This minimizes the sum of squared residuals in one step — no iteration needed.', chapter: 'ch4' },
  { front: 'What is ridge regression?', back: 'Linear regression with L2 regularization: θ = (XᵀX + λI)⁻¹Xᵀy. The λI term makes the matrix always invertible and shrinks weights.', chapter: 'ch4' },
  { front: 'What is the MSE loss function?', back: 'Mean Squared Error: (1/n) Σ(yᵢ − θ·xᵢ)². It measures the average squared difference between predictions and true values.', chapter: 'ch4' },
  { front: 'When does the closed-form solution fail?', back: 'When XᵀX is singular (not invertible) — this happens when features are linearly dependent or when n < d. Ridge regression fixes this.', chapter: 'ch4' },
  { front: 'What is the bias-variance tradeoff?', back: 'Bias: error from underfitting (too simple). Variance: error from overfitting (too sensitive to training data). Total error = bias² + variance + noise.', chapter: 'ch4' },
  { front: 'What is the gradient descent update rule?', back: 'θ ← θ − η·∇J(θ), where η is the learning rate and ∇J is the gradient of the objective. You take a step opposite to the gradient.', chapter: 'ch4' },
  { front: 'What happens if the learning rate η is too large?', back: 'The optimizer overshoots the minimum, bouncing back and forth. In extreme cases, it diverges — the loss increases instead of decreasing.', chapter: 'ch4' },
  { front: 'What happens if the learning rate η is too small?', back: 'Convergence is extremely slow. The algorithm takes tiny steps and may get stuck in shallow local minima or take impractically many iterations.', chapter: 'ch4' },
  { front: 'Why is SGD faster than batch gradient descent per update?', back: 'SGD uses one example (or a mini-batch) per update instead of all n examples, making each step O(1) instead of O(n) — but noisier.', chapter: 'ch4' },
  { front: 'What is a quadratic program (QP)?', back: 'An optimization problem with a quadratic objective and linear constraints. The SVM primal and dual are QPs, solvable with specialized algorithms.', chapter: 'ch4' },

  // Ch 5 — Kernels
  { front: 'What is the kernel trick?', back: 'Instead of explicitly mapping x to high-dimensional φ(x), we compute K(x,x′) = φ(x)·φ(x′) directly. This is much cheaper when φ is very high-dimensional.', chapter: 'ch5' },
  { front: 'Write the polynomial kernel formula.', back: 'K(x, x′) = (x·x′ + c)ᵖ. With degree p, this implicitly maps to a space containing all monomials up to degree p.', chapter: 'ch5' },
  { front: 'What is the RBF (Gaussian) kernel?', back: 'K(x, x′) = exp(−‖x − x′‖² / 2σ²). It maps to an infinite-dimensional feature space and can fit any decision boundary given enough data.', chapter: 'ch5' },
  { front: 'What makes a function a valid kernel?', back: 'A function K is a valid kernel if and only if its Gram matrix K[i,j] = K(xᵢ, xⱼ) is positive semi-definite for all possible inputs (Mercer\'s theorem).', chapter: 'ch5' },
  { front: 'What is the kernel matrix (Gram matrix)?', back: 'An n×n matrix where entry (i,j) = K(xᵢ, xⱼ). The kernel SVM dual depends only on this matrix, not on individual feature vectors.', chapter: 'ch5' },
  { front: 'What is a feature map φ?', back: 'A function that transforms input x into a (usually higher-dimensional) representation φ(x), making nonlinear patterns become linearly separable.', chapter: 'ch5' },
  { front: 'Why is the kernel trick computationally beneficial?', back: 'Computing K(x,x′) directly takes O(d) time regardless of the feature space dimension. Explicit φ(x) could require O(dᵖ) or even infinite dimensions.', chapter: 'ch5' },
  { front: 'What does the RBF kernel parameter σ control?', back: 'σ controls the "reach" of each training point. Small σ → each point influences only nearby points (complex boundary). Large σ → smoother, simpler boundary.', chapter: 'ch5' },
  { front: 'What is Mercer\'s theorem?', back: 'A function K(x,x′) is a valid kernel if and only if for any set of points, the Gram matrix K[i,j] = K(xᵢ,xⱼ) is positive semi-definite.', chapter: 'ch5' },
  { front: 'How does φ(x) = (x, x²) solve the interval problem?', back: 'Points at x=±3 map to (±3, 9) and x=0 maps to (0, 0). In the lifted 2D space, a line can separate the high x² values from the low ones.', chapter: 'ch5' },

  // Ch 6 — Neural Networks: Neurons to Layers
  { front: 'What is a neuron (unit) in a neural network?', back: 'A function that computes z = w·x + b (linear combination), then applies an activation function f(z) to produce its output.', chapter: 'ch6' },
  { front: 'Name 3 common activation functions.', back: 'ReLU: max(0, z). Sigmoid: 1/(1+e⁻ᶻ). Tanh: (eᶻ−e⁻ᶻ)/(eᶻ+e⁻ᶻ). ReLU is most popular for hidden layers; softmax for classification output.', chapter: 'ch6' },
  { front: 'What is the universal approximation theorem?', back: 'A feedforward network with a single hidden layer containing enough neurons can approximate any continuous function on a compact set to arbitrary accuracy.', chapter: 'ch6' },
  { front: 'What is a hidden layer?', back: 'A layer between the input and output. Its neurons learn intermediate representations. Multiple hidden layers make the network "deep."', chapter: 'ch6' },
  { front: 'Why do we need nonlinear activation functions?', back: 'Without nonlinearity, stacking multiple linear layers collapses to a single linear transformation. Nonlinearity lets the network learn complex decision boundaries.', chapter: 'ch6' },
  { front: 'What does a single neuron compute?', back: 'z = w·x + b (linear combination), then output = g(z) where g is a nonlinear activation. It is a linear classifier followed by a nonlinearity.', chapter: 'ch6' },
  { front: 'Why is ReLU preferred over sigmoid for hidden layers?', back: 'ReLU (max(0,z)) avoids the vanishing gradient problem — its derivative is 1 for positive inputs, so gradients flow through unchanged.', chapter: 'ch6' },
  { front: 'What is a weight matrix W⁽ˡ⁾?', back: 'A matrix where entry W[i,j] is the weight from neuron j in layer (l−1) to neuron i in layer l. If layer l has m units and layer l−1 has n units, W is m×n.', chapter: 'ch6' },
  { front: 'What is the depth vs. width of a network?', back: 'Depth = number of layers. Width = number of neurons per layer. Deeper networks can represent more hierarchical features; wider networks more features per level.', chapter: 'ch6' },
  { front: 'What triggered the deep learning revolution?', back: 'Three factors: (1) large datasets (ImageNet), (2) GPU computing for fast matrix operations, (3) algorithmic advances (ReLU, batch norm, dropout).', chapter: 'ch6' },

  // Ch 7 — Training Neural Networks: SGD & Backpropagation
  { front: 'What is stochastic gradient descent (SGD)?', back: 'Instead of computing the gradient over all training data, SGD approximates it using one (or a mini-batch of) random example(s), making each update much cheaper.', chapter: 'ch7' },
  { front: 'Explain backpropagation in one sentence.', back: 'Backpropagation applies the chain rule layer by layer, from the loss backward through the network, to efficiently compute the gradient of the loss w.r.t. every weight.', chapter: 'ch7' },
  { front: 'What is the vanishing gradient problem?', back: 'In deep networks with sigmoid/tanh activations, gradients get multiplied by small numbers at each layer, shrinking exponentially and making early layers nearly untrainable.', chapter: 'ch7' },
  { front: 'What is a learning rate schedule?', back: 'A strategy that changes the learning rate during training — e.g., start large for fast progress, then decay to fine-tune. Common: step decay, cosine annealing, warmup.', chapter: 'ch7' },
  { front: 'What is the difference between batch, mini-batch, and stochastic GD?', back: 'Batch: use all n examples per update. Mini-batch: use B examples (e.g., 32-256). Stochastic: use 1 example. Mini-batch is the practical default.', chapter: 'ch7' },
  { front: 'What is the forward pass?', back: 'Computing layer by layer from input to output: z₁,f₁,z₂,f₂,...,fL, storing all intermediate values for the backward pass.', chapter: 'ch7' },
  { front: 'What is the backward pass?', back: 'Computing gradients from loss to first layer using the chain rule: δL,δL₋₁,...,δ₁, then ∂L/∂W⁽ⁱ⁾ = δᵢ·fᵢ₋₁ᵀ for each layer.', chapter: 'ch7' },
  { front: 'Why must we store forward pass values during backprop?', back: 'The gradient at each layer depends on the input to that layer (fᵢ₋₁) and the pre-activation (zᵢ for computing g\'(zᵢ)). Without storing them, we would need to recompute.', chapter: 'ch7' },
  { front: 'What is a dead ReLU?', back: 'A neuron whose pre-activation z is always negative, so ReLU(z)=0 and its gradient is 0. It never updates and is permanently inactive. Caused by bad initialization or large learning rates.', chapter: 'ch7' },
  { front: 'What is dropout?', back: 'During training, randomly set each hidden neuron\'s output to 0 with probability p (e.g., 0.5). This prevents co-adaptation and acts as a regularizer. At test time, scale by (1−p).', chapter: 'ch7' },

  // Ch 8 — RNNs: Encoding Sequences
  { front: 'What is the key idea of an RNN?', back: 'The same weight matrix is applied at every time step, with a hidden state sₜ = f(Wsₜ₋₁ + Wxₜ) that accumulates information from all previous inputs.', chapter: 'ch8' },
  { front: 'Why are RNNs suited for sequential data?', back: 'They process inputs one at a time while maintaining a hidden state that encodes the history of the sequence — enabling variable-length input handling.', chapter: 'ch8' },
  { front: 'What is the encoding problem for sequences?', back: 'Given a variable-length sequence (x₁, x₂, ..., xₜ), produce a single fixed-size vector that captures the essential information for downstream tasks.', chapter: 'ch8' },
  { front: 'What is weight sharing in RNNs?', back: 'The same parameters (W, Wₓ) are used at every time step. This dramatically reduces parameter count and allows the model to generalize across different sequence positions.', chapter: 'ch8' },
  { front: 'What are the two main problems with training vanilla RNNs?', back: 'Vanishing gradients: gradients shrink to 0 over many steps, losing long-range dependencies. Exploding gradients: gradients grow unboundedly, causing instability.', chapter: 'ch8' },
  { front: 'Write the RNN state update equation.', back: 'sₜ = g(W·sₜ₋₁ + Wₓ·xₜ + b), where sₜ is the hidden state, xₜ is the input at time t, g is an activation (usually tanh), and W, Wₓ are shared across all time steps.', chapter: 'ch8' },
  { front: 'What is Backpropagation Through Time (BPTT)?', back: 'Unroll the RNN for T time steps and apply standard backpropagation to the unrolled graph. Gradients flow backward through time, with the same W at each step.', chapter: 'ch8' },
  { front: 'Why do RNN gradients vanish over long sequences?', back: 'At each time step, the gradient is multiplied by W and g\'(·). If the largest eigenvalue of W times max|g\'| < 1, gradients shrink exponentially with sequence length.', chapter: 'ch8' },
  { front: 'What is the difference between encoding and decoding in RNNs?', back: 'Encoding: read a sequence and compress it into a fixed-size hidden state vector. Decoding: generate a sequence from a hidden state vector, one token at a time.', chapter: 'ch8' },
  { front: 'What is gradient clipping?', back: 'If the gradient norm exceeds a threshold, scale it down to that threshold. Prevents exploding gradients in RNNs without changing gradient direction.', chapter: 'ch8' },

  // Ch 9 — RNNs: Decoding & LSTMs
  { front: 'What are the three gates in an LSTM?', back: 'Forget gate (what to erase from cell state), Input gate (what new info to write), Output gate (what to expose as hidden state). All are sigmoid-activated.', chapter: 'ch9' },
  { front: 'How does the LSTM cell state solve vanishing gradients?', back: 'The cell state acts as a highway — gradients flow through it with only element-wise multiply/add (no matrix multiply or activation squashing), preserving long-range information.', chapter: 'ch9' },
  { front: 'What is sequence-to-sequence (seq2seq)?', back: 'An encoder RNN reads the input sequence into a fixed context vector, then a decoder RNN generates the output sequence one token at a time from that vector.', chapter: 'ch9' },
  { front: 'What is teacher forcing?', back: 'During training, the decoder receives the ground-truth previous token as input (instead of its own prediction), which stabilizes and speeds up training.', chapter: 'ch9' },
  { front: 'What is a GRU and how does it differ from an LSTM?', back: 'GRU uses two gates (reset and update) instead of three, and has no separate cell state. It is simpler and often performs comparably to LSTM.', chapter: 'ch9' },
  { front: 'What is the cell state in an LSTM?', back: 'A separate memory vector cₜ that runs through time with only element-wise operations (no matrix multiply). Information can be added or erased via gates, allowing long-range memory.', chapter: 'ch9' },
  { front: 'How does the forget gate work?', back: 'fₜ = σ(Wf·[hₜ₋₁, xₜ] + bf). Each element is between 0 and 1. Multiplying cₜ₋₁ by fₜ erases information where fₜ ≈ 0 and keeps information where fₜ ≈ 1.', chapter: 'ch9' },
  { front: 'What is beam search?', back: 'A decoding strategy that keeps the top-k (beam width) most likely partial sequences at each step, instead of greedily picking only the best. Balances quality vs. computation.', chapter: 'ch9' },
  { front: 'What is the encoder-decoder bottleneck?', back: 'The entire input sequence must be compressed into a single fixed-size vector. For long sequences, this vector cannot retain all relevant information, degrading translation quality.', chapter: 'ch9' },
  { front: 'How does GRU simplify LSTM?', back: 'GRU merges cell state and hidden state into one vector, uses 2 gates (reset, update) instead of 3 (forget, input, output). Fewer parameters, often similar performance.', chapter: 'ch9' },

  // Ch 10 — Convolutional Neural Networks
  { front: 'What is a convolution in a CNN?', back: 'Sliding a small weight matrix (filter/kernel) across the input, computing element-wise multiply-and-sum at each position to produce a feature map.', chapter: 'ch10' },
  { front: 'What is pooling and why is it used?', back: 'Pooling (e.g., max or average) reduces spatial dimensions by summarizing a local patch into a single value. It adds translation invariance and reduces computation.', chapter: 'ch10' },
  { front: 'What is the output size formula for convolution?', back: 'output = (input − filter + 2·padding) / stride + 1. E.g., 28×28 input with 5×5 filter, no padding, stride 1 → 24×24 output.', chapter: 'ch10' },
  { front: 'Why are CNNs better than fully-connected networks for images?', back: 'Local connectivity (each neuron sees only a small patch), weight sharing (same filter everywhere), and translation equivariance — far fewer parameters and built-in spatial structure.', chapter: 'ch10' },
  { front: 'What do early vs. late CNN layers learn?', back: 'Early layers learn low-level features (edges, textures). Middle layers combine these into parts (eyes, wheels). Late layers capture high-level semantics (faces, cars).', chapter: 'ch10' },
  { front: 'What is weight sharing in a CNN?', back: 'The same filter (kernel) is applied at every spatial position of the input. This means one filter has the same small number of parameters regardless of image size.', chapter: 'ch10' },
  { front: 'What is stride in convolution?', back: 'The number of pixels the filter moves between applications. Stride 1 slides one pixel at a time. Stride 2 skips every other position, halving the output size.', chapter: 'ch10' },
  { front: 'What is padding and why use it?', back: 'Adding zeros around the input border so the output has the same spatial size as the input. Without padding, each conv layer shrinks the feature map.', chapter: 'ch10' },
  { front: 'What is a feature map in a CNN?', back: 'The 2D output of applying one filter to the input. Each filter produces one feature map. A conv layer with 64 filters produces 64 feature maps stacked as channels.', chapter: 'ch10' },
  { front: 'What is the typical CNN architecture pattern?', back: 'Repeated blocks of [Conv → ReLU → Pool] that progressively reduce spatial size while increasing channels, followed by fully-connected layers for classification.', chapter: 'ch10' },
]
