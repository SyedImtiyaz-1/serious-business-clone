import { motion } from 'framer-motion';
import { useLayoutEffect } from 'react';
import { usePageContent } from '../hooks/usePageContent';
import { getContent } from '../lib/content';
import { defaults } from '../lib/contentDefaults';

import StackContainer from '../components/layout/StackContainer';
import ServiceBlock, { StrategyVideo, VisualImage, WebsiteImage, ProductImage } from '../components/sections/Services';

import styles from './Services.module.css';

const PANEL_VISUALS = [
  <StrategyVideo key="0" />,
  <VisualImage key="1" />,
  <WebsiteImage key="2" />,
  <ProductImage key="3" />,
  <WebsiteImage key="4" />,
  <StrategyVideo key="5" />,
  <VisualImage key="6" />,
  <ProductImage key="7" />,
];

export default function Services() {
  const { sections } = usePageContent("services");
  const heroHeading = getContent(sections, "hero.heading", defaults.services.hero.heading);
  const cmsServicePanels = getContent(sections, "servicePanels", defaults.services.servicePanels);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#fbf0f2';
    document.body.style.color = '#111111';

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const servicePanels = cmsServicePanels.map((panel, i) => {
    const items = Array.isArray(panel.items)
      ? panel.items
      : typeof panel.items === "string"
        ? panel.items.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    return {
      bg: panel.bg,
      children: (
        <ServiceBlock
          title={panel.title}
          description={panel.description}
          list={items}
          imageContent={PANEL_VISUALS[i % PANEL_VISUALS.length]}
          textColor={panel.textColor || "text-[#fbf0f2]"}
        />
      ),
    };
  });

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
          {heroHeading}
        </motion.h1>
      </section>

      <div className={styles.divider} />

      <StackContainer panels={servicePanels} />

    </motion.div>
  );
}
