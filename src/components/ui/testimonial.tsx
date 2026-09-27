"use client"
import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

export interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
  url?: string
  tags?: string[]
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          setExitX(0)
        }, 200)
      }
    }

    const handleNext = () => {
      setExitX(-100)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setExitX(0)
      }, 200)
    }

    const handlePrev = () => {
      setExitX(100)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        setExitX(0)
      }, 200)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "h-[28rem] w-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative w-80 sm:w-96 md:w-[26rem] h-96">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                  "bg-white shadow-xl border border-gray-100",
                  "dark:bg-card dark:border-border dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 12 : 24,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 12 : 24,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-3 flex justify-between px-6 z-10">
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="text-2xl select-none cursor-pointer text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-primary transition-colors"
                    >
                      &larr;
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="text-2xl select-none cursor-pointer text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-primary transition-colors"
                    >
                      &rarr;
                    </button>
                  </div>
                )}

                <div className="p-6 md:p-8 flex flex-col h-full items-center gap-4 text-center">
                  <div className="w-16 h-16 shrink-0 mt-2 mb-2">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover border-2 border-primary/20"
                      draggable="false"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#e5262c]">
                    {testimonial.name}
                  </h3>
                  
                  <p className="text-sm md:text-base text-gray-700 dark:text-muted-foreground line-clamp-4">
                    {testimonial.description}
                  </p>
                  
                  {testimonial.tags && (
                    <div className="flex flex-wrap gap-2 justify-center mt-auto pt-4">
                      {testimonial.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted text-gray-600 dark:text-muted-foreground rounded-md font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {testimonial.url && (
                    <a 
                      href={testimonial.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 text-sm font-semibold text-[#e5262c] hover:underline"
                      onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking link
                    >
                      View Live Project &rarr;
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-[#e5262c]"
                      : "bg-gray-300 dark:bg-muted-foreground/30",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel }
