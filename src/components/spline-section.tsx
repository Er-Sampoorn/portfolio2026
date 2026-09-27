'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"

export function SplineSection() {
  return (
    <section className="py-16 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-[#e5262c] mb-6 text-center"
        >
          Interactive Experience
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Card className="w-full h-[500px] bg-black/[0.96] border-white/10 relative overflow-hidden">
            <Spotlight size={400} />

            <div className="flex h-full flex-col md:flex-row">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight"
                >
                  Interactive<br />3D Design
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-4 w-12 h-1 bg-[#e5262c]"
                />

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-5 text-neutral-400 max-w-xs text-sm leading-relaxed"
                >
                  Bringing UIs to life with immersive 3D experiences. 
                  Drag, rotate, and explore — built with Spline & Three.js.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {["Three.js", "Spline", "WebGL", "GSAP"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono border border-white/10 text-white/50 rounded-full bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right content — Spline 3D scene */}
              <div className="flex-1 relative min-h-[250px] md:min-h-0">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
