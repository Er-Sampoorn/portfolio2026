"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Social {
  name: string;
  image: string;
  href: string;
  icon?: React.ReactNode;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

export function SocialLinks({
  socials,
  className,
  ...props
}: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState<number>(0);
  const [clicked, setClicked] = React.useState<boolean>(false);

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 200);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [clicked]);

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-4 md:gap-8", className)}
      {...props}
    >
      {socials.map((social, index) => (
        <a
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative cursor-pointer px-5 py-2 transition-opacity duration-200",
            hoveredSocial && hoveredSocial !== social.name
              ? "opacity-50"
              : "opacity-100",
          )}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={(e) => {
            // Ensure propagation happens but we also trigger click animation locally
            setClicked(true);
          }}
        >
          <span className="flex items-center gap-2 text-2xl md:text-4xl font-bold font-serif italic text-foreground hover:text-[#e5262c] transition-colors">
            {social.icon && <span>{social.icon}</span>}
            {social.name}
          </span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center pointer-events-none"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="size-20 md:size-24 rounded-2xl shadow-2xl object-cover border-4 border-white"
                  initial={{
                    y: -60,
                    rotate: rotation,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  animate={{ y: -80, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -60, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
