'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  Check,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Lock,
  RefreshCw,
  Terminal,
  Flame,
  Compass,
  Radio,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const AES_KEY = 'SMP-EVENT-2026-NOTAPICK'
const MASK_PLACEHOLDER = '••••-••••-••••-•••••••'
const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!&%$*+~'

const NETHER_COORDS = {
  x: '1108',
  y: '59',
  z: '-818',
  raw: 'X: 1108 Y: 59 Z: -818',
}

export default function KeyPage() {
  const [revealed, setRevealed] = useState(false)
  const [decrypting, setDecrypting] = useState(false)
  const [displayText, setDisplayText] = useState(MASK_PLACEHOLDER)
  const [copiedKey, setCopiedKey] = useState(false)
  const [copiedCoords, setCopiedCoords] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Scramble / Decrypt animation effect
  const handleReveal = () => {
    if (decrypting) return
    setDecrypting(true)
    setProgress(0)
    setRevealed(false)

    let iteration = 0
    const totalIterations = 23

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      iteration += 1
      setProgress(Math.min(100, Math.round((iteration / totalIterations) * 100)))

      if (iteration >= totalIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(AES_KEY)
        setDecrypting(false)
        setRevealed(true)
      } else {
        setDisplayText(() => {
          return MASK_PLACEHOLDER.split('')
            .map((char) => {
              if (char === '-') return '-'
              return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
            })
            .join('')
        })
      }
    }, 55)
  }

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRevealed(false)
    setDecrypting(false)
    setDisplayText(MASK_PLACEHOLDER)
    setProgress(0)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(AES_KEY)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = AES_KEY
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    }
  }

  const handleCopyCoords = async () => {
    try {
      await navigator.clipboard.writeText(NETHER_COORDS.raw)
      setCopiedCoords(true)
      setTimeout(() => setCopiedCoords(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = NETHER_COORDS.raw
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiedCoords(true)
      setTimeout(() => setCopiedCoords(false), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <section className="relative flex-1 flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-2xl w-full space-y-8">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {revealed ? 'Cipher Decrypted' : 'Encrypted Event Payload'}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-glow mb-3">
              Secret Key
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Decrypt the server artifact to uncover the secret passphrase for the ongoing SMP event.
            </p>
          </motion.div>

          {/* Cipher Console Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative rounded-2xl bg-card/90 backdrop-blur-xl border border-border/80 shadow-2xl overflow-hidden"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-secondary/30 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>event_payload.bin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${revealed ? 'bg-primary animate-pulse' : decrypting ? 'bg-amber-400 animate-ping' : 'bg-muted-foreground/40'}`} />
                <span>{revealed ? 'DECRYPTED' : decrypting ? `SCANNING [${progress}%]` : 'LOCKED'}</span>
              </div>
            </div>

            {/* Key Container */}
            <div className="p-7 md:p-10 text-center">
              <div className="mb-2 flex justify-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    revealed
                      ? 'bg-primary/20 text-primary border border-primary/40 glow-green-sm'
                      : decrypting
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                      : 'bg-secondary text-muted-foreground border border-border'
                  }`}
                >
                  {revealed ? (
                    <ShieldCheck className="w-6 h-6" />
                  ) : decrypting ? (
                    <KeyRound className="w-6 h-6 animate-spin" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>
              </div>

              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 my-3">
                {revealed ? 'Decrypted String' : 'Cipher Text'}
              </p>

              {/* Display Box with generous padding & breathing room for scaling animation */}
              <div className="relative py-6 sm:py-8 px-4 sm:px-6 min-h-[96px] sm:min-h-[116px] rounded-xl bg-background/80 border border-border/60 mb-8 group overflow-hidden flex items-center justify-center">
                <motion.p
                  key={revealed ? 'revealed' : 'masked'}
                  animate={
                    revealed
                      ? {
                          scale: [0.9, 1.12, 0.98, 1.03, 1],
                          transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
                        }
                      : { scale: 1 }
                  }
                  className={`font-mono text-base sm:text-2xl md:text-3xl font-bold tracking-wider select-all break-all sm:break-normal inline-block origin-center transform-gpu leading-normal ${
                    revealed
                      ? 'text-primary text-glow'
                      : decrypting
                      ? 'text-amber-400 tracking-widest'
                      : 'text-muted-foreground/50 tracking-widest'
                  }`}
                >
                  {displayText}
                </motion.p>

                {/* Scan line effect during decryption */}
                {decrypting && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!revealed ? (
                  <button
                    onClick={handleReveal}
                    disabled={decrypting}
                    className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all glow-green cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {decrypting ? `Decrypting (${progress}%)...` : 'Reveal Key'}
                    </span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                ) : (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleCopyKey}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all glow-green-sm cursor-pointer"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Key
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      title="Hide key again"
                      aria-label="Hide key again"
                      className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="px-6 py-3 bg-secondary/20 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>STATUS: ENCRYPTED ARTIFACT</span>
              <span>ONE FOR ALL SMP</span>
            </div>
          </motion.div>

          {/* Nether Themed Coordinates Card - Only revealed when key is successfully generated */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative rounded-2xl bg-gradient-to-b from-[#1c0c0e]/95 to-[#120608]/95 backdrop-blur-xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.12)] overflow-hidden"
              >
                {/* Nether Header Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/20 bg-red-950/40 text-xs font-mono">
                  <div className="flex items-center gap-2 text-red-400">
                    <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                    <span className="font-semibold tracking-wider uppercase">The Nether</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-300/70">
                    <Radio className="w-3.5 h-3.5 text-red-400 animate-ping" />
                    <span>SIGNAL DETECTED</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left space-y-1.5">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Compass className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-red-300/80 font-medium">
                          Waypoint Coordinates
                        </span>
                      </div>
                      <div className="font-mono text-2xl sm:text-3xl font-extrabold text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
                        <span>X: {NETHER_COORDS.x}</span>
                        <span className="text-red-900/80 font-normal">|</span>
                        <span>Y: {NETHER_COORDS.y}</span>
                        <span className="text-red-900/80 font-normal">|</span>
                        <span>Z: {NETHER_COORDS.z}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyCoords}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer flex-shrink-0"
                    >
                      {copiedCoords ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Cords
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hologram Lore Note */}
                  <div className="mt-6 p-3.5 rounded-xl bg-red-950/30 border border-red-500/20 flex items-start gap-3">
                    <span className="text-base leading-none select-none flex-shrink-0 mt-0.5">📍</span>
                    <p className="text-xs text-red-200/85 leading-relaxed">
                      <strong className="text-red-400 font-semibold">Nether Hologram:</strong>{' '}
                      Head to these exact coordinates in the Nether dimension. An in-game floating hologram is placed at this spot containing the link to the chest hunt destination!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  )
}
