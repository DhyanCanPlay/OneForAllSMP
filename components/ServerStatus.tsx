'use client'

import useSWR from 'swr'
import { motion } from 'framer-motion'
import { Users, Wifi, WifiOff, Server } from 'lucide-react'

interface ServerStatus {
  online: boolean
  players: { online: number; max: number }
  version: string
  motd: string
  ip: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ServerStatus() {
  const { data, isLoading, error } = useSWR<ServerStatus>('/api/status', fetcher, {
    refreshInterval: 30_000,
  })

  const online = !error && data?.online

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-sm tracking-widest uppercase mb-3"
        >
          Live Status
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground"
        >
          Server <span className="text-primary">Status</span>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="rounded-2xl bg-card border border-border p-8">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3 text-muted-foreground py-4">
              <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
              <span className="text-sm">Checking server status...</span>
            </div>
          ) : (
            <>
              {/* Online/Offline banner */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      online ? 'bg-primary animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  <span className={`font-bold text-lg ${online ? 'text-primary' : 'text-red-400'}`}>
                    {online ? 'Online' : 'Offline'}
                  </span>
                </div>
                {online ? (
                  <Wifi className="w-5 h-5 text-primary" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-400" />
                )}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Players */}
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary border border-border">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-extrabold text-foreground font-mono">
                    {data?.players.online ?? '—'}
                    <span className="text-muted-foreground text-base font-normal">
                      /{data?.players.max ?? '—'}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Players</span>
                </div>

                {/* Version */}
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary border border-border">
                  <Server className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-foreground text-center">
                    {data?.version ?? '—'}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Version</span>
                </div>

                {/* IP */}
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary border border-border">
                  <div className="w-5 h-5 text-primary font-mono font-bold text-xs flex items-center">IP</div>
                  <span className="text-sm font-mono font-bold text-primary text-center break-all">
                    {data?.ip ?? 'play.oneforall.social'}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Address</span>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Auto-refreshes every 30 seconds
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  )
}
