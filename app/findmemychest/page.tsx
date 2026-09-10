'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const AES_KEY = 'SMP-EVENT-2026-NOTAPICK'
const COORDINATES = { x: '1XXX', y: 'XX', z: '2XXX' }

export default function FindMyChestPage() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  const handleUnlock = () => {
    if (input.trim() === AES_KEY) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setUnlocked(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleUnlock()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Treasure Awaits
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground text-glow">
              Find My Chest
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-xl bg-card border border-border"
          >
            <AnimatePresence mode="wait">
              {!unlocked ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Enter the secret key to unlock the chest coordinates.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="secret-key" className="sr-only">
                      Secret Key
                    </label>
                    <input
                      id="secret-key"
                      type="text"
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value)
                        setError(false)
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter secret key..."
                      className={`w-full px-4 py-3 rounded-lg bg-background border font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        error
                          ? 'border-destructive focus:ring-destructive/50'
                          : 'border-border'
                      }`}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs text-destructive"
                      >
                        Invalid key. Try again.
                      </motion.p>
                    )}
                  </div>

                  <button
                    onClick={handleUnlock}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-sm transition-all glow-green-sm"
                  >
                    <Unlock className="w-4 h-4" />
                    Unlock
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center space-y-6"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">
                      Chest Coordinates
                    </p>
                    <div className="flex items-center justify-center gap-3 font-mono text-2xl md:text-3xl font-bold text-primary text-glow">
                      <span>X: {COORDINATES.x}</span>
                      <span className="text-border">|</span>
                      <span>Y: {COORDINATES.y}</span>
                      <span className="text-border">|</span>
                      <span>Z: {COORDINATES.z}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-lg font-semibold text-foreground">
                      Go and find it
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setUnlocked(false)
                      setInput('')
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Lock again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
