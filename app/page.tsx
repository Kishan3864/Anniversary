// Celebration temporarily OFF (per user). To re-enable: uncomment this import
// and the <Celebration /> line below.
// import Celebration from "@/components/Celebration";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AnniversaryBanner from "@/components/AnniversaryBanner";
import Services from "@/components/Services";
import Legacy from "@/components/Legacy";
import Timeline from "@/components/Timeline";
import WhyChoose from "@/components/WhyChoose";
import Counters from "@/components/Counters";
import ExperienceQuote from "@/components/ExperienceQuote";
import ThankYou from "@/components/ThankYou";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* <Celebration /> */}
      <Header />
      <main>
        <Hero />
        <AnniversaryBanner />
        <Legacy />
        <Services />
        <Timeline />
        <WhyChoose />
        <Counters />
        <ExperienceQuote />
        <ThankYou />
      </main>
      <Footer />
    </>
  );
}
