import { useState, useMemo } from 'react';
import TransitionLink from '../components/ui/TransitionLink';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import styles from './Work.module.css';

export default function Work() {
  const [activeTab, setActiveTab] = useState('Featured');
  const [activeIndustry, setActiveIndustry] = useState('All');

  const industries = useMemo(() => ['All', ...new Set(projects.map(p => p.category))], []);
  const industriesCount = useMemo(() => new Set(projects.map(p => p.category)).size, []);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'Featured') {
      return projects.slice(0, 6);
    }
    if (activeTab === 'Industries' && activeIndustry !== 'All') {
      return projects.filter(p => p.category === activeIndustry);
    }
    return projects;
  }, [activeTab, activeIndustry]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={styles.pageWrapper}
    >
      {/* Tabs Header Section */}
      <section className={styles.tabsSection}>
        <div className={styles.tabsContainer}>
          <button
            className={styles.tabButton}
            aria-selected={activeTab === 'Featured'}
            onClick={() => setActiveTab('Featured')}
          >
            Featured<span className={styles.tabCount}>06</span>
          </button>
          <button
            className={styles.tabButton}
            aria-selected={activeTab === 'All projects'}
            onClick={() => setActiveTab('All projects')}
          >
            All projects<span className={styles.tabCount}>{projects.length}</span>
          </button>
          <button
            className={styles.tabButton}
            aria-selected={activeTab === 'Industries'}
            onClick={() => setActiveTab('Industries')}
          >
            Industries<span className={styles.tabCount}>0{industriesCount}</span>
            {activeTab === 'Industries' && <div className={styles.tabDot} />}
          </button>
        </div>
      </section>

      {/* Industries Sub-filter */}
      {activeTab === 'Industries' && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          style={{ overflow: 'hidden' }}
        >
          <div className={styles.subFilters}>
            {industries.map(ind => (
              <button
                key={ind}
                className={`${styles.subFilterBtn} ${activeIndustry === ind ? styles.subFilterBtnActive : ''}`}
                onClick={() => setActiveIndustry(ind)}
              >
                {ind}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grid Section */}
      <section className={styles.workGrid}>
        <motion.div className={styles.grid}>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
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
                  <h2 className={styles.cardTitle}>{project.client} | {project.title}</h2>
                  <p className={styles.cardSubtitle}>
                    {project.category} &middot; Visual Identity &middot; Website
                  </p>
                </div>
              </TransitionLink>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}