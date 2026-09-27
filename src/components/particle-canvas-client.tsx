"use client"

import dynamic from "next/dynamic"

const ParticleCanvas = dynamic(
  () => import("@/components/particle-canvas").then((m) => m.ParticleCanvas),
  { ssr: false }
)

export function ParticleCanvasClient() {
  return <ParticleCanvas />
}
