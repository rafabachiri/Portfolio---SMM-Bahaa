import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollGrowthBar } from "@/components/layout/ScrollGrowthBar";
import { NotificationSystem } from "@/components/notifications/NotificationSystem";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackToTop } from "@/components/ui/BackToTop";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
// import { ServicesGrid } from "@/components/services/ServicesGrid"; // hidden for now — reuse later
import { ClientProjectsGrid } from "@/components/projects/ClientProjectsGrid";
import { StrategyCanvas } from "@/components/strategy/StrategyCanvas";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { WhyMeGrid } from "@/components/whyme/WhyMeGrid";
import { PlatformsSection } from "@/components/platforms/PlatformsSection";
// import { CaseStudiesSection } from "@/components/casestudies/CaseStudiesSection"; // hidden for now
import { AnalyticsSection } from "@/components/analytics/AnalyticsSection";
import { DmTestimonials } from "@/components/testimonials/DmTestimonials";
import { AfterHire } from "@/components/afterhire/AfterHire";
import { CertificationsMarquee } from "@/components/certifications/CertificationsMarquee";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollGrowthBar />
      <NotificationSystem />
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <ServicesGrid /> */}{/* hidden for now — reuse later */}
        <StrategyCanvas />
        <ClientProjectsGrid />
        <ProcessTimeline />
        <WhyMeGrid />
        <PlatformsSection />
        {/* <CaseStudiesSection /> */}{/* hidden for now */}
        <AnalyticsSection />
        <DmTestimonials />
        <AfterHire />
        <CertificationsMarquee />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
