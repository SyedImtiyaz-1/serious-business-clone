import { useState, useLayoutEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TransitionLink from '../components/ui/TransitionLink';
import ContactModal from '../components/ui/ContactModal';
import projects from '../data/projects';
import styles from './WorkDetail.module.css';

export default function WorkDetail() {
  const { slug } = useParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const project = projects.find((p) => p.slug === slug);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#F4EDD9";
    document.body.style.color = "#020817";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  if (!project) return <Navigate to="/work" replace />;

  const moreProjects = projects.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        {/* Header */}
        <section className={styles.heroHeader}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {project.category}
          </motion.p>
          <motion.h1
            className={styles.projectTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          {project.subtitle && project.subtitle.toLowerCase() !== project.category.toLowerCase() && (
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {project.subtitle}
            </motion.p>
          )}
        </section>

        {/* Info Grid */}
        <section className={styles.infoGrid}>
          <motion.div
            className={styles.infoColumn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.infoDivider} />
            <h3 className={styles.infoLabel}>Client</h3>
            <p className={styles.infoValue}>{project.client}</p>
          </motion.div>

          <motion.div
            className={styles.infoColumn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className={styles.infoDivider} />
            <h3 className={styles.infoLabel}>Industry</h3>
            <p className={styles.infoValue}>{project.category}</p>
          </motion.div>

          <motion.div
            className={styles.infoColumn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={styles.infoDivider} />
            <h3 className={styles.infoLabel}>Services</h3>
            <p className={styles.infoValue}>Strategy · Brand Identity · Website</p>
          </motion.div>
        </section>

        {project.description && (
          <motion.section
            className={styles.descriptionSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className={styles.description}>{project.description}</p>
          </motion.section>
        )}

        {/* Main Image */}
        <motion.section
          className={styles.mainImageWrapper}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img src={project.image} alt={project.title} className={styles.mainImage} />
        </motion.section>
      </div>

      {/* More Projects Section */}
      <section className={styles.moreProjects}>
        <div className={styles.container} style={{ padding: 0 }}>
          <h2 className={styles.moreProjectsHeader}>More projects</h2>
          <div className={styles.moreProjectsGrid}>
            {moreProjects.map((p, i) => (
              <TransitionLink to={`/work/${p.slug}`} key={p.slug} className={styles.projectCard}>
                <motion.div
                  className={styles.projectImageWrapper}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <img src={p.image} alt={p.title} className={styles.projectImage} />
                </motion.div>
                <div>
                  <h3 className={styles.projectCardTitle}>{p.title}</h3>
                  <p className={styles.projectCardCategory}>{p.category} &middot; Brand Identity &middot; Website</p>
                </div>
              </TransitionLink>
            ))}
          </div>
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
