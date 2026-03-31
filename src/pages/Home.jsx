import React, { useEffect } from "react";
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
  useEffect(() => {
    // 1. Entrance into Dark — start only when dark-section actually enters the viewport
    gsap.to("body", {
      backgroundColor: "#111111",
      color: "#f9c4d2",
      "--accent-color": "#f9c4d2",
      "--accent-bg": "#f9c4d2",
      immediateRender: false,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".dark-section",
        start: "top 95%",
        end: "top 15%",
        scrub: 1.5,
      }
    });

    // 2. Exit Dark — revert to pink as dark-section scrolls out the bottom
    gsap.to("body", {
      backgroundColor: "#f9c4d2",
      color: "#111111",
      "--accent-color": "#111111",
      "--accent-bg": "#ffffff",
      immediateRender: false,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".dark-section",
        start: "bottom 85%",
        end: "bottom 10%",
        scrub: 1.5,
      }
    });

    // 3. Return to Pink at footer (safety net)
    gsap.to("body", {
      backgroundColor: "#f9c4d2",
      color: "#111111",
      "--accent-color": "#111111",
      "--accent-bg": "#ffffff",
      immediateRender: false,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "footer",
        start: "top 95%",
        end: "top 35%",
        scrub: 1.5,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const servicePanels = [
    {
      bg: "#cba6f7",
      z: 20,
      children: <ServiceBlock
        title="Brand Strategy"
        description="It’s the core of your company’s identity. It guides all business decisions, ensuring a consistent and impactful presence in the market."
        list={["Research & Insights", "Brand Model", "Positioning", "Value proposition", "Messaging", "Verbal identity", "Naming"]}
        imageContent={<StrategyImage />}
        direction="left"
      />
    },
    {
      bg: "#ffffff",
      z: 30,
      children: <ServiceBlock
        title="Visual Identity"
        description="Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience."
        list={["Logotype, Typography & Colour", "Visual Language", "Illustrations & 3D", "Art Direction", "Brandbook & Guidelines", "Motion Design", "Brand Applications"]}
        imageContent={<VisualImage />}
        direction="right"
      />
    },
    {
      bg: "#fac541",
      z: 40,
      children: <ServiceBlock
        title="Website"
        description="Our website design services blend innovation and creativity to deliver user-centric solutions that elevate your brand and engage your audience."
        list={["UX Design", "Website Design", "Responsive Design", "Website Motion", "Animations"]}
        imageContent={<WebsiteImage />}
        direction="left"
      />
    },
    {
      bg: "#1a1a1a",
      z: 50,
      children: <ServiceBlock
        title="Product"
        description="Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market."
        list={["UX Design", "User Testing", "Prototyping", "UI Design", "App Design", "Interaction Design"]}
        textColor="text-[#ffffff]"
        imageContent={<ProductImage />}
        direction="right"
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
