import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmileLogo from "../ui/SmileLogo";
import videoSrc from "../../assets/video.mp4";
import { usePageContent } from "../../hooks/usePageContent";
import { getContent } from "../../lib/content";
import { defaults } from "../../lib/contentDefaults";

gsap.registerPlugin(ScrollTrigger);

export function HeroTopText() {
  return null;
}

export default function Hero() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  const { sections } = usePageContent("home");
  const headingBold = getContent(sections, "hero.headingBold", defaults.home.hero.headingBold);
  const headingItalic = getContent(sections, "hero.headingItalic", defaults.home.hero.headingItalic);
  const cmsVideoUrl = getContent(sections, "hero.videoUrl", defaults.home.hero.videoUrl);
  const activeVideoUrl = cmsVideoUrl || videoSrc;

  // useLayoutEffect ensures cleanup (ctx.revert) runs BEFORE React removes
  // the DOM nodes, so GSAP can properly un-pin and remove the pin spacer.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const startWidth = isMobile ? window.innerWidth - 48 : 320;
      const startHeight = isMobile ? Math.min((startWidth * 9) / 16, 200) : 180;
      // On mobile, if we want it centered, left should be (innerWidth - startWidth) / 2
      // But actually if startWidth is innerWidth - 48, then left is 24 anyway.
      // If we want it smaller and centered on mobile:
      const mobileStartWidth = 240;
      const actualStartWidth = isMobile ? mobileStartWidth : 320;
      const actualStartHeight = isMobile ? (mobileStartWidth * 9) / 16 : 180;
      const actualStartLeft = isMobile ? (window.innerWidth - mobileStartWidth) / 2 : 24;

      gsap.set(videoWrapperRef.current, {
        bottom: 24,
        left: actualStartLeft,
        width: actualStartWidth,
        height: actualStartHeight,
        borderRadius: 12,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      tl.to(videoWrapperRef.current, {
        width: () => window.innerWidth - 48,
        height: () => window.innerHeight - 120,
        bottom: 24,
        left: 24,
        borderRadius: 16,
        ease: "power2.inOut",
      }, 0);

      tl.to([textRef.current, logoRef.current], {
        opacity: 0,
        y: -30,
        ease: "power1.inOut",
      }, 0);
    }, containerRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert(); // runs before DOM removal — pin spacer is properly cleaned up
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#020817]">

      {/* LOGO — Upper Center */}
      <div
        ref={logoRef}
        className="absolute top-[15vh] w-full flex flex-col items-center gap-8 z-10 pointer-events-none"
      >
        <div className="w-[70vw] md:w-[60vw] max-w-[500px] aspect-square opacity-20">
          <SmileLogo />
        </div>
      </div>

      {/* TEXT — Centered */}
      <div
        ref={textRef}
        className="absolute top-[48vh] md:top-[40vh] w-full flex justify-center z-20 pointer-events-none px-6"
      >
        <h2 className="text-center tracking-tight sm:whitespace-nowrap text-[#fbf0f2] leading-[1.1]" style={{ fontSize: "clamp(1.2rem, 3.8vw, 3.1rem)", fontFamily: "'Nib Pro', serif", fontWeight: 300 }}>
          {headingBold} {headingItalic}
        </h2>
      </div>

      {/* VIDEO — small card bottom-left, expands on scroll */}
      <div
        ref={videoWrapperRef}
        style={{
          position: "absolute",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          backgroundColor: "#0B0215",
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          src={activeVideoUrl}
        />
      </div>

    </section>
  );
}
