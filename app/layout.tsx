import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'One For All SMP | Public Minecraft Server',
  description:
    'Join One For All SMP – a public Minecraft survival server with no chaos, strong community, and active players.',
  keywords: ['Minecraft SMP', 'Public SMP', 'Survival Server', 'No Grief SMP'],
  openGraph: {
    title: 'One For All SMP | Public Minecraft Server',
    description:
      'Join One For All SMP – a public Minecraft survival server with no chaos, strong community, and active players.',
    url: 'https://oneforall.social',
    siteName: 'One For All SMP',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'One For All SMP',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One For All SMP | Public Minecraft Server',
    description: 'A public Minecraft survival server with no chaos, strong community, and active players.',
    images: ['/images/hero-bg.jpg'],
  },
  themeColor: '#0f1117',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
