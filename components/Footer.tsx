import Link from 'next/link'
import Image from 'next/image'

const SERVER_IP = 'play.oneforall.social'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/20">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground w-fit"
            >
              <Image
                src="/images/logo.png"
                alt="One For All SMP"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>
                ONE <span className="text-primary">FOR ALL</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              One For All – Grow Together. A public Minecraft SMP where community and fair play come first.
            </p>
          </div>

          {/* Server IP */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Server
            </h3>
            <p className="font-mono text-primary font-bold">{SERVER_IP}</p>
            <p className="text-sm text-muted-foreground">Java Edition · 1.21.4</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Links
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#join"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How to Join
              </a>
              <a
                href="#gallery"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Gallery
              </a>
              <a
                href="#rules"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Rules
              </a>
              <a
                href="#suggest"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Suggest / Feedback
              </a>
              <a
                href="https://discord.gg/oneforall"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#5865F2] hover:text-[#7289da] transition-colors"
              >
                Discord
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} One For All SMP. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not affiliated with Mojang Studios or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  )
}
