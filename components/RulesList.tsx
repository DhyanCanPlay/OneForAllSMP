'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const rules = [
  { id: 1, title: 'No Griefing', description: "Don't destroy or steal from other players' builds or chests." },
  { id: 2, title: 'No Hacking', description: 'No hacked clients, X-ray, or game-breaking exploits of any kind.' },
  { id: 3, title: 'Respect Players', description: 'Treat every player with respect. Harassment of any kind is not tolerated.' },
  { id: 4, title: 'No Toxicity', description: 'Keep chat friendly and constructive. Toxic behavior leads to an immediate ban.' },
]

export default function RulesList() {
  return (
    <section id="rules" className="py-24 px-6 bg-card/30 border-y border-border/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-3"
          >
            Server Rules
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-foreground text-balance"
          >
            Play <span className="text-primary">Fair</span>. Grow Together.
          </motion.h2>
        </div>

        {/* Rules list */}
        <div className="flex flex-col gap-4">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-start gap-5 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-mono text-primary/60 text-sm mt-0.5 w-6 flex-shrink-0">
                  {String(rule.id).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-bold text-foreground mb-0.5">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rule.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
