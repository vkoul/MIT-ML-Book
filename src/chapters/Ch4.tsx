import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { GradientDescentWidget } from '../components/widgets/GradientDescentWidget'

export default function Ch4() {
  return (
    <ChapterLayout title="Optimization: Gradient Descent, SGD, and SVMs" subtitle="Lecture 4">

      {/* ── Learning Objectives ── */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand gradient descent as the core strategy for minimizing our objective</li>
          <li>Compare full-batch gradient descent with stochastic gradient descent (SGD)</li>
          <li>See how the regularization parameter λ controls the margin width</li>
          <li>Formulate the Support Vector Machine as a quadratic program</li>
        </ul>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 1 — RECAP: THE OBJECTIVE
          ════════════════════════════════════════════ */}
      <h2>Recall: The Objective We Need to Minimize</h2>

      <p>
        In the previous chapter we assembled a single formula that captures
        everything we want from a linear classifier: it should make few mistakes
        (low loss) while keeping the decision boundary simple (small weights).
        That formula is our <strong>objective function</strong>:
      </p>

      <MathBlock
        math="J(\theta, \theta_0) = \frac{1}{n}\sum_{i=1}^{n} \text{Loss}_h\!\bigl(y^{(i)}(\theta \cdot x^{(i)} + \theta_0)\bigr) \;+\; \frac{\lambda}{2}\|\theta\|^2"
      />

      <p>
        The first term is the <strong>average <ConceptLink conceptId="hinge-loss">hinge loss</ConceptLink></strong> — how badly the classifier
        mislabels (or barely labels) the training points. The second term is
        the <strong><ConceptLink conceptId="regularization">regularization</ConceptLink> penalty</strong> — it punishes large weight
        vectors, which correspond to narrow margins. The <ConceptLink conceptId="hyperparameter">hyperparameter</ConceptLink>{' '}
        <MathBlock inline math="\lambda" /> balances the two.
      </p>

      <p>
        Our goal now is practical: <em>how do we actually find the θ and θ₀
        that make J as small as possible?</em> The answer is optimization, and
        the workhorse algorithm is <ConceptLink conceptId="gradient-descent">gradient descent</ConceptLink>.
      </p>

      {/* ════════════════════════════════════════════
          SECTION 2 — EFFECT OF λ ON THE MARGIN
          ════════════════════════════════════════════ */}
      <h2>How λ Controls the Margin</h2>

      <p>
        Before we dive into the optimization algorithm, let's build intuition
        for what different values of λ actually <em>do</em> to the decision
        boundary. Recall that the margin width is{' '}
        <MathBlock inline math="\frac{2}{\|\theta\|}" />, so penalizing{' '}
        <MathBlock inline math="\|\theta\|^2" /> more heavily forces a wider margin.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">Visualizing λ from small to large</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <p className="font-bold text-red-600 dark:text-red-400">λ = 0.01 — "Fit the data tightly"</p>
            <p className="mt-1">
              Almost all weight is on the loss term. The optimizer finds a
              boundary that separates the points with a <strong>very narrow
              margin</strong>. Only one or two points sit exactly on the margin
              boundaries (few support vectors). The classifier is highly tuned
              to this specific dataset — great on training data, risky on new data.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <p className="font-bold text-yellow-600 dark:text-yellow-400">λ = 1 — "Balanced"</p>
            <p className="mt-1">
              Loss and regularization carry equal influence. The margin is
              <strong> moderate</strong>, and several points from both classes
              land on or near the margin boundaries (circled as support vectors).
              A healthy balance between fitting and generalizing.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <p className="font-bold text-green-600 dark:text-green-400">λ = 100 — "Keep it simple"</p>
            <p className="mt-1">
              The regularizer dominates. The optimizer must keep{' '}
              <MathBlock inline math="\|\theta\|" /> tiny, producing a <strong>very wide
              margin</strong>. Many points end up inside the margin zone and
              become support vectors. Some training points may be misclassified,
              but the boundary generalizes better to unseen data.
            </p>
          </div>
        </div>
      </div>

      <ExpandableReading title="Why does a wider margin improve generalization?">
        <p>
          Think of the margin as a "buffer zone" around the decision boundary.
          A wider buffer means a new, unseen data point has to be farther from
          the boundary before it risks being on the wrong side. Statistically,
          wider margins correspond to lower <strong>VC dimension</strong> —
          a measure of model complexity — and therefore lower generalization
          error. This is the central insight behind the <ConceptLink conceptId="svm">SVM</ConceptLink>: maximizing the
          margin is a principled way to prevent <ConceptLink conceptId="overfitting">overfitting</ConceptLink>, even without a
          separate validation set.
        </p>
        <p>
          When λ = 1000, the margin becomes so wide that the decision boundary
          is almost "ignoring" individual data points. This is like fitting a
          very simple model — the <ConceptLink conceptId="bias-variance-tradeoff">bias-variance tradeoff</ConceptLink> tilts strongly toward
          low variance (stable across datasets) at the cost of higher bias
          (may underfit).
        </p>
      </ExpandableReading>

      {/* ════════════════════════════════════════════
          SECTION 3 — GRADIENT DESCENT
          ════════════════════════════════════════════ */}
      <h2>Gradient Descent: Rolling a Ball Downhill</h2>

      <p>
        Imagine you're blindfolded on a hilly landscape and your goal is to
        reach the lowest valley. Your strategy: feel which direction slopes
        downward most steeply, then take a step in that direction. Repeat.
        That's <strong>gradient descent</strong>.
      </p>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 p-4 rounded-r-lg my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200">The ball-on-a-hill analogy</p>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
          The landscape is the surface of <MathBlock inline math="J(\theta)" />. The
          ball's position is the current parameter vector θ. Gravity pulls the
          ball downhill — that pull is the <strong>negative gradient</strong>{' '}
          <MathBlock inline math="-\nabla J(\theta)" />. The step size is the
          <strong> learning rate</strong> η. A big η means large, aggressive steps;
          a small η means cautious, tiny steps.
        </p>
      </div>

      <p>The update rule is elegantly simple:</p>

      <MathBlock math="\theta \;\leftarrow\; \theta - \eta\,\nabla_\theta J(\theta)" />

      <p>
        At each iteration, we compute the gradient of J with respect to θ —
        the direction of steepest <em>ascent</em> — and move in the
        <em> opposite</em> direction by a step of size η. The process repeats
        until J stops decreasing meaningfully (convergence).
      </p>

      <h3>A concrete example: one step of gradient descent</h3>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-sm space-y-2">
        <p>
          Suppose our current parameters are{' '}
          <MathBlock inline math="\theta = [4, \; 2]" /> and the gradient at this
          point is <MathBlock inline math="\nabla J = [0.8, \; -0.4]" />. With a
          learning rate of <MathBlock inline math="\eta = 0.5" />:
        </p>
        <MathBlock
          math="\theta_{\text{new}} = [4, \; 2] - 0.5 \cdot [0.8, \; -0.4] = [4 - 0.4, \; 2 + 0.2] = [3.6, \; 2.2]"
        />
        <p>
          Notice: the first component decreased (the gradient was positive, so
          we moved in the negative direction) and the second component increased
          (the gradient was negative there, so moving opposite means going up).
          The ball rolled a little to the left and a little upward in the second
          dimension — chasing the steepest descent.
        </p>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Watching Gradient Descent Converge</p>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          Let's trace multiple steps on a simple 1-D objective to see convergence in action.
          Suppose <MathBlock inline math="J(\theta) = (\theta - 3)^2" />, whose minimum is at{' '}
          <MathBlock inline math="\theta^* = 3" />. The gradient is{' '}
          <MathBlock inline math="\nabla J = 2(\theta - 3)" />. We start at{' '}
          <MathBlock inline math="\theta = 0" /> with learning rate{' '}
          <MathBlock inline math="\eta = 0.1" />.
        </p>
        <div className="mt-3 space-y-2 text-sm text-indigo-700 dark:text-indigo-300">
          <p>
            <strong>Step 1:</strong> gradient{' '}
            <MathBlock inline math="= 2(0 - 3) = -6" />.
            Update: <MathBlock inline math="\theta \leftarrow 0 - 0.1 \times (-6) = 0.6" />.
          </p>
          <p>
            <strong>Step 2:</strong> gradient{' '}
            <MathBlock inline math="= 2(0.6 - 3) = -4.8" />.
            Update: <MathBlock inline math="\theta \leftarrow 0.6 - 0.1 \times (-4.8) = 1.08" />.
          </p>
          <p>
            <strong>Step 3:</strong> gradient{' '}
            <MathBlock inline math="= 2(1.08 - 3) = -3.84" />.
            Update: <MathBlock inline math="\theta \leftarrow 1.08 - 0.1 \times (-3.84) = 1.464" />.
          </p>
          <p>
            <strong>Step 4:</strong> gradient{' '}
            <MathBlock inline math="= 2(1.464 - 3) = -3.072" />.
            Update: <MathBlock inline math="\theta \leftarrow 1.464 - 0.1 \times (-3.072) = 1.771" />.
          </p>
        </div>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-3">
          The pattern: <MathBlock inline math="\theta" /> moves{' '}
          <MathBlock inline math="0 \to 0.6 \to 1.08 \to 1.46 \to 1.77 \to \cdots \to 3" />, approaching
          the minimum in smaller and smaller steps. Each step is 80% as large as
          the previous one (because <MathBlock inline math="1 - 2\eta = 0.8" />). With{' '}
          <MathBlock inline math="\eta = 0.5" /> it converges in one step; with{' '}
          <MathBlock inline math="\eta > 1" /> it would <em>diverge</em> — overshooting further each time.
        </p>
      </div>

      <GradientDescentWidget />

      <ExpandableReading title="How to choose the learning rate η">
        <p>
          The learning rate is one of the most important hyperparameters in
          machine learning. If η is <strong>too large</strong>, the ball
          overshoots the valley and bounces back and forth — the objective
          may even <em>increase</em>. If η is <strong>too small</strong>,
          convergence is painfully slow: hundreds of tiny steps to reach the
          bottom.
        </p>
        <p>
          Common strategies include:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Fixed η</strong>: simple but requires manual tuning. Good
            values are often in the range 0.001 to 0.1.
          </li>
          <li>
            <strong>Decaying schedule</strong>: start with a larger η and shrink
            it over time, e.g.{' '}
            <MathBlock inline math="\eta_t = \eta_0 / (1 + t)" />. Large early steps
            cover ground quickly; small later steps refine the solution.
          </li>
          <li>
            <strong>Adaptive methods</strong> (Adam, RMSProp): automatically
            adjust per-parameter learning rates based on past gradients. These
            are the workhorses of modern deep learning.
          </li>
        </ul>
      </ExpandableReading>

      {/* ════════════════════════════════════════════
          SECTION 4 — STOCHASTIC GRADIENT DESCENT
          ════════════════════════════════════════════ */}
      <h2>Stochastic Gradient Descent (SGD)</h2>

      <p>
        Full gradient descent has a problem: to compute <MathBlock inline math="\nabla J" />,
        you must evaluate the loss on <strong>every single training example</strong>{' '}
        and then average. If you have a million examples, that's a million loss
        computations for <em>one</em> update to θ. The cost per step is{' '}
        <MathBlock inline math="O(nd)" /> where n is the number of examples and d is the
        number of features.
      </p>

      <p>
        <ConceptLink conceptId="sgd">Stochastic gradient descent</ConceptLink> offers a radical shortcut:
        instead of averaging over <em>all</em> training examples, just pick{' '}
        <em>one</em> at random and pretend its gradient is a good-enough
        estimate of the full gradient.
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-lg my-4">
        <p className="font-semibold text-amber-800 dark:text-amber-200">SGD Algorithm</p>
        <div className="mt-2 space-y-1 text-sm text-amber-900 dark:text-amber-100">
          <p>Write the objective as an average of per-example terms:</p>
          <MathBlock
            math="J(\theta) = \frac{1}{n}\sum_{i=1}^{n}\Bigl[\text{Loss}_h(y^{(i)}\,\theta \cdot x^{(i)}) + \frac{\lambda}{2}\|\theta\|^2\Bigr]"
          />
          <p>At each step:</p>
          <p>1. Select <MathBlock inline math="i \in \{1, \dots, n\}" /> at random.</p>
          <p>2. Update using only that one example's gradient:</p>
          <MathBlock
            math="\theta \;\leftarrow\; \theta - \eta_t\,\nabla_\theta\!\Bigl[\text{Loss}_h(y^{(i)}\,\theta \cdot x^{(i)}) + \frac{\lambda}{2}\|\theta\|^2\Bigr]"
          />
        </div>
      </div>

      <p>
        Each SGD step costs only <MathBlock inline math="O(d)" /> — independent of the
        dataset size. The tradeoff? The updates are <em>noisy</em>: one random
        example doesn't perfectly represent the whole dataset, so the path
        toward the minimum is jagged rather than smooth. But in practice, those
        noisy steps still make progress on average, and the speed advantage is
        enormous.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-sm">
        <h3 className="font-semibold mb-2">GD vs SGD at a glance</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="pb-2 pr-4">Property</th>
              <th className="pb-2 pr-4">Gradient Descent</th>
              <th className="pb-2">SGD</th>
            </tr>
          </thead>
          <tbody className="space-y-1">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-2 pr-4 font-medium">Cost per step</td>
              <td className="py-2 pr-4">O(nd) — scan all examples</td>
              <td className="py-2">O(d) — one example</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-2 pr-4 font-medium">Update direction</td>
              <td className="py-2 pr-4">Exact gradient</td>
              <td className="py-2">Noisy estimate</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-2 pr-4 font-medium">Path to minimum</td>
              <td className="py-2 pr-4">Smooth descent</td>
              <td className="py-2">Jagged / zigzag</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Big-data friendly?</td>
              <td className="py-2 pr-4">No — each step is slow</td>
              <td className="py-2">Yes — fast steps, many of them</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExpandableReading title="Mini-batch SGD: the practical middle ground">
        <p>
          In practice, nobody uses pure SGD (one example) or pure GD (all
          examples). The standard approach is <strong>mini-batch SGD</strong>:
          at each step, sample a small batch of B examples (typically B = 32,
          64, or 128) and average their gradients.
        </p>
        <MathBlock
          math="\theta \;\leftarrow\; \theta - \eta_t \cdot \frac{1}{B}\sum_{j=1}^{B} \nabla_\theta\!\Bigl[\text{Loss}_h(y^{(i_j)}\,\theta \cdot x^{(i_j)}) + \frac{\lambda}{2}\|\theta\|^2\Bigr]"
        />
        <p>
          Mini-batches reduce the noise compared to single-example SGD (the
          average of 64 random gradients is a better estimate than one), while
          still being far cheaper than a full pass through the data. They also
          exploit GPU parallelism — modern hardware can process a batch of 64
          examples almost as fast as a single example.
        </p>
      </ExpandableReading>

      {/* ════════════════════════════════════════════
          SECTION 5 — SUPPORT VECTOR MACHINES
          ════════════════════════════════════════════ */}
      <h2>Support Vector Machines as a Quadratic Program</h2>

      <p>
        When the data is linearly separable (every training point is correctly
        classified with some margin), we can push the idea of maximizing the
        margin to its logical extreme. Instead of the soft hinge-loss
        formulation, we demand that <em>every</em> point lies on or beyond
        the margin boundary. This leads to the classic <strong>Support Vector
        Machine</strong> formulation.
      </p>

      <p>
        The SVM solves the following <strong>quadratic program</strong>:
      </p>

      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 p-4 rounded-r-lg my-4">
        <p className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
          SVM Quadratic Program
        </p>
        <MathBlock
          math="\text{Find } \theta, \theta_0 \text{ that minimize } \frac{1}{2}\|\theta\|^2"
        />
        <MathBlock
          math="\text{subject to } \quad y^{(i)}(\theta \cdot x^{(i)} + \theta_0) \geq 1, \quad i = 1, \ldots, n"
        />
      </div>

      <p>
        Minimizing <MathBlock inline math="\frac{1}{2}\|\theta\|^2" /> is the same as
        maximizing the margin <MathBlock inline math="\frac{2}{\|\theta\|}" />. The
        constraints say every training point must be classified correctly with
        a functional margin of at least 1. The data points where the constraint
        binds — where equality holds — are the <strong>support vectors</strong>.
        They sit exactly on the margin boundaries at{' '}
        <MathBlock inline math="\theta \cdot x + \theta_0 = +1" /> or{' '}
        <MathBlock inline math="\theta \cdot x + \theta_0 = -1" />.
      </p>

      <ExpandableReading title="Connection between the SVM QP and our earlier objective">
        <p>
          The quadratic program is closely related to the hinge-loss objective.
          When the data is separable and we set λ high enough (or equivalently,
          set C = 1/λ low enough), the hinge-loss objective drives all losses
          to zero, leaving only the regularizer{' '}
          <MathBlock inline math="\frac{\lambda}{2}\|\theta\|^2" /> to minimize.
          The constraints{' '}
          <MathBlock inline math="y^{(i)}(\theta \cdot x^{(i)} + \theta_0) \geq 1" />{' '}
          encode the requirement that hinge loss is zero (the agreement
          exceeds 1).
        </p>
        <p>
          For non-separable data, SVMs introduce <strong>slack variables</strong>{' '}
          <MathBlock inline math="\xi_i \geq 0" /> that allow some points to violate
          the margin:{' '}
          <MathBlock inline math="y^{(i)}(\theta \cdot x^{(i)} + \theta_0) \geq 1 - \xi_i" />.
          The objective then becomes{' '}
          <MathBlock inline math="\frac{1}{2}\|\theta\|^2 + C\sum_i \xi_i" />,
          which is equivalent to the hinge-loss formulation with C = 1/(nλ).
        </p>
      </ExpandableReading>

      {/* ════════════════════════════════════════════
          SECTION 6 — DECISION SCENARIO
          ════════════════════════════════════════════ */}
      <h2>Choosing an Optimization Strategy</h2>

      <DecisionScenario
        scenario="You're training a linear classifier on a dataset with 10 million examples and 500 features. Full gradient descent takes 20 minutes per iteration, while SGD takes milliseconds per step. After 100 GD iterations (33 hours) the loss has converged smoothly. After 10 minutes of SGD the loss is similar but still fluctuating. Which approach do you choose?"
        choices={[
          {
            label: 'Full gradient descent for the smoothest convergence',
            explanation:
              'GD gives the cleanest descent path, but 33 hours is impractical for experimentation. If you need to tune λ or other hyperparameters, each run takes over a day. This is only reasonable for very small datasets.',
            isRecommended: false,
          },
          {
            label: 'SGD with a decaying learning rate',
            explanation:
              'This is the standard practical choice. The fluctuations shrink as ηₜ decays, and you reach a good solution in minutes rather than hours. In 10 minutes of SGD you have effectively seen the data many times — each step is cheap, so you can afford many more of them.',
            isRecommended: true,
          },
          {
            label: 'Mini-batch SGD (batch size 128)',
            explanation:
              'Also an excellent choice — you get the best of both worlds. The gradient estimate is less noisy than pure SGD (averages over 128 examples) and you still update quickly. This is the default in virtually all modern ML libraries.',
            isRecommended: true,
          },
          {
            label: 'Run GD once, then fine-tune with SGD',
            explanation:
              'This is unnecessarily complicated. SGD alone converges well from random initialization. There is rarely a reason to start with full GD — you pay the high cost of scanning all data per step without a meaningful benefit.',
            isRecommended: false,
          },
        ]}
      />

      {/* ════════════════════════════════════════════
          SECTION 7 — PUTTING IT ALL TOGETHER
          ════════════════════════════════════════════ */}
      <h2>Putting It All Together</h2>

      <p>
        Here's the full pipeline for training a large-margin linear classifier:
      </p>

      <ol className="list-decimal list-inside space-y-2">
        <li>
          <strong>Choose λ</strong> — this controls the bias-variance tradeoff.
          Start with λ = 1 and tune via cross-validation.
        </li>
        <li>
          <strong>Initialize θ = 0</strong> (or small random values).
        </li>
        <li>
          <strong>Run SGD</strong> — at each step, pick a random training
          example, compute the gradient of the per-example objective, and update θ.
        </li>
        <li>
          <strong>Decay the learning rate</strong> — e.g.{' '}
          <MathBlock inline math="\eta_t = 1 / (1 + t)" /> so that later updates are
          smaller and the solution stabilizes.
        </li>
        <li>
          <strong>Stop</strong> when the objective on a held-out validation set
          stops improving (early stopping).
        </li>
      </ol>

      <p>
        The result is an SVM-like classifier: a decision boundary with a large
        margin, found efficiently through stochastic optimization. The support
        vectors — the training points closest to the boundary — are the ones
        that shaped it.
      </p>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'The objective J(θ, θ₀) = average hinge loss + (λ/2)||θ||² trades off data fit against margin width.',
          'Larger λ forces a wider margin — fewer training errors are tolerated but the model generalizes better.',
          'Gradient descent updates θ ← θ − η∇J: move opposite to the steepest ascent direction.',
          'SGD replaces the full gradient (O(nd) per step) with a single-example gradient (O(d) per step) — dramatically faster on large datasets.',
          'The SVM quadratic program minimizes (1/2)||θ||² subject to all points being correctly classified with margin ≥ 1.',
          'Support vectors are the data points that sit exactly on the margin boundaries — they alone determine the decision boundary.',
        ]}
      />

      {/* ── Quiz ── */}
      <QuizSection chapterId="ch4" />

    </ChapterLayout>
  )
}
