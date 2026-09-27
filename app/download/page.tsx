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
} from 'lucide-react'

export default function DownloadPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedUser = username.trim()
    if (!trimmedUser) {
      setError('Please enter your Minecraft in-game username.')
      return
    }

    setLoading(true)

    try {
      // 1. Verify credentials first with Oracle backend API
      const formData = new FormData()
      formData.append('username', trimmedUser)
      formData.append('password', password)

      const verifyRes = await fetch('http://api.oneforall.social:8000/api/player-bundle', {
        method: 'POST',
        body: formData,
      })

      if (!verifyRes.ok) {
        let errorMsg = ''
        try {
          const jsonErr = await verifyRes.json()
          errorMsg = jsonErr.detail || ''
        } catch {
          errorMsg = await verifyRes.text()
        }

        if (verifyRes.status === 404) {
          setError(`Username "${trimmedUser}" was not found in the player database.`)
        } else if (verifyRes.status === 403) {
          setError('Invalid in-game password. Please enter the password you used to login on the server.')
        } else if (verifyRes.status === 429) {
          setError('Download limit reached. You can only download your world save twice.')
        } else {
          setError(errorMsg || `Authentication error (Status ${verifyRes.status}).`)
        }
        setLoading(false)
        return
      }

      // 2. Build direct single-file stream URL (Entire 6.76 GB in ONE ZIP file)
      const directStreamUrl = `https://downloadworld.oneforall.social?username=${encodeURIComponent(trimmedUser)}&password=${encodeURIComponent(password)}`
      setDownloadUrl(directStreamUrl)

      // 3. Trigger direct browser download of the full 6.76 GB world ZIP
      const downloadLink = document.createElement('a')
      downloadLink.href = directStreamUrl
      downloadLink.download = `${trimmedUser}_world.zip`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()

      setDownloadSuccess(true)
    } catch (err: any) {
      setError('Unable to reach server. Please check your internet connection.')
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
              <span>1-Click Singleplayer World Download</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Download Your World Save
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Authenticate with your in-game username & password to download your complete 6.76 GB singleplayer-ready world zip with all your gear and vaults.
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
                        <span>Verifying & Starting Full 6.8 GB Stream...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Complete World ZIP (6.76 GB)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Info Notice */}
              <div className="border-t border-border/50 pt-5 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Single File ZIP Highlights:</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                  <li>Single 1-click ZIP file (<code className="font-mono text-primary">&#123;username&#125;_world.zip</code>) containing everything.</li>
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
          ) : (
            /* Download Started / Success Card */
            <div className="bg-card/50 border border-primary/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 animate-in fade-in-50">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h3 className="font-bold text-base">Download Started!</h3>
                  <p className="text-xs text-muted-foreground">Streaming full 6.76 GB file <code className="text-foreground font-mono font-bold">{username.trim()}_world.zip</code> to your browser.</p>
                </div>
              </div>

              {/* Drag & Drop Instructions */}
              <div className="p-5 rounded-xl bg-secondary/30 border border-border/60 space-y-4 text-xs text-muted-foreground">
                <h5 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-primary" />
                  <span>How to Play (Drag & Drop):</span>
                </h5>
                <ol className="list-decimal list-inside space-y-2.5 pl-1 leading-relaxed">
                  <li>
                    Extract the downloaded <code className="text-primary font-mono font-bold">{username.trim()}_world.zip</code> directly into your Minecraft saves folder:
                    <div className="mt-2 flex items-center gap-2">
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
                    Open Minecraft <strong>1.21.x</strong>, select <strong>Singleplayer</strong>, and click <strong>OneForAll_World</strong>.
                  </li>
                  <li>
                    All your inventory items, armor, and Ender Chest AxVaults will load automatically!
                  </li>
                </ol>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download={`${username.trim()}_world.zip`}
                    className="text-primary hover:underline font-semibold"
                  >
                    Click here if download didn't start
                  </a>
                )}
                <button
                  onClick={() => setDownloadSuccess(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Download for another account
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
