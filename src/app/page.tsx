import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"
import { TechMarquee } from "@/components/ui/tech-marquee"
import { MagazineAbout } from "@/components/ui/magazine-about"
import { WorkSection } from "@/components/work-section"
import { TimelineSection } from "@/components/timeline-section"
import { ContactSection } from "@/components/contact-section"
import { AiAssistant } from "@/components/ai-assistant"
import { SplineSection } from "@/components/spline-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Sections */}
      <div className="relative z-10">
        <WavingPortfolioLanding
          name="Sampoorn Tripathi"
          year="2026"
          roles={["Fullstack Developer", "CSE Undergrad"]}
          lettersLeft={["P", "F"]}
          giantLetter="O"
          lettersRight={["RT", "LIO"]}
          title="Sampoorn Tripathi - Portfolio"
          signature="SAMP/OORN"
          greeting="Hi, I'm Sampoorn!"
          imageUrl="/me.jpg"
        />
        <MagazineAbout />
        <TechMarquee />
        <SplineSection />
        <WorkSection />
        <TimelineSection />
        <ContactSection />
      </div>

      {/* AI Assistant — floating chat bubble */}
      <AiAssistant />
    </main>
  )
}





