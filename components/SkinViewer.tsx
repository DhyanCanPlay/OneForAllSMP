'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface SkinViewerProps {
  username?: string
  size?: number
  className?: string
}

export default function SkinViewer({ username = 'DhyanCanPlay', size = 280, className = '' }: SkinViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<any>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let skinViewer: any = null

    const initViewer = async () => {
      try {
        const skinview3d = await import('skinview3d')

        if (!canvasRef.current) return

        skinViewer = new skinview3d.SkinViewer({
          canvas: canvasRef.current,
          width: size,
          height: size,
          skin: `https://mc-heads.net/skin/${username}`,
        })

        skinViewer.animation = new skinview3d.IdleAnimation()
        skinViewer.animation.speed = 0.5
        skinViewer.autoRotate = true
        skinViewer.autoRotateSpeed = 1.5
        skinViewer.zoom = 0.7
        skinViewer.fov = 45

        viewerRef.current = skinViewer
        setLoaded(true)
      } catch (err) {
        console.error('skinview3d failed to load:', err)
      }
    }

    initViewer()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose()
        viewerRef.current = null
      }
    }
  }, [username, size])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className={`relative ${className}`}
    >
      <div
        className="relative rounded-xl overflow-hidden border border-primary/20"
        style={{
          width: size,
          height: size,
          boxShadow: '0 0 30px oklch(0.65 0.22 145 / 0.2), 0 0 60px oklch(0.65 0.22 145 / 0.08)',
        }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="block"
          style={{ background: 'transparent' }}
        />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
        <span className="text-xs font-mono text-muted-foreground tracking-wider">Hover to interact</span>
      </div>
    </motion.div>
  )
}
