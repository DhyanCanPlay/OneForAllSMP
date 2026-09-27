'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import {
  Download,
  KeyRound,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  HardDrive,
  FolderDown,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react'

export default function DownloadPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState<boolean>(false)
  const [personalBlobUrl, setPersonalBlobUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username.trim()) {
      setError('Please enter your Minecraft in-game username.')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('username', username.trim())
      formData.append('password', password)

      // Validate with Oracle Backend API
      const response = await fetch('http://api.oneforall.social:8000/api/player-bundle', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        let errorMsg = ''
        try {
          const jsonErr = await response.json()
          errorMsg = jsonErr.detail || ''
        } catch {
          errorMsg = await response.text()
        }

        if (response.status === 404) {
          setError(`Username "${username}" was not found in the server player database.`)
        } else if (response.status === 403) {
          setError('Invalid in-game password. Please enter the password you used to login on the server.')
        } else if (response.status === 429) {
          setError('Download limit reached. You can only download your world save twice.')
        } else {
          setError(errorMsg || `Authentication error (Status ${response.status}).`)
        }
        setLoading(false)
        return
      }

      // Download personal player data (~11 KB)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setPersonalBlobUrl(url)

      // Auto trigger the personal data file
      const a = document.createElement('a')
      a.href = url
      a.download = `${username.trim()}_data.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()

      setAuthSuccess(true)
    } catch (err: any) {
      setError('Unable to reach authentication server. Please check your connection.')
    } finally {
      setLoading(false)
    }
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
              <span>World & Player Data Download</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Download Your World Save
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Enter your in-game username & password to download the complete world save with your exact player inventory and vaults.
            </p>
          </div>

          {!authSuccess ? (
            /* Auth Form Card */
            <div className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <form onSubmit={handleAuth} className="space-y-4">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>Minecraft In-Game Nickname</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Steve or .BedrockName"
                    disabled={loading}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your in-game password"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
                  />
                </div>

                {/* Error Box */}
                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm leading-relaxed animate-in fade-in-50">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg hover:bg-primary/90 glow-green transition-all transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Account Credentials...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Unlock & Download World Save</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Info Notice */}
              <div className="border-t border-border/50 pt-5 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>World Save Package:</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                  <li>Full 6.8 GB world with Overworld, Nether, and End.</li>
                  <li>Your exact inventory, armor, health, and location.</li>
                  <li>AxVaults packed into Shulker Boxes inside your Ender Chest.</li>
                </ul>
                <div className="p-3 bg-secondary/30 rounded-lg flex items-center gap-2 text-[11px] text-muted-foreground/80">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Notice: Downloads are capped at <strong>2 downloads per account</strong>.</span>
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated Success & Direct Fast Download Screen */
            <div className="bg-card/50 border border-primary/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 animate-in fade-in-50">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h3 className="font-bold text-base">Account Verified: {username}</h3>
                  <p className="text-xs text-muted-foreground">Your world save is unlocked and ready to download.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Direct High-Speed Download Card */}
                <div className="p-5 rounded-xl bg-secondary/40 border border-primary/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Full World Save</span>
                    <span className="text-[11px] bg-primary/20 text-primary px-2 py-0.5 rounded font-mono font-bold">6.76 GB (Direct CDN)</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">One For All SMP — Singleplayer World</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    High-speed direct download from Cloudflare R2 edge network. Zero memory limits or browser crashes.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://world.oneforall.social/base_world.zip"
                      download={`${username}_world.zip`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 glow-green transition-all shadow active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Full World ZIP (6.76 GB)</span>
                    </a>

                    {personalBlobUrl && (
                      <a
                        href={personalBlobUrl}
                        download={`${username}_data.zip`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-all"
                      >
                        <FolderDown className="w-4 h-4" />
                        <span>Re-download Player Data (11 KB)</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Quick 2-Step Play Instructions */}
                <div className="p-5 rounded-xl bg-secondary/20 border border-border/40 space-y-3 text-xs text-muted-foreground">
                  <h5 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-primary" />
                    <span>How to Install & Play:</span>
                  </h5>
                  <ol className="list-decimal list-inside space-y-2 pl-1 leading-relaxed">
                    <li>
                      Extract the world ZIP into your Minecraft saves directory:
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
                      Open Minecraft <strong>1.21.x</strong>, go to <strong>Singleplayer</strong>, and select <strong>OneForAll_World</strong>.
                    </li>
                    <li>
                      All your items, armor, and Ender Chest AxVaults will load automatically!
                    </li>
                  </ol>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setAuthSuccess(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Authenticate with a different account
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
