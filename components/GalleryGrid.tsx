'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const images = [
  { src: '/images/gallery-1.jpg', alt: 'Player base at dusk' },
  { src: '/images/gallery-2.jpg', alt: 'Underground mine exploration' },
  { src: '/images/gallery-3.jpg', alt: 'Epic cliffside city' },
  { src: '/images/gallery-4.jpg', alt: 'Player village settlement' },
  { src: '/images/gallery-5.jpg', alt: 'Dragon battle in The End' },
  { src: '/images/gallery-6.jpg', alt: 'Peaceful survival farm' },
]

export default function GalleryGrid() {
  return (
    <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-sm tracking-widest uppercase mb-3"
        >
          Our World
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-balance"
        >
          Built by the <span className="text-primary">Community</span>
        </motion.h2>
      </div>

      {/* Gallery grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {images.map((img) => (
          <motion.div
            key={img.src}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
            }}
            className="group relative aspect-video rounded-xl overflow-hidden border border-border/60"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-sm text-foreground font-medium">{img.alt}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
