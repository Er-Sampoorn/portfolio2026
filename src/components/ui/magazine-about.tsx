"use client"

import React from 'react'

export function MagazineAbout() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#f6f4f0] text-[#141414] border-t-8 border-[#141414]">
      <div className="max-w-7xl mx-auto">
        {/* Magazine Header */}
        <div className="flex flex-col mb-12">
          <p className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-[#e5262c] mb-4">
            Exclusive Feature — 2026
          </p>
          <h2 className="magazine-heading text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter mb-6">
            Full Stack <br />
            <span className="text-[#e5262c]">& AI Dev</span>
          </h2>
          <div className="w-full h-1 bg-[#141414] mb-2" />
          <div className="w-full h-4 bg-[#141414] mb-8" />
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif italic font-medium max-w-4xl leading-tight">
            "Shipping Real World Projects One At A Time."
          </h3>
        </div>

        {/* Magazine Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
          
          {/* Decorative Side Element */}
          <div className="hidden md:flex md:col-span-1 border-r-2 border-[#141414] justify-center pt-2">
            <span className="writing-vertical text-xs font-bold tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Vol. 1 — The Portfolio Issue
            </span>
          </div>

          {/* Main Content Columns */}
          <div className="magazine-body md:col-span-11 columns-1 md:columns-2 gap-8 md:gap-12 text-lg md:text-xl font-serif leading-relaxed text-justify">
            <p className="mb-6">
              <span className="float-left text-7xl md:text-8xl font-black font-sans leading-[0.8] mr-3 mt-2 text-[#e5262c]">
                I
              </span>
              'm a Full Stack & AI Developer passionate about building modern, scalable, and impactful digital products. I enjoy transforming ideas into real-world applications through clean design, smooth user experiences, and intelligent systems.
            </p>
            <p className="mb-6">
              From full-stack web platforms to AI-powered solutions, I focus on creating products that are not just visually polished, but also functional, efficient, and meaningful. I'm constantly exploring new technologies, refining my skills, and shipping projects one step at a time.
            </p>
            
            {/* Pull Quote */}
            <div className="magazine-pull-quote break-inside-avoid my-10 p-6 border-l-4 border-[#e5262c] bg-[#141414] text-[#f6f4f0]">
              <p className="text-xl md:text-2xl font-bold font-sans uppercase tracking-tight">
                "Not just visually polished, but also functional, efficient, and meaningful."
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="reveal-line mt-16 w-full flex items-center justify-between border-t-2 border-b-2 border-[#141414] py-2 font-mono text-xs md:text-sm font-bold uppercase tracking-widest">
          <span>Sampoorn Tripathi</span>
          <span className="text-[#e5262c]">Creative & Technical</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  )
}
