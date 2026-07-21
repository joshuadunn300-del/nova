import Nav from './sections/Nav'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import Video from './sections/Video'
import CreatorShowcase from './sections/CreatorShowcase'
import PipelineDemo from './sections/PipelineDemo'
import Toolkit from './sections/Toolkit'
import PricingSection from './sections/PricingSection'
import Integrations from './sections/Integrations'
import TestimonialsMarquee from './sections/TestimonialsMarquee'
import StatsBand from './sections/StatsBand'
import Faq from './sections/Faq'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Scoped, not global index.css — smooth anchor scroll for Nav/Footer #id links.
          Each section owns its own #id + scroll-mt-24 directly (HowItWorks/Toolkit/
          PricingSection/Integrations/FaqSection/Video) — no wrapper divs here, that
          caused duplicate-id churn against the sections' own ids. */}
      <style>{'html { scroll-behavior: smooth; }'}</style>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Video />
        <CreatorShowcase />
        <PipelineDemo />
        <Toolkit />
        <PricingSection />
        <Integrations />
        <TestimonialsMarquee />
        <StatsBand />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
