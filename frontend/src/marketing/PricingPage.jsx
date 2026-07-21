import Nav from './sections/Nav'
import PricingSection from './sections/PricingSection'
import FaqSection from './sections/FaqSection'
import FinalCta from './sections/FinalCta'
import SiteFooter from './sections/SiteFooter'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#08080c]">
      <Nav />
      <main>
        <div className="px-8 pt-44 pb-4 text-center text-white">
          <h1 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            One plan for every stage of your agency.
          </h1>
        </div>
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
