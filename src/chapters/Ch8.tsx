import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch8() {
  return (
    <ChapterLayout title="Recurrent Neural Networks — Encoding Sequences" subtitle="Lecture 10">

      {/* Learning Objectives */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 my-8 border border-purple-200 dark:border-purple-700">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">Learning Objectives</h3>
        <ul className="space-y-2 text-purple-900 dark:text-purple-100">
          <li>Understand why sequence and temporal data require specialised architectures</li>
          <li>Identify the limitations of fixed-window approaches for encoding history</li>
          <li>Define the Recurrent Neural Network (RNN) state-update equation</li>
          <li>Explain encoding (sequence to vector) and decoding (vector to sequence)</li>
          <li>Describe weight sharing and variable-length processing in RNNs</li>
          <li>Compare unfolded RNNs with standard feed-forward networks</li>
        </ul>
      </div>

      {/* ── Section 1: Temporal / Sequence Problems ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Temporal and Sequence Problems</h2>
      <p>
        So far, every model we've built takes in a fixed-size input — a feature vector
        with a known number of dimensions — and produces a single output. That works
        beautifully for classifying emails or predicting house prices. But what happens
        when your data has a <em>time dimension</em>?
      </p>
      <p className="mt-3">
        Many real-world tasks involve <ConceptLink conceptId="sequential-data">sequential data</ConceptLink> — data where order matters.
        Currency exchange rates evolve over time, sentences are sequences of words, and
        medical records are ordered event logs. The fundamental question is:
        <em> how do we cast a sequence problem as a supervised learning problem?</em>
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 my-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Sequence task examples</h4>
        <ul className="list-disc list-inside space-y-1 text-amber-900 dark:text-amber-100">
          <li><strong>Time-series forecasting</strong> — predict tomorrow's USD/EUR rate from the past</li>
          <li><strong>Language modelling</strong> — predict the next word: "This course has been a …"</li>
          <li><strong>Sentiment classification</strong> — map a whole sentence to +1 / −1</li>
          <li><strong>Machine translation</strong> — map a sentence to a sentence in another language</li>
        </ul>
      </div>

      {/* ── Section 2: The Sliding-Window Approach ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">The Sliding-Window Approach</h2>
      <p>
        Your first instinct might be: "just use the last few observations as features."
        That's a perfectly reasonable starting point, and it even has a name —
        the <strong>sliding window</strong>. Let's see how it works and where it breaks down.
      </p>
      <p className="mt-3">
        One straightforward idea is the <strong>sliding window</strong>: break
        historical data into fixed-length feature vectors and a target value. At
        each time step <MathBlock inline math="t" />, collect the last{' '}
        <MathBlock inline math="k" /> observations into a feature vector{' '}
        <MathBlock inline math="\phi(t)" /> and predict the target{' '}
        <MathBlock inline math="y^{(t)}" />.
      </p>

      <MathBlock
        math="\phi(t) = \begin{bmatrix} x_{t-k+1} \\ x_{t-k+2} \\ \vdots \\ x_t \end{bmatrix} \;\longrightarrow\; y^{(t)}"
      />

      <p>
        For language tasks we can use <ConceptLink conceptId="one-hot-encoding">one-hot vectors</ConceptLink>: each word in the
        vocabulary is represented by a vector with a single 1 and the rest 0s. The
        feature at time <MathBlock inline math="t" /> is the one-hot encoding of the
        current word, and the target is the next word.
      </p>

      <ExpandableReading title="Why fixed windows fall short">
        <p>
          Fixed-length windows force two uncomfortable choices: <strong>how many steps
          back</strong> should we look, and <strong>how do we retain important information</strong>{' '}
          mentioned far in the past? A window of 4 words cannot capture a dependency that spans
          20 words. Making the window huge blows up the parameter count and still
          treats all positions identically, losing the asymmetry between recent and distant context.
        </p>
      </ExpandableReading>

      {/* ── Section 3: Learning to Encode History ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Learning to Encode History</h2>
      <p>
        The sliding window forces us to pick a window size before we even look at the data.
        What if instead of us deciding what to remember, the <em>model</em> could learn what
        matters? That's exactly the leap we're about to make.
      </p>
      <p className="mt-3">
        Instead of hand-engineering a fixed window, we would like to{' '}
        <strong>learn</strong> how to compress an arbitrarily long history into a
        compact vector. This is the core idea behind the <strong>encoding</strong>{' '}
        paradigm: map a variable-length sequence to a fixed-size vector
        representation that a downstream model (a classifier, a regressor, or a
        decoder) can consume.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 my-6 border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Two key concepts</h4>
        <ul className="list-disc list-inside space-y-2 text-blue-900 dark:text-blue-100">
          <li>
            <strong>Encoding</strong> — mapping a sequence to a vector, e.g. a sentence
            → a fixed-dimensional representation
          </li>
          <li>
            <strong>Decoding</strong> — mapping a vector to a sequence, e.g. a
            representation → a translated sentence (covered next lecture)
          </li>
        </ul>
      </div>

      <p>
        This encode/decode framework is remarkably general. The same idea applies to
        encoding <strong>words</strong> (word embeddings), <strong>sentences</strong>,{' '}
        <strong>images</strong>, and even entire <strong>events</strong>. The encoder
        produces a real-valued vector; similar inputs should map to nearby vectors.
      </p>

      {/* ── Section 4: The Recurrent Neural Network ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">The Recurrent Neural Network (RNN)</h2>
      <p>
        An <ConceptLink conceptId="rnn">RNN</ConceptLink> introduces a <strong>state vector</strong>{' '}
        <MathBlock inline math="s_t" /> that is updated at every time step. The
        update combines the previous state with the new input through learnable
        weight matrices:
      </p>

      <MathBlock
        math="s_t = \tanh\!\bigl(W^{s,s}\, s_{t-1} + W^{s,x}\, x_t\bigr)"
      />

      <p>
        Here <MathBlock inline math="W^{s,s}" /> is the <strong>state-to-state</strong>{' '}
        weight matrix (how the previous <ConceptLink conceptId="hidden-state">hidden state</ConceptLink> is transformed),{' '}
        <MathBlock inline math="W^{s,x}" /> is the <strong>input-to-state</strong>{' '}
        weight matrix (how the new input is incorporated), and{' '}
        <MathBlock inline math="\tanh" /> is the activation function that keeps
        values bounded between −1 and +1.
      </p>

      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 my-6 border border-green-200 dark:border-green-700">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Intuition: the RNN as a "lego piece"</h4>
        <p className="text-green-900 dark:text-green-100">
          Think of the RNN cell as an adjustable building block. It takes a{' '}
          <strong>context vector</strong> (current state) and{' '}
          <strong>new information</strong> (current input), combines them through
          learnable parameters <MathBlock inline math="\theta" />, and outputs an
          updated context vector. This lego piece is applied identically at every
          step — the same weights process the first word and the hundredth word.
        </p>
      </div>

      <ExpandableReading title="Initialising the state">
        <p>
          At the very beginning of a sequence (<MathBlock inline math="t=0" />),
          there is no prior context. The initial state{' '}
          <MathBlock inline math="s_0" /> is typically set to the zero vector. Some
          architectures learn <MathBlock inline math="s_0" /> as a parameter, but
          zero initialisation works well in practice.
        </p>
      </ExpandableReading>

      {/* Worked Example: RNN Step Trace */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
          Worked Example: Tracing an RNN on a 3-word vocabulary
        </p>
        <p className="text-sm mb-3">
          Let's trace a tiny RNN with state size 2 and vocabulary {'{'}
          "the", "cat", "sat"{'}'} (indices 0, 1, 2). Our weight matrices are:
        </p>
        <MathBlock math="W^{s,s} = \begin{bmatrix} 0.5 & 0.1 \\ 0.2 & 0.8 \end{bmatrix}, \quad W^{s,x} = \begin{bmatrix} 1.0 & 0.0 & 0.5 \\ 0.0 & 1.0 & 0.5 \end{bmatrix}" />
        <p className="text-sm mt-3 mb-2">
          Feed the sequence <strong>"the cat"</strong> (one-hot vectors{' '}
          <MathBlock inline math="x_1 = [1, 0, 0]^T" /> and{' '}
          <MathBlock inline math="x_2 = [0, 1, 0]^T" />) starting from{' '}
          <MathBlock inline math="s_0 = [0, 0]^T" />.
        </p>

        <p className="text-sm font-semibold mt-3 text-indigo-700 dark:text-indigo-300">Step 1: Process "the"</p>
        <MathBlock math="W^{s,s} s_0 + W^{s,x} x_1 = \begin{bmatrix}0\\0\end{bmatrix} + \begin{bmatrix}1.0\\0.0\end{bmatrix} = \begin{bmatrix}1.0\\0.0\end{bmatrix}" />
        <MathBlock math="s_1 = \tanh\!\begin{bmatrix}1.0\\0.0\end{bmatrix} = \begin{bmatrix}0.762\\0.000\end{bmatrix}" />

        <p className="text-sm font-semibold mt-3 text-indigo-700 dark:text-indigo-300">Step 2: Process "cat"</p>
        <MathBlock math="W^{s,s} s_1 = \begin{bmatrix}0.5(0.762) + 0.1(0)\\0.2(0.762) + 0.8(0)\end{bmatrix} = \begin{bmatrix}0.381\\0.152\end{bmatrix}" />
        <MathBlock math="W^{s,x} x_2 = \begin{bmatrix}0.0\\1.0\end{bmatrix}" />
        <MathBlock math="s_2 = \tanh\!\begin{bmatrix}0.381\\1.152\end{bmatrix} = \begin{bmatrix}0.364\\0.818\end{bmatrix}" />

        <p className="text-sm mt-3">
          The final state <MathBlock inline math="s_2 = [0.364,\; 0.818]" /> is our
          encoding of "the cat" — a 2D vector that a classifier or decoder can consume.
          Notice how the first word's information (0.762 in the first component) was
          partially retained and mixed with the second word's contribution.
        </p>
      </div>

      {/* ── Section 5: Encoding Sentences ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Encoding Sentences Step by Step</h2>
      <p>
        Consider encoding the sentence <em>"Efforts and courage are not …"</em>.
        Each word is fed one at a time as a one-hot (or embedded) vector{' '}
        <MathBlock inline math="x_t" />. At every step the RNN updates its state:
      </p>

      <ol className="list-decimal list-inside space-y-2 my-4">
        <li>
          Start with <MathBlock inline math="s_0 = \mathbf{0}" /> (null state)
        </li>
        <li>
          Read "Efforts": <MathBlock inline math="s_1 = \tanh(W^{s,s} s_0 + W^{s,x} x_1)" />
          — state now summarises "Efforts"
        </li>
        <li>
          Read "and": <MathBlock inline math="s_2 = \tanh(W^{s,s} s_1 + W^{s,x} x_2)" />
          — state now summarises "Efforts and"
        </li>
        <li>
          Continue through each word …
        </li>
        <li>
          The final state <MathBlock inline math="s_T" /> is the{' '}
          <strong>sentence vector</strong> — a fixed-size encoding of the entire
          variable-length sentence
        </li>
      </ol>

      <p>
        This sentence vector can then be passed to a classifier (for sentiment),
        another RNN (for translation), or any other downstream component.
      </p>

      {/* ── Section 6: Unfolded RNN vs Feed-Forward ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Unfolded RNN vs. Feed-Forward Networks</h2>
      <p>
        When we draw out every time step of an RNN, we get the{' '}
        <strong>unfolded</strong> view — a chain of identical modules, one per
        input element. This looks like a very deep feed-forward network, but with
        three critical differences:
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 my-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Three key differences</h4>
        <ol className="list-decimal list-inside space-y-2 text-amber-900 dark:text-amber-100">
          <li>
            <strong>Input at every layer.</strong> In a feed-forward network, input enters only
            at the first layer. In an unfolded RNN, a new input{' '}
            <MathBlock inline math="x_t" /> arrives at <em>every</em> layer (time step).
          </li>
          <li>
            <strong>Variable depth.</strong> The number of "layers" equals the
            sequence length, which varies from sentence to sentence. A 5-word sentence
            has 5 layers; a 50-word sentence has 50.
          </li>
          <li>
            <ConceptLink conceptId="weight-sharing">Shared parameters</ConceptLink>. Every layer uses the{' '}
            <em>same</em> weight matrices{' '}
            <MathBlock inline math="W^{s,s}" /> and{' '}
            <MathBlock inline math="W^{s,x}" />. This weight sharing is what
            lets the RNN generalise across positions and handle any length.
          </li>
        </ol>
      </div>

      <ExpandableReading title="Why weight sharing matters">
        <p>
          Weight sharing means the RNN has a fixed number of parameters regardless of
          sequence length. A sentence of 100 words uses the same{' '}
          <MathBlock inline math="W^{s,s}" /> and <MathBlock inline math="W^{s,x}" />{' '}
          as a sentence of 5 words. This is what makes RNNs fundamentally different
          from simply concatenating all inputs into one giant feature vector and
          feeding them to a feed-forward network. It also provides a strong inductive
          bias: the same transformation should be useful at every position in the
          sequence.
        </p>
      </ExpandableReading>

      {/* ── Section 7: Training RNNs ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Training RNNs — Backpropagation Through Time</h2>
      <p>
        We know <em>what</em> the RNN computes — but how do we learn those weight
        matrices? Good news: since the unfolded RNN is just a computational graph,
        we can train it with the same tools we already know — stochastic gradient descent and
        backpropagation. The procedure is called{' '}
        <ConceptLink conceptId="bptt">Backpropagation Through Time (BPTT)</ConceptLink>:
      </p>

      <ol className="list-decimal list-inside space-y-2 my-4">
        <li><strong>Forward pass:</strong> unroll the RNN for the full sequence, computing every <MathBlock inline math="s_t" /></li>
        <li><strong>Compute loss:</strong> compare the output (e.g. the final state fed to a classifier) with the target</li>
        <li><strong>Backward pass:</strong> propagate gradients back through every time step, accumulating gradients for the shared weights</li>
        <li><strong>Update:</strong> apply the accumulated gradient to update <MathBlock inline math="W^{s,s}" /> and <MathBlock inline math="W^{s,x}" /></li>
      </ol>

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 my-6 border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">The vanishing gradient problem</h4>
        <p className="text-blue-900 dark:text-blue-100">
          Because the gradient must pass through many multiplications of{' '}
          <MathBlock inline math="W^{s,s}" />, it can <strong>shrink exponentially</strong>{' '}
          (vanish) for long sequences. This makes it hard for vanilla RNNs to learn
          dependencies between distant elements. Architectures like{' '}
          <strong>LSTMs</strong> and <strong>GRUs</strong> address this with gating
          mechanisms (covered in the next chapter).
        </p>
      </div>

      {/* ── Section 8: Applications of Sequence Encoding ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Applications of Sequence Encoding</h2>
      <p>
        The encode-then-predict pattern is remarkably versatile. Once we have an
        encoder that maps a variable-length sequence to a fixed vector, we can
        attach different "heads" for different tasks:
      </p>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>
          <strong>Language modelling:</strong> at each step, predict the next word.
          The state <MathBlock inline math="s_t" /> is fed through a softmax layer
          to produce a distribution over the vocabulary.
        </li>
        <li>
          <strong>Sentiment classification:</strong> take the final state{' '}
          <MathBlock inline math="s_T" /> and pass it to a linear classifier to
          predict positive / negative.
        </li>
        <li>
          <strong>Machine translation:</strong> encode the source sentence into a
          vector, then decode that vector into the target language word by word
          (encoder-decoder architecture).
        </li>
      </ul>

      <ExpandableReading title="Beyond text: encoding any sequence">
        <p>
          RNNs are not limited to natural language. Any data that arrives as an ordered
          sequence can be encoded: audio waveforms (speech recognition), sensor
          readings (anomaly detection), click streams (user behaviour prediction), or
          DNA nucleotide sequences (genomics). The encoding framework —
          sequence in, vector out — remains the same across all domains.
        </p>
      </ExpandableReading>

      {/* ── Section 9: Summary Blueprint ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Summary Blueprint</h2>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
        <p className="font-mono text-sm">
          sequence x₁, x₂, …, x_T<br />
          → initialise s₀ = 0<br />
          → for each t: s_t = tanh(W^ss · s_(t-1) + W^sx · x_t)<br />
          → final state s_T = encoded vector<br />
          → attach task head (classifier / decoder / predictor)
        </p>
      </div>

      {/* ── Decision Scenario ── */}
      <DecisionScenario
        title="Choosing Your Sequence Architecture"
        scenario="You need to classify the sentiment of movie reviews that range from 5 to 500 words. Your team debates three approaches."
        options={[
          {
            label: 'Fixed window of the last 20 words → feed-forward network',
            feedback: 'This ignores most of the review. A 500-word review has critical sentiment cues in the opening sentences that a 20-word window will never see.',
            isCorrect: false,
          },
          {
            label: 'Concatenate all 500 one-hot vectors → giant feed-forward network',
            feedback: 'This requires padding every review to the maximum length (huge input dimension), has no weight sharing, and treats position 1 and position 500 with completely different parameters. It does not generalise across positions.',
            isCorrect: false,
          },
          {
            label: 'RNN encoder → final state → sentiment classifier',
            feedback: 'Correct! The RNN processes any length, shares weights across positions, and compresses the entire review into a fixed-size vector that captures long-range sentiment cues.',
            isCorrect: true,
          },
        ]}
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Sequence data (text, time series, audio) requires architectures that handle variable length and respect order.',
          'Fixed sliding windows force a trade-off between context length and parameter count; they cannot learn which past information to retain.',
          'An RNN maintains a state vector s_t that is updated at every step via s_t = tanh(W^{s,s} s_{t-1} + W^{s,x} x_t).',
          'Encoding maps a variable-length sequence to a fixed-size vector; decoding maps a vector back to a sequence.',
          'The unfolded RNN resembles a deep feed-forward network but differs in three ways: input at every layer, variable depth, and shared parameters.',
          'Backpropagation Through Time (BPTT) trains RNNs, but vanishing gradients limit vanilla RNNs on long sequences.',
          'The encode-then-predict paradigm is general: the same RNN encoder can feed a classifier, a regressor, or a decoder.',
        ]}
      />

      {/* ── Quiz ── */}
      <QuizSection
        questions={[
          {
            question: 'Why is a fixed sliding window a poor choice for encoding long sequences?',
            options: [
              'It cannot process numerical data',
              'It requires a fixed context length and cannot retain information from beyond that window',
              'It uses too many activation functions',
              'It can only work with one-hot vectors',
            ],
            correctIndex: 1,
            explanation: 'A fixed window forces you to choose a lookback length k. Any dependency longer than k steps is invisible to the model, and making k large explodes the parameter count.',
          },
          {
            question: 'In the RNN state update s_t = tanh(W^{s,s} s_{t-1} + W^{s,x} x_t), what role does W^{s,s} play?',
            options: [
              'It maps the current input to the state',
              'It transforms the previous state to contribute to the new state',
              'It produces the final output prediction',
              'It initialises the state to zero',
            ],
            correctIndex: 1,
            explanation: 'W^{s,s} is the state-to-state matrix. It determines how the accumulated context from previous time steps is transformed before being combined with the new input.',
          },
          {
            question: 'Which of the following is NOT a difference between an unfolded RNN and a standard feed-forward network?',
            options: [
              'The RNN receives input at every layer (time step)',
              'The RNN has a variable number of layers depending on sequence length',
              'The RNN uses different activation functions at each layer',
              'The RNN shares parameters across all layers',
            ],
            correctIndex: 2,
            explanation: 'The RNN uses the same activation function (tanh) at every step. The three actual differences are: input at every layer, variable depth, and shared parameters.',
          },
          {
            question: 'What is the "encoding" step in the context of RNNs?',
            options: [
              'Converting numbers to binary',
              'Mapping a variable-length sequence to a fixed-size vector representation',
              'Translating text from one language to another',
              'Compressing a neural network to use fewer parameters',
            ],
            correctIndex: 1,
            explanation: 'Encoding means processing a sequence of any length through the RNN and taking the final state s_T as a fixed-dimensional vector that summarises the entire sequence.',
          },
          {
            question: 'Why do vanilla RNNs struggle with very long sequences?',
            options: [
              'They run out of memory because the state vector grows with sequence length',
              'The tanh activation prevents any learning',
              'Gradients vanish exponentially during backpropagation through many time steps',
              'Weight sharing prevents the network from learning different patterns at different positions',
            ],
            correctIndex: 2,
            explanation: 'During BPTT, gradients are multiplied by W^{s,s} at each step. Over many steps these products can shrink exponentially (vanishing gradient), making it impossible to learn long-range dependencies.',
          },
        ]}
      />
    </ChapterLayout>
  )
}
