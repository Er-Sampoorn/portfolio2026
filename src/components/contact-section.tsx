"use client";

import { SocialLinks, Social } from "@/components/ui/social-links";
import { Mail, FileText } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const CONTACT_LINKS: Social[] = [
  {
    name: "Email",
    href: "mailto:sampoorntripathi@example.com",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <Mail className="w-8 h-8" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sampoorn-tripathi-38121b354",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <LinkedinIcon className="w-8 h-8" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/Er-Sampoorn",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <GithubIcon className="w-8 h-8" />,
  },
  {
    name: "Resume",
    href: "/resume.pdf",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <FileText className="w-8 h-8" />,
  }
];

export function ContactSection() {
  return (
    <section className="py-24 bg-background relative border-t-8 border-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <p className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-[#e5262c] mb-6">
            Get In Touch
          </p>
          <h2 className="contact-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-8 text-foreground leading-none">
            Let's Work <br /> Together
          </h2>
          <div className="w-full max-w-md h-1 bg-[#141414] dark:bg-border mx-auto mb-12" />
        </div>

        <div className="w-full flex items-center justify-center pb-12">
          <SocialLinks socials={CONTACT_LINKS} className="gap-8 md:gap-16" />
        </div>
        
      </div>
    </section>
  );
}
