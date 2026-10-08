import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { Archive, ExternalLink, FolderArchive, Sparkles } from 'lucide-react'

const ARCHIVES = [
  {
    title: 'One For All',
    subtitle: 'Season One',
    description:
      'The world where it all began — original spawns, first bases, and the builds that started the community.',
    href: 'https://drive.google.com/drive/folders/1m2XZ5hPNDf8qbgzRDfvPOFClV4FFCVC9?usp=drive_link',
  },
  {
    title: 'One For All Revived',
    subtitle: 'World Archive',
    description:
      'The revived world full of comeback builds, new towns, and another chapter of memories with the community.',
    href: 'https://drive.google.com/drive/folders/1LqnVMIFvNmBC9TFBC89h3ORHcoNPqxsN?usp=drive_link',
  },
]

export default function ArchivesPage() {
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
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all active:scale-95 shadow-xs"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-10 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
            <Archive className="w-4 h-4" />
            <span>World Archives</span>
          </div>

          {/* Title & Message */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              One For All <span className="text-primary text-glow">Archives</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every world we have played, preserved forever. Download the complete
              singleplayer world saves and revisit the builds, towns, and memories
              whenever you want.
            </p>
          </div>

          {/* Archive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {ARCHIVES.map((archive) => (
              <div
                key={archive.title}
                className="group bg-card/40 border border-border/60 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-4 transition-all hover:border-primary/40 hover:bg-card/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-primary">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 border border-border/60 px-2 py-1 rounded">
                    {archive.subtitle}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-black tracking-tight">
                    {archive.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {archive.description}
                  </p>
                </div>

                <a
                  href={archive.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs tracking-wide shadow-lg hover:bg-primary/90 glow-green transition-all transform active:scale-95"
                >
                  <span>Open World Archive</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            ))}
          </div>

          {/* Next season note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/60 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Next season coming soon — stay tuned!</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
