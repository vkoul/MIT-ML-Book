import { useState } from 'react'
import { motion } from 'framer-motion'

interface FlashCardProps {
  front: string
  back: string
}

export function FlashCard({ front, back }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="perspective-[800px] cursor-pointer select-none"
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="relative w-full min-h-[200px] preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl border-2 border-primary-200 dark:border-primary-800 p-6 flex items-center justify-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-gray-800 dark:text-gray-200 font-medium">{front}</p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-primary-50 dark:bg-primary-900/30 rounded-xl border-2 border-primary-300 dark:border-primary-700 p-6 flex items-center justify-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{back}</p>
        </div>
      </motion.div>
      <p className="text-center text-xs text-gray-400 mt-2">Click to flip</p>
    </div>
  )
}
