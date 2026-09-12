'use client'

import { motion } from 'framer-motion'
import { PartyPopper, Sword, Lock, ArrowRight, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function PixelBlock({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`absolute ${className}`}
    />
  )
}

function FloatingItem({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function KeyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <section className="relative flex-1 flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Background shapes */}
        <PixelBlock delay={0.1} className="top-16 left-[10%] w-6 h-6 bg-amber-500/15 rotate-12 border border-amber-500/20 hidden lg:block" />
        <PixelBlock delay={0.2} className="top-28 right-[14%] w-4 h-4 bg-emerald-500/15 -rotate-6 border border-emerald-500/20 hidden lg:block" />
        <PixelBlock delay={0.15} className="bottom-20 left-[12%] w-5 h-5 bg-amber-500/15 rotate-45 border border-amber-500/20 hidden lg:block" />
        <PixelBlock delay={0.25} className="bottom-28 right-[10%] w-7 h-7 bg-emerald-400/10 -rotate-12 border border-emerald-400/15 hidden lg:block" />
        <PixelBlock delay={0.3} className="top-1/2 left-[6%] w-3 h-3 bg-amber-400/15 rotate-90 border border-amber-400/15 hidden lg:block" />

        <div className="absolute top-8 right-[22%] text-emerald-500/10 text-6xl font-black select-none pointer-events-none hidden lg:block">+</div>
        <div className="absolute bottom-16 left-[18%] text-amber-500/10 text-6xl font-black select-none pointer-events-none hidden lg:block">+</div>

        <div className="max-w-lg w-full text-center">
          {/* Floating icons */}
          <div className="relative mb-6">
            <FloatingItem className="absolute -top-2 left-1/2 -translate-x-[100px] hidden md:block" delay={0.3}>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <Sword className="w-6 h-6 text-amber-400" />
              </div>
            </FloatingItem>
            <FloatingItem className="absolute -top-2 left-1/2 translate-x-[60px] hidden md:block" delay={0.4}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                <Lock className="w-6 h-6 text-emerald-400" />
              </div>
            </FloatingItem>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
              <PartyPopper className="w-3.5 h-3.5" />
              Event Concluded
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-glow mb-3">
              Secret Key
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-6">
              This event has ended. The cipher has been decrypted and the chest has been found.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative rounded-2xl bg-card/90 backdrop-blur-xl border border-border/80 shadow-2xl overflow-hidden mb-8"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-secondary/30 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground/60" />
                <span>event_payload.bin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                <span>CONCLUDED</span>
              </div>
            </div>

            <div className="p-7 md:p-10 text-center">
              <div className="mb-2 flex justify-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  <Sword className="w-6 h-6" />
                </div>
              </div>

              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 my-3">
                Cipher Text
              </p>

              <div className="relative py-6 sm:py-8 px-4 sm:px-6 min-h-[96px] sm:min-h-[116px] rounded-xl bg-background/80 border border-border/60 mb-8 flex items-center justify-center">
                <p className="font-mono text-base sm:text-2xl md:text-3xl font-bold tracking-wider text-amber-500/50 select-all inline-block leading-normal line-through decoration-amber-500/30">
                  ••••-••••-••••-•••••••
                </p>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                The key was <span className="font-mono font-semibold text-foreground">SMP-EVENT-2026-NOTAPICK</span>
              </p>

              <a
                href="https://discord.gg/oneforall"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-sm transition-all shadow-lg shadow-[#5865F2]/25 hover:shadow-[#5865F2]/40"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
                Join Discord for next event
                <Sparkles className="w-4 h-4" />
              </a>
            </div>

            <div className="px-6 py-3 bg-secondary/20 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>STATUS: CONCLUDED</span>
              <span>ONE FOR ALL SMP</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
