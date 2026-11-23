import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { HingeLossWidget } from '../components/widgets/HingeLossWidget'

export default function Ch3() {
  return (
    <ChapterLayout title="Hinge Loss, Margin, and Regularization" subtitle="Lecture 3">

      {/* ── Learning Objectives ── */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Define the geometric margin of a classifier and understand why maximizing it matters</li>
          <li>Derive hinge loss and compute it for concrete examples</li>
          <li>Understand regularization as a mechanism for controlling margin width</li>
          <li>Formulate the full large-margin classification objective</li>
          <li>Identify support vectors and explain their role in the solution</li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — WHY MARGINS MATTER
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Why Margins Matter</h2>

      <p>
        In Chapter 2 we found that many different <ConceptLink conceptId="decision-boundary">decision boundaries</ConceptLink> can separate a linearly
        separable dataset with zero training error. The <ConceptLink conceptId="perceptron">perceptron</ConceptLink>, for instance, halts as soon
        as it finds <em>any</em> boundary that classifies every training point correctly — but it
        makes no promise about <em>which</em> one. Some of those boundaries may cut dangerously
        close to certain data points, while others sit comfortably between the two classes.
      </p>

      <p>
        Intuitively, a boundary that sits far from <em>all</em> training points is more robust:
        a small perturbation of a new test point is less likely to land on the wrong side. This
        "breathing room" is called the <ConceptLink conceptId="margin">margin</ConceptLink>, and maximizing it is the central
        idea behind large-margin classification.
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-4">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          Visual intuition: imagine the decision boundary as a road, and the two classes of data
          points as buildings on either side. A <strong>narrow road</strong> is risky — a pedestrian
          barely has to step off the sidewalk to be in traffic. A <strong>wide road</strong> gives
          a comfortable buffer zone. The margin is the width of that road, and we want to make it
          as wide as possible.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — DEFINING THE MARGIN
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Defining the Margin Formally</h2>

      <h3>Signed Agreement</h3>
      <p>
        Before we can measure "how far" a point is from the boundary, we need a quantity that
        tells us whether the point is on the <em>correct</em> side and by how much. Given a
        <ConceptLink conceptId="linear-classifier">linear classifier</ConceptLink> with parameters{' '}
        <MathBlock inline math="\theta" /> and <MathBlock inline math="\theta_0" />, the{' '}
        <strong>signed agreement</strong> for training example{' '}
        <MathBlock inline math="(x^{(i)}, y^{(i)})" /> is:
      </p>

      <MathBlock
        math="y^{(i)}\bigl(\theta \cdot x^{(i)} + \theta_0\bigr)"
      />

      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>Positive</strong> when the classifier agrees with the true label —
          the point is on the correct side.
        </li>
        <li>
          <strong>Negative</strong> when the classifier disagrees —
          the point is misclassified.
        </li>
        <li>
          <strong>Large positive</strong> means confidently correct;{' '}
          <strong>small positive</strong> means barely correct; <strong>negative</strong> means wrong.
        </li>
      </ul>

      <h3>Geometric Margin</h3>
      <p>
        The signed agreement tells us correctness and confidence, but its scale depends on the
        magnitude of <MathBlock inline math="\theta" />. Doubling <MathBlock inline math="\theta" /> and{' '}
        <MathBlock inline math="\theta_0" /> doubles the signed agreement without moving the decision
        boundary at all. To get a <em>geometric</em> distance, we normalize:
      </p>

      <MathBlock
        math="\gamma_i(\theta, \theta_0) = \frac{y^{(i)}\bigl(\theta \cdot x^{(i)} + \theta_0\bigr)}{\|\theta\|}"
      />

      <p>
        This is the <strong>geometric margin</strong> of point <MathBlock inline math="i" />. It equals
        the signed perpendicular distance from <MathBlock inline math="x^{(i)}" /> to the decision
        boundary <MathBlock inline math="\theta \cdot x + \theta_0 = 0" />, with a positive sign if
        correctly classified and negative if misclassified.
      </p>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Computing the Geometric Margin</p>
        <p>
          Let <MathBlock inline math="\theta = (3, 4)" />, <MathBlock inline math="\theta_0 = 0" />,
          and consider the point <MathBlock inline math="x = (1, 2)" /> with label{' '}
          <MathBlock inline math="y = +1" />.
        </p>
        <p className="mt-2"><strong>Step 1 — Norm of θ:</strong></p>
        <MathBlock math="\|\theta\| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5" />
        <p className="mt-2"><strong>Step 2 — Signed agreement:</strong></p>
        <MathBlock math="y(\theta \cdot x + \theta_0) = (+1)\bigl(3 \cdot 1 + 4 \cdot 2 + 0\bigr) = (+1)(11) = 11" />
        <p className="mt-2"><strong>Step 3 — Geometric margin:</strong></p>
        <MathBlock math="\gamma = \frac{11}{5} = 2.2" />
        <p className="mt-2 text-sm">
          The point is 2.2 units away from the decision boundary, on the <em>correct</em> side
          (positive margin). Now notice what happens if we double the weights to{' '}
          <MathBlock inline math="\theta = (6, 8)" />: the signed agreement becomes 22, but{' '}
          <MathBlock inline math="\|\theta\| = 10" />, so the geometric margin stays at{' '}
          <MathBlock inline math="22/10 = 2.2" />. Scaling the weights does not change the
          true distance — that's the power of normalization.
        </p>
      </div>

      <ExpandableReading title="Why dividing by ||θ|| gives a true distance">
        <p>
          Recall that for any hyperplane <MathBlock inline math="\theta \cdot x + \theta_0 = 0" />,
          the unit normal vector is <MathBlock inline math="\theta / \|\theta\|" />. The perpendicular
          distance from a point <MathBlock inline math="x^{(i)}" /> to this hyperplane is:
        </p>
        <MathBlock
          math="d = \frac{|\theta \cdot x^{(i)} + \theta_0|}{\|\theta\|}"
        />
        <p>
          Multiplying by <MathBlock inline math="y^{(i)}" /> converts the absolute value into a sign
          that reflects correctness: positive for a correctly classified point, negative for a
          misclassified one. This is exactly the geometric margin formula.
        </p>
        <p>
          Crucially, if you replace <MathBlock inline math="\theta" /> with{' '}
          <MathBlock inline math="2\theta" /> and <MathBlock inline math="\theta_0" /> with{' '}
          <MathBlock inline math="2\theta_0" />, both the numerator and denominator double, so the
          geometric margin is unchanged — as expected, since the decision boundary itself
          hasn't moved.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — MARGIN BOUNDARIES
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Margin Boundaries and Width</h2>

      <p>
        To visualize the margin, imagine placing two "walls" parallel to the decision boundary,
        one on each side. These walls are defined by:
      </p>

      <MathBlock
        math="\theta \cdot x + \theta_0 = +1 \quad \text{(positive margin boundary)}"
      />
      <MathBlock
        math="\theta \cdot x + \theta_0 = -1 \quad \text{(negative margin boundary)}"
      />

      <p>
        The decision boundary itself sits at <MathBlock inline math="\theta \cdot x + \theta_0 = 0" />,
        exactly halfway between these two walls. Points with positive labels should ideally
        fall on or beyond the <MathBlock inline math="+1" /> boundary, and points with negative labels
        on or beyond the <MathBlock inline math="-1" /> boundary.
      </p>

      <h3>Computing the Width</h3>
      <p>
        The distance from the decision boundary to <em>either</em> margin boundary is:
      </p>
      <MathBlock math="\frac{1}{\|\theta\|}" />

      <p>
        So the <strong>total margin width</strong> — the gap between the two walls — is:
      </p>
      <MathBlock math="\text{margin width} = \frac{2}{\|\theta\|}" />

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-4">
        <p className="font-medium text-green-800 dark:text-green-200">
          Key insight: maximizing the margin width{' '}
          <MathBlock inline math="2/\|\theta\|" /> is the same as minimizing{' '}
          <MathBlock inline math="\|\theta\|" />. A <em>smaller</em>{' '}
          <MathBlock inline math="\theta" /> means a <em>wider</em> margin.
        </p>
      </div>

      <ExpandableReading title="Support vectors: the points that define the margin">
        <p>
          In the optimal solution, some training points will lie exactly on the margin
          boundaries (<MathBlock inline math="\theta \cdot x + \theta_0 = \pm 1" />). These are called{' '}
          <strong>support vectors</strong>. They are the "tightest" constraints: if you removed
          any non-support-vector point, the optimal boundary wouldn't change. But removing a
          support vector would shift the boundary.
        </p>
        <p>
          In the PDF visualizations from Lecture 3, support vectors are drawn as circled points
          sitting exactly on the dashed margin boundaries. All other training points lie further
          from the decision boundary and do not affect the solution.
        </p>
        <p>
          This is a powerful property: the decision boundary depends on only a small subset of
          the training data. In practice, many datasets yield a relatively small number of
          support vectors, which means the classifier is determined by the "hardest" examples
          near the class boundary.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — HINGE LOSS
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Hinge Loss</h2>

      <p>
        We want a loss function that rewards correct classification <em>with sufficient
        margin</em>. The <ConceptLink conceptId="hinge-loss">hinge loss</ConceptLink> does exactly this:
      </p>

      <MathBlock
        math="\text{Loss}_h(z) = \max(0,\; 1 - z)"
      />

      <p>
        where <MathBlock inline math="z = y^{(i)}(\theta \cdot x^{(i)} + \theta_0)" /> is the signed
        agreement (before normalizing by <MathBlock inline math="\|\theta\|" />).
      </p>

      <h3>Walking Through Concrete Examples</h3>

      <p>Let's compute the hinge loss for several values of <MathBlock inline math="z" />:</p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">z value</th>
              <th className="px-4 py-2 text-left">Meaning</th>
              <th className="px-4 py-2 text-left">Loss_h(z)</th>
              <th className="px-4 py-2 text-left">Interpretation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2 font-mono">z = 2</td>
              <td className="px-4 py-2">Correct, well beyond margin</td>
              <td className="px-4 py-2 font-mono">max(0, 1−2) = 0</td>
              <td className="px-4 py-2 text-green-700 dark:text-green-400">No penalty</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">z = 1</td>
              <td className="px-4 py-2">Correct, exactly on margin boundary</td>
              <td className="px-4 py-2 font-mono">max(0, 1−1) = 0</td>
              <td className="px-4 py-2 text-green-700 dark:text-green-400">No penalty (boundary case)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">z = 0.5</td>
              <td className="px-4 py-2">Correct, but inside the margin</td>
              <td className="px-4 py-2 font-mono">max(0, 1−0.5) = 0.5</td>
              <td className="px-4 py-2 text-amber-700 dark:text-amber-400">Small penalty — too close</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">z = 0</td>
              <td className="px-4 py-2">Exactly on the decision boundary</td>
              <td className="px-4 py-2 font-mono">max(0, 1−0) = 1</td>
              <td className="px-4 py-2 text-orange-700 dark:text-orange-400">Unit penalty — on the fence</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">z = −1</td>
              <td className="px-4 py-2">Misclassified, wrong side</td>
              <td className="px-4 py-2 font-mono">max(0, 1−(−1)) = 2</td>
              <td className="px-4 py-2 text-red-700 dark:text-red-400">Heavy penalty — wrong and far</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 my-4">
        <p className="font-medium text-purple-800 dark:text-purple-200">
          Notice the three regimes: (1) when <MathBlock inline math="z \geq 1" />, the point is correctly
          classified with margin and incurs zero loss; (2) when{' '}
          <MathBlock inline math="0 < z < 1" />, the point is technically correct but uncomfortably close
          to the boundary; (3) when <MathBlock inline math="z \leq 0" />, the point is outright
          misclassified. The hinge loss penalizes regimes (2) and (3) linearly.
        </p>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Computing Hinge Loss for Two Data Points</p>
        <p>
          Let <MathBlock inline math="\theta = (2, 1)" />, <MathBlock inline math="\theta_0 = -3" />.
          We'll compute the hinge loss for two different points.
        </p>

        <p className="mt-3 font-medium">Point A: <MathBlock inline math="x = (1, 2),\; y = +1" /></p>
        <p className="mt-1"><strong>Step 1</strong> — Raw score:</p>
        <MathBlock math="\theta \cdot x + \theta_0 = 2(1) + 1(2) + (-3) = 2 + 2 - 3 = 1" />
        <p><strong>Step 2</strong> — Signed agreement:</p>
        <MathBlock math="z = y(\theta \cdot x + \theta_0) = (+1)(1) = 1" />
        <p><strong>Step 3</strong> — Hinge loss:</p>
        <MathBlock math="\text{Loss}_h = \max(0,\; 1 - 1) = 0" />
        <p className="text-sm text-green-700 dark:text-green-400">
          This point sits exactly on the margin boundary — just barely safe, zero loss.
        </p>

        <p className="mt-4 font-medium">Point B: <MathBlock inline math="x = (0, 1),\; y = +1" /></p>
        <p className="mt-1"><strong>Step 1</strong> — Raw score:</p>
        <MathBlock math="\theta \cdot x + \theta_0 = 2(0) + 1(1) + (-3) = 0 + 1 - 3 = -2" />
        <p><strong>Step 2</strong> — Signed agreement:</p>
        <MathBlock math="z = y(\theta \cdot x + \theta_0) = (+1)(-2) = -2" />
        <p><strong>Step 3</strong> — Hinge loss:</p>
        <MathBlock math="\text{Loss}_h = \max(0,\; 1 - (-2)) = \max(0,\; 3) = 3" />
        <p className="text-sm text-red-700 dark:text-red-400">
          This point is on the <em>wrong</em> side of the boundary (negative agreement) and well
          inside the opposing territory — the loss of 3 is a heavy penalty that will push the
          optimizer to fix this misclassification.
        </p>
      </div>

      <HingeLossWidget />

      <ExpandableReading title="Hinge loss vs. 0/1 loss: why the hinge is better for optimization">
        <p>
          The natural loss for classification is the <strong>0/1 loss</strong>: 0 if correct, 1 if
          wrong. But 0/1 loss is flat almost everywhere (gradient = 0), so gradient-based
          optimization cannot make progress. It also ignores margin violations — a point barely
          correct gets the same 0 loss as a point far from the boundary.
        </p>
        <p>
          The hinge loss fixes both problems. Its gradient is non-zero for any point with{' '}
          <MathBlock inline math="z < 1" />, so the optimizer receives a signal to push the boundary
          away from problematic points. And it rewards margin: getting to{' '}
          <MathBlock inline math="z = 1" /> isn't enough to stop improving until the point is fully
          "outside" the margin zone.
        </p>
        <p>
          Compared to other smooth surrogates like logistic loss{' '}
          (<MathBlock inline math="\log(1 + e^{-z})" />), the hinge loss is exactly zero for{' '}
          <MathBlock inline math="z \geq 1" />, which makes the solution sparse — only the support
          vectors contribute to the gradient.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — REGULARIZATION
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Regularization</h2>

      <p>
        If we only minimized the average hinge loss, we could always reduce it by scaling{' '}
        <MathBlock inline math="\theta" /> up — making the signed agreements larger without actually
        improving the geometry of the boundary. We need a counterbalance that prevents{' '}
        <MathBlock inline math="\theta" /> from growing arbitrarily. This is <ConceptLink conceptId="regularization">regularization</ConceptLink>:
      </p>

      <MathBlock
        math="\text{Regularization term} = \frac{\lambda}{2}\|\theta\|^2"
      />

      <p>
        Here <MathBlock inline math="\lambda > 0" /> is a <ConceptLink conceptId="hyperparameter">hyperparameter</ConceptLink> that controls the strength of
        regularization. Think of it as a "price" on the magnitude of <MathBlock inline math="\theta" />:
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Large <MathBlock inline math="\lambda" /></strong>: heavy penalty on{' '}
          <MathBlock inline math="\|\theta\|" />, forcing <MathBlock inline math="\theta" /> to be small.
          Since margin width is <MathBlock inline math="2/\|\theta\|" />, a small{' '}
          <MathBlock inline math="\|\theta\|" /> means a <em>wide margin</em>. The classifier becomes
          simpler and more conservative.
        </li>
        <li>
          <strong>Small <MathBlock inline math="\lambda" /></strong>: light penalty, so the optimizer
          focuses on reducing hinge loss even if it means large <MathBlock inline math="\|\theta\|" />{' '}
          (narrow margin). The classifier fits the training data more tightly.
        </li>
      </ul>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-4">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          Intuition: regularization is like a tax on complexity. A high tax rate (large{' '}
          <MathBlock inline math="\lambda" />) discourages overfitting by forcing the classifier to
          find a solution that generalizes — even if it means tolerating a few training errors
          inside the margin.
        </p>
      </div>

      <ExpandableReading title="The effect of λ on the margin — visual walkthrough">
        <p>
          In Lecture 4's visualizations (which build directly on the ideas introduced here),
          the effect of <MathBlock inline math="\lambda" /> is shown across several settings:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <MathBlock inline math="\lambda = 0.01" />: very narrow margin. Only 1–2 support vectors.
            The boundary hugs the data tightly.
          </li>
          <li>
            <MathBlock inline math="\lambda = 0.1" /> to <MathBlock inline math="\lambda = 1" />: moderate
            margin, several support vectors appear as the margin "walls" widen.
          </li>
          <li>
            <MathBlock inline math="\lambda = 100" /> to <MathBlock inline math="\lambda = 1000" />: very wide
            margin. Many points become support vectors (circled). Some training errors may be
            tolerated inside the margin because the regularizer dominates.
          </li>
        </ul>
        <p className="mt-2">
          The optimal <MathBlock inline math="\lambda" /> balances the two objectives: low training
          error (good fit) versus wide margin (good generalization). This balance is typically
          found via cross-validation.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — THE FULL OBJECTIVE
          ══════════════════════════════════════════════════════════════════ */}
      <h2>The Full Objective Function</h2>

      <p>
        Combining the average hinge loss over all training points with the regularization term
        gives us the complete <strong>large-margin classification objective</strong>:
      </p>

      <MathBlock
        math="J(\theta, \theta_0) = \frac{1}{n}\sum_{i=1}^{n} \text{Loss}_h\!\bigl(y^{(i)}(\theta \cdot x^{(i)} + \theta_0)\bigr) + \frac{\lambda}{2}\|\theta\|^2"
      />

      <p>
        This is a function of the parameters <MathBlock inline math="\theta" /> and{' '}
        <MathBlock inline math="\theta_0" />. Our goal is to find the values that <em>minimize</em>{' '}
        <MathBlock inline math="J" />. The two terms pull in complementary directions:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Average Hinge Loss
          </h4>
          <MathBlock
            math="\frac{1}{n}\sum_{i=1}^{n} \text{Loss}_h(z_i)"
          />
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
            Encourages correctly classifying every training point with a margin of at
            least 1. Drives the boundary toward fitting the data.
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Regularization
          </h4>
          <MathBlock
            math="\frac{\lambda}{2}\|\theta\|^2"
          />
          <p className="text-sm text-green-700 dark:text-green-300 mt-2">
            Penalizes large parameter magnitudes, which widens the margin. Drives the
            boundary toward simplicity and generalization.
          </p>
        </div>
      </div>

      <ExpandableReading title="Structural risk minimization — the theory behind the tradeoff">
        <p>
          The two terms in the objective correspond to the classic bias-variance (or
          approximation-estimation) tradeoff in statistical learning theory:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            Minimizing only the loss term (no regularization) can lead to <ConceptLink conceptId="overfitting">overfitting</ConceptLink>:
            the classifier memorizes training noise and performs poorly on new data.
          </li>
          <li>
            Maximizing only the margin (ignoring training errors) can lead to{' '}
            <strong>underfitting</strong>: the classifier is too conservative and fails
            to capture the true pattern.
          </li>
        </ul>
        <p className="mt-2">
          The hyperparameter <MathBlock inline math="\lambda" /> controls where we sit on this
          spectrum. This is an instance of <em>structural risk minimization</em>, a principle
          from Vapnik's statistical learning theory: we minimize empirical risk (training loss)
          subject to a complexity bound (regularization), achieving the best generalization
          guarantee for the given model class.
        </p>
      </ExpandableReading>

      {/* ══════════════════════════════════════════════════════════════════
          DECISION SCENARIO
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Choosing Your Regularization Strength</h2>

      <DecisionScenario
        scenario="You are training a large-margin classifier on a medical imaging dataset to detect tumors. The training set has 200 images, and the features are pixel intensities (high-dimensional). You notice that with λ = 0.001, you get 100% training accuracy but 72% test accuracy. What should you try?"
        choices={[
          {
            label: 'Increase λ to widen the margin',
            explanation:
              'Correct. The gap between training accuracy (100%) and test accuracy (72%) is a classic sign of overfitting. Increasing λ strengthens the regularization penalty, shrinks ||θ||, widens the margin, and forces the classifier to generalize rather than memorize. You might try λ = 0.1 or λ = 1 and evaluate via cross-validation.',
            isRecommended: true,
          },
          {
            label: 'Decrease λ to fit the training data even harder',
            explanation:
              'This would make overfitting worse. With λ = 0.001, the model already memorizes the training set perfectly. Decreasing λ further removes the regularization safeguard, allowing ||θ|| to grow even larger (narrower margin) and making generalization even worse.',
            isRecommended: false,
          },
          {
            label: 'Remove regularization entirely (λ = 0)',
            explanation:
              'Without any regularization, the objective becomes pure loss minimization. In high-dimensional settings (like pixel features), this almost always leads to severe overfitting. The model finds a decision boundary that threads through the training data with zero margin, and performs poorly on new data.',
            isRecommended: false,
          },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — PUTTING IT ALL TOGETHER
          ══════════════════════════════════════════════════════════════════ */}
      <h2>Putting It All Together</h2>

      <p>
        Let's trace through the complete pipeline of ideas in this chapter. Given a training
        set of labeled examples:
      </p>

      <ol className="list-decimal list-inside space-y-2">
        <li>
          We define a linear decision boundary <MathBlock inline math="\theta \cdot x + \theta_0 = 0" />.
        </li>
        <li>
          For each training point, we compute the signed agreement{' '}
          <MathBlock inline math="z_i = y^{(i)}(\theta \cdot x^{(i)} + \theta_0)" />.
        </li>
        <li>
          We measure each point's penalty via hinge loss:{' '}
          <MathBlock inline math="\text{Loss}_h(z_i) = \max(0, 1-z_i)" />.
        </li>
        <li>
          We average these losses over all <MathBlock inline math="n" /> training points.
        </li>
        <li>
          We add a regularization penalty <MathBlock inline math="\frac{\lambda}{2}\|\theta\|^2" />{' '}
          that favors small <MathBlock inline math="\theta" /> (wide margins).
        </li>
        <li>
          We find the <MathBlock inline math="\theta, \theta_0" /> that minimize the total objective{' '}
          <MathBlock inline math="J(\theta, \theta_0)" />. The training points that sit exactly on the
          margin boundaries are the <strong>support vectors</strong>.
        </li>
      </ol>

      <p>
        In the next chapter, we'll see <em>how</em> to actually find this minimum — using
        gradient descent, stochastic gradient descent, and the quadratic program formulation
        that defines the Support Vector Machine.
      </p>

      {/* ══════════════════════════════════════════════════════════════════
          KEY TAKEAWAYS
          ══════════════════════════════════════════════════════════════════ */}
      <KeyTakeaways
        items={[
          'The geometric margin γᵢ = y⁽ⁱ⁾(θ · x⁽ⁱ⁾ + θ₀) / ||θ|| measures the signed distance from a point to the decision boundary.',
          'The margin boundaries θ · x + θ₀ = ±1 define a "corridor" of width 2/||θ|| around the decision boundary.',
          'Maximizing the margin is equivalent to minimizing ||θ||.',
          'Hinge loss = max(0, 1−z) penalizes misclassifications and points inside the margin, while ignoring well-classified points.',
          'The full objective J(θ, θ₀) = (1/n)Σ Loss_h(zᵢ) + (λ/2)||θ||² balances training fit against margin width.',
          'λ controls the tradeoff: large λ → wide margin (simpler), small λ → narrow margin (tighter fit).',
          'Support vectors are the training points on the margin boundaries — they alone determine the optimal decision boundary.',
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════════
          QUIZ
          ══════════════════════════════════════════════════════════════════ */}
      <QuizSection chapterId="ch3" />

    </ChapterLayout>
  )
}
