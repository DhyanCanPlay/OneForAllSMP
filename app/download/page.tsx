'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import {
  Download,
  KeyRound,
  User,
  AlertCircle,
  CheckCircle2,
  HardDrive,
  FolderDown,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  Check,
  Copy,
} from 'lucide-react'

export default function DownloadPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    if (!username.trim()) {
      e.preventDefault()
      return
    }
    // Set UI state to show download instructions
    setDownloadStarted(true)
    // The native HTML form submission streams the 6.8 GB file directly
    // to the browser's download manager with zero memory limits!
  }

  const copyPath = () => {
    navigator.clipboard.writeText('%appdata%\\.minecraft\\saves')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <Image
              src="/images/logo.png"
              alt="One For All SMP"
              width={34}
              height={34}
              className="rounded-full ring-1 ring-primary/30"
            />
            <span>
              ONE <span className="text-primary">FOR ALL</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <FolderDown className="w-3.5 h-3.5" />
              <span>1-Click Singleplayer World Download</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Download Your World Save
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Authenticate with your in-game username & password to download a complete, singleplayer-ready world zip with your exact gear and vaults.
            </p>
          </div>

          {/* Form Card (Direct Browser Native Stream) */}
          <div className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <form
              ref={formRef}
              action="https://downloadworld.oneforall.social"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Username */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>Minecraft In-Game Nickname</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Steve or .BedrockName"
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-primary" />
                    <span>In-Game /login Password</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground/60">
                    Leave blank if Bedrock / No Password
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your in-game password"
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg hover:bg-primary/90 glow-green transition-all transform active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete World ZIP (~6.8 GB)</span>
                </button>
              </div>
            </form>

            {/* Post-Submit / Download Status & Instructions */}
            {downloadStarted && (
              <div className="p-5 rounded-xl bg-secondary/30 border border-primary/40 space-y-4 text-xs text-muted-foreground animate-in fade-in-50">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Download initiated in your browser!</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your browser is streaming <code className="text-foreground font-mono font-bold">{username.trim()}_world.zip</code> (~6.8 GB). Check your browser's download manager for progress.
                </p>

                <div className="border-t border-border/50 pt-3 space-y-2">
                  <h5 className="font-bold text-foreground flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-primary" />
                    <span>How to Install Once Downloaded:</span>
                  </h5>
                  <ol className="list-decimal list-inside space-y-2 pl-1 leading-relaxed">
                    <li>
                      Extract the downloaded ZIP into your Minecraft saves folder:
                      <div className="mt-1.5 flex items-center gap-2">
                        <code className="bg-background px-3 py-1.5 rounded-lg text-xs text-foreground font-mono select-all border border-border">
                          %appdata%\.minecraft\saves\OneForAll_World
                        </code>
                        <button
                          type="button"
                          onClick={copyPath}
                          className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer border border-border"
                          title="Copy path"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </li>
                    <li>
                      Open Minecraft <strong>1.21.x</strong>, go to <strong>Singleplayer</strong>, and click <strong>OneForAll_World</strong>.
                    </li>
                    <li>
                      Your inventory, armor, and Ender Chest AxVaults will load automatically!
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Info Highlights */}
            <div className="border-t border-border/50 pt-5 space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>All-In-One ZIP Highlights:</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                <li>Single 1-click ZIP file (<code className="font-mono text-primary">&#123;username&#125;_world.zip</code>).</li>
                <li>Injected with your exact inventory, armor, and coordinates.</li>
                <li>AxVaults converted into Shulker Boxes in your Ender Chest.</li>
                <li>Overworld, Nether, and End dimensions included.</li>
              </ul>
              <div className="p-3 bg-secondary/30 rounded-lg flex items-center gap-2 text-[11px] text-muted-foreground/80">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Notice: Downloads are capped at <strong>2 downloads per account</strong>.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
