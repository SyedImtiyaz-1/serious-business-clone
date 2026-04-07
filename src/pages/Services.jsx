import { motion } from 'framer-motion';
import styles from './Services.module.css';

const leftColumnData = [
  {
    type: 'intro',
    title: 'Services',
    text: 'We partner with brands to solve complex challenges—combining strategy, design, and execution in focused, high-impact sprints.'
  },
  {
    type: 'service',
    title: 'Strategy',
    text: 'We define the clarity and direction that everything else builds on.',
    items: ['Research & Insights', 'Brand Architecture', 'Positioning', 'Messaging', 'Naming']
  },
  {
    type: 'service',
    title: 'Product',
    text: 'Thoughtfully designed products that are intuitive, refined, and built for real use.',
    items: ['UX Design', 'Prototyping', 'UI Systems', 'App Design']
  },
  {
    type: 'service',
    title: 'Sprints',
    text: 'We work in rapid, focused cycles—prototyping, testing, and refining to move ideas forward quickly.',
    items: ['Rapid Prototyping', 'Design Sprints', 'MVP Development', 'Iteration & Optimization', 'Concept Testing']
  }
];

const rightColumnData = [
  {
    type: 'service',
    title: 'Identity',
    text: 'Distinctive visual systems designed to be immediate, enduring, and unmistakable.',
    items: ['Logo & Wordmark', 'Typography & Color', 'Art Direction', 'Brand Systems', 'Guidelines']
  },
  {
    type: 'service',
    title: 'Digital',
    text: 'High-performance digital experiences—designed with precision and built to scale.',
    items: ['UX & UI Design', 'Website Design', 'Web Development', 'Interaction & Motion']
  },
  {
    type: 'service',
    title: 'Experiential',
    text: 'Immersive brand experiences that create real-world impact.',
    items: ['Brand Activations', 'Events & Installations', 'Spatial Design', 'Interactive Experiences']
  },
  {
    type: 'service',
    title: 'Film & Content',
    text: 'Cinematic storytelling that elevates brands and drives engagement.',
    items: ['Brand Films', 'Campaign Content', 'Motion & Animation', 'Post-Production']
  },
  {
    type: 'service',
    title: 'Objects',
    text: 'Physical expressions of your brand—designed with the same level of care and intention.',
    items: ['Corporate Gifting', 'Merchandise & Swag', 'Packaging', 'Custom Products']
  }
];

const servicesData = [
  ...leftColumnData,
  ...rightColumnData
];

function RenderBlock({ item, index }) {
  return (
    <motion.div
      className={styles.block}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 + (index % 2) * 0.1 + Math.floor(index / 2) * 0.05 }}
    >
      <h3 className={styles.blockTitle}>{item.title}</h3>
      <p className={styles.blockText}>{item.text}</p>
      {item.items && (
        <ul className={styles.blockList}>
          {item.items.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.pageWrapper}
    >
      <div className={styles.container}>
        {/* Top Hero Heading */}
        <section className={styles.heroSection}>
          <motion.h1
            className={styles.heroHeading}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            We equip, empower, and inspire tomorrow's leaders through premium branding
          </motion.h1>
        </section>

        {/* Content Divider */}
        <div className={styles.divider} />

        {/* 2-Column Grid Section */}
        <section className={styles.contentSection}>
          {servicesData.map((item, i) => (
            <RenderBlock key={item.title} item={item} index={i} />
          ))}
        </section>
      </div>

      {/* Financial Expertise Banner */}
      <section className={styles.bannerSection}>
        <motion.div
          className={styles.bannerCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <svg className={styles.bannerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <h2 className={styles.bannerHeading}>Financial expertise unlocked by technology</h2>
          <p className={styles.bannerText}>
            Our technology improves decision making by analyzing complex data profiles and hidden patterns. A sophisticated data device here to empower you with aspects previously unimagined.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}