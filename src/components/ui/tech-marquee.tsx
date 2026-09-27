"use client"

import React from 'react';

const skillsRow1 = ["React.js", "Framer Motion", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"];
const skillsRow2 = ["Python", "TensorFlow", "PyTorch", "OpenCV", "LangChain", "Hugging Face"];
const skillsRow3 = ["AWS", "Docker", "Linux", "Git & GitHub", "C++", "SQL"];

export function TechMarquee() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 text-center">
        <h2 className="tech-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#e5262c]">Technical Arsenal</h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Equipped with a modern stack to build scalable, premium, and performant digital experiences.
        </p>
      </div>
      
      <div className="relative flex flex-col gap-8 md:gap-10">
        <MarqueeRow items={skillsRow1} direction="left" speed="normal" />
        <MarqueeRow items={skillsRow2} direction="right" speed="slow" />
        <MarqueeRow items={skillsRow3} direction="left" speed="fast" />
        
        {/* Gradients for fading effect on the edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 md:w-1/4 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 md:w-1/4 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  )
}

function MarqueeRow({ 
  items, 
  direction = "left", 
  speed = "normal" 
}: { 
  items: string[], 
  direction?: "left" | "right", 
  speed?: "slow" | "normal" | "fast" 
}) {
  const duration = speed === "slow" ? "60s" : speed === "normal" ? "40s" : "30s";
  const dirClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";
  
  // Duplicate items 8 times to ensure smooth infinite scroll even on ultra-wide screens
  const scrollItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
  
  return (
    <div className="tech-marquee-row flex w-full overflow-hidden group">
      <div 
        className={`flex shrink-0 gap-6 md:gap-8 py-2 ${dirClass} w-max`} 
        style={{ animationDuration: duration }}
      >
        {scrollItems.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center px-6 py-4 md:px-8 md:py-5 rounded-full border-2 border-border/50 bg-card text-foreground font-bold whitespace-nowrap text-lg md:text-xl shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#e5262c] hover:text-[#e5262c] cursor-default"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
