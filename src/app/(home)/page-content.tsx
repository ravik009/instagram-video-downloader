import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";
import { FrequentlyAsked } from "./_components/frequently-asked";
import { Testimonials } from "./_components/testimonials";
import { Footer } from "./_components/footer";
import { HeaderAd, InContentAd, FooterAd } from "@/components/ads/enhanced-ads";

export function PageContent() {
  return (
    <>
      {/* Header Ad */}
      <HeaderAd />
      
      <Hero />
      
      {/* In-content ad after hero */}
      <InContentAd />
      
      <Features />
      
      <HowItWorks />
      
      {/* In-content ad before FAQ */}
      <InContentAd />
      
      <FrequentlyAsked />
      
      <Testimonials />
      
      {/* Footer Ad */}
      <FooterAd />
      
      <Footer />
    </>
  );
}
