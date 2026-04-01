'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Shield,
  Users,
  Pickaxe,
  CalendarDays,
  RefreshCw,
} from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Public SMP',
    description: 'Open to everyone — no whitelisting, no pay-to-win. Just connect and survive.',
  },
  {
    icon: Shield,
    title: 'No Griefing',
    description: 'Your builds are protected. Anti-grief systems and active moderation keep things safe.',
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Hundreds of players, a thriving Discord, and a welcoming community waiting for you.',
  },
  {
    icon: Pickaxe,
    title: 'Survival Gameplay',
    description: 'Pure vanilla survival experience with quality-of-life plugins and no game-breaking mods.',
  },
  {
    icon: CalendarDays,
    title: 'Events & Collabs',
    description: 'Weekly community events, build competitions, and collab opportunities for all players.',
  },
  {
    icon: RefreshCw,
    title: 'Constant Updates',
    description: 'Always on the latest Minecraft version with regular content and feature updates.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-sm tracking-widest uppercase mb-3"
        >
          Why Join Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-balance"
        >
          Everything You Need to{' '}
          <span className="text-primary">Thrive</span>
        </motion.h2>
      </div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/5" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
