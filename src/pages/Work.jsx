import { useState, useMemo } from 'react';
import TransitionLink from '../components/ui/TransitionLink';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects';
import vid2 from '../assets/vid2.mp4';
import styles from './Work.module.css';

export default function Work() {
  const [workType, setWorkType] = useState('Type of Work');
  const [clientType, setClientType] = useState('Type of Client');

  const categories = useMemo(() => [...new Set(projects.map(p => p.category))], []);
  const clients = useMemo(() => [...new Set(projects.map(p => p.client))], []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchWork = workType === 'Type of Work' || p.category === workType;
      const matchClient = clientType === 'Type of Client' || p.client === clientType;
      return matchWork && matchClient;
    });
  }, [workType, clientType]);

  const hasActiveFilters = workType !== 'Type of Work' || clientType !== 'Type of Client';

  const resetFilters = () => {
    setWorkType('Type of Work');
    setClientType('Type of Client');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.pageWrapper}
    >
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.heroContent}
        >
          <h1 className={styles.pageTitle}>Work</h1>
          <p className={styles.heroSubtitle}>
            A selection of recent projects across branding, digital, and creative direction.
          </p>
        </motion.div>
      </div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.filterSection}
      >
        <div className={styles.filterContainer}>
          <span className={styles.filterLabel}>Filter by:</span>

          <div className={styles.selectWrapper}>
            <select
              className={styles.selectFilter}
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              aria-label="Filter by type of work"
            >
              <option value="Type of Work">Type of Work</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className={styles.selectIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className={styles.selectWrapper}>
            <select
              className={styles.selectFilter}
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
              aria-label="Filter by type of client"
            >
              <option value="Type of Client">Type of Client</option>
              {clients.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className={styles.selectIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={resetFilters}
              className={styles.resetButton}
              aria-label="Reset filters"
            >
              Reset
            </motion.button>
          )}
        </div>

        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.activeFilters}
          >
            <span className={styles.resultsCount}>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} shown
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Grid Section */}
      <section className={styles.workGrid}>
        <motion.div layout className={styles.grid}>
          {/* Featured Project - Motorio */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.featuredCardWrapper}
          >
            <TransitionLink to="/work/motorio" className={styles.card}>
              <div className={styles.cardImage}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={vid2}
                  className={styles.cardMedia}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardBadge}>Featured</div>
                <h2 className={styles.cardTitle}>Motorio</h2>
                <p className={styles.cardSubtitle}>Automotive Branding</p>
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.viewText}>View project</span>
              </div>
            </TransitionLink>
          </motion.div>

          {/* Project Grid */}
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (i + 1) * 0.05 }}
              >
                <TransitionLink to={`/work/${project.slug}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.cardMedia}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                    <p className={styles.cardSubtitle}>{project.subtitle}</p>
                  </div>
                  <div className={styles.cardOverlay}>
                    <span className={styles.viewText}>View project</span>
                  </div>
                </TransitionLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.emptyState}
          >
            <p>No projects match your filters.</p>
            <button onClick={resetFilters} className={styles.emptyStateButton}>
              Clear filters
            </button>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}