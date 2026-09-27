"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Shared defaults ──────────────────────────────────────────────────
      const fadeUp = {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      };

      // ── About section ────────────────────────────────────────────────────
      gsap.from(".magazine-heading", {
        ...fadeUp,
        scrollTrigger: {
          trigger: ".magazine-heading",
          start: "top 85%",
        },
      });

      gsap.from(".magazine-body p", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: ".magazine-body",
          start: "top 80%",
        },
      });

      gsap.from(".magazine-pull-quote", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".magazine-pull-quote",
          start: "top 85%",
        },
      });

      // ── Tech Marquee section ─────────────────────────────────────────────
      gsap.from(".tech-heading", {
        opacity: 0,
        scale: 0.85,
        y: 50,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".tech-heading",
          start: "top 85%",
        },
      });

      gsap.from(".tech-marquee-row", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-marquee-row",
          start: "top 90%",
        },
      });

      // ── Work / Projects section ──────────────────────────────────────────
      gsap.from(".work-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-heading",
          start: "top 85%",
        },
      });

      gsap.from(".work-carousel", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-carousel",
          start: "top 85%",
        },
      });

      // ── Timeline / Achievements ──────────────────────────────────────────
      gsap.from(".timeline-heading", {
        ...fadeUp,
        scrollTrigger: {
          trigger: ".timeline-heading",
          start: "top 85%",
        },
      });

      gsap.from(".timeline-item", {
        opacity: 0,
        x: -80,
        duration: 0.9,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-item",
          start: "top 85%",
        },
      });

      // ── Contact section ──────────────────────────────────────────────────
      gsap.from(".contact-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 85%",
        },
      });

      gsap.from(".contact-links-item", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".contact-links-item",
          start: "top 90%",
        },
      });

      // ── Horizontal line draws ────────────────────────────────────────────
      gsap.from(".reveal-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".reveal-line",
          start: "top 90%",
        },
      });

    }); // end gsap.context

    return () => ctx.revert();
  }, []);

  return null;
}
