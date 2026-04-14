import { useState, useMemo, useLayoutEffect, useEffect } from 'react';
import TransitionLink from '../components/ui/TransitionLink';
import { motion } from 'framer-motion';
import hardcodedProjects from '../data/projects';
import styles from './Work.module.css';

export default function Work() {
  const [activeTab, setActiveTab] = useState('Featured');
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [cmsProjects, setCmsProjects] = useState([]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#F4EDD9";
    document.body.style.color = "#020817";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  // Fetch CMS projects and merge with hardcoded
  useEffect(() => {
    fetch("/api/admin/pages/work")
      .then(res => res.json())
      .then(data => {
        const cms = data?.sections?.projects || [];
        const mapped = cms
          .filter(p => p.title)
          .map(p => ({
            slug: p.slug || p.title.toLowerCase().replace(/\s+/g, '-'),
            title: p.title,
            subtitle: p.subtitle || '',
            category: p.category || 'Uncategorized',
            client: p.client || p.title,
            description: p.description || '',
            image: p.imageUrl || '',
            video: p.videoUrl || '',
            fromCms: true,
          }));
        setCmsProjects(mapped);
      })
      .catch(() => {});
  }, []);

  // Merge: hardcoded first, then CMS-added (skip duplicates by slug)
  const allProjects = useMemo(() => {
    const hardcodedSlugs = new Set(hardcodedProjects.map(p => p.slug));
    const newCms = cmsProjects.filter(p => !hardcodedSlugs.has(p.slug));
    return [...hardcodedProjects, ...newCms];
  }, [cmsProjects]);

  const industries = useMemo(() => ['All', ...new Set(allProjects.map(p => p.category))], [allProjects]);
  const industriesCount = useMemo(() => new Set(allProjects.map(p => p.category)).size, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'Featured') {
      return allProjects.slice(0, 6);
    }
    if (activeTab === 'Industries' && activeIndustry !== 'All') {
      return allProjects.filter(p => p.category === activeIndustry);
    }
    return allProjects;
  }, [activeTab, activeIndustry, allProjects]);

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
            Featured<span className={styles.tabCount}>{String(Math.min(6, allProjects.length)).padStart(2, '0')}</span>
          </button>
          <button
            className={styles.tabButton}
            aria-selected={activeTab === 'All projects'}
            onClick={() => setActiveTab('All projects')}
          >
            All projects<span className={styles.tabCount}>{allProjects.length}</span>
          </button>
          <button
            className={styles.tabButton}
            aria-selected={activeTab === 'Industries'}
            onClick={() => setActiveTab('Industries')}
          >
            Industries<span className={styles.tabCount}>{String(industriesCount).padStart(2, '0')}</span>
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
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.cardMedia}
                    />
                  ) : project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.cardMedia}
                    />
                  ) : (
                    <div className={styles.cardMedia} style={{ backgroundColor: '#e0e0e0', width: '100%', height: '100%' }} />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{project.client} | {project.title}</h2>
                  <p className={styles.cardSubtitle}>
                    {project.category} – Visual Identity – Website
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
