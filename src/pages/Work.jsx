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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.headerContainer}>
        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Work
        </motion.h1>
        <div className={styles.headerFilters}>
          <span className={styles.viewBy}>View by:</span>
          <select 
            className={styles.selectFilter} 
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <option value="Type of Work">Type of Work</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select 
            className={styles.selectFilter} 
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
          >
            <option value="Type of Client">Type of Client</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <section className={styles.workGrid}>
        <motion.div layout className={styles.grid}>
          {/* Motorio — video project card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TransitionLink to="/work/motorio" className={styles.card}>
              <div className={styles.cardImage}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={vid2}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h2 className={styles.cardTitle}>Motorio</h2>
              <p className={styles.cardSubtitle}>Automotive Branding</p>
            </TransitionLink>
          </motion.div>

          <AnimatePresence>
            {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TransitionLink to={`/work/${project.slug}`} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h2 className={styles.cardTitle}>{project.title}</h2>
                <p className={styles.cardSubtitle}>{project.subtitle}</p>
              </TransitionLink>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
}
