import { useParams, Navigate } from 'react-router-dom';
import TransitionLink from '../components/ui/TransitionLink';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import styles from './WorkDetail.module.css';

export default function WorkDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 0 }} />
        <TransitionLink to="/work" className={styles.backLink} style={{ position: 'relative', zIndex: 1 }}>
          ← All Work
        </TransitionLink>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {project.title}
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {project.subtitle}
        </motion.p>
      </section>

      <section className={styles.infoSection}>
        <p className={styles.client}>{project.client}</p>
        <p className={styles.description}>{project.description || project.subtitle}</p>
        <div className={styles.tags}>
          <span className={styles.tag}>{project.category}</span>
        </div>
      </section>
    </motion.div>
  );
}
