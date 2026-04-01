import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmileLogo from "../ui/SmileLogo";
import videoSrc from "../../assets/video.mp4";

gsap.registerPlugin(ScrollTrigger);

export function HeroTopText() {
  return null;
}
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
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
        width: "100%",
        height: "100%",
        bottom: 0,
        left: 0,
        borderRadius: 0,
        ease: "power2.inOut",
      }, 0);

      tl.to([textRef.current, logoRef.current], {
        opacity: 0,
        y: -30,
        ease: "power1.inOut",
      }, 0);

    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted) {
    return <section className="relative w-full h-[100dvh] bg-primary overflow-hidden" />;
  }

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-primary overflow-hidden">
      <div ref={stickyRef} className="relative w-full h-full flex flex-col items-center">

        {/* LOGO — Upper Center */}
        <div
          ref={logoRef}
          className="
            absolute
            top-[15vh]
            w-full
            flex justify-center
            z-10
            pointer-events-none
            opacity-30
            mix-blend-multiply
          "
        >
          <div className="w-[70vw] md:w-[60vw] max-w-[500px] aspect-square">
            <SmileLogo />
          </div>
        </div>

        {/* TEXT — Center */}
        <div
          ref={textRef}
          className="
            absolute
            top-[45vh] md:top-[35vh]
            w-full
            flex justify-center
            z-20 pointer-events-none
            px-6
          "
        >
          <h2 className="
            text-[24px] sm:text-[32px] md:text-[40px] lg:text-[50px]
            leading-[1.1]
            font-bold
            text-[#1a1a1a]
            text-center
            tracking-tight
            max-w-[900px]
          ">
            Premium Branding Agency <br className="hidden sm:block" />
            for B2B Tech Scaleups
          </h2>
        </div>

        {/* VIDEO — Starts Bottom Left */}
        <div
          ref={videoWrapperRef}
          className="absolute z-30 overflow-hidden"
          style={{
            bottom: "1.5rem",
            left: "1.5rem",
            width: "clamp(160px, 25vw, 400px)",
            height: "clamp(100px, 15vw, 240px)",
            borderRadius: "12px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={videoSrc}
          />
        </div>

      </div>
    </section>
  );
}