import { NextResponse } from 'next/server'
import * as util from 'minecraft-server-util'

export const dynamic = 'force-dynamic'

export async function GET() {
  const ip = 'bots.oneforall.social'
  const versionText = 'Java 1.21.x–26.1.x & Bedrock Latest'

  try {
    const result = await util.status(ip, 25565, { timeout: 3000 })
    
    // The Maintenance plugin usually changes the version name to indicate maintenance
    // It can also update the MOTD. We check both to be safe.
    const versionName = result.version?.name?.toLowerCase() || ''
    const motdClean = result.motd?.clean?.toLowerCase() || ''
    const isMaintenance = versionName.includes('maintenance') || motdClean.includes('maintenance')

    return NextResponse.json({
      online: true,
      maintenance: isMaintenance,
      players: {
        online: result.players.online,
        max: 50,
      },
      version: versionText,
      motd: result.motd.clean,
      ip,
    })
  } catch (error) {
    // If the server is offline or doesn't respond
    return NextResponse.json({
      online: false,
      players: {
        online: 0,
        max: 50,
      },
      version: versionText,
      motd: 'Server Offline',
      ip,
    })
  }
}
