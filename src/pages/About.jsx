import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransitionLink from '../components/ui/TransitionLink';
import ContactModal from '../components/ui/ContactModal';
import styles from './About.module.css';

const randomImages = [
  "https://picsum.photos/id/1015/500/400",
  "https://picsum.photos/id/1018/400/500",
  "https://picsum.photos/id/1025/600/400",
  "https://picsum.photos/id/1035/500/500",
  "https://picsum.photos/id/1043/450/450",
  "https://picsum.photos/id/1045/400/300",
  "https://picsum.photos/id/1048/500/350",
  "https://picsum.photos/id/1050/350/500",
];

export default function About() {
  const [trail, setTrail] = useState([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const count = useRef(0);
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();

    // Position relative to the section
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Spawn a new image every 80 pixels moved
    if (dist > 80) {
      lastPos.current = { x, y };

      const newImage = {
        id: Date.now() + Math.random(),
        src: randomImages[count.current % randomImages.length],
        x,
        y,
        rotate: (Math.random() - 0.5) * 30 // -15 to +15 deg
      };

      setTrail(prev => [...prev, newImage]);
      count.current += 1;

      // Unmount the image after 2 seconds
      setTimeout(() => {
        setTrail(prev => prev.filter(img => img.id !== newImage.id));
      }, 2000);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.pageWrapper}
    >
      <section
        ref={sectionRef}
        className={styles.heroSection}
        onMouseMove={handleMouseMove}
      >
        {/* Scattered Image Trail */}
        <AnimatePresence>
          {trail.map((img) => (
            <motion.img
              key={img.id}
              src={img.src}
              alt=""
              className={styles.trailImage}
              style={{
                top: img.y,
                left: img.x,
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: img.rotate }}
              animate={{ opacity: 1, scale: 1, rotate: img.rotate }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.8, ease: "easeOut" } }}
              transition={{ duration: 0.4, ease: "backOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Foreground Content */}
        <div className={styles.textContent}>
          <p className={styles.mainParagraph}>
            <strong>SERIOUS.BUSINESS</strong> started in 2015 as a <strong>passion project</strong> at Hyper Island, Stockholm by a diverse group of creatives with the goal of re-defining what a serious business is really about: <strong>kindness and creativity.</strong>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className={styles.ctaBlockDark}
          style={{ border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
        >
          <div className={styles.ctaTextTop}>
            <strong>You feel it too?</strong>
            <span>Let's talk, no strings attached</span>
          </div>
          <h2 className={styles.ctaHeading}>Send Request</h2>
        </button>

        <TransitionLink to="/services" className={styles.ctaBlockPink}>
          <div className={styles.ctaTextTop}>
            <strong>Our free offer for B2B tech scaleups!</strong>
            <span>We identify high-impact messaging and brand fixes you can implement within 24 hours.</span>
          </div>
          <div className={styles.ctaHeadingContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
              <polyline points="9 8 9 14 19 14"></polyline>
              <polyline points="15 10 19 14 15 18"></polyline>
            </svg>
            <div className={styles.ctaHeadingPinkGroup}>
              <h2 className={styles.ctaHeading}>Brand</h2>
              <h2 className={styles.ctaHeadingUnderlined}>Masterplan</h2>
            </div>
          </div>
        </TransitionLink>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </motion.div>
  );
}
