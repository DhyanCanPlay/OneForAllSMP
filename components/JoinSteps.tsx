'use client'

import { motion } from 'framer-motion'
import { Monitor, List, PlusCircle, LogIn, Link2 } from 'lucide-react'

const SERVER_IP = 'play.oneforall.social'

const steps = [
  {
    number: '01',
    icon: Monitor,
    title: 'Open Minecraft',
    description: 'Launch Minecraft Java Edition (1.21.x–26.1.x) or Bedrock (Latest).',
  },
  {
    number: '02',
    icon: List,
    title: 'Go to Multiplayer',
    description: 'From the main menu, click the "Multiplayer" button to access the server browser.',
  },
  {
    number: '03',
    icon: PlusCircle,
    title: 'Add Server',
    description: 'Click "Add Server" and enter a name like "One For All SMP" in the name field.',
  },
  {
    number: '04',
    icon: LogIn,
    title: 'Enter IP & Join',
    description: (
      <>
        Enter{' '}
        <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">
          {SERVER_IP}
        </span>{' '}
        as the server address, save, and click Join Server.
      </>
    ),
  },
  {
    number: '05',
    icon: Link2,
    title: 'Link Your Discord',
    description: (
      <>
        In our{' '}
        <a
          href="https://discord.com/channels/1471609304950898802/1487212540306915572"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5865F2] hover:underline"
        >
          #link-account channel
        </a>
        , follow the instructions there to connect your Minecraft account for roles and perks.
      </>
    ),
  },
]

export default function JoinSteps() {
  return (
    <section id="join" className="py-24 px-6 bg-card/30 border-y border-border/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-3"
          >
            Get Started
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-foreground text-balance"
          >
            How to <span className="text-primary">Join</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLastOdd = i === steps.length - 1 && steps.length % 2 !== 0
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors${isLastOdd ? ' md:col-span-2 md:max-w-md md:mx-auto md:w-full' : ''}`}
              >
                {/* Step icon + number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* IP callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground text-sm mb-2">Server Address</p>
          <p className="font-mono text-xl font-bold text-primary tracking-wide text-glow">
            {SERVER_IP}
          </p>
        </motion.div>
        {/* Bedrock quick-add button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <a
            href="minecraft://?addExternalServer=One%20For%20All|play.oneforall.social:19132"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors"
          >
            Add to Bedrock
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
