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
} from 'lucide-react'

export default function DownloadPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

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
        const errorText = await response.text()
        // Format common error messages
        if (response.status === 404) {
          setError(`Username "${username}" was not found in the server player database.`)
        } else if (response.status === 403) {
          setError('Invalid in-game password. Please enter the password you used to login on the server.')
        } else if (response.status === 429) {
          setError('Download limit reached. You can only download your world save twice.')
        } else {
          setError(errorText || `Failed to download world (Error ${response.status}).`)
        }
        setLoading(false)
        return
      }

      // Trigger direct file download from stream
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `${username.trim()}_world.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(downloadUrl)

      setSuccess(`Your personalized world archive (${username.trim()}_world.zip) has been downloaded successfully!`)
    } catch (err: any) {
      setError(err?.message || 'Network error occurred while connecting to download edge.')
    } finally {
      setLoading(false)
    }
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

      {/* Main Download Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20">
        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Title & Introduction */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <FolderDown className="w-3.5 h-3.5" />
              <span>Personalized World Export</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Download Your World Save
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Enter your in-game credentials to generate a singleplayer archive with your exact inventory, ender chest, and AxVaults.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <form onSubmit={handleDownload} className="space-y-4">
              {/* Username field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>Minecraft In-Game Nickname</span>
                </label>
                <div className="relative">
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
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-primary" />
                    <span>In-Game Login Password</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground/60">
                    Leave blank if Bedrock / No Password
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your in-game /login password"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm leading-relaxed animate-in fade-in-50">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm leading-relaxed animate-in fade-in-50">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg hover:bg-primary/90 glow-green transition-all transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Merging & Streaming World (~6.8 GB)...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Authenticate & Download World</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Tips / Instructions */}
            <div className="border-t border-border/50 pt-5 space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>What's inside your download:</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                <li>Complete Overworld, Nether, and End dimensions.</li>
                <li>Your inventory, armor, health, coordinates, and stats.</li>
                <li>Your AxVaults packed into Shulker Boxes inside your Ender Chest.</li>
                <li>Works on Vanilla 1.21.x singleplayer (No mods required).</li>
              </ul>
              <div className="p-3 bg-secondary/30 rounded-lg flex items-center gap-2 text-[11px] text-muted-foreground/80">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Notice: Downloads are capped at <strong>2 downloads per player</strong> to preserve bandwidth.</span>
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
