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
  ExternalLink,
  Check,
  Copy,
} from 'lucide-react'

export default function DownloadPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false)
  const [personalZipDownloaded, setPersonalZipDownloaded] = useState<boolean>(false)
  const [copied, setCopied] = useState(false)

  const handleDownload = async (e: React.FormEvent) => {
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

      const response = await fetch('https://downloadworld.oneforall.social', {
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
          setError(errorMsg || `Failed to download (Error ${response.status}).`)
        }
        setLoading(false)
        return
      }

      // Download the personalized user bundle
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `${username.trim()}_data.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(downloadUrl)

      setPersonalZipDownloaded(true)
      setDownloadSuccess(true)
    } catch (err: any) {
      setError(err?.message || 'Network error occurred while connecting to download edge.')
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
              Authenticate with your in-game username & password to receive your singleplayer player data and world save.
            </p>
          </div>

          {!downloadSuccess ? (
            /* Auth Form Card */
            <div className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <form onSubmit={handleDownload} className="space-y-4">
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
                        <span>Verifying & Generating Player Data...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Authenticate & Download Data</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Info Notice */}
              <div className="border-t border-border/50 pt-5 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Personalized Backup Highlights:</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                  <li>Your complete inventory, armor, and ender chest.</li>
                  <li>All your AxVaults converted into Shulker Boxes.</li>
                  <li>Singleplayer `/trigger vault` menu included.</li>
                </ul>
                <div className="p-3 bg-secondary/30 rounded-lg flex items-center gap-2 text-[11px] text-muted-foreground/80">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Downloads are capped at <strong>2 downloads per account</strong>.</span>
                </div>
              </div>
            </div>
          ) : (
            /* Success & 2-Step Download Manager Card */
            <div className="bg-card/50 border border-primary/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 animate-in fade-in-50">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h3 className="font-bold text-base">Authentication Successful!</h3>
                  <p className="text-xs text-muted-foreground">Welcome back, {username}. Follow the steps below to play.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1: Base World Download */}
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 1</span>
                    <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-semibold">6.76 GB</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Download Base World Save</h4>
                  <p className="text-xs text-muted-foreground">
                    Contains the full server terrain, Overworld, Nether, End, all builds, and structures.
                  </p>
                  <div className="pt-1">
                    <a
                      href="https://world.oneforall.social/base_world.zip"
                      download="base_world.zip"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Base World (.zip)</span>
                    </a>
                  </div>
                </div>

                {/* Step 2: Player Data Download */}
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 2</span>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold">Downloaded ✓</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Your Player Data ({username}_data.zip)</h4>
                  <p className="text-xs text-muted-foreground">
                    Contains your personalized <code className="text-primary font-mono">level.dat</code>, stats, and achievements.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Click here if download didn't start automatically
                  </button>
                </div>

                {/* Step 3: Installation Instructions */}
                <div className="p-4 rounded-xl bg-secondary/20 border border-border/40 space-y-2 text-xs text-muted-foreground">
                  <h5 className="font-bold text-foreground flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-primary" />
                    <span>How to Install in Singleplayer:</span>
                  </h5>
                  <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
                    <li>
                      Extract <code className="text-foreground font-mono">base_world.zip</code> into your Minecraft saves folder:
                      <div className="mt-1.5 flex items-center gap-2">
                        <code className="bg-background px-2.5 py-1 rounded text-[11px] text-foreground font-mono select-all">
                          %appdata%\.minecraft\saves\OneForAll_World
                        </code>
                        <button
                          onClick={copyPath}
                          className="p-1 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-all"
                          title="Copy path"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </li>
                    <li>
                      Extract <code className="text-foreground font-mono">{username}_data.zip</code> directly into that same folder (click <strong>Replace</strong> when asked to overwrite <code className="text-primary font-mono">level.dat</code>).
                    </li>
                    <li>
                      Launch Minecraft <strong>1.21.x</strong>, open Singleplayer, and enjoy your world!
                    </li>
                  </ol>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setDownloadSuccess(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Download for a different account
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
