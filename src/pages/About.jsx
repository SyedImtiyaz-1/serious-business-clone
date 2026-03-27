import { useRef } from 'react';
import TransitionLink from '../components/ui/TransitionLink';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const stats = [
  { number: '20+', label: 'Years of Experience' },
  { number: '200+', label: 'Projects Delivered' },
  { number: '3', label: 'Global Offices' },
  { number: '50+', label: 'Industry Awards' },
];

const values = [
  {
    title: 'Clarity Over Complexity',
    desc: 'We strip away noise to find the idea that matters — then build everything around it.',
  },
  {
    title: 'Craft at Every Scale',
    desc: 'From a single wordmark to a complete brand system, every detail is deliberate.',
  },
  {
    title: 'Partnership, Not Service',
    desc: 'We embed ourselves in your business so the work reflects real understanding, not assumptions.',
  },
  {
    title: 'Endurance Over Trend',
    desc: 'We design brands that outlast cycles — built on substance, not style alone.',
  },
];

const expertise = [
  'Brand Strategy',
  'Visual Identity',
  'Naming & Messaging',
  'Digital Experience',
  'Campaign & Content',
  'Environmental Design',
];

function FadeIn({ children, delay = 0, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className={styles.hero}>
        <motion.p
          className={styles.heroLabel}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          About the Studio
        </motion.p>
        <motion.h1
          className={styles.heroHeading}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          We build brands that<br />
          speak with quiet authority.
        </motion.h1>
      </section>

      {/* Philosophy — two columns */}
      <section className={styles.philosophy}>
        <FadeIn className={styles.philLeft}>
          <h2 className={styles.philHeading}>Est. 2005</h2>
          <p className={styles.philSubtext}>New York &middot; Toronto &middot; Florida</p>
        </FadeIn>
        <FadeIn className={styles.philRight} delay={0.15}>
          <p className={styles.philBody}>
            Marshall Haber Creative Group is a full-service brand and advertising agency headquartered in New York City. For two decades, we've partnered with ambitious organizations — from global financial institutions to cultural nonprofits — delivering brand systems that are precise, purposeful, and built to endure.
          </p>
          <p className={styles.philBody}>
            We believe the strongest brands are rooted in clarity. Our work begins with deep listening and ends with creative that earns attention without demanding it.
          </p>
        </FadeIn>
      </section>

      {/* Full-width video */}
      <FadeIn>
        <section className={styles.imageSection}>
          <video
            src="/about.mp4"
            className={styles.fullImage}
            autoPlay
            loop
            muted
            playsInline
          />
        </section>
      </FadeIn>

      {/* Stats */}
      <section className={styles.stats}>
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} className={styles.statItem} delay={i * 0.08}>
            <span className={styles.statNumber}>{stat.number}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </FadeIn>
        ))}
      </section>

      {/* Approach */}
      <section className={styles.approach}>
        <FadeIn className={styles.approachHeader}>
          <p className={styles.sectionLabel}>Our Approach</p>
          <h2 className={styles.approachHeading}>
            Guided by clarity,<br />driven by experience.
          </h2>
        </FadeIn>
        <div className={styles.valuesGrid}>
          {values.map((value, i) => (
            <FadeIn key={value.title} className={styles.valueItem} delay={i * 0.08}>
              <span className={styles.valueIndex}>0{i + 1}</span>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDesc}>{value.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Dark name section */}
      <section className={styles.nameSection}>
        <FadeIn>
          <p className={styles.nameLabel}>Founder & Creative Director</p>
          <h2 className={styles.nameHeading}>Marshall Haber</h2>
          <p className={styles.nameText}>
            What began as a passion for brand transformation has grown into a deeply collaborative practice, helping clients navigate complexity with precision, purpose, and a quiet confidence.
          </p>
        </FadeIn>
      </section>

      {/* Expertise */}
      <section className={styles.expertiseSection}>
        <FadeIn className={styles.expertiseHeader}>
          <p className={styles.sectionLabel}>Capabilities</p>
          <h2 className={styles.expertiseHeading}>What we do</h2>
        </FadeIn>
        <div className={styles.expertiseList}>
          {expertise.map((item, i) => (
            <FadeIn key={item} className={styles.expertiseItem} delay={i * 0.06}>
              <span className={styles.expertiseName}>{item}</span>
              <span className={styles.expertiseArrow}>&rarr;</span>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <FadeIn>
          <h2 className={styles.ctaHeading}>Ready to transform your brand?</h2>
          <TransitionLink to="/contact" className={styles.ctaButton}>
            Get in Touch
          </TransitionLink>
        </FadeIn>
      </section>
    </motion.div>
  );
}
