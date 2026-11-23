import { ChapterLayout } from '../components/content/ChapterLayout'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function Ch10() {
  return (
    <ChapterLayout
      title="Convolutional Neural Networks"
      subtitle="Lecture 12"
    >
      {/* Learning Objectives */}
      <div className="my-6 rounded-lg bg-purple-50 p-6 dark:bg-purple-900/30">
        <h3 className="mb-3 text-lg font-semibold text-purple-800 dark:text-purple-200">
          Learning Objectives
        </h3>
        <ul className="ml-4 list-disc space-y-1 text-purple-900 dark:text-purple-100">
          <li>Understand why standard feed-forward networks struggle with image data</li>
          <li>Learn how convolutional filters detect local patterns through weight sharing</li>
          <li>Compute the convolution operation and resulting feature maps</li>
          <li>Explain how pooling achieves translation invariance while reducing dimensionality</li>
          <li>Trace data flow through a complete CNN architecture (conv → pool → fully-connected)</li>
          <li>Recognise landmark architectures like AlexNet and their impact on computer vision</li>
        </ul>
      </div>

      {/* 1. The Image Classification Problem */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">The Image Classification Problem</h2>
      <p className="mb-4">
        Consider classifying images into one of 1,000 categories — mushroom, cherry,
        dalmatian, container ship, and so on. Each image is a grid of pixel values, and
        the task is to learn a mapping from raw pixels to a category label. This is the
        challenge that drove the development of <ConceptLink conceptId="cnn">convolutional neural networks</ConceptLink> (CNNs).
      </p>
      <p className="mb-4">
        A typical input image might be <MathBlock inline math="224 \times 224 \times 3" /> pixels
        (height × width × RGB channels), giving a raw input vector of over 150,000 dimensions.
        The question is: how do we build a neural network that can handle such high-dimensional,
        spatially structured data?
      </p>

      {/* 2. Why Not Plain Feed-Forward? */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">Why Not Plain Feed-Forward Networks?</h2>
      <p className="mb-4">
        A standard fully-connected network would connect every input pixel to every neuron
        in the first hidden layer. For a 224×224×3 image going into a layer with 1,000 neurons,
        that's over <strong>150 million</strong> parameters in the first layer alone. This
        creates two fundamental problems:
      </p>
      <div className="my-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
        <p className="font-semibold text-amber-800 dark:text-amber-200">Parameter Explosion</p>
        <p className="text-amber-900 dark:text-amber-100">
          With millions of parameters per layer, the network requires enormous amounts of
          training data to avoid overfitting, and training becomes computationally prohibitive.
        </p>
      </div>
      <div className="my-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
        <p className="font-semibold text-amber-800 dark:text-amber-200">No Spatial Structure</p>
        <p className="text-amber-900 dark:text-amber-100">
          A fully-connected layer treats the input as a flat vector — it has no notion that
          nearby pixels are related. A mushroom in the top-left corner looks completely different
          from the same mushroom shifted to the bottom-right, even though it's the same object.
        </p>
      </div>
      <p className="mb-4">
        We need an architecture that (1) uses far fewer parameters by exploiting spatial
        locality, and (2) can recognise the same pattern regardless of where it appears
        in the image. Convolution provides both.
      </p>

      {/* 3. Filters and Patch Classifiers */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">Filters and Patch Classifiers</h2>
      <p className="mb-4">
        The key insight behind CNNs is that useful image features — edges, corners,
        textures — are <em>local</em> patterns. Instead of connecting to the entire image,
        each neuron looks at a small patch (e.g., 11×11 pixels) and learns to detect a
        specific pattern within that patch.
      </p>
      <p className="mb-4">
        A <ConceptLink conceptId="filter-kernel"><strong>filter</strong></ConceptLink> (also called a <strong>kernel</strong>) is a small weight
        matrix — say 11×11 — that acts as a local pattern detector. It slides across the
        image, computing a dot product at each position between the patch of input pixels
        and the filter weights:
      </p>
      <MathBlock math="f = \text{ReLU}\!\bigl(\mathbf{x}_{\text{patch}} \cdot \mathbf{w}\bigr)" />
      <p className="mb-4">
        where <MathBlock inline math="\mathbf{x}_{\text{patch}}" /> is the vectorised local
        patch and <MathBlock inline math="\mathbf{w}" /> is the filter's weight vector.
        The <ConceptLink conceptId="relu">ReLU</ConceptLink> activation introduces non-linearity, allowing the network to compose
        simple detectors into complex features.
      </p>

      <ExpandableReading title="Learned vs. Hand-Crafted Filters">
        <p>
          Before deep learning, computer vision relied on hand-crafted filters like Sobel
          (edge detection), Gabor (texture), and SIFT (keypoints). These were designed by
          humans based on domain knowledge. In a CNN, filters are <em>learned</em> from
          data through backpropagation — the network discovers which local patterns are most
          useful for the classification task. First-layer filters typically converge to edge
          and colour detectors, strikingly similar to what neuroscientists observe in the
          primary visual cortex (V1).
        </p>
      </ExpandableReading>

      {/* 4. The Convolution Operation */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">The Convolution Operation</h2>
      <p className="mb-4">
        <ConceptLink conceptId="convolution"><strong>Convolution</strong></ConceptLink> is the process of sliding a filter across the entire
        image and recording the filter's response at each position. The result is a 2D
        grid called a <ConceptLink conceptId="feature-map"><strong>feature map</strong></ConceptLink> — a spatial map of where the filter's
        pattern appears in the input.
      </p>
      <p className="mb-4">
        Formally, for a 2D input <MathBlock inline math="I" /> and filter <MathBlock inline math="W" /> of
        size <MathBlock inline math="k \times k" />, the feature map value at
        position <MathBlock inline math="(i, j)" /> is:
      </p>
      <MathBlock math="F(i,j) = \text{ReLU}\!\Biggl(\sum_{m=0}^{k-1}\sum_{n=0}^{k-1} I(i+m,\, j+n)\,W(m,n) + b\Biggr)" />
      <p className="mb-4">
        The filter <MathBlock inline math="W" /> and bias <MathBlock inline math="b" /> are
        the same at every position — this <ConceptLink conceptId="weight-sharing"><strong>weight sharing</strong></ConceptLink> is what makes
        convolution parameter-efficient. A single 11×11 filter has only 121 parameters
        (plus bias), regardless of the image size.
      </p>
      <div className="my-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="font-semibold text-blue-800 dark:text-blue-200">Stride and Padding</p>
        <p className="text-blue-900 dark:text-blue-100">
          The <ConceptLink conceptId="stride"><strong>stride</strong></ConceptLink> controls how many pixels the filter moves between
          positions. Stride 1 means every position; stride 2 skips every other, halving the
          feature map dimensions. <ConceptLink conceptId="padding"><strong>Padding</strong></ConceptLink> adds zeros around the border so that
          the output has the same spatial dimensions as the input (called "same" padding).
        </p>
      </div>

      {/* Worked Example: 2D Convolution by Hand */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 my-4">
        <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
          Worked Example: 2D Convolution by Hand
        </p>
        <p className="text-sm mb-3">
          Let's convolve a 4x4 input with a 3x3 horizontal-edge-detecting filter
          (stride 1, no padding). The filter highlights where pixel values change
          from top to bottom.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
          <div>
            <p className="font-semibold mb-1">Input I (4x4):</p>
            <pre className="bg-white dark:bg-gray-800 p-2 rounded text-xs font-mono">
{`0  0  0  0
0  1  1  0
0  1  1  0
0  0  0  0`}
            </pre>
          </div>
          <div>
            <p className="font-semibold mb-1">Filter W (3x3):</p>
            <pre className="bg-white dark:bg-gray-800 p-2 rounded text-xs font-mono">
{` 1  1  1
 0  0  0
-1 -1 -1`}
            </pre>
          </div>
        </div>

        <p className="text-sm mb-2">
          The output is 2x2 (since <MathBlock inline math="\lfloor(4-3)/1\rfloor + 1 = 2" />).
          We compute each position by element-wise multiply and sum:
        </p>

        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Position (0,0): top-left 3x3 patch</p>
        <MathBlock math="F(0,0) = (0)(1) + (0)(1) + (0)(1) + (0)(0) + (1)(0) + (1)(0) + (0)(-1) + (1)(-1) + (1)(-1) = -2" />

        <p className="text-sm font-semibold mt-2 text-indigo-700 dark:text-indigo-300">Position (0,1): shift right</p>
        <MathBlock math="F(0,1) = (0)(1) + (0)(1) + (0)(1) + (1)(0) + (1)(0) + (0)(0) + (1)(-1) + (1)(-1) + (0)(-1) = -2" />

        <p className="text-sm font-semibold mt-2 text-indigo-700 dark:text-indigo-300">Position (1,0): shift down</p>
        <MathBlock math="F(1,0) = (0)(1) + (1)(1) + (1)(1) + (0)(0) + (1)(0) + (1)(0) + (0)(-1) + (0)(-1) + (0)(-1) = 2" />

        <p className="text-sm font-semibold mt-2 text-indigo-700 dark:text-indigo-300">Position (1,1): shift down-right</p>
        <MathBlock math="F(1,1) = (1)(1) + (1)(1) + (0)(1) + (1)(0) + (1)(0) + (0)(0) + (0)(-1) + (0)(-1) + (0)(-1) = 2" />

        <div className="mt-3">
          <p className="font-semibold text-sm mb-1">Output feature map (2x2):</p>
          <pre className="bg-white dark:bg-gray-800 p-2 rounded text-xs font-mono">
{`-2  -2
 2   2`}
          </pre>
        </div>
        <p className="text-sm mt-2">
          The negative values at the top indicate a <strong>light-to-dark transition</strong>{' '}
          (top edge of the square), while positive values at the bottom indicate a{' '}
          <strong>dark-to-light transition</strong> (bottom edge). The filter has
          detected horizontal edges — exactly what we'd use to find object boundaries!
        </p>
      </div>

      <p className="mb-4">
        A convolution layer applies <em>multiple</em> filters — say 64 or 256 — each
        producing its own feature map. The stack of feature maps forms a 3D output volume.
        For example, applying 64 filters of size 9×9 to an 83×83 input produces a volume of
        size 64×75×75.
      </p>

      <ExpandableReading title="Output Size Formula">
        <p>
          Given an input of size <em>n×n</em>, filter size <em>k×k</em>, stride <em>s</em>,
          and padding <em>p</em>, the output feature map has spatial
          size: <em>⌊(n + 2p − k) / s⌋ + 1</em>. For example, an 83×83 input with a 9×9
          filter, stride 1, and no padding gives ⌊(83 − 9) / 1⌋ + 1 = 75. Understanding
          this formula is essential for designing CNN architectures and ensuring layer
          dimensions are compatible.
        </p>
      </ExpandableReading>

      {/* 5. Pooling */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">Pooling</h2>
      <p className="mb-4">
        After convolution, we often want to know <em>whether</em> a feature was detected
        but not <em>exactly where</em>. <ConceptLink conceptId="pooling">Pooling</ConceptLink> achieves this by summarising small
        neighbourhoods of the feature map into a single value, reducing spatial resolution
        while retaining the most important information.
      </p>
      <p className="mb-4">
        <ConceptLink conceptId="max-pooling"><strong>Max pooling</strong></ConceptLink> is the most common variant. It divides the feature map
        into non-overlapping regions (e.g., 2×2) and keeps only the maximum value in each:
      </p>
      <MathBlock math="\text{MaxPool}(R) = \max_{(i,j) \in R}\; F(i,j)" />
      <p className="mb-4">
        A 2×2 max pool with stride 2 halves each spatial dimension, reducing the number of
        values by 4× while preserving the strongest activations.
      </p>
      <div className="my-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
        <p className="font-semibold text-green-800 dark:text-green-200">Translation Invariance</p>
        <p className="text-green-900 dark:text-green-100">
          Pooling induces <ConceptLink conceptId="translation-invariance"><strong>translation invariance</strong></ConceptLink> — small shifts of the input
          produce the same pooled output. If an edge shifts by one pixel, the max pool over
          a 2×2 region still picks up the same maximum. This comes at the cost of spatial
          resolution: pooled features know <em>that</em> an edge exists in a region but not
          its precise sub-pixel location.
        </p>
      </div>

      <ExpandableReading title="Average Pooling and Global Average Pooling">
        <p>
          <strong>Average pooling</strong> takes the mean over each region instead of the
          maximum. It produces smoother feature maps but can dilute strong activations.
          <strong>Global average pooling</strong> (GAP) averages the entire feature map into
          a single number — one per filter channel. Modern architectures like ResNet use GAP
          just before the final classification layer, eliminating the need for large
          fully-connected layers and dramatically reducing parameter count. GAP also makes
          the network naturally accept inputs of varying spatial size.
        </p>
      </ExpandableReading>

      {/* 6. CNN Architecture */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">CNN Architecture: Putting It Together</h2>
      <p className="mb-4">
        A CNN stacks alternating convolution and pooling layers, progressively transforming
        the input from a high-resolution image with few channels to a low-resolution volume
        with many channels. The final volume is flattened and passed through one or more
        fully-connected layers for classification.
      </p>
      <p className="mb-4">
        A typical pipeline for a single convolutional block:
      </p>
      <MathBlock math="\text{Input} \;\xrightarrow{\text{Conv}}\; \text{Feature Maps} \;\xrightarrow{\text{ReLU}}\; \text{Activation} \;\xrightarrow{\text{Pool}}\; \text{Reduced Maps}" />
      <p className="mb-4">
        Consider a concrete example from LeCun's architecture (2013):
      </p>
      <ul className="mb-4 ml-6 list-disc space-y-1">
        <li><strong>Input:</strong> 83×83 image</li>
        <li><strong>Layer 1:</strong> 64 filters of 9×9 → 64@75×75 feature maps</li>
        <li><strong>Pool 1:</strong> 10×10 pooling, stride 5 → 64@14×14</li>
        <li><strong>Layer 2:</strong> 256 filters of 9×9 → 256@6×6 feature maps</li>
        <li><strong>Pool 2:</strong> 6×6 pooling, stride 4 → 256@1×1</li>
        <li><strong>Output:</strong> Fully-connected to 101 classes</li>
      </ul>
      <p className="mb-4">
        Notice how spatial dimensions shrink (83 → 75 → 14 → 6 → 1) while depth grows
        (1 → 64 → 256). Early layers detect simple features (edges, colours); deeper layers
        compose them into complex patterns (textures, object parts, whole objects).
      </p>

      {/* 7. AlexNet */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">AlexNet: The Deep Learning Breakthrough</h2>
      <p className="mb-4">
        In 2012, AlexNet (Krizhevsky et al.) won the ImageNet Large Scale Visual Recognition
        Challenge (ILSVRC) by a dramatic margin, demonstrating that deep CNNs trained on GPUs
        could far surpass traditional computer vision methods.
      </p>
      <p className="mb-4">
        Key statistics of AlexNet:
      </p>
      <ul className="mb-4 ml-6 list-disc space-y-1">
        <li><strong>Dataset:</strong> 1.5 million labelled images, 1,000 categories</li>
        <li><strong>Parameters:</strong> ~60 million</li>
        <li><strong>Operations:</strong> ~832 million multiply-accumulate (MAC) ops per image</li>
        <li><strong>Architecture:</strong> 5 conv layers + 3 fully-connected layers</li>
        <li><strong>First conv layer:</strong> 96 filters of 11×11×3, stride 4 on 224×224×3 input</li>
      </ul>
      <div className="my-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="font-semibold text-blue-800 dark:text-blue-200">Non-Linearities and Normalization</p>
        <p className="text-blue-900 dark:text-blue-100">
          AlexNet used ReLU activations (faster than sigmoid/tanh), local contrast
          normalization between layers, and dropout in the fully-connected layers for
          regularisation. Max pooling with 2×2 subsampling appeared after early conv layers.
          These techniques — along with GPU training — were key ingredients in AlexNet's
          success and remain staples of modern architectures.
        </p>
      </div>

      {/* 8. What CNNs Learn */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">What CNNs Learn: Visualising Filters</h2>
      <p className="mb-4">
        Examining the learned filters reveals a hierarchical feature detector:
      </p>
      <ul className="mb-4 ml-6 list-disc space-y-1">
        <li>
          <strong>Layer 1:</strong> 96 filters that detect oriented edges, colour blobs,
          and simple gradients — remarkably similar to Gabor filters and V1 simple cells.
          These 11×11×3 filters tile the space of basic visual primitives.
        </li>
        <li>
          <strong>Layer 2–3:</strong> Combinations of edges forming corners, T-junctions,
          and textures (stripes, grids, crosshatching).
        </li>
        <li>
          <strong>Layer 4–5:</strong> Object parts — wheel shapes, eyes, fur patterns,
          text fragments — becoming increasingly class-specific.
        </li>
        <li>
          <strong>Fully-connected layers:</strong> Holistic object templates that integrate
          spatial relationships of parts.
        </li>
      </ul>
      <p className="mb-4">
        This hierarchy — edges → textures → parts → objects — emerges automatically from
        the training data, with no human engineering of what each layer should detect.
      </p>

      {/* 9. Summary */}
      <h2 className="mt-10 mb-4 text-2xl font-bold">Summary Blueprint</h2>
      <div className="my-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
        <p className="text-green-900 dark:text-green-100">
          CNNs solve image classification by replacing fully-connected layers with
          <strong> convolution</strong> (local filters with weight sharing) and
          <strong> pooling</strong> (spatial down-sampling). Convolution extracts local
          features efficiently; pooling provides translation invariance. Stacking these
          operations creates a hierarchical feature extractor that transforms raw pixels
          into increasingly abstract representations. AlexNet showed that deep CNNs trained
          end-to-end on large datasets with GPUs dramatically outperform hand-engineered
          features, launching the modern <ConceptLink conceptId="deep-learning">deep learning</ConceptLink> era.
        </p>
      </div>

      {/* Decision Scenario */}
      <DecisionScenario
        title="Choosing Your Architecture for Image Tasks"
        scenario="You need to classify photographs of 200 bird species. Images are 256×256 pixels. Which approach is most appropriate?"
        options={[
          {
            label: 'Flatten pixels into a vector and use a fully-connected network',
            feedback: 'This ignores spatial structure and requires ~196K input neurons. It would overfit badly and miss the local patterns (feather textures, beak shapes) that distinguish species.',
            isCorrect: false,
          },
          {
            label: 'Use an RNN to process pixels sequentially left-to-right',
            feedback: 'RNNs are designed for sequential data. Treating an image as a 1D pixel sequence destroys the 2D spatial relationships that are critical for visual recognition.',
            isCorrect: false,
          },
          {
            label: 'Use a CNN with convolutional and pooling layers',
            feedback: 'Correct! A CNN exploits spatial locality through convolutional filters (detecting edges, textures, bird parts) and achieves translation invariance through pooling. Weight sharing keeps parameters manageable even for 256×256 inputs.',
            isCorrect: true,
          },
        ]}
      />

      {/* Key Takeaways */}
      <KeyTakeaways
        items={[
          'Fully-connected networks on raw images suffer from parameter explosion and no spatial awareness.',
          'A convolutional filter slides across the image, computing dot products with local patches — weight sharing means the same small set of parameters is reused everywhere.',
          'The convolution output is a feature map showing where the filter\'s pattern appears spatially.',
          'Pooling (typically max pooling) reduces spatial dimensions while providing translation invariance.',
          'CNNs alternate conv + pool layers, progressing from low-level edges to high-level object parts.',
          'AlexNet (2012) demonstrated that deep CNNs trained end-to-end on GPUs could dramatically outperform traditional computer vision on ImageNet.',
          'First-layer CNN filters learn edge and colour detectors resembling biological visual cortex cells.',
        ]}
      />

      {/* Quiz */}
      <QuizSection
        questions={[
          {
            question: 'Why do standard fully-connected networks struggle with image classification?',
            options: [
              'Images are always too small for neural networks',
              'The number of parameters explodes and spatial structure is ignored',
              'Fully-connected networks cannot use ReLU activations',
              'Pixel values are too noisy for gradient descent',
            ],
            correctIndex: 1,
            explanation:
              'A 224×224×3 image connected to 1,000 neurons requires 150M+ parameters in one layer. Worse, the flat vector representation destroys the spatial relationships between nearby pixels that carry visual meaning.',
          },
          {
            question: 'What does "weight sharing" mean in a convolutional layer?',
            options: [
              'Each neuron has its own unique set of weights',
              'Weights are randomly shared between layers',
              'The same filter weights are applied at every spatial position',
              'Weights are shared between the training and test phases',
            ],
            correctIndex: 2,
            explanation:
              'In convolution, a single filter (e.g., 11×11 weights) slides across every position of the image. The same parameters detect the same pattern regardless of location, making the operation parameter-efficient and translation-equivariant.',
          },
          {
            question: 'What is the primary purpose of max pooling?',
            options: [
              'To increase the spatial resolution of feature maps',
              'To add non-linearity to the network',
              'To reduce spatial dimensions while retaining the strongest activations',
              'To normalise pixel values to the range [0, 1]',
            ],
            correctIndex: 2,
            explanation:
              'Max pooling selects the maximum value in each local region, reducing spatial dimensions (e.g., halving height and width with 2×2 pooling). This provides translation invariance — small shifts in the input still produce the same maximum — while discarding precise position information.',
          },
          {
            question: 'In a CNN, what happens to spatial dimensions and depth as you go deeper?',
            options: [
              'Both spatial dimensions and depth increase',
              'Spatial dimensions decrease while depth (number of channels) increases',
              'Spatial dimensions increase while depth decreases',
              'Both remain constant throughout the network',
            ],
            correctIndex: 1,
            explanation:
              'Pooling layers progressively shrink spatial dimensions (e.g., 224→112→56→28→14→7), while each conv layer can increase the number of feature map channels (e.g., 3→64→128→256→512). This trades spatial resolution for richer feature representations.',
          },
          {
            question: 'What did first-layer filters in AlexNet learn to detect?',
            options: [
              'Complete object shapes like cars and faces',
              'Oriented edges and colour blobs, similar to biological V1 cells',
              'Random noise patterns with no visual meaning',
              'Text and numerical digits',
            ],
            correctIndex: 1,
            explanation:
              'AlexNet\'s 96 first-layer filters (11×11×3) converged to oriented edge detectors and colour blob detectors — strikingly similar to Gabor filters and the simple cells found in the primary visual cortex (V1). This emergence of biologically plausible features from pure data-driven learning was a remarkable finding.',
          },
        ]}
      />
    </ChapterLayout>
  )
}
