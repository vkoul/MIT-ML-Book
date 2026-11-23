import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ActivationFunctionWidget } from '../components/widgets/ActivationFunctionWidget'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch6() {
  return (
    <ChapterLayout
      title="Neural Networks — From Neurons to Layers"
      subtitle="Lecture 8"
    >
      {/* ── Learning Objectives ── */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-purple-800 dark:text-purple-200">
          Learning Objectives
        </h3>
        <ul className="list-disc list-inside text-sm text-purple-700 dark:text-purple-300 mt-2 space-y-1">
          <li>Understand why hand-crafted feature maps motivate learnable representations</li>
          <li>Model an artificial neuron as a linear classifier with a nonlinear activation</li>
          <li>Describe the feed-forward architecture: layers, weights, and activations</li>
          <li>Compare activation functions — linear, tanh, and ReLU — and their geometric effects</li>
          <li>Explain how hidden layers create new representations that make data linearly separable</li>
          <li>Appreciate the practical factors behind the deep learning revolution</li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — MOTIVATION
          ══════════════════════════════════════════════════════════ */}
      <h2>Beyond Hand-Crafted Features</h2>

      <p>
        In previous chapters we saw that a linear classifier operating on
        good features can solve remarkably hard problems. The kernel trick
        and explicit feature maps like{' '}
        <MathBlock inline math="\phi(x) = (x,\; x^2)" /> let us turn nonlinear
        problems into linear ones. But there is a catch: <em>we</em> had to
        choose the feature map. For images, text, or audio the "right"
        features are far from obvious.
      </p>

      <p>
        The central idea of neural networks is to <strong>learn the features
        themselves</strong>. Instead of defining{' '}
        <MathBlock inline math="\phi" /> by hand and then fitting{' '}
        <MathBlock inline math="\hat{y} = \text{sign}(\theta \cdot \phi(x))" />,
        we build a model whose early layers learn{' '}
        <MathBlock inline math="\phi" /> and whose final layer learns{' '}
        <MathBlock inline math="\theta" /> — all from data, end-to-end.
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 my-4">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          Think of it like cooking. In the kernel approach, you buy
          pre-ground spices (fixed features) and choose proportions (fit
          weights). With neural networks, you grow raw ingredients (learn
          features from pixels or words) and blend them into spices (hidden
          representations) — the entire pipeline is optimized for your dish
          (task).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — BIOLOGICAL INSPIRATION
          ══════════════════════════════════════════════════════════ */}
      <h2>Biological Inspiration: Real Neurons</h2>

      <p>
        Artificial neural networks borrow a <em>loose</em> metaphor from
        biology. A biological neuron has three key parts:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Dendrites</strong> — receive input signals from other neurons
        </li>
        <li>
          <strong>Soma (cell body)</strong> — integrates the incoming signals
        </li>
        <li>
          <strong>Axon</strong> — transmits the output signal to downstream neurons
        </li>
      </ul>

      <p>
        A biological neuron "fires" when the combined input exceeds some
        threshold — an all-or-nothing pulse that travels down the axon to
        the dendrites of the next neurons. The brain has roughly 86 billion
        neurons with trillions of connections, and intelligence emerges from
        their collective activity.
      </p>

      <ExpandableReading title="How faithful is the analogy?">
        <p>
          The artificial neuron is a dramatic simplification. Real neurons
          have complex dendritic trees that perform local computation, use
          precise spike timing, exhibit chemical neuromodulation, and
          rewire themselves structurally over time. The artificial version
          keeps only the core idea: <em>weighted summation of inputs
          followed by a nonlinear decision</em>. This is enough to build
          extraordinarily powerful models, even if the resemblance to
          biology is largely cosmetic.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — THE ARTIFICIAL NEURON
          ══════════════════════════════════════════════════════════ */}
      <h2>The <ConceptLink conceptId="artificial-neuron">Artificial Neuron</ConceptLink></h2>

      <p>
        An artificial neuron receives a vector of inputs{' '}
        <MathBlock inline math="x_1, x_2, \ldots, x_d" />, multiplies each by a
        learned weight, adds a bias, and passes the result through an{' '}
        <ConceptLink conceptId="activation-function">activation function</ConceptLink>{' '}
        <MathBlock inline math="f" />:
      </p>

      <MathBlock
        math="z = \sum_{j=1}^{d} w_j x_j + w_0 = \mathbf{w} \cdot \mathbf{x} + w_0"
      />

      <MathBlock
        math="\text{output} = f(z)"
      />

      <p>
        This is exactly a <em>linear classifier wrapped in a nonlinearity</em>.
        The pre-activation value <MathBlock inline math="z" /> is the signed
        distance (up to scaling) from the decision boundary defined by{' '}
        <MathBlock inline math="\mathbf{w}" /> and <MathBlock inline math="w_0" />.
        The activation function then shapes the output — squashing,
        thresholding, or rectifying.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 my-4">
        <p className="font-medium text-blue-800 dark:text-blue-200">
          A single neuron <em>is</em> a linear classifier — it defines a
          hyperplane in input space and classifies points by which side they
          fall on. The power of neural networks comes from composing many
          such units.
        </p>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-6">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Forward Pass Through a Single Neuron</p>

        <p className="text-sm mb-2">
          Suppose a neuron has 3 inputs with weights{' '}
          <MathBlock inline math="w = (0.5,\; -1.0,\; 0.2)" /> and bias{' '}
          <MathBlock inline math="w_0 = 0.1" />. We feed in <MathBlock inline math="x = (3,\; -1,\; 2)" />.
        </p>

        <p className="text-sm font-semibold mt-3">Step 1 — Linear combination:</p>
        <MathBlock math="z = w \cdot x + w_0 = 0.5(3) + (-1.0)(-1) + 0.2(2) + 0.1 = 1.5 + 1.0 + 0.4 + 0.1 = 3.0" />

        <p className="text-sm font-semibold mt-3">Step 2 — Apply three different activations to <MathBlock inline math="z = 3.0" />:</p>
        <ul className="list-disc list-inside text-sm space-y-1 ml-2 mt-1">
          <li><strong>ReLU:</strong> <MathBlock inline math="f(3.0) = \max(0,\, 3.0) = 3.0" /> — positive input passes through unchanged</li>
          <li><strong>Sigmoid:</strong> <MathBlock inline math="f(3.0) = \frac{1}{1+e^{-3}} \approx 0.953" /> — squashed toward 1</li>
          <li><strong>Tanh:</strong> <MathBlock inline math="f(3.0) = \tanh(3.0) \approx 0.995" /> — squashed toward 1</li>
        </ul>

        <p className="text-sm font-semibold mt-4">Now try a <em>negative</em> pre-activation: <MathBlock inline math="z = -2.0" /></p>
        <ul className="list-disc list-inside text-sm space-y-1 ml-2 mt-1">
          <li><strong>ReLU:</strong> <MathBlock inline math="f(-2.0) = \max(0,\, -2.0) = 0" /> — negative input is killed (output is exactly zero)</li>
          <li><strong>Sigmoid:</strong> <MathBlock inline math="f(-2.0) = \frac{1}{1+e^{2}} \approx 0.119" /> — squashed toward 0</li>
          <li><strong>Tanh:</strong> <MathBlock inline math="f(-2.0) = \tanh(-2.0) \approx -0.964" /> — squashed toward −1</li>
        </ul>

        <p className="text-sm mt-3 text-indigo-700 dark:text-indigo-300">
          Notice how ReLU either passes the value through or kills it entirely — there is no
          in-between. Sigmoid and tanh always produce a non-zero output, but they compress
          large inputs into a narrow range. This difference matters during training (see Chapter 7).
        </p>
      </div>

      <ActivationFunctionWidget />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — FEED-FORWARD ARCHITECTURE
          ══════════════════════════════════════════════════════════ */}
      <h2>Feed-Forward Neural Networks: Layers and Weights</h2>

      <p>
        A <ConceptLink conceptId="feed-forward-network">feed-forward neural network</ConceptLink> organizes neurons
        into <em>layers</em>. Information flows in one direction — from
        input to output — with no cycles:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Layer 0 (Input layer):</strong> the raw features{' '}
          <MathBlock inline math="x_1, x_2, \ldots, x_d" />. No computation here
          — it simply feeds data forward.
        </li>
        <li>
          <strong>Layers 1 to L−1 (<ConceptLink conceptId="hidden-layer">Hidden layers</ConceptLink>):</strong> each unit
          computes a weighted sum of the previous layer's outputs, then
          applies an activation function.
        </li>
        <li>
          <strong>Layer L (Output layer):</strong> produces the final
          prediction — a class label, probability, or regression value.
        </li>
      </ul>

      <p>
        A network is called <ConceptLink conceptId="deep-learning">deep</ConceptLink> when it has many hidden
        layers. Depth enables hierarchical feature extraction — early layers
        detect simple patterns (edges), middle layers combine them (parts),
        and later layers recognize complex objects (faces, words).
      </p>

      <h3>Matrix Notation for One Hidden Layer</h3>

      <p>
        Consider a network with 2 inputs, 2 hidden units, and 1 output.
        The hidden layer's computation can be written compactly using a
        <ConceptLink conceptId="weight-matrix">weight matrix</ConceptLink> <MathBlock inline math="W" />:
      </p>

      <MathBlock
        math="\mathbf{z} = W\mathbf{x} + \mathbf{w}_0, \quad \mathbf{f} = g(\mathbf{z})"
      />

      <p>
        where <MathBlock inline math="W" /> is a{' '}
        <MathBlock inline math="2 \times 2" /> matrix, each row defining one
        hidden unit's linear classifier:
      </p>

      <MathBlock
        math="W = \begin{pmatrix} W_{11} & W_{12} \\ W_{21} & W_{22} \end{pmatrix}"
      />

      <p>
        The pre-activations for the two hidden units are:
      </p>

      <MathBlock
        math="z_1 = W_{11} x_1 + W_{12} x_2 + w_{0,1}"
      />
      <MathBlock
        math="z_2 = W_{21} x_1 + W_{22} x_2 + w_{0,2}"
      />

      <p>
        Then the activation function <MathBlock inline math="g" /> is applied
        element-wise to produce the hidden representation{' '}
        <MathBlock inline math="\mathbf{f} = (f_1, f_2)" />. The output layer
        applies a final linear combination to{' '}
        <MathBlock inline math="\mathbf{f}" /> to produce the prediction.
      </p>

      <ExpandableReading title="Why matrices? The vectorized view">
        <p>
          Writing layer computations as matrix multiplications is not just
          notational convenience — it maps directly to how GPUs execute
          neural networks. A GPU performs thousands of multiply-add
          operations in parallel, and the matrix form{' '}
          <MathBlock inline math="\mathbf{z} = W\mathbf{x}" /> tells the hardware
          exactly what to compute. This is one reason modern deep learning
          became practical only with GPU computing.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — ACTIVATION FUNCTIONS
          ══════════════════════════════════════════════════════════ */}
      <h2>Activation Functions: The Source of Nonlinearity</h2>

      <p>
        Without an activation function (or with a purely linear one), a
        multi-layer network collapses into a single linear transformation
        — stacking linear layers gains nothing. The activation function
        is what gives neural networks their expressive power.
      </p>

      <h3>Linear Activation (Identity)</h3>

      <MathBlock
        math="f(z) = z"
      />

      <p>
        The output equals the pre-activation. Two layers with linear
        activations produce{' '}
        <MathBlock inline math="V(Wx) = (VW)x" />, which is just a single
        linear transformation. There is <em>no benefit</em> to depth with
        linear activations — the network cannot learn nonlinear decision
        boundaries.
      </p>

      <h3><ConceptLink conceptId="tanh-activation">Tanh</ConceptLink> (Hyperbolic Tangent)</h3>

      <MathBlock
        math="f(z) = \tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}"
      />

      <p>
        Tanh squashes every input to the range{' '}
        <MathBlock inline math="(-1, +1)" />. Large positive inputs saturate near
        +1, large negative inputs near −1, and values near zero pass
        through roughly linearly. This S-shaped curve gives each hidden
        unit a "soft decision" about which side of its boundary a point
        falls on — closely related to the sign function, but smooth and
        differentiable.
      </p>

      <h3><ConceptLink conceptId="relu">ReLU</ConceptLink> (Rectified Linear Unit)</h3>

      <MathBlock
        math="f(z) = \max(0,\; z)"
      />

      <p>
        <ConceptLink conceptId="relu">ReLU</ConceptLink> is zero for negative inputs and identity for positive ones.
        It is piecewise linear — creating a sharp "hinge" at zero — and
        is the most popular activation in modern <ConceptLink conceptId="deep-learning">deep networks</ConceptLink>.
        Advantages: it does not saturate for positive inputs (avoiding
        the <ConceptLink conceptId="vanishing-gradient">vanishing gradient</ConceptLink> problem), and it is extremely cheap to
        compute.
      </p>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 my-4">
        <p className="font-medium text-green-800 dark:text-green-200">
          <strong>Quick comparison:</strong> Linear → no expressive power
          gain from depth. Tanh → smooth, bounded, good for small
          networks. ReLU → fast, scalable, the default for deep networks.
          Each choice affects what kinds of decision boundaries the network
          can learn and how easily it trains.
        </p>
      </div>

      <ActivationFunctionWidget />

      <ExpandableReading title="Activation zoo: Sigmoid, Leaky ReLU, GELU, and more">
        <p>
          The <ConceptLink conceptId="sigmoid">sigmoid</ConceptLink>{' '}
          <MathBlock inline math="\sigma(z) = 1/(1 + e^{-z})" /> squashes to
          (0, 1) and is common for output probabilities but suffers from
          vanishing gradients in hidden layers. <strong>Leaky ReLU</strong>
          {' '}<MathBlock inline math="f(z) = \max(0.01z,\; z)" /> avoids the
          "dying ReLU" problem where units stuck at zero never recover.{' '}
          <strong>GELU</strong> (Gaussian Error Linear Unit) is a smooth
          approximation to ReLU used in transformers. In practice, ReLU
          and its variants dominate hidden layers, while sigmoid or softmax
          are used at the output for probabilities.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6 — HIDDEN LAYER REPRESENTATIONS
          ══════════════════════════════════════════════════════════ */}
      <h2>How Hidden Layers Transform Data</h2>

      <p>
        The key insight: each hidden unit defines a decision boundary in
        input space (a line, in 2-D). The hidden layer's outputs{' '}
        <MathBlock inline math="(f_1, f_2, \ldots)" /> form a <em>new coordinate
        system</em> where each axis records "which side of boundary{' '}
        <MathBlock inline math="i" /> does this point lie on?"
      </p>

      <p>
        Consider two hidden units with tanh activations, applied to a 2-D
        classification problem where the data is not linearly separable.
        Each unit draws a line through the data:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          Unit 1 with weights <MathBlock inline math="(W_{11}, W_{12})" /> draws
          one decision boundary
        </li>
        <li>
          Unit 2 with weights <MathBlock inline math="(W_{21}, W_{22})" /> draws
          a second boundary
        </li>
      </ul>

      <p>
        In the hidden representation space{' '}
        <MathBlock inline math="(f_1, f_2)" />, each point gets coordinates based
        on its relationship to both boundaries. If the weights are chosen
        well, the classes that were tangled in the original{' '}
        <MathBlock inline math="(x_1, x_2)" /> space separate cleanly in the{' '}
        <MathBlock inline math="(f_1, f_2)" /> space — and a simple linear
        classifier on top finishes the job.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 my-4">
        <p className="font-medium text-blue-800 dark:text-blue-200">
          This is the neural network's version of the feature map story
          from Chapter 5. But instead of us choosing{' '}
          <MathBlock inline math="\phi" /> (like{' '}
          <MathBlock inline math="x \mapsto (x, x^2)" />), the network{' '}
          <em>learns</em> <MathBlock inline math="\phi" /> by adjusting its
          weights — the hidden layer <em>is</em> a learned feature map.
        </p>
      </div>

      <h3>Orientation Matters</h3>

      <p>
        Not all weight configurations produce useful representations.
        If both hidden units happen to draw nearly parallel decision
        boundaries, the transformed data collapses onto a nearly
        one-dimensional subspace — no separation gain. The training
        process (which we will study in the next chapter) searches for
        weight orientations that produce maximally useful representations.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7 — RANDOM HIDDEN UNITS
          ══════════════════════════════════════════════════════════ */}
      <h2>Random Hidden Units: Separation by Sheer Numbers</h2>

      <p>
        A remarkable fact: even <em>random</em> hidden units can make data
        separable, if you use enough of them. Consider 10 hidden units
        with random weights applied to a 2-D input. Each random unit draws
        a random line through the data, and the tanh activation records
        which side each point falls on (roughly +1 or −1).
      </p>

      <p>
        The hidden representation is now 10-dimensional — each point is
        described by its relationship to 10 random decision boundaries.
        In this high-dimensional space, the data almost always becomes
        linearly separable, even without any learning in the hidden layer.
      </p>

      <MathBlock
        math="\text{10 random hidden units: } \mathbb{R}^2 \to \mathbb{R}^{10}"
      />

      <p>
        This connects to Cover's theorem in statistical learning theory:
        as the dimensionality of the representation grows, random
        projections of the data become increasingly likely to be linearly
        separable. Neural networks go beyond random projections by{' '}
        <em>learning</em> the projections — finding the directions that
        are not just sufficient, but <em>optimal</em> for the task.
      </p>

      <ExpandableReading title="Random features vs. learned features">
        <p>
          Random feature approaches (like random kitchen sinks) are a
          legitimate technique in machine learning — they trade learning
          for more dimensions, relying on the high-dimensional space to
          make things separable. The advantage is speed: no need to
          backpropagate through hidden layers. The disadvantage is
          efficiency: learned features typically achieve the same
          performance with far fewer units because they adapt to the
          specific structure of the data. A network with 10 <em>learned</em>{' '}
          hidden units often outperforms one with 1000 random units.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8 — WHY DEEP LEARNING NOW?
          ══════════════════════════════════════════════════════════ */}
      <h2>Why <ConceptLink conceptId="deep-learning">Deep Learning</ConceptLink> Took Off</h2>

      <p>
        Neural networks were invented in the 1950s-60s, but deep learning
        became dominant only around 2012. Four factors converged:
      </p>

      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Massive datasets:</strong> ImageNet (14 million labeled
          images), web-scale text corpora, and vast sensor data gave deep
          networks the training signal they need. Small datasets cause
          overfitting; big datasets let large models generalize.
        </li>
        <li>
          <strong>GPU computing:</strong> Graphics processing units turned
          the matrix multiplications of neural networks from hours into
          seconds. A single modern GPU can perform trillions of
          floating-point operations per second.
        </li>
        <li>
          <strong>Large models are easier to train:</strong> Counterintuitively,
          bigger neural networks often train more smoothly — their loss
          landscapes have fewer bad local minima and more directions for
          gradient descent to make progress.
        </li>
        <li>
          <strong>Modular "LEGO" architecture:</strong> Neural network
          layers are composable building blocks — convolutional layers for
          spatial patterns, recurrent layers for sequences, attention layers
          for long-range dependencies. This modularity lets practitioners
          assemble architectures for any domain.
        </li>
      </ol>

      <ExpandableReading title="The hierarchy of learned features">
        <p>
          Deep networks learn a hierarchy of representations. In a vision
          network trained on natural images, the first layer typically
          learns edge detectors (similar to Gabor filters), the second layer
          combines edges into textures and simple shapes, the third layer
          detects parts of objects (eyes, wheels), and the final layers
          recognize complete objects (faces, cars). Each layer builds on the
          previous one, and this compositionality is what gives depth its
          power. A shallow network with one massive hidden layer can, in
          theory, represent the same function — but it may require
          exponentially more units to do so.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          DECISION SCENARIO
          ══════════════════════════════════════════════════════════ */}
      <DecisionScenario
        title="Choosing Your Network's Activation"
        scenario="You're building a neural network to classify handwritten digits (0-9). You have a small dataset of 5,000 images. Your colleague suggests using linear activations in the hidden layers because 'simpler is better.' Another suggests tanh because the data values are bounded. A third says ReLU is always the right choice."
        options={[
          {
            label: 'Linear activations — keep it simple',
            feedback:
              'With linear activations, your multi-layer network collapses to a single linear transformation — equivalent to logistic regression on the raw pixels. You gain no benefit from depth and cannot learn the nonlinear features needed for digit recognition.',
            isCorrect: false,
          },
          {
            label: 'Tanh — bounded and smooth',
            feedback:
              'Tanh is a reasonable choice, especially for a small network. It provides the nonlinearity needed to learn curved decision boundaries. However, for deeper networks it can suffer from vanishing gradients where the saturating tails kill the learning signal.',
            isCorrect: true,
          },
          {
            label: 'ReLU — the modern default',
            feedback:
              'ReLU is the standard choice for hidden layers in most modern architectures. It avoids saturation for positive inputs, trains faster, and works well even in deeper networks. For your small dataset, either tanh or ReLU will work — but ReLU scales better if you later increase model size.',
            isCorrect: true,
          },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9 — PUTTING IT ALL TOGETHER
          ══════════════════════════════════════════════════════════ */}
      <h2>Summary: The Neural Network Blueprint</h2>

      <p>
        Let us assemble the full picture. A feed-forward neural network:
      </p>

      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          Takes input <MathBlock inline math="\mathbf{x} \in \mathbb{R}^d" />
        </li>
        <li>
          Applies a weight matrix and bias at each layer:{' '}
          <MathBlock inline math="\mathbf{z}^{(l)} = W^{(l)} \mathbf{f}^{(l-1)} + \mathbf{w}_0^{(l)}" />
        </li>
        <li>
          Passes through an activation:{' '}
          <MathBlock inline math="\mathbf{f}^{(l)} = g(\mathbf{z}^{(l)})" />
        </li>
        <li>
          Repeats for each layer until the output layer produces{' '}
          <MathBlock inline math="\hat{y}" />
        </li>
      </ol>

      <p>
        The entire network is a composition of functions:
      </p>

      <MathBlock
        math="\hat{y} = f_L \circ f_{L-1} \circ \cdots \circ f_1(\mathbf{x})"
      />

      <p>
        where each <MathBlock inline math="f_l" /> is "affine transformation
        followed by activation." The hidden layers act as a{' '}
        <strong>learned feature map</strong>, transforming raw inputs into
        representations where the output layer's simple linear classifier
        can succeed.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          KEY TAKEAWAYS
          ══════════════════════════════════════════════════════════ */}
      <KeyTakeaways
        items={[
          'An artificial neuron is a linear classifier plus a nonlinear activation function — it computes z = w·x + w₀, then output = f(z).',
          'Feed-forward networks organize neurons into layers; information flows input → hidden → output with no cycles.',
          'Without nonlinear activations, stacking layers collapses to a single linear transformation — depth is wasted.',
          'Tanh squashes to (−1, +1) and is smooth; ReLU = max(0, z) is simple, fast, and avoids vanishing gradients for positive inputs.',
          'Hidden layers learn a feature map φ(x): they transform raw inputs into a representation where linear classification succeeds.',
          'Even random hidden units can make data linearly separable in high dimensions, but learned features are far more efficient.',
          'Deep learning took off because of large datasets, GPU computing, favorable optimization landscapes in large models, and modular architectures.',
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          QUIZ
          ══════════════════════════════════════════════════════════ */}
      <QuizSection
        questions={[
          {
            question:
              'What happens if you use a linear (identity) activation function in every layer of a deep neural network?',
            options: [
              'The network becomes more expressive with each added layer',
              'The entire network reduces to a single linear transformation',
              'Training becomes faster because gradients flow perfectly',
              'The network can only solve regression, not classification',
            ],
            correctIndex: 1,
            explanation:
              'A composition of linear functions is still linear: f(g(x)) = A(Bx) = (AB)x. No matter how many layers you stack, the result is equivalent to a single weight matrix. Depth provides no benefit without nonlinear activations.',
          },
          {
            question:
              'In a feed-forward network with one hidden layer, what does each hidden unit compute geometrically?',
            options: [
              'A probability distribution over classes',
              'A nonlinear curve in input space',
              'A linear decision boundary in input space, followed by a nonlinear activation',
              'A cluster assignment for the input',
            ],
            correctIndex: 2,
            explanation:
              'Each hidden unit computes z = w·x + w₀ (defining a hyperplane) and then applies an activation. In 2-D, each unit draws a line and "reports" which side the input falls on (after the nonlinear squash).',
          },
          {
            question:
              'Why are ReLU activations preferred over tanh in deep networks?',
            options: [
              'ReLU is bounded, preventing outputs from growing too large',
              'ReLU avoids saturation for positive inputs, reducing the vanishing gradient problem',
              'ReLU is a smoother function, making optimization easier',
              'ReLU always outputs positive values, which is required for classification',
            ],
            correctIndex: 1,
            explanation:
              'Tanh saturates at ±1 for large inputs, making gradients nearly zero and slowing learning in deep networks (vanishing gradients). ReLU has constant gradient 1 for positive inputs, so the learning signal flows through deep networks more effectively.',
          },
          {
            question:
              'How do hidden layers make non-linearly-separable data classifiable?',
            options: [
              'They remove outliers from the dataset',
              'They transform the data into a new representation where classes are linearly separable',
              'They memorize the training data exactly',
              'They reduce the dimensionality until the problem becomes trivial',
            ],
            correctIndex: 1,
            explanation:
              'Hidden layers act as a learned feature map. Each unit draws a decision boundary in input space, and the collection of outputs creates a new coordinate system. In this new space, the classes that were tangled in the original space often become linearly separable.',
          },
          {
            question:
              'Which factor was NOT a key driver of the deep learning revolution around 2012?',
            options: [
              'Availability of large labeled datasets like ImageNet',
              'GPU hardware enabling fast matrix operations',
              'Discovery of an entirely new mathematical theory of neural networks',
              'Observation that larger models have more favorable optimization landscapes',
            ],
            correctIndex: 2,
            explanation:
              'The math of neural networks (backpropagation, gradient descent) was established decades earlier. The revolution came from practical factors: big data, GPU compute, and the empirical finding that scale helps optimization — not from new theory.',
          },
        ]}
      />
    </ChapterLayout>
  )
}
