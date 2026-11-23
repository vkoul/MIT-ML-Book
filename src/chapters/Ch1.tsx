import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch1() {
  return (
    <ChapterLayout title="Introduction to Machine Learning" subtitle="Lecture 1">

      {/* ── Learning Objectives ── */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand what machine learning is and why it matters</li>
          <li>See how real-world problems become prediction problems</li>
          <li>Learn the vocabulary: features, labels, training sets, classifiers</li>
          <li>Grasp the difference between training error and test error</li>
          <li>Visualize decision boundaries in two dimensions</li>
        </ul>
      </div>

      {/* ── 1. What Is Machine Learning? ── */}
      <h2>What Is Machine Learning?</h2>

      <p>
        Every day you interact with machine learning without realizing it. When your email
        filters spam, when Netflix suggests a movie, when your phone unlocks with your face
        — all of these rely on programs that <em>learned</em> their behavior from data rather
        than being explicitly programmed with rules.
      </p>

      <p>
        The MIT 6.86x course defines machine learning as a discipline that:
      </p>

      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 my-4">
        &ldquo;aims to design, understand, and apply computer programs that learn from
        experience (i.e., data) for the purpose of modeling, prediction, or control.&rdquo;
      </blockquote>

      <p>
        Notice the three goals: <strong>modeling</strong> (understanding patterns),{' '}
        <strong>prediction</strong> (forecasting outcomes), and <strong>control</strong>{' '}
        (taking actions). In this course we focus primarily on prediction, because it gives
        us the clearest mathematical framework to work with.
      </p>

      <ExpandableReading title="Why learn from data instead of programming rules?">
        <p>
          Consider building a spam filter the old-fashioned way. You might write rules like
          &ldquo;if the email contains FREE MONEY then mark as spam.&rdquo; But spammers
          adapt — they start writing FR33 M0NEY or use images instead of text.
          You would need to keep writing new rules forever.
        </p>
        <p className="mt-2">
          A machine learning approach instead shows the program thousands of emails that humans
          have already labeled as spam or not-spam. The program discovers its own patterns —
          patterns you might never think of, like the ratio of images to text, the time the
          email was sent, or subtle word combinations. When spammers change tactics, you just
          retrain on new data.
        </p>
        <p className="mt-2">
          This is the fundamental advantage: ML systems <strong>adapt to data</strong> rather
          than requiring a human to anticipate every scenario.
        </p>
      </ExpandableReading>

      {/* ── 2. Prediction Problems Are Everywhere ── */}
      <h2>Prediction Problems Are Everywhere</h2>

      <p>
        A <strong>prediction problem</strong> asks: given some input, what is the correct
        output? The lecture presents three vivid examples:
      </p>

      <div className="space-y-4 my-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400">Image Classification</h4>
          <p className="text-sm mt-1">
            Given a photograph of a mushroom, the system should output the species name.
            We write this as a function:
          </p>
          <MathBlock math="h(\text{image};\, \theta) = \text{mushroom species}" />
          <p className="text-sm mt-1">
            Here <MathBlock inline math="h" /> is our classifier, the image is the input, and{' '}
            <MathBlock inline math="\theta" /> represents the learned parameters — the
            &ldquo;knowledge&rdquo; the system has acquired from training data.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400">Machine Translation</h4>
          <p className="text-sm mt-1">
            Given a sentence in English, produce the equivalent sentence in French. The input
            is a sequence of words and the output is another sequence of words — but the core
            structure is the same: input goes in, prediction comes out.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400">Movie Recommendation</h4>
          <p className="text-sm mt-1">
            Given a user and a movie, predict whether the user will enjoy it (thumbs up or
            thumbs down). This is a <strong>binary classification</strong> problem — the
            output is one of exactly two categories.
          </p>
        </div>
      </div>

      <p>
        Despite looking very different on the surface, all three problems share the same
        mathematical structure: learn a function that maps inputs to outputs using examples.
      </p>

      {/* ── 3. Representing Data: Feature Vectors ── */}
      <h2>Representing Data: Feature Vectors</h2>

      <p>
        Before a machine can learn anything, we need to represent our data numerically. Think
        of it like filling out a scorecard for each data point.
      </p>

      <p>
        In the movie recommendation example, each movie is described by a <strong><ConceptLink conceptId="feature-vector">feature
        vector</ConceptLink></strong> — a list of numbers that captures its properties. Imagine we have
        features like: is it a comedy? is it action? is it romance? directed by Spielberg?
        and so on. A single movie might look like:
      </p>

      <MathBlock math="x^{(1)} = \begin{bmatrix} 1 \\ 0 \\ 0 \\ 1 \\ 1 \\ \vdots \\ 0 \end{bmatrix} \quad \leftarrow \text{ comedy=yes, action=no, romance=no, Spielberg=yes, ...}" />

      <p>
        Each entry is 1 (yes) or 0 (no). The superscript <MathBlock inline math="(1)" /> just means
        &ldquo;the first example.&rdquo; If we have 100 movies, we have feature vectors{' '}
        <MathBlock inline math="x^{(1)}, x^{(2)}, \ldots, x^{(100)}" />.
      </p>

      <ExpandableReading title="Why vectors? A geometric intuition">
        <p>
          Think of a feature vector as coordinates in space. With two features you get a point
          on a flat plane. With three features you get a point in 3D space. With{' '}
          <MathBlock inline math="d" /> features, you get a point in <MathBlock inline math="d" />-dimensional
          space — we cannot visualize it, but the math works exactly the same way.
        </p>
        <p className="mt-2">
          This geometric view is powerful. Two movies that are similar end up as
          nearby points, while very different movies are far apart. Classification then becomes
          a geometric question: can we draw a boundary that separates the good
          movies from the bad ones in this space?
        </p>
        <p className="mt-2">
          We write a feature vector&apos;s dimension as{' '}
          <MathBlock inline math="x \in \mathbb{R}^d" />, meaning it lives in{' '}
          <MathBlock inline math="d" />-dimensional real space.
        </p>
      </ExpandableReading>

      {/* ── 4. Supervised Learning Framework ── */}
      <h2>Supervised Learning: The Framework</h2>

      <p>
        Now we have the pieces to define <ConceptLink conceptId="supervised-learning">supervised learning</ConceptLink> precisely. &ldquo;Supervised&rdquo;
        means a teacher has already labeled the examples for us — we know the right answer
        for our training data.
      </p>

      <h3>The Training Set</h3>
      <p>
        We collect <MathBlock inline math="n" /> examples, each consisting of a feature vector and its
        correct label. This collection is called the <strong><ConceptLink conceptId="training-set">training set</ConceptLink></strong>:
      </p>

      <MathBlock math="S_n = \{(x^{(1)}, y^{(1)}),\; (x^{(2)}, y^{(2)}),\; \ldots,\; (x^{(n)}, y^{(n)})\}" />

      <p>
        Here <MathBlock inline math="x^{(i)} \in \mathbb{R}^d" /> is the feature vector of the{' '}
        <MathBlock inline math="i" />-th example, and <MathBlock inline math="y^{(i)}" /> is its label.
      </p>

      <h3>Labels for Classification</h3>
      <p>
        For binary classification — the type we focus on first — the label is either +1 or -1:
      </p>
      <MathBlock math="y^{(i)} \in \{-1, +1\}" />
      <p>
        Think of +1 as &ldquo;positive class&rdquo; (e.g., the user liked the movie) and -1
        as &ldquo;negative class&rdquo; (the user did not). The choice of +1 and -1 rather
        than 0 and 1 is not arbitrary — it makes certain mathematical formulas much cleaner,
        as we will see in later chapters.
      </p>

      <p>
        As a concrete example, imagine four labeled movies:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Movie</th>
              <th className="px-4 py-2 text-left">Comedy</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Romance</th>
              <th className="px-4 py-2 text-left">Label <MathBlock inline math="y" /></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 dark:border-gray-600">
              <td className="px-4 py-2"><MathBlock inline math="x^{(1)}" /></td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2 font-bold text-green-600">+1</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-600">
              <td className="px-4 py-2"><MathBlock inline math="x^{(2)}" /></td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2 font-bold text-red-600">-1</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-600">
              <td className="px-4 py-2"><MathBlock inline math="x^{(3)}" /></td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2 font-bold text-green-600">+1</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-600">
              <td className="px-4 py-2"><MathBlock inline math="x^{(4)}" /></td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2 font-bold text-red-600">-1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        This user seems to like comedies! That&apos;s exactly the kind of pattern a machine
        learning algorithm should discover.
      </p>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Worked Example: Computing Training Error</p>
        <p>
          Suppose a friend suggests a simple classifier: "if Comedy = 1, predict +1; otherwise predict −1."
          In math, that's <MathBlock inline math="h(x) = \text{sign}(x_{\text{comedy}})" /> where we treat 0 as −1.
          Let's check it against all four training points:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2 ml-2 text-sm">
          <li>
            <MathBlock inline math="x^{(1)} = (1, 0, 1)" />: Comedy = 1, so <MathBlock inline math="h = +1" />.
            True label = +1. <strong className="text-green-700 dark:text-green-400">Correct.</strong>
          </li>
          <li>
            <MathBlock inline math="x^{(2)} = (0, 1, 0)" />: Comedy = 0, so <MathBlock inline math="h = -1" />.
            True label = −1. <strong className="text-green-700 dark:text-green-400">Correct.</strong>
          </li>
          <li>
            <MathBlock inline math="x^{(3)} = (1, 1, 0)" />: Comedy = 1, so <MathBlock inline math="h = +1" />.
            True label = +1. <strong className="text-green-700 dark:text-green-400">Correct.</strong>
          </li>
          <li>
            <MathBlock inline math="x^{(4)} = (0, 0, 0)" />: Comedy = 0, so <MathBlock inline math="h = -1" />.
            True label = −1. <strong className="text-green-700 dark:text-green-400">Correct.</strong>
          </li>
        </ul>
        <p className="mt-3">
          All four predictions match. The <strong>training error</strong> is:
        </p>
        <MathBlock math="\varepsilon_4(h) = \frac{0}{4} = 0" />
        <p className="text-sm mt-2">
          Zero training error — great! But does this mean the classifier is perfect? Not necessarily.
          It might just be memorizing a pattern that happens to work on these four examples. What about
          a comedy the user hates? We'd need <em>test data</em> to check generalization.
        </p>
      </div>

      {/* ── 5. The Classifier ── */}
      <h2>The Classifier</h2>

      <p>
        A <strong>classifier</strong> is a function that takes in a feature vector and outputs
        a prediction — either +1 or -1:
      </p>

      <MathBlock math="h : \mathcal{X} \to \{-1, +1\}" />

      <p>
        Think of it as a decision-making machine. You feed in a movie&apos;s features, and it
        tells you whether the user will like it or not. The letter <MathBlock inline math="h" />{' '}
        stands for &ldquo;hypothesis&rdquo; — our best guess at the true relationship between
        inputs and outputs.
      </p>

      <p>
        But there are infinitely many possible classifiers. How do we find a good one? We
        choose from a <strong><ConceptLink conceptId="hypothesis-class">hypothesis class</ConceptLink></strong> <MathBlock inline math="\mathcal{H}" /> — a
        restricted family of classifiers. For example, the set of all linear classifiers, or
        the set of all decision trees of depth 5. Restricting our search makes the problem
        tractable.
      </p>

      <ExpandableReading title="Why restrict the hypothesis class?">
        <p>
          Imagine you are playing 20 Questions. If you could ask any question at all, the
          game would be trivially easy — you could just ask &ldquo;Is it a giraffe?&rdquo;
          But the game restricts you to yes/no questions, which forces you to be strategic.
        </p>
        <p className="mt-2">
          Similarly, in machine learning, a hypothesis class that is too powerful
          (like memorizing every training example) will fail on new data. A hypothesis class
          that is too simple (like always predicting +1) will fail everywhere.
          Choosing the right hypothesis class is one of the core challenges in ML — it is the
          art of balancing flexibility with generalization. We formalize this idea in later
          chapters.
        </p>
      </ExpandableReading>

      {/* ── 6. Measuring Performance ── */}
      <h2>Measuring Performance: Training Error and Test Error</h2>

      <p>
        Once we have a classifier, we need to measure how well it works. The simplest measure
        is the <strong>error rate</strong>: the fraction of examples it gets wrong.
      </p>

      <h3>Training Error</h3>
      <p>
        The training error measures mistakes on the data we trained on. For a classifier{' '}
        <MathBlock inline math="h" /> evaluated on a training set of <MathBlock inline math="n" /> examples:
      </p>

      <MathBlock math="\varepsilon_n(h) = \frac{1}{n} \sum_{i=1}^{n} [\![ h(x^{(i)}) \neq y^{(i)} ]\!]" />

      <p>
        The double brackets <MathBlock inline math="[\![ \cdot ]\!]" /> are the
        &ldquo;indicator function&rdquo; — they equal 1 when the condition inside is true,
        and 0 otherwise. So we are simply counting the fraction of mistakes.
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg my-4">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200">Concrete Example</h4>
        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
          If our classifier gets 3 out of 100 training examples wrong, the training error is{' '}
          <MathBlock inline math="\varepsilon_{100}(h) = 3/100 = 0.03" /> or 3%.
        </p>
      </div>

      <h3>Test Error</h3>
      <p>
        Training error tells us how well the classifier fits the data it has already seen. But
        what we really care about is how it performs on <em>new, unseen</em> data — this is
        the <strong>test error</strong>.
      </p>

      <p>
        We hold out a separate <strong>test set</strong> that was not used during training, and
        compute the error on that set. If the training error is low but the test error is high,
        the classifier has <strong>memorized</strong> the training data without learning the
        underlying pattern — a problem called <em><ConceptLink conceptId="overfitting">overfitting</ConceptLink></em>.
      </p>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg my-4">
        <h4 className="font-semibold text-red-800 dark:text-red-200">The Overfitting Trap</h4>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
          A student who memorizes every answer in a practice test may score perfectly on that
          test but fail a real exam with different questions. Similarly, a classifier with 0%
          training error might have terrible test error. <strong>Low training error does not
          guarantee good generalization.</strong>
        </p>
      </div>

      <ExpandableReading title="Train/test split in practice">
        <p>
          In real ML projects, a common approach is the 80/20 split: use 80% of your data for
          training and hold out 20% for testing. More sophisticated approaches like
          k-fold cross-validation rotate which portion is held out, giving a more
          reliable estimate of test performance.
        </p>
        <p className="mt-2">
          The key rule: <strong>never train on your test data.</strong> If you peek at the test
          set during training (even indirectly, by tuning your model based on test performance),
          your test error estimate becomes unreliable.
        </p>
      </ExpandableReading>

      {/* ── 7. Decision Boundaries ── */}
      <h2>Visualizing Decision Boundaries</h2>

      <p>
        When our data has two features, we can plot each example as a point on a 2D plane.
        Positive examples (<MathBlock inline math="y = +1" />) might be shown as blue circles and
        negative examples (<MathBlock inline math="y = -1" />) as red crosses.
      </p>

      <p>
        A classifier draws a <strong><ConceptLink conceptId="decision-boundary">decision boundary</ConceptLink></strong> — a line (or curve) that
        separates the plane into two regions. Everything on one side is predicted as +1, and
        everything on the other side as -1.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Imagine a 2D plot with blue circles clustered in the upper-left and red crosses
          in the lower-right, separated by a diagonal line.
        </p>
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-500" />
            <span>Positive (+1)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-red-500" />
            <span>Negative (-1)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 border-t-2 border-gray-800 dark:border-gray-200" />
            <span>Decision boundary</span>
          </div>
        </div>
      </div>

      <p>
        The simplest decision boundary is a straight line — this gives us a <strong><ConceptLink conceptId="linear-classifier">linear
        classifier</ConceptLink></strong>. If a straight line can perfectly separate the positive from the
        negative examples, we say the data is <em>linearly separable</em>. In higher
        dimensions, the decision boundary becomes a hyperplane.
      </p>

      <p>
        In Chapter 2, we will study linear classifiers in depth and learn the perceptron
        algorithm — a simple but elegant method for finding such a boundary.
      </p>

      {/* ── 8. Types of ML ── */}
      <h2>The Three Flavors of Machine Learning</h2>

      <p>
        While this course focuses on supervised learning, it is important to know the broader
        landscape:
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200"><ConceptLink conceptId="supervised-learning">Supervised Learning</ConceptLink></h4>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            Training data has labels. The goal is to predict labels for new inputs.
            Examples: spam detection, image classification, medical diagnosis.
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200"><ConceptLink conceptId="unsupervised-learning">Unsupervised Learning</ConceptLink></h4>
          <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
            Training data has no labels. The goal is to discover structure — clusters,
            patterns, or compressed representations. Examples: customer segmentation, topic
            modeling.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
          <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">Reinforcement Learning</h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
            An agent learns by taking actions and receiving rewards. The goal is to maximize
            long-term reward. Examples: game-playing AI, robotics, autonomous driving.
          </p>
        </div>
      </div>

      {/* ── 9. Decision Scenario ── */}
      <h2>Putting It Together</h2>

      <p>
        Let&apos;s test your understanding with a scenario that ties together the key ideas.
      </p>

      <DecisionScenario
        scenario="You are building a system to predict whether a flight will be delayed. You have historical data on 50,000 flights including features like airline, departure time, weather, and airport, along with whether each flight was delayed. You split the data: 40,000 flights for training, 10,000 for testing. Your classifier achieves 2% training error but 25% test error. What should you conclude?"
        choices={[
          {
            label: 'The classifier is excellent — 2% error is great',
            explanation: 'The 2% error is on the training data only. A classifier that performs well on training data but poorly on test data has overfit — it memorized the training examples instead of learning generalizable patterns. The 25% test error is what matters for real-world performance.',
            isRecommended: false,
          },
          {
            label: 'The classifier is overfitting',
            explanation: 'Correct! A large gap between training error (2%) and test error (25%) is the classic sign of overfitting. The classifier has memorized the training data rather than learning the underlying patterns. You should consider using a simpler hypothesis class, collecting more training data, or applying regularization techniques (covered in Chapter 3).',
            isRecommended: true,
          },
          {
            label: 'The test set is broken — retrain using all 50,000 examples',
            explanation: 'Using all data for training leaves nothing for testing, so you would have no way to know if your classifier generalizes. The test error is telling you something important — do not shoot the messenger! The solution is to improve the model, not eliminate the evaluation.',
            isRecommended: false,
          },
        ]}
      />

      {/* ── 10. Summary ── */}
      <h2>Chapter Summary</h2>

      <p>
        We have laid the groundwork for everything that follows. Machine learning transforms
        raw data into predictions by discovering patterns automatically. The key ingredients
        are: data represented as feature vectors, a labeled training set, a hypothesis class
        of candidate classifiers, and a way to measure error. The critical insight is that{' '}
        <strong>training error and test error are fundamentally different</strong> — only test
        error tells us how a classifier will perform in the real world (<ConceptLink conceptId="generalization">generalization</ConceptLink>).
      </p>

      <KeyTakeaways items={[
        'Machine learning learns from data rather than being explicitly programmed with rules',
        'Feature vectors represent data points as numerical lists, enabling mathematical analysis',
        'Supervised learning uses a labeled training set S_n = {(x⁽ⁱ⁾, y⁽ⁱ⁾)} to learn a classifier h',
        'Training error measures performance on known data; test error measures generalization to new data',
        'A large gap between training error and test error signals overfitting',
        'The hypothesis class constrains which classifiers we search over — choosing it wisely is critical',
        'Decision boundaries partition the feature space into predicted classes',
      ]} />

      <QuizSection chapterId="ch1" />

    </ChapterLayout>
  )
}
