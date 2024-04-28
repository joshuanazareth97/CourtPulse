import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import Benefits from "../components/benefits";
import Cta from "../components/cta";
import { benefitOne, benefitTwo } from "../components/data";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import SimpleFooter from "../components/simpleFooter";
import Testimonials from "../components/testimonials";
import Video from "../components/video";

const Home = () => {
  return (
    <>
      <Head>
        <title>CourtPulse | Automated Case Tracking for Indian Courts</title>
        <meta
          name="description"
          content="CourtPulse revolutionizes legal case management with automated tracking for Delhi High Court and Supreme Court of India. Stay updated with real-time notifications directly on your Telegram. Sign up now to streamline your legal workflow and never miss a court update."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <SectionTitle
        id="features"
        pretitle="Features at a Glance"
        title="Learn more about CourtPulse"
      />
      <Benefits data={benefitOne} />
      <Benefits id="benefits" imgPos="right" data={benefitTwo} />
      {/* TODO: Add these back*/}
      {/* <SectionTitle
        pretitle="Watch it in action"
        title="Experience the Future of Legal Case Tracking"
      >
        Watch the seamless integration of case tracking and notifications
        directly to your Telegram. See first-hand how our solution keeps you
        connected and informed, no matter where you are, with all the ease of
        sending a message.
  </SectionTitle> */}
      {/* <Video /> */}
      {/* <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
  <Testimonials /> */}
      <SectionTitle
        id="faq"
        pretitle="FAQ"
        title="Frequently Asked Questions"
      />
      <Faq />
      <Cta />
      <SimpleFooter />
      <PopupWidget />
    </>
  );
};

export default Home;
