import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/20 bg-card/30 pt-14 pb-8 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Info & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-amber-500/10">
          {/* Col 1: Branding & Description */}
          <div className="md:col-span-6 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-foreground w-fit group"
            >
              <Image
                src="https://www.oneforall.social/images/logo.png"
                alt="One For All SMP"
                width={32}
                height={32}
                className="rounded-full ring-1 ring-amber-400/40"
              />
              <span>
                ONE <span className="text-amber-400 font-extrabold group-hover:text-amber-300 transition-colors">FOR ALL</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              One For All — Grow Together. Thank you to everyone who built, explored, and shared their journey on our SMP.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 pt-1">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>World Archive & Player Data Live</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-amber-400 font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-muted-foreground hover:text-amber-400 font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Download World</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded font-bold border border-amber-400/30">6.8 GB</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://discord.gg/oneforall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5865F2] hover:text-[#7289da] font-medium transition-colors"
                >
                  Discord Server
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Bold Branding Watermark Text in Golden */}
        <div className="pt-10 sm:pt-14 pb-4 text-center select-none overflow-hidden">
          <h2 className="text-[14vw] md:text-[12vw] lg:text-[140px] font-black tracking-tighter leading-none text-amber-400/5 hover:text-amber-400/20 transition-colors duration-300 uppercase font-sans">
            ONE FOR ALL
          </h2>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-4 border-t border-amber-500/10 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} One For All SMP. Built for the community.
          </p>
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  )
}
