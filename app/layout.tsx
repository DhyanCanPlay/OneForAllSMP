import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'One For All SMP | Public Minecraft Server',
  description:
    'Join One For All SMP – a public Minecraft survival server with no chaos, strong community, and active players.',
  keywords: ['Minecraft SMP', 'Public SMP', 'Survival Server', 'No Grief SMP'],
  icons: {
    icon: 'https://www.oneforall.social/images/logo.png',
    shortcut: 'https://www.oneforall.social/images/logo.png',
    apple: 'https://www.oneforall.social/images/logo.png',
  },
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
}
