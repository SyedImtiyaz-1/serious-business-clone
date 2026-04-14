import { useLayoutEffect } from "react";
import Hero, { HeroTopText } from "../components/sections/Hero";
import AboutSection from "../components/sections/About";
import ServiceBlock, { StrategyImage, VisualImage, WebsiteImage, ProductImage } from "../components/sections/Services";
import StackContainer from "../components/layout/StackContainer";
import Works from "../components/sections/Works";
import Insights from "../components/sections/Insights";
import CTA from "../components/sections/CTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useLayoutEffect(() => {
    // Set initial body color for home page
    document.body.style.backgroundColor = "#020817";
    document.body.style.color = "#F4EDD9";

    const ctx = gsap.context(() => {
      // Body → cream: dark buttons
      gsap.to("body", {
        backgroundColor: "#F4EDD9",
        color: "#020817",
        "--accent-color": "#020817",
        "--accent-bg": "#020817",
        "--accent-text": "#F4EDD9",
        immediateRender: false,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".dark-section",
          start: "top 95%",
          end: "top 15%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      // Body → dark again: white buttons
      gsap.to("body", {
        backgroundColor: "#020817",
        color: "#F4EDD9",
        "--accent-color": "#ffffff",
        "--accent-bg": "#ffffff",
        "--accent-text": "#020817",
        immediateRender: false,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".dark-section",
          start: "bottom 85%",
          end: "bottom 10%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      // Footer: dark bg, white buttons
      gsap.to("body", {
        backgroundColor: "#020817",
        color: "#F4EDD9",
        "--accent-color": "#ffffff",
        "--accent-bg": "#ffffff",
        "--accent-text": "#020817",
        immediateRender: false,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "footer",
          start: "top 95%",
          end: "top 35%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => {
      // Revert only OUR context's triggers (not global ones)
      ctx.revert();

      // Reset body inline styles to CSS defaults
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.removeProperty("--accent-color");
      document.body.style.removeProperty("--accent-bg");
    };
  }, []);

  const servicePanels = [
    {
      bg: "#2B59C3",
      children: <ServiceBlock
        title="Brand Strategy"
        description="It’s the core of your company’s identity. It guides all business decisions, ensuring a consistent and impactful presence in the market."
        list={["Research & Insights", "Brand Model", "Positioning", "Value proposition", "Messaging", "Verbal Identity", "Naming"]}
        imageContent={<StrategyImage />}
        textColor="text-[#F4EDD9]"
      />
    },
    {
      bg: "#0B0215",
      children: <ServiceBlock
        title="Identity"
        description="Distinctive visual systems designed to be immediate, enduring, and unmistakable."
        list={["Logo & Wordmark", "Typography & Color", "Art Direction", "Brand Systems", "Guidelines"]}
        imageContent={<VisualImage />}
        textColor="text-[#F4EDD9]"
      />
    },
    {
      bg: "#F4EDD9",
      children: <ServiceBlock
        title="Digital"
        description="High-performance digital experiences—designed with precision and built to scale."
        list={["UX & UI Design", "Website Design", "Web Development", "Interaction & Motion"]}
        imageContent={<WebsiteImage />}
        textColor="text-[#020817]"
      />
    },
    {
      bg: "#020817",
      children: <ServiceBlock
        title="Product"
        description="Thoughtfully designed products that are intuitive, refined, and built for real use."
        list={["UX Design", "Prototyping", "UI Systems", "App Design"]}
        textColor="text-[#F4EDD9]"
        imageContent={<ProductImage />}
      />
    },
  ];

  return (
    <>
      <HeroTopText />
      {/* Navbar and Footer will be handled by Layout or individual pages */}
      <Hero />
      <AboutSection />

      <div className="w-full h-[8vh] flex items-end pb-2 px-6">
        <span className="text-xl font-bold tracking-tighter opacity-60">Services</span>
      </div>
      <StackContainer panels={servicePanels} />

      <Works />
      <div className="dark-section">
        <div className="relative z-[60] py-20">
          <div className="w-full">
            <Insights />
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
