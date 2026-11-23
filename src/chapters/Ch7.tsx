import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch7() {
  return (
    <ChapterLayout
      title="Training Neural Networks — SGD and Backpropagation"
      subtitle="Lecture 9"
    >
      {/* ── Learning Objectives ── */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-purple-800 dark:text-purple-200">
          Learning Objectives
        </h3>
        <ul className="list-disc list-inside text-sm text-purple-700 dark:text-purple-300 mt-2 space-y-1">
          <li>Formulate neural network training as an optimization problem over all weights</li>
          <li>Understand how SGD extends from linear models to multi-layer networks</li>
          <li>Derive backpropagation as repeated application of the chain rule</li>
          <li>Trace forward and backward passes through a simple chain network</li>
          <li>Recognize the role of initialization, network size, and local optima</li>
          <li>Appreciate why larger models can be easier — not harder — to train</li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — THE TRAINING PROBLEM
          ══════════════════════════════════════════════════════════ */}
      <h2>The Training Problem</h2>

      <p>
        In Chapter 6 we built the architecture: layers of neurons, weight
        matrices, activation functions. But how do we find the right weights?
        The answer is the same gradient-based optimization we used for linear
        classifiers — extended to handle the composition of many layers.
      </p>

      <p>
        Given training data{' '}
        <MathBlock inline math="\{(x^{(t)}, y^{(t)})\}_{t=1}^{n}" />, we define a
        <ConceptLink conceptId="loss-function">loss function</ConceptLink> that measures how far the network's predictions are
        from the true labels. The goal is to find weights{' '}
        <MathBlock inline math="W^{(1)}, W^{(2)}, \ldots, W^{(L)}" /> that
        minimize the average loss:
      </p>

      <MathBlock
        math="\min_{W^{(1)}, \ldots, W^{(L)}} \;\; \frac{1}{n} \sum_{t=1}^{n} \mathcal{L}\!\bigl(f(x^{(t)};\, W),\; y^{(t)}\bigr)"
      />

      <p>
        This looks identical to the optimization problems from Chapters 3–4,
        with one critical difference: the prediction{' '}
        <MathBlock inline math="f(x; W)" /> is now a <em>deep composition</em> of
        functions, making the loss landscape highly <ConceptLink conceptId="non-convex-optimization">non-convex</ConceptLink>.
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 my-4">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          For linear models, the loss was a bowl (convex) — gradient descent
          always rolls to the bottom. For neural networks, the loss
          landscape is a mountain range with many valleys, ridges, and
          saddle points. We can no longer guarantee finding the global
          minimum, only a local one.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — SGD FOR NEURAL NETWORKS
          ══════════════════════════════════════════════════════════ */}
      <h2>Stochastic Gradient Descent for Neural Networks</h2>

      <p>
        Despite the non-convexity, <ConceptLink conceptId="sgd">SGD</ConceptLink> works remarkably well for neural
        networks. The update rule is the same as before:
      </p>

      <MathBlock
        math="W^{(l)} \leftarrow W^{(l)} - \eta \, \frac{\partial \mathcal{L}}{\partial W^{(l)}}"
      />

      <p>
        for each layer <MathBlock inline math="l = 1, \ldots, L" />, where{' '}
        <MathBlock inline math="\eta" /> is the <ConceptLink conceptId="learning-rate">learning rate</ConceptLink>. At each step, we
        pick a training example (or a small batch), compute the gradient of
        the loss with respect to <em>every</em> weight in every layer, and
        take a step downhill.
      </p>

      <p>
        The challenge is computing those gradients efficiently. A neural
        network can have millions of weights across dozens of layers. Naively
        computing each partial derivative separately would be hopelessly
        slow. This is where <ConceptLink conceptId="backpropagation">backpropagation</ConceptLink> comes in.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — THE CHAIN RULE
          ══════════════════════════════════════════════════════════ */}
      <h2>The Chain Rule: Foundation of Backpropagation</h2>

      <p>
        Backpropagation is not a new algorithm — it is the calculus chain
        rule applied systematically to a computation graph. Consider a
        simple chain network where each "layer" has a single unit:
      </p>

      <MathBlock
        math="x \xrightarrow{w_1} z_1 \xrightarrow{g} f_1 \xrightarrow{w_2} z_2 \xrightarrow{g} f_2 \;\cdots\; \xrightarrow{w_L} z_L \xrightarrow{g} f_L"
      />

      <p>
        At each node, the pre-activation is{' '}
        <MathBlock inline math="z_i = w_i \cdot f_{i-1}" /> and the activation is{' '}
        <MathBlock inline math="f_i = g(z_i)" /> (where{' '}
        <MathBlock inline math="f_0 = x" />). The loss depends on the final
        output: <MathBlock inline math="\mathcal{L}(f_L, y)" />.
      </p>

      <p>
        To update <MathBlock inline math="w_1" />, we need{' '}
        <MathBlock inline math="\partial \mathcal{L} / \partial w_1" />. The chain
        rule gives:
      </p>

      <MathBlock
        math="\frac{\partial \mathcal{L}}{\partial w_1} = \frac{\partial \mathcal{L}}{\partial f_L} \cdot \frac{\partial f_L}{\partial z_L} \cdot \frac{\partial z_L}{\partial f_{L-1}} \cdots \frac{\partial f_1}{\partial z_1} \cdot \frac{\partial z_1}{\partial w_1}"
      />

      <p>
        Each factor in this product is a simple local derivative:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <MathBlock inline math="\partial z_i / \partial w_i = f_{i-1}" /> — the
          input to that layer
        </li>
        <li>
          <MathBlock inline math="\partial f_i / \partial z_i = g'(z_i)" /> — the
          derivative of the activation function
        </li>
        <li>
          <MathBlock inline math="\partial z_i / \partial f_{i-1} = w_i" /> — the
          weight connecting them
        </li>
      </ul>

      <ExpandableReading title="Why 'back' propagation?">
        <p>
          The name comes from the direction in which we compute. The{' '}
          <ConceptLink conceptId="forward-pass">forward pass</ConceptLink> computes{' '}
          <MathBlock inline math="z_1, f_1, z_2, f_2, \ldots, f_L" /> from input
          to output. The <strong>backward pass</strong> then computes
          gradients from the loss back to the first layer:{' '}
          <MathBlock inline math="\partial \mathcal{L}/\partial f_L" />, then{' '}
          <MathBlock inline math="\partial \mathcal{L}/\partial z_L" />, then{' '}
          <MathBlock inline math="\partial \mathcal{L}/\partial f_{L-1}" />, and
          so on. This is the <ConceptLink conceptId="backward-pass">backward pass</ConceptLink>. At each step we reuse the gradient from the layer above,
          multiplying by only one local derivative. This reuse is what
          makes backprop efficient — the total cost is proportional to a
          single forward pass, not to the number of weights.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — FORWARD AND BACKWARD PASSES
          ══════════════════════════════════════════════════════════ */}
      <h2>The Two Passes of Training</h2>

      <p>
        Training a neural network on one example involves two passes:
      </p>

      <h3>Forward Pass</h3>
      <p>
        Feed the input <MathBlock inline math="x" /> through the network, layer by
        layer, computing and <em>storing</em> every intermediate value{' '}
        <MathBlock inline math="z_i" /> and <MathBlock inline math="f_i" />. At the end,
        compute the loss <MathBlock inline math="\mathcal{L}(f_L, y)" />.
      </p>

      <h3>Backward Pass</h3>
      <p>
        Starting from{' '}
        <MathBlock inline math="\partial \mathcal{L}/\partial f_L" />, propagate
        the gradient backward through each layer. At layer{' '}
        <MathBlock inline math="i" />, compute:
      </p>

      <MathBlock
        math="\delta_i = \frac{\partial \mathcal{L}}{\partial z_i} = \frac{\partial \mathcal{L}}{\partial f_i} \cdot g'(z_i)"
      />

      <p>
        Then the gradient with respect to the weight is:
      </p>

      <MathBlock
        math="\frac{\partial \mathcal{L}}{\partial W^{(i)}} = \delta_i \cdot f_{i-1}^\top"
      />

      <p>
        And the gradient passed to the previous layer is:
      </p>

      <MathBlock
        math="\frac{\partial \mathcal{L}}{\partial f_{i-1}} = (W^{(i)})^\top \delta_i"
      />

      <p>
        This continues until we reach the input layer. Then all weight
        gradients are available and we apply the SGD update to every weight
        simultaneously.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 my-4">
        <p className="font-medium text-blue-800 dark:text-blue-200">
          The key insight: backpropagation computes <em>all</em> gradients
          in time proportional to <em>one</em> forward pass. Without this
          efficiency, training deep networks would be computationally
          infeasible.
        </p>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-6">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Forward and Backward Pass (Dead ReLU)</p>

        <p className="text-sm mb-2">
          Consider a tiny 2-layer chain with ReLU activations and squared loss.
          Input <MathBlock inline math="x = 2" />, target <MathBlock inline math="y = 1" />,
          weights <MathBlock inline math="w_1 = 0.5" /> and <MathBlock inline math="w_2 = -1.0" />.
        </p>

        <p className="text-sm font-semibold mt-3">Forward pass:</p>
        <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
          <li><MathBlock inline math="z_1 = w_1 \cdot x = 0.5 \times 2 = 1.0" /></li>
          <li><MathBlock inline math="f_1 = \text{ReLU}(1.0) = 1.0" /> (positive — passes through)</li>
          <li><MathBlock inline math="z_2 = w_2 \cdot f_1 = -1.0 \times 1.0 = -1.0" /></li>
          <li><MathBlock inline math="f_2 = \text{ReLU}(-1.0) = 0" /> (negative — killed!)</li>
          <li><MathBlock inline math="\mathcal{L} = (f_2 - y)^2 = (0 - 1)^2 = 1.0" /></li>
        </ol>

        <p className="text-sm font-semibold mt-4">Backward pass:</p>
        <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
          <li>
            Loss gradient: <MathBlock inline math="\frac{\partial \mathcal{L}}{\partial f_2} = 2(f_2 - y) = 2(0 - 1) = -2" />
          </li>
          <li>
            ReLU derivative at <MathBlock inline math="z_2 = -1.0" />: <MathBlock inline math="\text{ReLU}'(-1.0) = 0" /> (derivative is zero for negative input)
          </li>
          <li>
            <MathBlock inline math="\delta_2 = \frac{\partial \mathcal{L}}{\partial f_2} \cdot \text{ReLU}'(z_2) = -2 \times 0 = 0" />
          </li>
          <li>
            <MathBlock inline math="\frac{\partial \mathcal{L}}{\partial w_2} = \delta_2 \cdot f_1 = 0 \times 1.0 = 0" /> — <strong>no gradient for <MathBlock inline math="w_2" /></strong>
          </li>
          <li>
            The gradient flowing to <MathBlock inline math="w_1" /> passes through <MathBlock inline math="\delta_2" />, so it is also <strong>zero</strong>.
          </li>
        </ol>

        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>Dead neuron!</strong> Because <MathBlock inline math="z_2 < 0" />, the ReLU output
            is exactly zero and its derivative is zero. No gradient flows backward — neither{' '}
            <MathBlock inline math="w_1" /> nor <MathBlock inline math="w_2" /> can be updated.
            The network is stuck. Had <MathBlock inline math="w_2" /> been positive (say{' '}
            <MathBlock inline math="w_2 = 1.0" />), the neuron would be alive:{' '}
            <MathBlock inline math="f_2 = 1.0" />, loss <MathBlock inline math="= 0" />, and
            gradients would flow normally. This is why <strong>initialization matters</strong>.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — TRAINING IN ACTION
          ══════════════════════════════════════════════════════════ */}
      <h2>Training in Action: Watching Boundaries Move</h2>

      <p>
        Consider training a network with 2 hidden units (tanh activation)
        on a 2-D classification task. Initially, the two hidden units have
        random weight vectors, defining two random decision boundaries.
        The hinge loss starts high.
      </p>

      <p>
        After about 10 <ConceptLink conceptId="epoch">epochs</ConceptLink> (10 passes through all training data), SGD
        has rotated and shifted both decision boundaries so that the hidden
        representation cleanly separates the two classes. The loss drops
        sharply in the first few epochs and then plateaus near zero.
      </p>

      <p>
        In the hidden unit activation space{' '}
        <MathBlock inline math="(f_1, f_2)" />, the initially scattered points
        have been reorganized: positive and negative examples cluster into
        distinct corners, and a simple linear classifier on top separates
        them.
      </p>

      <h3>What Happens with Harder Tasks?</h3>

      <p>
        Some data distributions cannot be separated by just 2 hidden
        units — the representation is too low-dimensional. For these harder
        tasks, we need more hidden units. With 10 hidden units, the network
        can carve out more complex decision regions. With 100 hidden units,
        the decision boundary becomes nearly arbitrary in shape, wrapping
        tightly around each class.
      </p>

      <ExpandableReading title="How many hidden units do I need?">
        <p>
          There is no formula, but useful rules of thumb exist. Start with
          a network that is "too big" — more hidden units than you think
          you need. If it overfits, add regularization (<ConceptLink conceptId="dropout">dropout</ConceptLink>, <ConceptLink conceptId="weight-decay">weight
          decay</ConceptLink>) rather than shrinking the network. Modern practice favors
          overparameterized networks that are then regularized, because
          they are easier to optimize. A network with 10 hidden units on
          a simple 2-D task trains in seconds; the same task with 100 units
          trains just as fast (the extra parameters barely add cost) and
          often finds a better solution because the optimization landscape
          is smoother.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6 — INITIALIZATION MATTERS
          ══════════════════════════════════════════════════════════ */}
      <h2>Initialization Matters</h2>

      <p>
        Because the loss landscape is non-convex, where you start matters.
        Two aspects of initialization have outsized impact:
      </p>

      <h3>Symmetry Breaking</h3>
      <p>
        <ConceptLink conceptId="weight-initialization">Weight initialization</ConceptLink> is critical: if all weights are initialized to zero, every hidden unit computes
        the same function. Gradients are identical, so they all update
        identically — the network effectively has one hidden unit. Random
        initialization breaks this symmetry, giving each unit a different
        starting direction to specialize from.
      </p>

      <h3>Offset (Bias) Initialization</h3>
      <p>
        Initializing all biases to zero forces every hidden unit's decision
        boundary to pass through the origin. This introduces a symmetry
        that can persist through training — the network produces decision
        boundaries that are unnecessarily symmetric around the origin.
        Random bias initialization breaks this symmetry, leading to more
        flexible learned boundaries.
      </p>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 my-4">
        <p className="font-medium text-green-800 dark:text-green-200">
          <strong>Practical tip:</strong> Modern frameworks use carefully
          designed initialization schemes (<ConceptLink conceptId="xavier-init">Xavier/Glorot</ConceptLink>, He/Kaiming) that
          set the scale of random weights based on layer size, keeping
          activations and gradients in a healthy range throughout the
          network.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7 — LOCAL OPTIMA AND LARGE MODELS
          ══════════════════════════════════════════════════════════ */}
      <h2>Local Optima and the Blessing of Scale</h2>

      <p>
        Neural network loss surfaces are non-convex, so SGD is only
        guaranteed to find a <em>local</em> optimum, not the global one.
        In theory, this sounds catastrophic — what if we get stuck in a
        terrible local minimum?
      </p>

      <p>
        In practice, two phenomena save us:
      </p>

      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Most local minima are good enough.</strong> In high-dimensional
          weight spaces, research shows that local minima tend to have loss
          values close to the global minimum. The truly bad critical points
          are usually <ConceptLink conceptId="saddle-point">saddle points</ConceptLink> (high loss in some directions, low in
          others), and SGD's noise helps escape them.
        </li>
        <li>
          <strong>Larger models are easier to train.</strong> Counterintuitively,
          a network with 500 hidden units is often <em>easier</em> to optimize
          than one with 10. With more units, there are more directions in
          weight space for SGD to make progress. Each unit only needs to be
          adjusted so that, collectively, they are sufficient for the task —
          no single unit has to be perfect.
        </li>
      </ol>

      <ExpandableReading title="The lottery ticket hypothesis">
        <p>
          The "lottery ticket hypothesis" (Frankle & Carlin, 2019) proposes
          that large networks contain small subnetworks (winning tickets)
          that, if trained in isolation from their initial weights, would
          match the full network's performance. This suggests that
          overparameterization helps because it increases the probability
          that a good subnetwork exists within the random initialization.
          You don't need all 500 hidden units — but starting with 500
          makes it likely that 10 of them start in a configuration that
          trains to a good solution.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8 — RELU AND MODERN PRACTICE
          ══════════════════════════════════════════════════════════ */}
      <h2>ReLU and Modern Training Practice</h2>

      <p>
        Many modern architectures use ReLU activations for practical
        reasons that go beyond expressiveness:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Cheap to evaluate:</strong>{' '}
          <MathBlock inline math="\max(0, z)" /> is just a comparison — no
          exponentials like tanh or sigmoid.
        </li>
        <li>
          <strong>Sparse activations:</strong> For any input, roughly half
          of ReLU units output zero. This sparsity acts as a form of
          implicit regularization and speeds up computation.
        </li>
        <li>
          <strong>Non-saturating gradient:</strong> For{' '}
          <MathBlock inline math="z > 0" />, the gradient is exactly 1. This
          avoids the vanishing gradient problem that plagues tanh/sigmoid
          in deep networks.
        </li>
      </ul>

      <p>
        With ReLU units, the decision boundaries are piecewise linear —
        composed of straight segments rather than smooth curves. As we add
        more hidden units (10 → 100 → 500), the boundary becomes smoother
        in appearance because more linear pieces approximate curves more
        finely.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          DECISION SCENARIO
          ══════════════════════════════════════════════════════════ */}
      <DecisionScenario
        title="Debugging a Training Run"
        scenario="You're training a neural network with 2 hidden layers (50 units each, ReLU activations) on a classification task. After 100 epochs the training loss is still high and barely decreasing. The network seems unable to learn. What should you try first?"
        options={[
          {
            label: 'Increase the learning rate dramatically',
            feedback:
              'A too-large learning rate can cause the loss to oscillate or diverge. While the current rate might be too small, dramatically increasing it is risky. A moderate increase (2x–5x) with monitoring is safer.',
            isCorrect: false,
          },
          {
            label: 'Check the initialization and try a larger network',
            feedback:
              'Excellent instinct. If initialization is poor (e.g., too large or all zeros), the network may be stuck. A larger network provides more paths for SGD to find a good solution. Try He initialization for ReLU and double the hidden units — larger models are often easier to train, not harder.',
            isCorrect: true,
          },
          {
            label: 'Switch to a convex loss function',
            feedback:
              'The loss function (hinge, cross-entropy) is already convex in the output. The non-convexity comes from the network architecture, not the loss. Changing the loss won\'t fix an optimization problem caused by architecture or initialization.',
            isCorrect: false,
          },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          SUMMARY
          ══════════════════════════════════════════════════════════ */}
      <h2>Putting It Together: The Training Loop</h2>

      <p>
        The complete training procedure for a neural network is:
      </p>

      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Initialize</strong> all weights randomly (e.g., Xavier
          or He initialization)
        </li>
        <li>
          <strong>For each epoch</strong> (pass through the data):
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li>Shuffle the training data</li>
            <li>For each example (or <ConceptLink conceptId="mini-batch">mini-batch</ConceptLink>):</li>
            <li className="ml-4">Forward pass: compute all activations and the loss</li>
            <li className="ml-4">Backward pass: compute all gradients via backpropagation</li>
            <li className="ml-4">
              Update: <MathBlock inline math="W^{(l)} \leftarrow W^{(l)} - \eta \, \nabla_{W^{(l)}} \mathcal{L}" /> for all layers
            </li>
          </ul>
        </li>
        <li>
          <strong>Repeat</strong> until the loss converges or a stopping
          criterion is met
        </li>
      </ol>

      {/* ══════════════════════════════════════════════════════════════
          KEY TAKEAWAYS
          ══════════════════════════════════════════════════════════ */}
      <KeyTakeaways
        items={[
          'Neural networks are trained by minimizing a loss function over all weights using SGD — the same framework as linear models.',
          'Backpropagation computes all gradients in one backward pass by applying the chain rule layer by layer — cost is proportional to one forward pass.',
          'The forward pass computes and stores all activations; the backward pass propagates gradients from the loss back to the first layer.',
          'The loss landscape is non-convex: SGD finds local optima, not the global one. In practice, local optima in large networks are usually good enough.',
          'Random initialization breaks symmetry — without it, all hidden units compute the same thing and the network cannot learn diverse features.',
          'Larger models are often easier to optimize: more hidden units provide more directions for SGD to make progress.',
          'ReLU activations are preferred in deep networks for their computational efficiency, sparsity, and non-saturating gradients.',
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          QUIZ
          ══════════════════════════════════════════════════════════ */}
      <QuizSection
        questions={[
          {
            question:
              'What is backpropagation?',
            options: [
              'A special optimizer that replaces SGD for neural networks',
              'The chain rule applied systematically to compute gradients of the loss with respect to all weights',
              'A method for initializing neural network weights',
              'A regularization technique to prevent overfitting',
            ],
            correctIndex: 1,
            explanation:
              'Backpropagation is simply the chain rule of calculus, applied to the computation graph of a neural network. It computes gradients efficiently by reusing intermediate results from the output layer back to the input. SGD then uses these gradients to update the weights.',
          },
          {
            question:
              'Why is random initialization essential for neural network training?',
            options: [
              'It makes the loss function convex',
              'It ensures the network has enough capacity',
              'It breaks symmetry so hidden units can learn different features',
              'It guarantees convergence to the global optimum',
            ],
            correctIndex: 2,
            explanation:
              'If all weights start at the same value (e.g., zero), every hidden unit computes the same output, receives the same gradient, and updates identically. They remain clones forever. Random initialization gives each unit a unique starting direction, allowing them to specialize during training.',
          },
          {
            question:
              'Why are larger neural networks often easier to train than smaller ones?',
            options: [
              'They have fewer local optima in their loss landscape',
              'They require smaller learning rates which are more stable',
              'They provide more directions in weight space for SGD to make progress',
              'They always converge to the global optimum',
            ],
            correctIndex: 2,
            explanation:
              'With more parameters, the optimization landscape has more dimensions. SGD has more directions to "wiggle" through saddle points and bad local minima. Individual units only need to collectively solve the task — no single unit must be perfect. This is the "blessing of dimensionality" for optimization.',
          },
          {
            question:
              'During the backward pass, what information from the forward pass is needed?',
            options: [
              'Only the final prediction',
              'Only the input and output',
              'The stored activations and pre-activations at every layer',
              'The weight matrices only',
            ],
            correctIndex: 2,
            explanation:
              'Computing gradients at layer i requires: g\'(z_i) (the activation derivative, needing stored z_i) and f_{i-1} (the previous layer\'s output, needed for the weight gradient). This is why the forward pass must store all intermediate values — they are consumed during the backward pass.',
          },
          {
            question:
              'What is the computational cost of backpropagation relative to the forward pass?',
            options: [
              'Exponential in the number of layers',
              'Proportional to the number of weights squared',
              'Roughly the same as one forward pass (constant factor)',
              'Proportional to the number of training examples',
            ],
            correctIndex: 2,
            explanation:
              'Backpropagation reuses intermediate gradients, so each layer\'s gradient computation is proportional to that layer\'s forward computation. The total backward pass is approximately 2-3x the cost of the forward pass — a constant factor, regardless of depth. This efficiency is what makes training deep networks feasible.',
          },
        ]}
      />
    </ChapterLayout>
  )
}
