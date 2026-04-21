import { motion } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoSrc from '../assets/video.mp4';

gsap.registerPlugin(ScrollTrigger);
import StackContainer from '../components/layout/StackContainer';
import ServiceBlock, {
  StrategyVideo,
  VisualImage,
  WebsiteImage,
  ProductImage,
} from '../components/sections/Services';
import styles from './Services.module.css';

const serviceCards = [
  {
    id: 'premium',
    title: 'Premium Branding',
    text: 'Our bestseller for scaleups: a premium branding approach that connects strategy and creativity to turn complex value into a clear and credible story for enterprise buyers.',
    featured: false,
  },
  {
    id: 'sprint',
    title: 'Sprint',
    text: 'Sprints are 1-month projects designed to create a brand or website quickly and efficiently for early-stage startups.',
    featured: false,
  },
  {
    id: 'subscription',
    title: 'Subscription',
    text: 'Design subscriptions are our way of collaborating long-term with clients, acting as their extended team to speed up growth and ensure consistency.',
    featured: true,
  },
  {
    id: 'venture',
    title: 'Venture',
    text: 'Venture relationships involve high commitment projects where we invest our expertise and resources in exchange for shares.',
    featured: false,
  },
];

const brandingPanels = [
  {
    bg: '#cba6f7',
    children: (
      <ServiceBlock
        title="Brand Strategy"
        description="It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market."
        list={['Research & Insights', 'Brand Model', 'Positioning', 'Value proposition', 'Messaging', 'Verbal Identity', 'Naming']}
        imageContent={<StrategyVideo />}
      />
    ),
  },
  {
    bg: '#ffffff',
    children: (
      <ServiceBlock
        title="Identity"
        description="Distinctive visual systems designed to be immediate, enduring, and unmistakable."
        list={['Logo & Wordmark', 'Typography & Color', 'Art Direction', 'Brand Systems', 'Guidelines']}
        imageContent={<VisualImage />}
      />
    ),
  },
  {
    bg: '#fac541',
    children: (
      <ServiceBlock
        title="Digital"
        description="High-performance digital experiences—designed with precision and built to scale."
        list={['UX & UI Design', 'Website Design', 'Web Development', 'Interaction & Motion']}
        imageContent={<WebsiteImage />}
      />
    ),
  },
  {
    bg: '#1a1a1a',
    children: (
      <ServiceBlock
        title="Product"
        description="Thoughtfully designed products that are intuitive, refined, and built for real use."
        list={['UX Design', 'Prototyping', 'UI Systems', 'App Design']}
        textColor="text-[#ffffff]"
        imageContent={<ProductImage />}
      />
    ),
  },
  {
    bg: '#f5f0e8',
    children: (
      <ServiceBlock
        title="Sprints"
        description="We work in rapid, focused cycles—prototyping, testing, and refining to move ideas forward quickly."
        list={['Rapid Prototyping', 'Design Sprints', 'MVP Development', 'Iteration & Optimization', 'Concept Testing']}
        imageContent={<WebsiteImage />}
      />
    ),
  },
  {
    bg: '#e8f5e9',
    children: (
      <ServiceBlock
        title="Experiential"
        description="Immersive brand experiences that create real-world impact."
        list={['Brand Activations', 'Events & Installations', 'Spatial Design', 'Interactive Experiences']}
        imageContent={<StrategyVideo />}
      />
    ),
  },
  {
    bg: '#1c1c2e',
    children: (
      <ServiceBlock
        title="Film & Content"
        description="Cinematic storytelling that elevates brands and drives engagement."
        list={['Brand Films', 'Campaign Content', 'Motion & Animation', 'Post-Production']}
        textColor="text-[#ffffff]"
        imageContent={<VisualImage />}
      />
    ),
  },
  {
    bg: '#2B59C3',
    children: (
      <ServiceBlock
        title="Objects"
        description="Physical expressions of your brand—designed with the same level of care and intention."
        list={['Corporate Gifting', 'Merchandise & Swag', 'Packaging', 'Custom Products']}
        textColor="text-[#ffffff]"
        imageContent={<ProductImage />}
      />
    ),
  },
];

export default function Services() {
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#F4EDD9';
    document.body.style.color = '#111111';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 0.82, y: 80, borderRadius: '32px' },
        {
          scale: 1,
          y: 0,
          borderRadius: '16px',
          ease: 'none',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 95%',
            end: 'top 20%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.page}
    >
      {/* ── Full-viewport hero ── */}
      <section className={styles.hero}>
        <motion.h1
          className={styles.heroHeading}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          We equip, empower, and inspire tomorrow's leaders through premium branding
        </motion.h1>
      </section>

      <div className={styles.divider} />

      {/* ── Body: sidebar + cards ── */}
      <section className={styles.body}>
        <motion.div
          className={styles.sidebar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className={styles.sidebarLabel}>When?</span>
          <p className={styles.sidebarText}>
            Our work focusses on B2B tech scaleups at Series A &amp; B stage. On top of that we work
            with one early stage startup at a time. Honoring both our passion and how we started.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {serviceCards.map((card, i) => (
            <motion.div
              key={card.id}
              className={`${styles.card} ${card.featured ? styles.cardFeatured : ''} ${card.bg ? styles.cardColored : ''
                }`}
              style={card.bg ? { backgroundColor: card.bg } : {}}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardInner}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
              <span className={styles.cardArrow} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Scroll-scale video ── */}
      <div className={styles.videoWrap}>
        <div ref={videoRef} className={styles.videoBox}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
            src={videoSrc}
          />
        </div>
      </div>

      {/* ── Branding services stacked section ── */}
      <div className={styles.brandingLabel}>Our branding services</div>
      <StackContainer panels={brandingPanels} />
    </motion.div>
  );
}
