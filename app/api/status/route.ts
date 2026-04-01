import { NextResponse } from 'next/server'

export async function GET() {
  // Mock server status — replace with a real Minecraft server API call
  // e.g. https://api.mcsrvstat.us/3/play.oneforall.social
  const data = {
    online: true,
    players: {
      online: 14,
      max: 100,
    },
    version: 'Java Edition 1.21.4',
    motd: 'One For All SMP — Grow Together',
    ip: 'play.oneforall.social',
  }

  return NextResponse.json(data)
}
