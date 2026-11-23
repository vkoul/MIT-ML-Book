import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch2() {
  return (
    <ChapterLayout title="Linear Classifiers and the Perceptron Algorithm" subtitle="Lecture 2">

      {/* ── Learning Objectives ── */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand the formal setup: feature vectors, labels, training sets, and classifiers</li>
          <li>Define linear classifiers and their decision boundaries</li>
          <li>Know what it means for data to be linearly separable</li>
          <li>Walk through the Perceptron algorithm step by step</li>
          <li>State the Perceptron convergence theorem and its implications</li>
        </ul>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — Quick Review of the ML Framework
          ═══════════════════════════════════════════════ */}
      <h2>Quick Review: The Machine Learning Framework</h2>

      <p>
        Before we dive into our first real classifier, let's make sure the vocabulary from
        Chapter 1 is fresh. Every supervised learning problem has the same cast of characters:
        <strong> <ConceptLink conceptId="feature-vector">feature vectors</ConceptLink></strong>, <strong>labels</strong>, a <strong><ConceptLink conceptId="training-set">training set</ConceptLink></strong>,
        and a <strong>classifier</strong> we're trying to learn.
      </p>

      <p>
        A <em>feature vector</em> is a list of numbers that describes one example. Think of it as
        a snapshot of everything we know about that example, packed into a single mathematical
        object. We write a feature vector as:
      </p>

      <MathBlock math="x \in \mathbb{R}^d" />

      <p>
        Here <MathBlock inline math="d" /> is the number of features — the dimensionality of our data.
        For a movie, <MathBlock inline math="d" /> might be the number of genre tags; for a medical
        patient, it could be dozens of lab results.
      </p>

      <p>
        Each example also has a <em>label</em> <MathBlock inline math="y" /> that tells us its class. For
        binary classification the label is simply:
      </p>

      <MathBlock math="y \in \{-1, +1\}" />

      <p>
        We collect <MathBlock inline math="n" /> labeled examples into a <em>training set</em>:
      </p>

      <MathBlock math="S_n = \{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \ldots, (x^{(n)}, y^{(n)})\}" />

      <p>
        Our goal is to find a <em>classifier</em> — a function <MathBlock inline math="h" /> that maps
        any feature vector to a predicted label:
      </p>

      <MathBlock math="h : \mathbb{R}^d \to \{-1, +1\}" />

      <ExpandableReading title="Training error vs. test error — what's the difference?">
        <p>
          The <strong>training error</strong> measures how many mistakes the classifier makes on
          the data it was trained on:
        </p>
        <MathBlock math="\varepsilon_n(h) = \frac{1}{n}\sum_{i=1}^{n} \mathbb{1}[h(x^{(i)}) \neq y^{(i)}]" />
        <p>
          Here <MathBlock inline math="\mathbb{1}[\cdot]" /> is the indicator function — it returns 1 when
          the condition inside is true, 0 otherwise.
        </p>
        <p>
          The <strong>test error</strong> is the same calculation but on <em>new</em> examples the
          classifier has never seen. This is the number we actually care about, because it tells us
          how well the classifier <em>generalizes</em>. A classifier with zero training error but
          high test error has <em>memorized</em> the training data instead of learning the
          underlying pattern — a problem called <strong><ConceptLink conceptId="overfitting">overfitting</ConceptLink></strong>.
        </p>
      </ExpandableReading>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Linear Classifiers
          ═══════════════════════════════════════════════ */}
      <h2>Linear Classifiers: Drawing a Straight Line Through Data</h2>

      <p>
        Imagine you have a room full of people, and you need to separate them into two groups.
        The simplest thing you could do is stretch a rope across the room — everyone on one side
        is Group A, everyone on the other is Group B. A <strong><ConceptLink conceptId="linear-classifier">linear classifier</ConceptLink></strong> is the
        mathematical version of that rope.
      </p>

      <p>
        In two dimensions, the "rope" is a straight line. In three dimensions, it's a flat plane.
        In higher dimensions, it's called a <em>hyperplane</em>. On one side, the classifier
        predicts <MathBlock inline math="+1" />; on the other, <MathBlock inline math="-1" />.
      </p>

      <p>
        Formally, a linear classifier is defined by two things: a <em>weight vector</em>{' '}
        <MathBlock inline math="\theta \in \mathbb{R}^d" /> and an <em>offset</em> (or bias){' '}
        <MathBlock inline math="\theta_0 \in \mathbb{R}" />. The classifier predicts:
      </p>

      <MathBlock math="h(x;\, \theta, \theta_0) = \text{sign}(\theta \cdot x + \theta_0)" />

      <p>
        The <MathBlock inline math="\text{sign}" /> function returns <MathBlock inline math="+1" /> when its
        input is positive, <MathBlock inline math="-1" /> when negative, and 0 on the boundary. The
        expression <MathBlock inline math="\theta \cdot x + \theta_0" /> is a dot product plus a
        constant — computing how far "above" or "below" the dividing hyperplane the point sits.
      </p>

      <h3>The Decision Boundary</h3>

      <p>
        The <em><ConceptLink conceptId="decision-boundary">decision boundary</ConceptLink></em> is the set of all points where the classifier is exactly
        undecided — the "rope" itself. It's the solution set of:
      </p>

      <MathBlock math="\theta \cdot x + \theta_0 = 0" />

      <p>
        This equation defines a hyperplane in <MathBlock inline math="\mathbb{R}^d" />. A crucial
        geometric fact: <strong>the weight vector <MathBlock inline math="\theta" /> is perpendicular
        (normal) to the decision boundary</strong>. It points from the negative side toward the
        positive side. Think of <MathBlock inline math="\theta" /> as an arrow sticking straight out of
        the dividing wall — it tells you which direction is "positive."
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg my-4">
        <p className="font-semibold text-amber-800 dark:text-amber-200">Geometric Intuition</p>
        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
          Picture a 2D plane with a straight line cutting through it. The vector{' '}
          <MathBlock inline math="\theta" /> sticks out perpendicular to that line. Any point on the side{' '}
          <MathBlock inline math="\theta" /> points toward gets a positive dot product with{' '}
          <MathBlock inline math="\theta" />, so <MathBlock inline math="\text{sign}(\theta \cdot x + \theta_0) = +1" />.
          Points on the opposite side get a negative dot product, predicting{' '}
          <MathBlock inline math="-1" />.
        </p>
      </div>

      <h3>Through-Origin Classifiers</h3>

      <p>
        A common simplification drops the offset <MathBlock inline math="\theta_0" />, forcing the
        decision boundary to pass through the origin:
      </p>

      <MathBlock math="h(x;\, \theta) = \text{sign}(\theta \cdot x)" />

      <p>
        This is less flexible — the hyperplane <em>must</em> pass through the point{' '}
        <MathBlock inline math="(0, 0, \ldots, 0)" /> — but it makes the math cleaner and is a natural
        starting point for algorithms like the Perceptron. Many results we prove for
        through-origin classifiers extend easily to the general case.
      </p>

      <ExpandableReading title="Why does the dot product measure 'which side' a point is on?">
        <p>
          Recall the geometric interpretation of the dot product: for two vectors{' '}
          <MathBlock inline math="a" /> and <MathBlock inline math="b" />,
        </p>
        <MathBlock math="a \cdot b = \|a\|\,\|b\|\cos\alpha" />
        <p>
          where <MathBlock inline math="\alpha" /> is the angle between them. When{' '}
          <MathBlock inline math="\alpha &lt; 90°" />, the cosine is positive; when{' '}
          <MathBlock inline math="\alpha &gt; 90°" />, it's negative.
        </p>
        <p>
          So <MathBlock inline math="\theta \cdot x > 0" /> means <MathBlock inline math="x" /> points
          "roughly in the same direction" as <MathBlock inline math="\theta" /> (angle less than 90°).
          Since <MathBlock inline math="\theta" /> is perpendicular to the boundary and points toward
          the positive side, any <MathBlock inline math="x" /> making an acute angle with it must be on
          the positive side.
        </p>
      </ExpandableReading>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Linear Separability
          ═══════════════════════════════════════════════ */}
      <h2>Linear Separability</h2>

      <p>
        Not every dataset can be cleanly divided by a hyperplane. When it <em>can</em>, we say
        the data is <strong><ConceptLink conceptId="linear-separability">linearly separable</ConceptLink></strong>.
      </p>

      <p>
        Formally, a training set <MathBlock inline math="S_n" /> is <em>linearly separable</em> if there
        exist <MathBlock inline math="\hat{\theta}" /> and <MathBlock inline math="\hat{\theta}_0" /> such that
        every single example is classified correctly:
      </p>

      <MathBlock math="y^{(i)}(\hat{\theta} \cdot x^{(i)} + \hat{\theta}_0) > 0 \quad \text{for all } i = 1, \ldots, n" />

      <p>
        Why <MathBlock inline math="y^{(i)}(\hat{\theta} \cdot x^{(i)} + \hat{\theta}_0) > 0" /> and
        not just "the sign matches"? This clever trick multiplies the true label by the
        classifier's raw score. If both are positive (correct prediction for a positive example)
        or both are negative (correct prediction for a negative example), their product is
        positive. A wrong prediction always gives a negative product. So the single condition
        "product &gt; 0" captures correctness for <em>both</em> classes at once.
      </p>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg my-4">
        <p className="font-semibold text-red-800 dark:text-red-200">Classic Example: XOR Is Not Linearly Separable</p>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
          Consider four points: <MathBlock inline math="(0,0) \to -1" />,{' '}
          <MathBlock inline math="(1,1) \to -1" />, <MathBlock inline math="(0,1) \to +1" />,{' '}
          <MathBlock inline math="(1,0) \to +1" />. No single straight line can separate the positives
          from the negatives. This is the famous XOR problem — we'll need nonlinear methods
          (Chapter 5) to handle it.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — The Perceptron Algorithm
          ═══════════════════════════════════════════════ */}
      <h2>The Perceptron Algorithm</h2>

      <p>
        Now the big question: <em>how do we find a good linear classifier?</em> We can't just
        eyeball the data in 50 dimensions. We need an algorithm that automatically finds a
        separating hyperplane — and the <strong><ConceptLink conceptId="perceptron">Perceptron</ConceptLink></strong>, invented by Frank Rosenblatt
        in 1958, is one of the oldest and most elegant approaches.
      </p>

      <p>
        The idea is beautifully simple: start with a guess, check every example, and whenever
        you make a mistake, nudge your parameters to do better on that example.
      </p>

      <h3>Algorithm (Through the Origin)</h3>

      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-5 rounded-lg my-4 font-mono text-sm">
        <p className="font-bold mb-2 font-sans text-base">Perceptron Algorithm</p>
        <p>1. Initialize: <MathBlock inline math="\theta = \mathbf{0}" /></p>
        <p className="mt-1">2. For each training example <MathBlock inline math="i = 1, \ldots, n" />:</p>
        <p className="ml-6 mt-1">If <MathBlock inline math="y^{(i)}(\theta \cdot x^{(i)}) \leq 0" /> &nbsp;(a mistake):</p>
        <p className="ml-12 mt-1">Update: <MathBlock inline math="\theta \leftarrow \theta + y^{(i)} x^{(i)}" /></p>
        <p className="mt-1">3. Repeat step 2 until no mistakes are made.</p>
      </div>

      <p>
        That's it! The update rule <MathBlock inline math="\theta \leftarrow \theta + y^{(i)} x^{(i)}" />{' '}
        is doing something geometrically intuitive: it shifts <MathBlock inline math="\theta" /> in the
        direction of the misclassified point (if positive) or away from it (if negative). Each
        nudge makes the classifier slightly more likely to get that point right next time.
      </p>

      <h3>Worked Example: Perceptron in 2D</h3>

      <p>
        Let's trace the algorithm on a tiny dataset to see it in action. Suppose we have three
        points:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-[300px] text-sm border-collapse mx-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Example</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2"><MathBlock inline math="x^{(i)}" /></th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2"><MathBlock inline math="y^{(i)}" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">1</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"><MathBlock inline math="(1, 1)" /></td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"><MathBlock inline math="+1" /></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">2</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"><MathBlock inline math="(-1, -1)" /></td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"><MathBlock inline math="-1" /></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">3</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"><MathBlock inline math="(-1, 1)" /></td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"><MathBlock inline math="+1" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Pass 1:</strong></p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Initialize:</strong> <MathBlock inline math="\theta = (0, 0)" />
        </li>
        <li>
          <strong>Example 1:</strong> Check <MathBlock inline math="y^{(1)}(\theta \cdot x^{(1)}) = (+1)(0 \cdot 1 + 0 \cdot 1) = 0 \leq 0" />.
          Mistake! Update: <MathBlock inline math="\theta \leftarrow (0,0) + (+1)(1,1) = (1, 1)" />.
        </li>
        <li>
          <strong>Example 2:</strong> Check <MathBlock inline math="(-1)(1 \cdot (-1) + 1 \cdot (-1)) = (-1)(-2) = 2 > 0" />.
          Correct — no update.
        </li>
        <li>
          <strong>Example 3:</strong> Check <MathBlock inline math="(+1)(1 \cdot (-1) + 1 \cdot 1) = (+1)(0) = 0 \leq 0" />.
          Mistake! Update: <MathBlock inline math="\theta \leftarrow (1,1) + (+1)(-1,1) = (0, 2)" />.
        </li>
      </ul>

      <p className="mt-4"><strong>Pass 2:</strong></p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Example 1:</strong> Check <MathBlock inline math="(+1)(0 \cdot 1 + 2 \cdot 1) = 2 > 0" />.
          Correct.
        </li>
        <li>
          <strong>Example 2:</strong> Check <MathBlock inline math="(-1)(0 \cdot (-1) + 2 \cdot (-1)) = (-1)(-2) = 2 > 0" />.
          Correct.
        </li>
        <li>
          <strong>Example 3:</strong> Check <MathBlock inline math="(+1)(0 \cdot (-1) + 2 \cdot 1) = 2 > 0" />.
          Correct.
        </li>
      </ul>

      <p className="mt-4">
        All three examples classified correctly — the algorithm converges! Our final
        classifier uses <MathBlock inline math="\theta = (0, 2)" />, which corresponds to the decision
        boundary <MathBlock inline math="2x_2 = 0" />, i.e., the horizontal line{' '}
        <MathBlock inline math="x_2 = 0" />. Everything above the <MathBlock inline math="x_1" />-axis is
        positive, everything below is negative.
      </p>

      <ExpandableReading title="Why does the update rule work geometrically?">
        <p>
          When the perceptron misclassifies a <em>positive</em> example{' '}
          <MathBlock inline math="(x^{(i)}, +1)" />, the update adds <MathBlock inline math="x^{(i)}" /> to{' '}
          <MathBlock inline math="\theta" />. This rotates the weight vector <em>toward</em> the
          misclassified point, making the dot product{' '}
          <MathBlock inline math="\theta \cdot x^{(i)}" /> larger (more positive) next time.
        </p>
        <p className="mt-2">
          When it misclassifies a <em>negative</em> example{' '}
          <MathBlock inline math="(x^{(i)}, -1)" />, the update subtracts{' '}
          <MathBlock inline math="x^{(i)}" /> from <MathBlock inline math="\theta" /> (since{' '}
          <MathBlock inline math="y^{(i)} = -1" />). This rotates the weight vector <em>away</em> from
          that point, making the dot product more negative — exactly what we want for a negative
          example.
        </p>
        <p className="mt-2">
          Each update fixes the current mistake but might create new ones on other points. The
          convergence theorem (below) guarantees that this back-and-forth eventually settles
          down — as long as a separating hyperplane exists.
        </p>
      </ExpandableReading>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — Convergence Theorem
          ═══════════════════════════════════════════════ */}
      <h2>The Perceptron Convergence Theorem</h2>

      <p>
        Does the perceptron always find a solution? If the data is linearly separable — <em>yes</em>.
        And we can even bound <em>how long it takes</em>.
      </p>

      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg my-4">
        <p className="font-bold text-purple-800 dark:text-purple-200">Theorem (Perceptron Convergence)</p>
        <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
          If the training data is linearly separable through the origin with margin{' '}
          <MathBlock inline math="\gamma" /> (meaning there exists a unit vector{' '}
          <MathBlock inline math="\theta^*" /> with <MathBlock inline math="y^{(i)}(\theta^* \cdot x^{(i)}) \geq \gamma" />{' '}
          for all <MathBlock inline math="i" />), and <MathBlock inline math="R = \max_i \|x^{(i)}\|" />, then
          the perceptron algorithm makes at most:
        </p>
        <MathBlock math="\left(\frac{R}{\gamma}\right)^2 \text{ mistakes}" />
      </div>

      <p>
        Let's unpack this. Two quantities control the speed of convergence:
      </p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <MathBlock inline math="\gamma" /> <strong>(gamma) — the <ConceptLink conceptId="margin">margin</ConceptLink>:</strong> How much "breathing
          room" exists between the classes and the nearest separating hyperplane. A large margin
          means the data is easy to separate; the classes are far apart.
        </li>
        <li>
          <MathBlock inline math="R" /> <strong> — the radius:</strong> The distance from the origin to
          the farthest data point. It measures how "spread out" the data is.
        </li>
      </ul>

      <p>
        The ratio <MathBlock inline math="R / \gamma" /> captures the "difficulty" of the
        classification problem. When the margin is large relative to the data spread, the
        perceptron converges quickly. When the margin is tiny — the classes barely separable — it
        can take many more updates.
      </p>

      <ExpandableReading title="What happens when data is NOT linearly separable?">
        <p>
          If no hyperplane can perfectly separate the classes, the standard perceptron will
          cycle forever without converging. It keeps making mistakes and updating, revisiting the
          same configurations in a loop.
        </p>
        <p className="mt-2">
          Several variants address this problem:
        </p>
        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
          <li>
            <strong>Averaged Perceptron:</strong> keep a running average of all the weight
            vectors seen during training, which tends to be more robust.
          </li>
          <li>
            <strong>Pocket Algorithm:</strong> always keep track of the best weight vector
            seen so far (the one with the fewest training errors) and return it at the end.
          </li>
          <li>
            <strong>Different algorithms entirely:</strong> hinge loss + regularization (SVM,
            Chapter 3) or neural networks handle non-separable data naturally.
          </li>
        </ul>
      </ExpandableReading>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — Perceptron with Offset
          ═══════════════════════════════════════════════ */}
      <h2>Perceptron with Offset</h2>

      <p>
        The through-origin perceptron forces the decision boundary to pass through zero, which is
        quite restrictive. The general perceptron includes an offset{' '}
        <MathBlock inline math="\theta_0" /> and updates both parameters:
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-5 rounded-lg my-4 font-mono text-sm">
        <p className="font-bold mb-2 font-sans text-base">Perceptron with Offset</p>
        <p>1. Initialize: <MathBlock inline math="\theta = \mathbf{0}, \quad \theta_0 = 0" /></p>
        <p className="mt-1">2. For each training example <MathBlock inline math="i = 1, \ldots, n" />:</p>
        <p className="ml-6 mt-1">If <MathBlock inline math="y^{(i)}(\theta \cdot x^{(i)} + \theta_0) \leq 0" />:</p>
        <p className="ml-12 mt-1"><MathBlock inline math="\theta \leftarrow \theta + y^{(i)} x^{(i)}" /></p>
        <p className="ml-12 mt-1"><MathBlock inline math="\theta_0 \leftarrow \theta_0 + y^{(i)}" /></p>
        <p className="mt-1">3. Repeat until no mistakes.</p>
      </div>

      <p>
        The only difference is the additional update to <MathBlock inline math="\theta_0" />. On a
        mistake, we shift the offset by <MathBlock inline math="+1" /> (for a missed positive) or{' '}
        <MathBlock inline math="-1" /> (for a missed negative). This lets the decision boundary slide
        away from the origin to better fit the data.
      </p>

      <ExpandableReading title="Trick: reducing 'with offset' to 'through origin'">
        <p>
          There's an elegant trick to avoid implementing two versions: augment each feature
          vector with a 1 at the end. Define{' '}
          <MathBlock inline math="\tilde{x} = [x_1, x_2, \ldots, x_d, 1]^T" /> and{' '}
          <MathBlock inline math="\tilde{\theta} = [\theta_1, \theta_2, \ldots, \theta_d, \theta_0]^T" />.
        </p>
        <p className="mt-2">
          Then <MathBlock inline math="\tilde{\theta} \cdot \tilde{x} = \theta \cdot x + \theta_0" />,
          so the "with-offset" problem in <MathBlock inline math="d" /> dimensions becomes a
          "through-origin" problem in <MathBlock inline math="d+1" /> dimensions. The same algorithm
          works for both.
        </p>
      </ExpandableReading>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — Decision Scenario
          ═══════════════════════════════════════════════ */}
      <h2>Choosing a Classifier: Practical Considerations</h2>

      <p>
        You've just learned your first ML algorithm. But in practice, you'll need to decide
        <em> when</em> a linear classifier is the right choice.
      </p>

      <DecisionScenario
        scenario="You're building a spam filter for emails. Your features are word counts across a 10,000-word vocabulary. The dataset has 50,000 labeled emails. Which approach makes the most sense to start with?"
        choices={[
          {
            label: 'Linear classifier (e.g., Perceptron or SVM)',
            explanation:
              'Good choice! With 10,000 features, the data often IS approximately linearly separable in high dimensions. Linear classifiers are fast, interpretable, and work remarkably well for text classification. This is the standard first approach for spam filtering.',
            isRecommended: true,
          },
          {
            label: 'Nonlinear classifier (e.g., kernel SVM or neural network)',
            explanation:
              'This could work, but it\'s overkill for a first attempt. High-dimensional text data is often linearly separable, and the added complexity of nonlinear methods may not help. Start simple and escalate only if needed.',
            isRecommended: false,
          },
          {
            label: 'Nearest-neighbor classifier',
            explanation:
              'Nearest-neighbor struggles badly in high dimensions (the "curse of dimensionality"). With 10,000 features, distances between points become nearly equal, making nearest-neighbor unreliable. It would also be extremely slow at test time with 50,000 training examples.',
            isRecommended: false,
          },
        ]}
      />

      {/* ═══════════════════════════════════════════════
          SECTION 8 — Key Takeaways & Quiz
          ═══════════════════════════════════════════════ */}
      <KeyTakeaways
        items={[
          'A linear classifier predicts sign(theta . x + theta_0): the sign of a dot product plus offset.',
          'The decision boundary theta . x + theta_0 = 0 is a hyperplane; theta is its normal vector.',
          'Data is linearly separable when a hyperplane can perfectly separate the two classes.',
          'The Perceptron starts at zero and updates theta <- theta + y_i * x_i on each mistake — simple, intuitive, and provably convergent.',
          'The convergence bound (R/gamma)^2 shows that well-separated data (large gamma) leads to fast convergence.',
          'The offset version updates both theta and theta_0; the augmented-vector trick unifies both cases.',
        ]}
      />

      <QuizSection chapterId="ch2" />
    </ChapterLayout>
  )
}
