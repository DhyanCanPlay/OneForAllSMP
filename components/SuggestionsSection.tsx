'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wrench, BookOpen, Link2, ExternalLink } from 'lucide-react'

const DISCORD_LINK = 'https://discord.oneforall.social'
const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScIKmfGQEoxR_Av0mbzuEmNVwIsxE_RxDrs1bN3jt5fHK56hg/viewform?embedded=true'

const tabs = [
  {
    id: 'bug',
    label: 'Bug & Suggestions',
    icon: Wrench,
    description:
      'Found a bug? Want to suggest a plugin or share your experience? Fill out this form and help us improve the SMP.',
  },
  {
    id: 'storyline',
    label: 'Storyline & Participation',
    icon: BookOpen,
    description:
      'Have an idea for the SMP story? Want to participate in the next arc? Submit your suggestion or application here.',
  },
]

export default function SuggestionsSection() {
  const [activeTab, setActiveTab] = useState<'bug' | 'storyline'>('bug')
  const activeTabData = tabs.find((t) => t.id === activeTab)!
  const Icon = activeTabData.icon

  return (
    <section id="suggest" className="py-24 px-6 bg-card/30 border-y border-border/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-3"
          >
            Community
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-foreground text-balance"
          >
            Suggest &amp; <span className="text-primary">Participate</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground mt-4 max-w-xl mx-auto text-pretty"
          >
            Your voice shapes the server. Report bugs, suggest features, or pitch your idea for the
            next SMP storyline.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left panel — tabs + Discord CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Tab buttons */}
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'bug' | 'storyline')}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 border-primary/40 text-foreground'
                      : 'bg-card border-border hover:border-border/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-primary/20' : 'bg-secondary'
                    }`}
                  >
                    <TabIcon
                      className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm mb-1 ${isActive ? 'text-foreground' : ''}`}>
                      {tab.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tab.description}
                    </p>
                  </div>
                </button>
              )
            })}

            {/* Discord Linking CTA */}
            <div className="mt-2 p-4 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/25 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                  <Link2 className="w-4 h-4 text-[#5865F2]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Discord Linking</p>
                  <p className="text-xs text-muted-foreground">Connect your Minecraft account</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To link your Minecraft account, join our Discord and visit the <b>#link-account</b> channel.
                Follow the instructions there to complete the linking process. Unlocks in-game roles, notifications, and exclusive perks.
              </p>
              <a
                href="https://discord.com/channels/1471609304950898802/1487212540306915572"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold transition-colors w-fit"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
                Go to #link-account
              </a>
            </div>

            {/* Open in new tab link */}
            <a
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLScIKmfGQEoxR_Av0mbzuEmNVwIsxE_RxDrs1bN3jt5fHK56hg/viewform'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open form in a new tab
            </a>
          </motion.div>

          {/* Right panel — embedded form */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3 rounded-xl overflow-hidden border border-border bg-card"
          >
            {/* Form header bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80">
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground truncate">
                {activeTabData.label}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">Google Forms</span>
            </div>
            <iframe
              src={FORM_URL}
              title={`${activeTabData.label} Form`}
              width="100%"
              height="640"
              className="block"
              style={{ border: 'none', background: '#ffffff' }}
              loading="lazy"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
