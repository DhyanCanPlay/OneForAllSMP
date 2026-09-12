'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PartyPopper, X } from 'lucide-react'

export default function EventBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-0 right-0 z-40 bg-amber-500/10 border-b border-amber-500/25"
        >
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3">
            <PartyPopper className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-sm text-foreground text-center">
              The Treasure Hunt event has ended. See you at the next one!
            </p>
            <button
              onClick={() => setVisible(false)}
              className="ml-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
              aria-label="Dismiss event bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
