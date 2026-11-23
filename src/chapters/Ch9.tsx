import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch9() {
  return (
    <ChapterLayout
      title="Recurrent Neural Networks — Decoding Sequences"
      subtitle="Lecture 11"
    >
      {/* Learning Objectives */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
          Learning Objectives
        </h3>
        <ul className="space-y-2 text-purple-900 dark:text-purple-100">
          <li>Understand language modeling as a sequence prediction task</li>
          <li>Compare Markov models with neural network language models</li>
          <li>Derive maximum likelihood estimation for bigram models</li>
          <li>Extend RNNs from encoding to decoding (generating output sequences)</li>
          <li>Master the LSTM architecture and its gating mechanisms</li>
          <li>Apply encoder-decoder RNNs to tasks like machine translation and image captioning</li>
        </ul>
      </div>

      {/* 1. Language Modeling */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Language Modeling: Predicting What Comes Next</h2>
      <p className="mb-4">
        In the previous chapter we learned how to <em>read</em> sequences — compressing them
        into a fixed-size vector. But what about <em>writing</em> them? If we can encode
        "the cat sat on the mat" into a vector, can we go the other way and generate text
        from a vector? That's what this chapter is about, and it starts with a deceptively
        simple question: given the words so far, what comes next?
      </p>
      <p className="mb-4">
        A <ConceptLink conceptId="language-model"><strong>language model</strong></ConceptLink> assigns probabilities to sequences of words. Given the
        beginning of a sentence, the model predicts the most likely next word. This is the
        foundation for text generation, machine translation, and speech recognition.
      </p>
      <p className="mb-4">
        Consider the sentence: <em>"This course has been a tremendous..."</em> — a good language
        model should assign high probability to continuations like "success" and low probability
        to unrelated words like "refrigerator."
      </p>

      {/* 2. Markov Language Models */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Markov Language Models</h2>
      <p className="mb-4">
        The simplest approach to language modeling uses <ConceptLink conceptId="markov-model"><strong>Markov models</strong></ConceptLink>. The next
        word in a sentence depends on the previous symbols already written — the <em>history</em>
        could be one word, two words, or more.
      </p>
      <p className="mb-4">
        Let <MathBlock inline math="w \in V" /> denote the set of possible words/symbols, which includes:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>An <strong>UNK</strong> symbol for any unknown (out-of-vocabulary) word</li>
        <li>A <strong>{"<beg>"}</strong> symbol for the start of a sentence</li>
        <li>An <strong>{"<end>"}</strong> symbol for the end of a sentence</li>
      </ul>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 my-6">
        <p className="font-semibold text-amber-800 dark:text-amber-200">First-Order Markov (Bigram) Model</p>
        <p className="text-amber-900 dark:text-amber-100 mt-1">
          In a bigram model, the next symbol depends <em>only</em> on the previous one. The model
          is defined by a conditional probability table where each row gives the distribution over
          next words given the current word. Each symbol is predicted using this same table until
          an {"<end>"} symbol is generated.
        </p>
      </div>

      <ExpandableReading title="Higher-Order Markov Models and Their Limitations">
        <p className="mb-2">
          A <strong>k-th order Markov model</strong> conditions the next word on the previous k words.
          A trigram model (k=2) looks at two previous words, which provides better context but requires
          exponentially more parameters: <MathBlock inline math="|V|^k \times |V|" /> entries in the
          probability table.
        </p>
        <p>
          The fundamental limitation is that Markov models cannot capture long-range dependencies.
          Understanding that "The author who wrote the bestselling novel about..." should eventually end
          with "...won an award" requires remembering context far beyond any fixed window size.
        </p>
      </ExpandableReading>

      {/* 3. Maximum Likelihood Estimation */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Maximum Likelihood Estimation for Language Models</h2>
      <p className="mb-4">
        Given a corpus <MathBlock inline math="S" /> of observed sentences, the goal is to find model
        parameters that maximize the probability of generating all observed sentences:
      </p>
      <MathBlock math="s \in S, \quad s = \{w_1^s, w_2^s, \ldots, w_{|s|}^s\}" />
      <p className="my-4">
        For a first-order Markov model, the ML estimate is obtained as <strong>normalized counts</strong> of
        successive word occurrences — matching the statistics of the training corpus. If "ML" follows
        {"<beg>"} 70 out of 100 times in the corpus, then{' '}
        <MathBlock inline math="P(\text{ML} \mid \text{beg}) = 0.7" />.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
        <p className="font-semibold text-blue-800 dark:text-blue-200">Sampling from a Markov Model</p>
        <p className="text-blue-900 dark:text-blue-100 mt-1">
          To generate text: start with {"<beg>"}, sample the next word from the conditional distribution,
          then use that word to sample the following one, and repeat until {"<end>"} is drawn. The
          quality of generated text depends entirely on how well the probability table captures the
          statistics of natural language.
        </p>
      </div>

      {/* 4. Neural Network Language Models */}
      <h2 className="text-2xl font-bold mt-10 mb-4">From Markov Models to Neural Network Language Models</h2>
      <p className="mb-4">
        We can represent the Markov model as a <ConceptLink conceptId="feed-forward-network"><strong>feed-forward neural network</strong></ConceptLink>, which is
        far more extendable. The input is a <ConceptLink conceptId="one-hot-encoding">one-hot vector</ConceptLink> representing the current word, and the
        output is a probability distribution over the next word via <ConceptLink conceptId="softmax">softmax</ConceptLink>.
      </p>
      <p className="mb-4">
        A trigram neural network language model takes as input the one-hot encodings of the two
        previous words (<MathBlock inline math="x^{(t)}" /> = concatenation of one-hot vectors) and
        predicts the distribution over the next word <MathBlock inline math="y^{(t)}" />. Adding
        hidden layers allows the network to learn complex feature combinations beyond simple
        co-occurrence counts.
      </p>

      {/* 5. RNNs for Sequence Decoding */}
      <h2 className="text-2xl font-bold mt-10 mb-4">RNNs for Sequence Generation (Decoding)</h2>
      <p className="mb-4">
        Markov models and feed-forward neural language models both condition on a fixed
        window of previous words. We already know from the last chapter that <ConceptLink conceptId="rnn">RNNs</ConceptLink> can do
        better — they maintain a state that summarizes <em>everything</em> seen so far.
        Now let's use that same RNN machinery not just to read, but to <em>write</em>.
      </p>
      <p className="mb-4">
        In the previous chapter, we used RNNs to <em>encode</em> sequences into fixed-length vectors.
        Now we flip the direction: using RNNs to <strong>decode</strong> — to generate output sequences
        one token at a time.
      </p>
      <p className="mb-4">
        The decoding RNN maintains a <ConceptLink conceptId="hidden-state">hidden state</ConceptLink> and, at each time step, produces both a new state
        and an <strong>output distribution</strong> over possible next words:
      </p>
      <MathBlock math="s_t = \tanh(W^{s,s} s_{t-1} + W^{s,x} x_t) \quad \text{(state update)}" />
      <MathBlock math="p_t = \text{softmax}(W^o s_t) \quad \text{(output distribution)}" />
      <p className="my-4">
        The key difference from encoding: the RNN now feeds its own previous output back as the
        next input. At each step, we sample (or pick the most probable) word from <MathBlock inline math="p_t" />,
        convert it to a one-hot vector, and feed it as <MathBlock inline math="x_{t+1}" />.
      </p>

      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-6">
        <p className="font-semibold text-green-800 dark:text-green-200">Encoding vs. Decoding RNNs</p>
        <p className="text-green-900 dark:text-green-100 mt-1">
          <strong>Encoder</strong>: reads an input sequence, produces a single summary vector (the final
          hidden state). <strong>Decoder</strong>: takes an initial state (or encoding vector) and
          generates an output sequence word by word, feeding each prediction back as the next input.
          Many powerful systems chain an <ConceptLink conceptId="encoder-decoder">encoder and decoder</ConceptLink> together.
        </p>
      </div>

      {/* 6. Decoding into Sentences */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Decoding into Sentences</h2>
      <p className="mb-4">
        A concrete application: given a vector encoding of a sentence (e.g., "I have seen better
        lectures"), the decoder RNN generates an output sentence — perhaps a translation into
        another language, or a paraphrase.
      </p>
      <p className="mb-4">
        The decoder starts with the encoding vector as its initial hidden state. At each time step
        it outputs a distribution <MathBlock inline math="p_t" /> over the vocabulary, from which
        the next word is selected. This word is fed back as input, and the process repeats until
        an {"<end>"} token is produced.
      </p>

      <ExpandableReading title="Greedy vs. Beam Search Decoding">
        <p className="mb-2">
          <ConceptLink conceptId="greedy-decoding"><strong>Greedy decoding</strong></ConceptLink> picks the highest-probability word at each step. This is fast
          but can miss better overall sequences — choosing a slightly less probable word early might
          lead to a much better sentence overall.
        </p>
        <p>
          <ConceptLink conceptId="beam-search"><strong>Beam search</strong></ConceptLink> maintains the top-k most probable partial sequences at each step,
          expanding all of them and keeping the best k. With beam width k=5, we track 5 candidate
          translations simultaneously, often finding substantially better results than greedy search.
        </p>
      </ExpandableReading>

      {/* 7. The LSTM Architecture */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Long Short-Term Memory (LSTM)</h2>
      <p className="mb-4">
        Here's the catch with vanilla RNNs: they have terrible long-term memory. Try to
        encode a 50-word sentence and by the time you reach the end, the information from
        the first few words has been squashed through so many tanh layers that it's
        practically gone. The <strong>LSTM</strong> was invented specifically to fix this.
      </p>
      <p className="mb-4">
        The basic RNN struggles with long sequences because gradients vanish during
        backpropagation through time. The <ConceptLink conceptId="lstm"><strong>LSTM</strong></ConceptLink> solves this with a more
        sophisticated cell design that includes <em>gates</em> — learnable mechanisms that
        control what information to keep, forget, or output.
      </p>
      <p className="mb-4">
        The LSTM has three gates and a memory cell:
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 my-6 space-y-3">
        <p className="font-semibold text-lg mb-2">LSTM Equations</p>
        <div className="space-y-2">
          <div>
            <MathBlock math="f_t = \sigma(W^{f,h} h_{t-1} + W^{f,x} x_t)" />
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Forget gate — what to discard from memory</p>
          </div>
          <div>
            <MathBlock math="i_t = \sigma(W^{i,h} h_{t-1} + W^{i,x} x_t)" />
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Input gate — what new information to store</p>
          </div>
          <div>
            <MathBlock math="o_t = \sigma(W^{o,h} h_{t-1} + W^{o,x} x_t)" />
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Output gate — what to reveal from memory</p>
          </div>
          <div>
            <MathBlock math="c_t = f_t \odot c_{t-1} + i_t \odot \tanh(W^{c,h} h_{t-1} + W^{c,x} x_t)" />
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Memory cell update</p>
          </div>
          <div>
            <MathBlock math="h_t = o_t \odot \tanh(c_t)" />
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Visible state (hidden output)</p>
          </div>
          <div>
            <MathBlock math="p_t = \text{softmax}(W^o h_t)" />
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Output distribution</p>
          </div>
        </div>
      </div>

      <p className="mb-4">
        The symbol <MathBlock inline math="\odot" /> denotes element-wise multiplication. Each gate
        produces values between 0 and 1 (via sigmoid <MathBlock inline math="\sigma" />), acting as
        a soft switch — 0 means "block completely" and 1 means "pass through fully."
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 my-6">
        <p className="font-semibold text-amber-800 dark:text-amber-200">Why Gates Solve Vanishing Gradients</p>
        <p className="text-amber-900 dark:text-amber-100 mt-1">
          The memory cell <MathBlock inline math="c_t" /> provides a "highway" for gradients: when the
          forget gate is close to 1, information (and its gradient) flows directly from{' '}
          <MathBlock inline math="c_{t-1}" /> to <MathBlock inline math="c_t" /> without being squashed
          through a tanh. This allows the LSTM to maintain information across hundreds of time steps —
          far beyond what a vanilla RNN can manage.
        </p>
      </div>

      <ExpandableReading title="GRU: A Simplified Alternative">
        <p className="mb-2">
          The <ConceptLink conceptId="gru"><strong>Gated Recurrent Unit (GRU)</strong></ConceptLink> simplifies the LSTM by combining the forget
          and input gates into a single "update gate" and merging the cell state and hidden state.
          This reduces the number of parameters while achieving comparable performance on many tasks.
        </p>
        <p>
          GRUs use two gates: an update gate (how much of the old state to keep) and a reset gate
          (how much of the old state to use when computing the new candidate state). In practice,
          neither LSTM nor GRU consistently outperforms the other — the choice often depends on the
          specific task and dataset.
        </p>
      </ExpandableReading>

      {/* Worked Example: LSTM Gate Computation */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
          Worked Example: One LSTM step with actual numbers
        </p>
        <p className="text-sm mb-3">
          Let's trace one time step of a 1-dimensional LSTM (scalar gates for clarity).
          Suppose the previous cell state{' '}
          <MathBlock inline math="c_{t-1} = 0.8" />, previous hidden state{' '}
          <MathBlock inline math="h_{t-1} = 0.5" />, and new input{' '}
          <MathBlock inline math="x_t = 1.0" />. Assume the gate pre-activations work
          out to these values after the weight multiplications:
        </p>

        <p className="text-sm font-semibold mt-3 text-indigo-700 dark:text-indigo-300">
          Forget gate — "should I keep the old memory?"
        </p>
        <MathBlock math="f_t = \sigma(0.6) = 0.646" />
        <p className="text-sm">
          The gate is 0.646 — the LSTM retains about 65% of the old cell value.
        </p>

        <p className="text-sm font-semibold mt-3 text-indigo-700 dark:text-indigo-300">
          Input gate — "how much new info to write?"
        </p>
        <MathBlock math="i_t = \sigma(1.2) = 0.769" />
        <p className="text-sm">
          Candidate new memory: <MathBlock inline math="\tilde{c}_t = \tanh(0.9) = 0.716" />
        </p>

        <p className="text-sm font-semibold mt-3 text-indigo-700 dark:text-indigo-300">
          Cell update — blend old and new
        </p>
        <MathBlock math="c_t = f_t \cdot c_{t-1} + i_t \cdot \tilde{c}_t = 0.646 \times 0.8 + 0.769 \times 0.716 = 0.517 + 0.551 = 1.068" />

        <p className="text-sm font-semibold mt-3 text-indigo-700 dark:text-indigo-300">
          Output gate — "what to reveal?"
        </p>
        <MathBlock math="o_t = \sigma(0.3) = 0.574" />
        <MathBlock math="h_t = o_t \cdot \tanh(c_t) = 0.574 \times \tanh(1.068) = 0.574 \times 0.789 = 0.453" />

        <p className="text-sm mt-3">
          The new hidden state is <MathBlock inline math="h_t = 0.453" /> and
          cell state is <MathBlock inline math="c_t = 1.068" />. Notice how the cell
          can grow beyond 1 (unlike tanh-bounded vanilla RNN states) — this is precisely
          the "gradient highway" that prevents vanishing gradients.
        </p>
      </div>

      {/* 8. Encoder-Decoder Applications */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Encoder-Decoder Applications</h2>
      <p className="mb-4">
        Now we have all the building blocks: an encoder that reads a sequence into a
        vector, a decoder that generates a sequence from a vector, and LSTMs that make
        both work over long distances. What happens when we snap these pieces together?
      </p>
      <p className="mb-4">
        By chaining an encoding RNN with a decoding RNN, we get powerful sequence-to-sequence
        models. The encoder reads the input and compresses it into a context vector; the decoder
        generates the output from that vector.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Machine Translation</h3>
      <p className="mb-4">
        Encode a sentence in English ("I have seen better lectures") into a vector, then decode
        that vector into Finnish ("Olen nahnyt parempia luentoja"). The encoder and decoder can
        handle different sequence lengths, and the hidden state captures meaning independent of
        surface form.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Image Captioning</h3>
      <p className="mb-4">
        Replace the encoder RNN with a convolutional neural network (CNN) that produces an image
        encoding vector. Feed this vector into a decoder RNN to generate a natural language
        description. The CNN encodes visual features; the LSTM decoder produces fluent text like
        "A group of people standing on a beach."
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Sentiment Classification</h3>
      <p className="mb-4">
        Encode a review or tweet into a fixed vector, then use a simple classifier (e.g., softmax
        layer) on that encoding. The RNN learns which words and phrases most influence
        sentiment — "I have seen better lectures" maps to a negative sentiment score.
      </p>

      {/* 9. Summary */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Summary Blueprint</h2>
      <p className="mb-4">
        This chapter extended RNNs from pure encoders to full sequence-to-sequence systems. Starting
        from classical Markov language models, we saw how neural networks generalize them, how
        decoding RNNs generate text by feeding predictions back as input, and how LSTMs overcome
        the vanishing gradient problem with gated memory cells.
      </p>

      {/* Decision Scenario */}
      <DecisionScenario
        title="Choosing Your RNN Variant"
        scenario="You need to build a model that translates English sentences to French. The sentences can be up to 50 words long. Which architecture should you use?"
        options={[
          {
            label: 'Bigram Markov model',
            feedback: 'A Markov model only looks at the previous word — it cannot capture the full meaning of a source sentence for translation. It also cannot map between languages since it models one language at a time.',
            isCorrect: false,
          },
          {
            label: 'Vanilla RNN encoder-decoder',
            feedback: 'A vanilla RNN can encode and decode, but with sentences up to 50 words, vanishing gradients will degrade the encoding of early words. The model will struggle with long-range dependencies.',
            isCorrect: false,
          },
          {
            label: 'LSTM encoder-decoder',
            feedback: "Correct! The LSTM's gating mechanisms maintain information across long sequences, making it well-suited for translating sentences of 50+ words. The forget gate preserves relevant context while the input gate integrates new information at each step.",
            isCorrect: true,
          },
        ]}
      />

      {/* Key Takeaways */}
      <KeyTakeaways
        items={[
          'Language models predict the next word given previous context — from simple Markov tables to neural networks.',
          'Maximum likelihood training for Markov models reduces to counting co-occurrences and normalizing.',
          'Decoding RNNs generate sequences by feeding each predicted word back as the next input.',
          'The output distribution at each step is computed via softmax over the hidden state.',
          'LSTMs add forget, input, and output gates plus a memory cell to combat vanishing gradients.',
          'The memory cell provides a gradient highway, enabling learning over hundreds of time steps.',
          'Encoder-decoder architectures power machine translation, image captioning, and text summarization.',
        ]}
      />

      {/* Quiz */}
      <QuizSection
        questions={[
          {
            question: 'In a first-order Markov language model, what does the next word depend on?',
            options: [
              'All previous words in the sentence',
              'Only the immediately preceding word',
              'The first and last words seen so far',
              'A random selection of previous words',
            ],
            correctIndex: 1,
            explanation:
              'A first-order (bigram) Markov model conditions the next word solely on the immediately preceding word — P(w_i | w_{i-1}). Higher-order models use more context but require exponentially more parameters.',
          },
          {
            question: 'What is the key difference between an encoding RNN and a decoding RNN?',
            options: [
              'Encoding RNNs use tanh while decoding RNNs use ReLU',
              'Decoding RNNs produce an output distribution at each step and feed predictions back as input',
              'Encoding RNNs are deeper than decoding RNNs',
              'Decoding RNNs only work with images',
            ],
            correctIndex: 1,
            explanation:
              'A decoding RNN produces an output (e.g., a word probability distribution via softmax) at every time step and uses its own previous output as the next input — it generates sequences auto-regressively.',
          },
          {
            question: 'Which LSTM gate decides what information to discard from the memory cell?',
            options: [
              'Input gate',
              'Output gate',
              'Forget gate',
              'Update gate',
            ],
            correctIndex: 2,
            explanation:
              'The forget gate f_t produces values between 0 and 1 that multiply the previous cell state c_{t-1}. Values near 0 erase that dimension of memory; values near 1 preserve it.',
          },
          {
            question: 'Why does the LSTM memory cell help with vanishing gradients?',
            options: [
              'It uses ReLU activation instead of tanh',
              'It provides an additive path for gradients that avoids repeated squashing through nonlinearities',
              'It doubles the learning rate for long sequences',
              'It skips backpropagation entirely for early time steps',
            ],
            correctIndex: 1,
            explanation:
              'The cell state update c_t = f_t ⊙ c_{t-1} + i_t ⊙ ... is additive: when the forget gate is near 1, gradients flow through multiplication by ~1 rather than being squashed through tanh repeatedly. This "gradient highway" is the core innovation.',
          },
          {
            question: 'In an encoder-decoder model for machine translation, what connects the encoder to the decoder?',
            options: [
              'A lookup table mapping source words to target words',
              'The final hidden state of the encoder, used as the initial state of the decoder',
              'A shared vocabulary between source and target languages',
              'A fixed-length feature vector extracted from a Markov model',
            ],
            correctIndex: 1,
            explanation:
              'The encoder processes the source sentence and its final hidden state encodes the meaning of the entire input. This vector is passed as the initial hidden state of the decoder, which then generates the target sentence word by word.',
          },
        ]}
      />
    </ChapterLayout>
  )
}
