import Navbar from "@/components/layout/Navbar";
import BackToTop from "@/components/layout/BackToTop";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import StatsBanner from "@/components/sections/StatsBanner";
import MissionGrid from "@/components/sections/MissionGrid";
import ChurchLeadership from "@/components/sections/ChurchLeadership";
import PastorsNetwork from "@/components/sections/PastorsNetwork";
import MinistryDepartments from "@/components/sections/MinistryDepartments";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import PartnerTestimonials from "@/components/sections/PartnerTestimonials";
import FieldGallery from "@/components/sections/FieldGallery";
import PartnerWithUs from "@/components/sections/PartnerWithUs";
import CampaignProgress from "@/components/sections/CampaignProgress";
import FAQSection from "@/components/sections/FAQSection";
import DonationForm from "@/components/sections/DonationForm";
import MembershipRegistrationForm from "@/components/sections/MembershipRegistrationForm";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Footer from "@/components/sections/Footer";

/**
 * HomepageTemplate
 * -----------------------------------------------------------------------
 * Composes every Organism in the order that best supports the
 * informational -> transactional funnel:
 * Hero -> Stats (trust) -> Mission (why) -> Leadership (who's accountable)
 * -> Our Pastors (who's served) -> Departments (how) -> Problem/Solution
 * (case for giving) -> Testimonial (emotional proof) -> Gallery (proof of
 * work) -> Partner (organizational CTA) -> Campaign (concrete, funded
 * goal) -> FAQ (answer objections) -> Donate -> Membership -> Newsletter
 * (catch everyone not ready to commit yet) -> Footer.
 *
 * Navbar is `fixed` and overlays the Hero intentionally (transparent/
 * blurred bg) — no top padding needed on <main> since Hero is full-bleed
 * and every other section has its own generous vertical padding.
 * BackToTop is a fixed overlay independent of section flow.
 *
 * Drop this in app/page.tsx (Next.js App Router).
 */
export default function HomepageTemplate() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBanner />
      <MissionGrid />
      <ChurchLeadership />
      <PastorsNetwork />
      <MinistryDepartments />
      <ProblemSolutionSection />
      <PartnerTestimonials />
      <FieldGallery />
      <PartnerWithUs />
      <CampaignProgress />
      <FAQSection />
      <DonationForm />
      <MembershipRegistrationForm />
      <NewsletterSignup />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </main>
  );
}
