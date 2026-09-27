"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const timelineData = [
  {
    title: "Won HACKWITHUP 2025 Hackathon",
    description: "Secured second place at HackWithUP, demonstrating excellence in building innovative software solutions under tight deadlines and intense pressure.",
    date: "Nov 2025",
    image: "/hackwithup.jpg",
  },
  {
    title: "Invited to YOUTH SYNERGY MEET 2026",
    description: "Invited as a special guest to the Youth Synergy Meet at LPCPS, Lucknow, to share insights and inspire aspiring tech enthusiasts.",
    date: "Jan 31, 2026",
    image: "/lpcps-trophy.jpg",
  },
  {
    title: "Innovatex 2026",
    description: "Participated and excelled in Innovatex, pushing the boundaries of creativity, AI architecture, and technical problem-solving.",
    date: "May 1, 2026",
    image: "/innovatex.jpg",
  },
];

export function TimelineSection() {
  return (
    <section className="overflow-hidden bg-[#f6f4f0] text-[#141414]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="border-x-4 border-b-4 border-[#141414] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 font-bold tracking-widest uppercase border-[#141414] text-[#141414]"
            >
              Achievements
            </Badge>
            <div className="space-y-4">
              <h2 className="timeline-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#141414]">
                Milestones & <br />
                <span className="text-[#e5262c]">Recognition</span>
              </h2>
              <p className="md:text-xl text-lg font-serif italic text-gray-700 leading-relaxed">
                Highlights from my journey of building, competing, and sharing knowledge with the community.
              </p>
            </div>
          </div>
        </div>

        <div className="md:border-x-4 md:border-r-4 border-[#141414]">
          <div className="flex flex-col relative w-full">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item flex flex-col md:flex-row border-b-4 border-[#141414] last:border-b-0 relative group">

                {/* Date & Title Section */}
                <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#141414] bg-white group-hover:bg-[#141414] group-hover:text-white transition-colors duration-500">
                  <div className="font-mono text-sm md:text-base font-bold text-[#e5262c] mb-4 uppercase tracking-widest">
                    {item.date}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg font-serif text-gray-600 group-hover:text-gray-300 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 relative min-h-[300px] overflow-hidden bg-[#141414]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-[#141414] bg-[#e5262c] flex items-center justify-center">
                    <span className="font-mono font-bold text-white">0{index + 1}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
        <div className="border-x-4 border-t-4 border-[#141414] h-12 md:h-16" />
      </div>
    </section>
  );
}
