"use client"

import { TestimonialCarousel, Testimonial } from "@/components/ui/testimonial"

const PROJECTS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "RoadSense — Civic Intelligence",
    avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Production-ready, full-stack civic intelligence system. Next.js mobile sensor-tracking PWA, admin dashboard, real-time data management with Supabase, and Leaflet map visualization.",
    url: "https://rsaisam.vercel.app",
    tags: ["Next.js", "Supabase", "Leaflet", "Tailwind CSS", "Vercel"]
  },
  {
    id: 2,
    name: "AgriSense — AI Platform",
    avatar: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Full-stack agritech application with FastAPI backend, Firebase, and Vite frontend. Includes AI disease detection, offline PWA features, and integrated NIR spectroscopy.",
    url: "https://agt-6jaa40ipt-sampoorn-tripathis-projects.vercel.app",
    tags: ["React", "FastAPI", "Vite", "Tailwind CSS", "Vercel"]
  },
  {
    id: 3,
    name: "DevHive Software Club",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Official website for the DevHive Software Club. Built to manage community events, membership profiles, and showcase club accomplishments with modern design.",
    url: "https://devhive-cu.vercel.app",
    tags: ["React", "Web3", "Tailwind CSS", "Community", "Vercel"]
  },
  {
    id: 4,
    name: "CivicLedger — Governance",
    avatar: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Government policies as smart contracts on ICP blockchain — DAO voting, real-time fund tracking (₹2.5Cr+), 98.2% transparency score & multi-role portals.",
    url: "https://civic-ledger.vercel.app",
    tags: ["ICP Blockchain", "DAO", "Web3", "Governance"]
  }
]

export function WorkSection() {
  return (
    <section className="py-24 bg-background relative border-t-8 border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 text-center">
        <p className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-[#e5262c] mb-4">
          Featured Projects
        </p>
        <h2 className="work-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-foreground">
          Selected Works
        </h2>
        <div className="w-24 h-1 bg-[#141414] dark:bg-border mx-auto mb-6" />
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-serif">
          Swipe through my latest projects combining AI, full-stack architecture, and decentralized systems.
        </p>
      </div>

      <div className="work-carousel max-w-4xl mx-auto pb-12">
        <TestimonialCarousel
          testimonials={PROJECTS_DATA}
        />
      </div>
    </section>
  )
}
