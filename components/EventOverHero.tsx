'use client'

import { motion } from 'framer-motion'
import { PartyPopper, Sword, MapPin, Crown, Sparkles } from 'lucide-react'

function PixelBlock({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`absolute ${className}`}
    />
  )
}

function FloatingItem({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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

export default function EventOverHero() {
  return (
    <section id="event" className="relative py-28 px-6 overflow-hidden">
      {/* Floating pixel shapes */}
      <PixelBlock delay={0.1} className="top-10 left-[8%] w-6 h-6 bg-emerald-500/20 rotate-12 border border-emerald-500/30 hidden lg:block" />
      <PixelBlock delay={0.2} className="top-24 right-[12%] w-4 h-4 bg-emerald-600/25 -rotate-6 border border-emerald-600/20 hidden lg:block" />
      <PixelBlock delay={0.15} className="bottom-16 left-[15%] w-5 h-5 bg-amber-500/20 rotate-45 border border-amber-500/25 hidden lg:block" />
      <PixelBlock delay={0.25} className="bottom-20 right-[8%] w-7 h-7 bg-emerald-400/15 -rotate-12 border border-emerald-400/20 hidden lg:block" />
      <PixelBlock delay={0.3} className="top-1/2 left-[5%] w-3 h-3 bg-amber-400/20 rotate-90 border border-amber-400/20 hidden lg:block" />
      <PixelBlock delay={0.18} className="top-1/3 right-[6%] w-5 h-5 bg-emerald-300/15 rotate-[30deg] border border-emerald-300/20 hidden lg:block" />

      {/* Cross pattern accents */}
      <div className="absolute top-8 right-[20%] text-emerald-500/10 text-6xl font-black select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute bottom-12 left-[20%] text-emerald-500/10 text-6xl font-black select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Floating icons */}
        <div className="relative mb-6">
          <FloatingItem className="absolute -top-2 left-1/2 -translate-x-[120px] hidden md:block" delay={0.3}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
              <Sword className="w-6 h-6 text-emerald-400" />
            </div>
          </FloatingItem>
          <FloatingItem className="absolute -top-2 left-1/2 translate-x-[80px] hidden md:block" delay={0.4}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
          </FloatingItem>
          <FloatingItem className="absolute -top-2 left-1/2 translate-x-[180px] hidden md:block" delay={0.5}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
              <Crown className="w-6 h-6 text-emerald-300" />
            </div>
          </FloatingItem>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest uppercase mb-6"
        >
          <PartyPopper className="w-3.5 h-3.5" />
          Event Concluded
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-6xl font-extrabold text-foreground text-glow mb-4 text-balance"
        >
          Treasure Hunt is{' '}
          <span className="text-primary">Over</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto text-pretty mb-10"
        >
          Thanks to everyone who participated! The Nether waypoint has been claimed and the chest has been found.
        </motion.p>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 rounded-xl bg-[#5865F2]/20 blur-xl pointer-events-none" />
          <a
            href="https://discord.gg/oneforall"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-base transition-all shadow-lg shadow-[#5865F2]/25 hover:shadow-[#5865F2]/40 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
            </svg>
            Join us on Discord for the next event
            <Sparkles className="w-4 h-4" />
          </a>
        </motion.div>

        {/* See you soon */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-8 text-sm text-muted-foreground/60 font-mono"
        >
          Stay tuned — more events coming soon
        </motion.p>
      </div>
    </section>
  )
}
