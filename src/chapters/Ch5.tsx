import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch5() {
  return (
    <ChapterLayout
      title="Nonlinear Classification, Kernels, and the Kernel Trick"
      subtitle="Lecture 6"
    >
      {/* ── Learning Objectives ── */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-purple-800 dark:text-purple-200">
          Learning Objectives
        </h3>
        <ul className="list-disc list-inside text-sm text-purple-700 dark:text-purple-300 mt-2 space-y-1">
          <li>Understand why linear classifiers fail on certain data patterns</li>
          <li>Learn how feature maps lift data into spaces where linear methods work</li>
          <li>Master the kernel trick and why it makes high-dimensional features practical</li>
          <li>Compare polynomial and RBF kernels, and know when to use each</li>
          <li>Recognize overfitting in polynomial regression and how to control it</li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — THE LIMITS OF LINEARITY
          ══════════════════════════════════════════════════════════ */}
      <h2>When Straight Lines Are Not Enough</h2>

      <p>
        Everything we have built so far — the perceptron, hinge loss classifiers,
        SVMs — finds a <em>straight</em> decision boundary. That boundary is a
        line in 2-D, a plane in 3-D, or a hyperplane in general. It works
        beautifully when one class sits cleanly on one side and the other class
        sits on the other.
      </p>

      <p>
        But consider a simple scenario on the real number line. Suppose positive
        examples live in the interval [−1, 1] and negative examples live outside
        it (say, near −3 and +3). No single threshold — no single point where you
        split "left vs. right" — can separate these classes. A linear classifier
        on the real line can only cut the line at one point, putting everything to
        the left in one class and everything to the right in the other. Here,
        positives are <em>in the middle</em>, so no such cut works.
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 my-4">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          Think of it like a city road: imagine you need to separate two
          neighborhoods that are interlocked on a flat map. No matter how you
          draw a straight road, part of one neighborhood ends up on the wrong
          side. The solution? Add elevation — build a bridge. In machine
          learning, that "elevation" is a new dimension created by a feature map.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — FEATURE MAPS
          ══════════════════════════════════════════════════════════ */}
      <h2>Feature Maps: Adding Dimensions to Make Data Separable</h2>

      <p>
        A <ConceptLink conceptId="feature-mapping">feature map</ConceptLink>{' '}
        <MathBlock inline math="\phi" /> transforms each input{' '}
        <MathBlock inline math="x" /> into a new representation{' '}
        <MathBlock inline math="\phi(x)" /> that typically lives in a
        higher-dimensional space. The magic: patterns that were tangled in the
        original space often become linearly separable after the transformation.
      </p>

      <h3>1-D to 2-D: Solving the Interval Problem</h3>

      <p>
        Return to our number-line example. Define a feature map that takes a
        single number <MathBlock inline math="x" /> and produces a pair:
      </p>

      <MathBlock
        math="\phi(x) = \bigl(\phi_1(x),\; \phi_2(x)\bigr)"
      />

      <p>
        A natural choice is <MathBlock inline math="\phi(x) = (x,\; x^2)" />. Now
        a point like <MathBlock inline math="x = 0.5" /> maps to{' '}
        <MathBlock inline math="(0.5,\; 0.25)" />, while{' '}
        <MathBlock inline math="x = 3" /> maps to{' '}
        <MathBlock inline math="(3,\; 9)" />. In this new 2-D space the positive
        points (near the origin) cluster at low{' '}
        <MathBlock inline math="x^2" /> values, while the negatives (far from the
        origin) fly up to large <MathBlock inline math="x^2" /> values. A simple
        horizontal line at some height in this 2-D space separates them
        perfectly.
      </p>

      <h3>The XOR Problem: 2-D to 3-D</h3>

      <p>
        The classic challenge is the <strong>XOR pattern</strong>. Imagine four
        points in 2-D:
      </p>

      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <MathBlock inline math="(1, 1)" /> → positive (label +1)
        </li>
        <li>
          <MathBlock inline math="(-1, -1)" /> → positive (label +1)
        </li>
        <li>
          <MathBlock inline math="(1, -1)" /> → negative (label −1)
        </li>
        <li>
          <MathBlock inline math="(-1, 1)" /> → negative (label −1)
        </li>
      </ul>

      <p>
        Try drawing a straight line through the origin that puts{' '}
        <MathBlock inline math="(1,1)" /> and{' '}
        <MathBlock inline math="(-1,-1)" /> on one side and{' '}
        <MathBlock inline math="(1,-1)" /> and{' '}
        <MathBlock inline math="(-1,1)" /> on the other. You cannot — no line,
        with or without offset, separates XOR data in 2-D.
      </p>

      <p>
        Now define a feature map from 2-D to 3-D:
      </p>

      <MathBlock
        math="\phi(x_1, x_2) = (x_1,\; x_2,\; x_1 x_2)"
      />

      <p>
        After this transformation, the positive points become{' '}
        <MathBlock inline math="(1, 1, 1)" /> and{' '}
        <MathBlock inline math="(-1, -1, 1)" /> (third coordinate = +1), while
        the negative points become <MathBlock inline math="(1, -1, -1)" /> and{' '}
        <MathBlock inline math="(-1, 1, -1)" /> (third coordinate = −1). The
        third dimension, <MathBlock inline math="x_1 x_2" />, perfectly encodes the
        class label. A plane at <MathBlock inline math="\phi_3 = 0" /> in 3-D now
        separates the data linearly.
      </p>

      <ExpandableReading title="Why does adding x₁x₂ solve XOR?">
        <p>
          The XOR pattern has a special structure: the label equals the{' '}
          <em>sign of the product</em> of the two coordinates. When both
          coordinates agree in sign (both positive or both negative), the
          product is positive, matching label +1. When they disagree, the
          product is negative, matching label −1. By explicitly computing
          that product as a feature, we hand the linear classifier exactly
          the information it needs.
        </p>
        <p className="mt-2">
          This illustrates a general principle: the right feature map makes
          a hard problem trivial. The challenge is finding (or implicitly
          using) the right map — which is where kernels enter the story.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — NON-LINEAR CLASSIFICATION & REGRESSION
          ══════════════════════════════════════════════════════════ */}
      <h2>Nonlinear Classification and Regression</h2>

      <p>
        With a feature map in hand, all our linear methods carry over. A{' '}
        <strong>nonlinear classifier</strong> is simply a linear classifier
        applied in the feature space:
      </p>

      <MathBlock
        math="h(x;\, \theta,\, \theta_0) = \text{sign}\!\bigl(\theta \cdot \phi(x) + \theta_0\bigr)"
      />

      <p>
        The decision boundary in the <em>original</em> space is now a curve
        (or surface) — because <MathBlock inline math="\phi" /> can be nonlinear —
        but in the <em>feature</em> space it is still a hyperplane.
      </p>

      <p>
        Similarly, <strong>nonlinear regression</strong> fits a linear model
        in the transformed space:
      </p>

      <MathBlock
        math="f(x;\, \theta,\, \theta_0) = \theta \cdot \phi(x) + \theta_0"
      />

      <p>
        For instance, with <MathBlock inline math="\phi(x) = [x,\; x^2]^T" />,
        regression becomes <MathBlock inline math="f(x) = \theta_1 x + \theta_2 x^2 + \theta_0" />,
        which is a parabola — a nonlinear curve in the original space, but
        a linear function of the features <MathBlock inline math="(x, x^2)" />.
      </p>

      <h3>The Danger of Too Many Features: Overfitting</h3>

      <p>
        Adding more polynomial terms gives the model more flexibility. With{' '}
        <MathBlock inline math="\phi(x) = [x, x^2, x^3]^T" /> you get a cubic
        curve; with degree 5 or 7, ever more wiggly curves. The lecture shows
        a vivid comparison:
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-4 space-y-2">
        <p>
          <strong>Linear fit:</strong> A straight line through the data —
          too simple, misses the underlying curve (underfitting).
        </p>
        <p>
          <strong>3rd-order fit:</strong> A smooth cubic that captures the
          main trend nicely.
        </p>
        <p>
          <strong>5th-order fit:</strong> Starts to wiggle between data
          points — slightly suspicious.
        </p>
        <p>
          <strong>7th-order fit:</strong> Wild oscillations that pass through
          every training point but would predict nonsense for new data
          (overfitting).
        </p>
      </div>

      <p>
        This is a recurring theme: more expressive features = more risk of
        overfitting. Regularization (from Chapter 3) is the antidote, and
        kernels provide a principled way to work in very-high-dimensional
        feature spaces without drowning in complexity.
      </p>

      <ExpandableReading title="Bias-variance tradeoff in polynomial regression">
        <p>
          The linear fit has <strong>high bias</strong> (it cannot represent
          the true relationship) but <strong>low variance</strong> (it will not
          change much with different training samples). The 7th-order fit
          has <strong>low bias</strong> (it can represent almost any smooth
          curve) but <strong>high variance</strong> (a slightly different
          training set would produce a wildly different wiggly curve).
        </p>
        <p className="mt-2">
          The 3rd-order polynomial hits the sweet spot for this data: enough
          flexibility to capture the real pattern, not so much that it memorizes
          noise. In practice, you choose the degree (or regularization strength)
          using validation data, not the training set.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — THE KERNEL TRICK
          ══════════════════════════════════════════════════════════ */}
      <h2>The Kernel Trick: High Dimensions Without the Cost</h2>

      <p>
        Feature maps are powerful, but there is a catch: as polynomial degree
        grows, the dimension of <MathBlock inline math="\phi(x)" /> explodes. For
        a degree-<MathBlock inline math="p" /> polynomial over{' '}
        <MathBlock inline math="d" /> input features, the feature vector can have
        on the order of <MathBlock inline math="d^p" /> components. Computing and
        storing these vectors becomes impractical.
      </p>

      <p>
        The <ConceptLink conceptId="kernel-trick">kernel trick</ConceptLink> is based on a key observation:
        many learning algorithms (including the perceptron and SVMs) only
        ever access the data through <em>inner products</em>{' '}
        <MathBlock inline math="\phi(x) \cdot \phi(x')" />. If we can compute
        that inner product directly — without first building the full
        feature vector — we dodge the computational explosion.
      </p>

      <h3>A Concrete Example: The <ConceptLink conceptId="polynomial-kernel">Polynomial Kernel</ConceptLink></h3>

      <p>
        Consider the feature map for 2-D input with all degree-2 terms:
      </p>

      <MathBlock
        math="\phi(x) = \bigl[x_1,\; x_2,\; x_1^2,\; \sqrt{2}\, x_1 x_2,\; x_2^2\bigr]^T"
      />

      <p>
        This maps 2-D input into 5-D feature space. Computing the inner
        product of two such vectors means multiplying out all five components.
        But notice what happens when you expand the square of the regular
        inner product:
      </p>

      <MathBlock
        math="(x \cdot x')^2 = (x_1 x_1' + x_2 x_2')^2 = x_1^2 {x_1'}^2 + 2\, x_1 x_2\, x_1' x_2' + x_2^2 {x_2'}^2"
      />

      <p>
        This is exactly <MathBlock inline math="\phi(x) \cdot \phi(x')" /> for the
        feature map above (the{' '}
        <MathBlock inline math="\sqrt{2}" /> factor on the cross-term makes the
        bookkeeping work out). So instead of computing 5-D vectors and
        taking their dot product, you just compute the 2-D dot product and
        square it:
      </p>

      <MathBlock
        math="K(x, x') = \phi(x) \cdot \phi(x') = (x \cdot x')^2"
      />

      <p>
        The function <MathBlock inline math="K" /> is called a{' '}
        <ConceptLink conceptId="kernel-function">kernel function</ConceptLink>. It gives you the inner product in
        feature space at the cost of an inner product in the original space.
        For higher-degree polynomials over many input features, the savings
        are enormous: the feature space might have millions of dimensions,
        but the kernel evaluates in <MathBlock inline math="O(d)" /> time.
      </p>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Polynomial Kernel with Real Numbers</p>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          Let's verify the kernel trick works with concrete vectors. Take{' '}
          <MathBlock inline math="x = (1, 2)" /> and{' '}
          <MathBlock inline math="x' = (2, 1)" />, using the degree-2 polynomial kernel{' '}
          <MathBlock inline math="K(x, x') = (x \cdot x' + 1)^2" /> (with constant{' '}
          <MathBlock inline math="c = 1" />).
        </p>
        <div className="mt-3 space-y-3 text-sm text-indigo-700 dark:text-indigo-300">
          <div>
            <p><strong>The quick way (kernel):</strong></p>
            <MathBlock math="K(x, x') = (x \cdot x' + 1)^2 = (1 \cdot 2 + 2 \cdot 1 + 1)^2 = (5)^2 = 25" />
          </div>
          <div>
            <p>
              <strong>The hard way (explicit feature map):</strong> For the degree-2
              polynomial kernel with <MathBlock inline math="c = 1" />, the corresponding
              feature map is:
            </p>
            <MathBlock math="\phi(x) = \bigl(1,\; x_1^2,\; x_2^2,\; \sqrt{2}\,x_1,\; \sqrt{2}\,x_2,\; \sqrt{2}\,x_1 x_2\bigr)" />
          </div>
          <div>
            <p>Computing each feature vector:</p>
            <MathBlock math="\phi(1,2) = \bigl(1,\; 1,\; 4,\; \sqrt{2},\; 2\sqrt{2},\; 2\sqrt{2}\bigr)" />
            <MathBlock math="\phi(2,1) = \bigl(1,\; 4,\; 1,\; 2\sqrt{2},\; \sqrt{2},\; 2\sqrt{2}\bigr)" />
          </div>
          <div>
            <p>Now the dot product in 6-D feature space:</p>
            <MathBlock math="\phi(1,2) \cdot \phi(2,1) = 1{\cdot}1 + 1{\cdot}4 + 4{\cdot}1 + (\sqrt{2})(2\sqrt{2}) + (2\sqrt{2})(\sqrt{2}) + (2\sqrt{2})(2\sqrt{2})" />
            <MathBlock math="= 1 + 4 + 4 + 4 + 4 + 8 = 25 \;\;\checkmark" />
          </div>
        </div>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-3">
          Both paths give <strong>25</strong>. The kernel computed it with one dot
          product and one squaring; the explicit map required building two 6-D
          vectors and a 6-term dot product. For higher degrees and more input
          dimensions, this gap becomes enormous.
        </p>
      </div>

      <ExpandableReading title="Kernel composition rules: building complex kernels from simple ones">
        <p>
          You do not always need to derive a kernel from a known feature
          map. The lecture gives four composition rules that let you build
          new valid kernels from existing ones:
        </p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li>
            <MathBlock inline math="K(x, x') = 1" /> is a valid kernel function
            (the constant kernel).
          </li>
          <li>
            If <MathBlock inline math="K(x, x')" /> is a kernel and{' '}
            <MathBlock inline math="f: \mathbb{R}^d \to \mathbb{R}" /> is any function,
            then <MathBlock inline math="\tilde{K}(x, x') = f(x)\,K(x, x')\,f(x')" />{' '}
            is also a kernel.
          </li>
          <li>
            If <MathBlock inline math="K_1" /> and <MathBlock inline math="K_2" /> are
            kernels, then <MathBlock inline math="K_1 + K_2" /> is a kernel.
          </li>
          <li>
            If <MathBlock inline math="K_1" /> and <MathBlock inline math="K_2" /> are
            kernels, then <MathBlock inline math="K_1 \cdot K_2" /> is a kernel.
          </li>
        </ol>
        <p className="mt-2">
          These rules are practical: you can combine a linear kernel with a
          polynomial kernel, scale by a function, or multiply kernels to
          capture complex relationships — all while being guaranteed the
          result is a valid kernel with a corresponding (possibly
          infinite-dimensional) feature space.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — THE RBF KERNEL
          ══════════════════════════════════════════════════════════ */}
      <h2>The Radial Basis Function (RBF) Kernel</h2>

      <p>
        The most widely used kernel in practice is the{' '}
        <ConceptLink conceptId="rbf-kernel">radial basis function</ConceptLink> kernel (also called the
        Gaussian kernel):
      </p>

      <MathBlock
        math="K(x, x') = \exp\!\Bigl(-\frac{1}{2}\|x - x'\|^2\Bigr)"
      />

      <p>
        This kernel has a remarkable property: its corresponding feature
        space is <em>infinite-dimensional</em>. You can show this by
        expanding the exponential as a Taylor series — it involves inner
        products of <em>all</em> polynomial degrees, which requires
        infinitely many feature dimensions. Yet the kernel itself is just a
        simple function of the distance between two points.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">
          Intuition: the RBF Kernel Measures Similarity
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mt-2">
          When two points <MathBlock inline math="x" /> and{' '}
          <MathBlock inline math="x'" /> are close together,{' '}
          <MathBlock inline math="\|x - x'\|^2" /> is small, so the
          exponential is close to 1 — high similarity. When they are far
          apart, the distance is large, and the kernel value drops toward
          0 — low similarity. The classifier then makes predictions based
          on how similar a new point is to the training examples.
        </p>
      </div>

      <p>
        Because the RBF kernel implicitly works in an infinite-dimensional
        space, a kernel SVM with RBF can draw <em>any</em> smooth decision
        boundary — curves that wrap around clusters, separate interlocking
        spirals, or handle any topology of class regions. The lecture
        visualizations show the RBF kernel producing curved decision
        boundaries that neatly enclose a cluster of one class surrounded by
        another, something no polynomial of reasonable degree could achieve
        as cleanly.
      </p>

      <ExpandableReading title="The bandwidth parameter and its effect on the RBF kernel">
        <p>
          In practice, the RBF kernel often includes a bandwidth parameter{' '}
          <MathBlock inline math="\sigma" />:
        </p>
        <MathBlock
          math="K(x, x') = \exp\!\Bigl(-\frac{\|x - x'\|^2}{2\sigma^2}\Bigr)"
        />
        <p className="mt-2">
          A <strong>small</strong> <MathBlock inline math="\sigma" /> makes the
          kernel very peaked — each training point only influences
          predictions in a tiny neighborhood, leading to complex, potentially
          overfitting boundaries. A <strong>large</strong>{' '}
          <MathBlock inline math="\sigma" /> makes the kernel broad — each point
          influences a wide region, leading to smoother, simpler boundaries.
          This plays the same role as regularization: controlling the
          complexity of the decision surface.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6 — KERNEL PERCEPTRON
          ══════════════════════════════════════════════════════════ */}
      <h2>The Kernel Perceptron</h2>

      <p>
        To see how kernels integrate into an algorithm, consider the
        perceptron running in feature space. Recall the standard perceptron
        update rule from Chapter 2, but now applied to{' '}
        <MathBlock inline math="\phi(x)" /> instead of <MathBlock inline math="x" />:
      </p>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 font-mono text-sm">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Kernel Perceptron (through origin):
        </p>
        <p>
          Initialize: <MathBlock inline math="\theta = 0" />
        </p>
        <p className="mt-1">For each training example <MathBlock inline math="i = 1, \ldots, n" />:</p>
        <p className="ml-4 mt-1">
          If <MathBlock inline math="y^{(i)}\, \theta \cdot \phi(x^{(i)}) \leq 0" />:
        </p>
        <p className="ml-8">
          <MathBlock inline math="\theta \leftarrow \theta + y^{(i)}\,\phi(x^{(i)})" />
        </p>
      </div>

      <p>
        Here is the key insight: after all updates, <MathBlock inline math="\theta" />{' '}
        is always a <em>linear combination</em> of the feature-mapped training
        points:
      </p>

      <MathBlock
        math="\theta = \sum_{j=1}^{n} \alpha_j\, y^{(j)}\, \phi(x^{(j)})"
      />

      <p>
        where <MathBlock inline math="\alpha_j" /> counts how many times example{' '}
        <MathBlock inline math="j" /> triggered an update. So the decision function
        becomes:
      </p>

      <MathBlock
        math="\theta \cdot \phi(x) = \sum_{j=1}^{n} \alpha_j\, y^{(j)}\, \phi(x^{(j)}) \cdot \phi(x) = \sum_{j=1}^{n} \alpha_j\, y^{(j)}\, K(x^{(j)}, x)"
      />

      <p>
        We never need <MathBlock inline math="\phi" /> explicitly — only the
        kernel <MathBlock inline math="K" />. The algorithm stores{' '}
        <MathBlock inline math="\alpha_j" /> coefficients (one per training point)
        instead of a potentially infinite-dimensional{' '}
        <MathBlock inline math="\theta" /> vector. This same "kernelization" idea
        applies to SVMs, ridge regression, and many other algorithms.
      </p>

      <ExpandableReading title="From kernel perceptron to kernel SVM">
        <p>
          The kernel SVM works on the same principle. The SVM optimization
          problem can be reformulated entirely in terms of inner products
          between training points. Replacing each inner product{' '}
          <MathBlock inline math="\phi(x^{(i)}) \cdot \phi(x^{(j)})" /> with{' '}
          <MathBlock inline math="K(x^{(i)}, x^{(j)})" /> gives the kernel SVM.
          The resulting classifier has the same form:
        </p>
        <MathBlock
          math="h(x) = \text{sign}\!\Biggl(\sum_{j=1}^{n} \alpha_j\, y^{(j)}\, K(x^{(j)}, x) + \theta_0\Biggr)"
        />
        <p className="mt-2">
          Most <MathBlock inline math="\alpha_j" /> end up being zero — only the
          support vectors (training points on or near the margin boundary)
          have nonzero coefficients. This sparsity makes prediction
          efficient even with a large training set.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7 — KERNELS vs. FEATURES: WHEN TO USE WHAT
          ══════════════════════════════════════════════════════════ */}
      <h2>Kernels vs. Explicit Features: When to Use What</h2>

      <p>
        The lecture distinguishes two approaches:
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Explicit Feature Maps
          </h4>
          <ul className="list-disc list-inside text-sm space-y-1 text-green-700 dark:text-green-300">
            <li>Build features directly from domain knowledge</li>
            <li>Fast prediction (just a dot product with θ)</li>
            <li>Works well when features are low-to-moderate dimensional</li>
            <li>Preferred in deep learning (layers learn features)</li>
          </ul>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4">
          <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
            Kernel Methods
          </h4>
          <ul className="list-disc list-inside text-sm space-y-1 text-indigo-700 dark:text-indigo-300">
            <li>Work in very high (even infinite) dimensional spaces</li>
            <li>No need to design features by hand</li>
            <li>Prediction cost scales with number of support vectors</li>
            <li>Best for moderate-size datasets with complex boundaries</li>
          </ul>
        </div>
      </div>

      <DecisionScenario
        scenario="You are building a classifier for 10,000 medical images. Each image is 256×256 pixels. You suspect the decision boundary is highly nonlinear. Which approach should you consider?"
        choices={[
          {
            label: 'Polynomial features on raw pixels',
            explanation:
              'A degree-2 polynomial on 65,536 pixel features would produce billions of dimensions. This is computationally infeasible and would massively overfit without enormous amounts of regularization and data.',
            isRecommended: false,
          },
          {
            label: 'RBF kernel SVM',
            explanation:
              'The RBF kernel handles nonlinear boundaries without explicit high-dimensional features. With 10,000 images, the kernel matrix (10,000 × 10,000) is manageable. This is a solid classical approach for moderate-size datasets.',
            isRecommended: true,
          },
          {
            label: 'Linear classifier on raw pixels',
            explanation:
              'A linear classifier on raw pixels would be fast but unable to capture the nonlinear patterns you suspect exist. This sacrifices accuracy for speed — not the right tradeoff when accuracy matters (as in medical imaging).',
            isRecommended: false,
          },
          {
            label: 'Learned features via a neural network',
            explanation:
              'Deep learning learns feature maps from data and excels on images, but typically needs much more than 10,000 examples to train well (unless using transfer learning). A kernel SVM is more data-efficient here.',
            isRecommended: false,
          },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8 — PUTTING IT ALL TOGETHER
          ══════════════════════════════════════════════════════════ */}
      <h2>Putting It All Together</h2>

      <p>
        This chapter's story follows a logical arc:
      </p>

      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Problem:</strong> linear classifiers cannot separate
          certain data patterns (XOR, concentric clusters, etc.).
        </li>
        <li>
          <strong>Solution:</strong> map data to a higher-dimensional space
          via <MathBlock inline math="\phi" /> where it becomes linearly separable.
        </li>
        <li>
          <strong>New problem:</strong> high-dimensional feature vectors
          are expensive to compute and store.
        </li>
        <li>
          <strong>Solution:</strong> the kernel trick — compute inner products
          in feature space via a kernel function{' '}
          <MathBlock inline math="K(x, x')" /> without ever building{' '}
          <MathBlock inline math="\phi(x)" />.
        </li>
        <li>
          <strong>Practical tool:</strong> the RBF kernel gives infinite
          expressive power; regularization keeps overfitting in check.
        </li>
      </ol>

      <ExpandableReading title="Historical note: why kernel methods matter">
        <p>
          Kernel methods were the dominant approach in machine learning from
          the mid-1990s through the early 2010s, before deep learning took
          over for large-scale problems (especially in vision and language).
          They remain important today for several reasons: they work well
          with small datasets, they have strong theoretical guarantees, and
          they are the foundation for understanding concepts like implicit
          feature spaces and similarity-based learning that also underlie
          attention mechanisms in modern transformers.
        </p>
      </ExpandableReading>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Feature maps φ transform data into higher-dimensional spaces where linear classifiers can solve nonlinear problems.',
          'The XOR problem is unsolvable in 2-D but trivially separable in 3-D after adding the product feature x₁x₂.',
          'Higher polynomial degree gives more flexibility but risks overfitting — the 7th-order fit memorizes noise while the 3rd-order captures the true trend.',
          "The kernel trick computes inner products in feature space (K(x,x') = φ(x)·φ(x')) without explicitly building φ(x), saving massive computation.",
          "The RBF kernel K(x,x') = exp(-½‖x−x'‖²) works in infinite dimensions and measures point-to-point similarity: close → ~1, far → ~0.",
          'Kernel composition rules let you build complex kernels from simple ones: sum, product, and scaling all preserve the kernel property.',
          'The kernel perceptron and kernel SVM express θ as a weighted sum of kernel evaluations, never needing the feature map explicitly.',
        ]}
      />

      {/* ── Quiz ── */}
      <QuizSection chapterId="ch5" />
    </ChapterLayout>
  )
}
