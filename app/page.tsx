import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { Download, Sparkles, Server, HardDrive, ArrowRight, Construction } from 'lucide-react'

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
            href="/download"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all active:scale-95 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download World</span>
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
            <Construction className="w-4 h-4 animate-bounce" />
            <span>Under Construction</span>
          </div>

          {/* Main Title & Message */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Thank You for Playing on <br />
              <span className="text-primary text-glow">One For All SMP</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our server season has officially concluded. To all 552 players who built towns, conquered dungeons, and forged friendships — thank you for being a part of this journey.
            </p>
          </div>

          {/* Download Callout Card */}
          <div className="bg-card/40 border border-border/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>World Archive Available</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can now download the complete singleplayer world save customized with your exact player inventory, armor, stats, and AxVaults ready to play.
            </p>
            <div className="pt-2">
              <Link
                href="/download"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg hover:bg-primary/90 glow-green transition-all transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Go to Download Page</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground/80 pt-2">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-primary" />
              <span>Full 6.8 GB World Save</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-primary" />
              <span>Overworld • Nether • End</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Minecraft 1.21.x Ready</span>
            </div>
          </div>
        </div>
      </main>

      {/* Watermark Footer */}
      <Footer />
    </div>
  )
}
