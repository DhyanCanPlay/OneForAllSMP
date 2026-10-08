import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { Sparkles, Server, HardDrive, PartyPopper, HeartHandshake, Archive } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <Image
              src="https://www.oneforall.social/images/logo.png"
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
            href="/archives"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all active:scale-95 shadow-xs"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Archives</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 md:py-24 text-center relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <PartyPopper className="w-4 h-4" />
            <span>Season Concluded</span>
          </div>

          {/* Main Title & Message */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Thank You for Playing on <br />
              <span className="text-primary text-glow">One For All SMP</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our latest season has officially concluded. To all 552 players who built towns, conquered dungeons, and forged friendships — thank you for being a part of this journey.
            </p>
          </div>

          {/* Thank You Callout Card */}
          <div className="bg-card/40 border border-border/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <HeartHandshake className="w-4 h-4" />
              <span>Thank You For Trusting Us</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for trusting us and downloading the world — the download window is now closed. The next season is coming soon, and we can&apos;t wait to build with you again!
            </p>
            <div className="pt-2">
              <a
                href="https://discord.gg/oneforall"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm tracking-wide shadow-lg transition-all transform active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" /></svg>
                <span>Join Discord for News</span>
              </a>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground/80 pt-2">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-primary" />
              <span>World Safely Archived</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-primary" />
              <span>Overworld • Nether • End</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Next Season Coming Soon</span>
            </div>
          </div>
        </div>
      </main>

      {/* Watermark Footer */}
      <Footer />
    </div>
  )
}
