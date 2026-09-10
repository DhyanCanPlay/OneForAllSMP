'use client'

import useSWR from 'swr'
import { motion } from 'framer-motion'
import { Users, Wifi, WifiOff, Server, Wrench } from 'lucide-react'

interface ServerStatus {
  online: boolean
  maintenance?: boolean
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
  const maintenance = online && data?.maintenance

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
              {/* Online/Offline/Maintenance banner */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      maintenance ? 'bg-amber-500 animate-pulse' :
                      online ? 'bg-primary animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  <span className={`font-bold text-lg ${
                    maintenance ? 'text-amber-500' :
                    online ? 'text-primary' : 'text-red-400'
                  }`}>
                    {maintenance ? 'Maintenance' : online ? 'Online' : 'Offline'}
                  </span>
                </div>
                {maintenance ? (
                  <Wrench className="w-5 h-5 text-amber-500" />
                ) : online ? (
                  <Wifi className="w-5 h-5 text-primary" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-400" />
                )}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

               
                {/* IP */}
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary border border-border">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary font-mono font-bold text-[10px]">IP</div>
                  <span className="text-sm font-mono font-bold text-primary text-center break-words">
                    {'play.oneforall.social'}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Address</span>
                </div>
              </div>

              {/* Add to Bedrock Action */}
              <div className="mt-8 flex justify-center">
                <a
                  href="minecraft://?addExternalServer=One%20For%20All|play.oneforall.social:5358"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors"
                >
                  Add to Bedrock
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </a>
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
