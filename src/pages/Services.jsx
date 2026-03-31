import { motion } from 'framer-motion';
import styles from './Services.module.css';

const services = [
  {
    title: 'Brand Strategy',
    intro: `It’s the core of your company’s identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.`,
    points: [
      'Research & Insights',
      'Brand Model',
      'Positioning',
      'Value proposition',
      'Messaging',
      'Verbal Identity',
      'Naming'
    ]
  },
  {
    title: 'Visual Identity',
    intro: `Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience.`,
    points: [
      'Logotype, Typography & Colour',
      'Visual Language',
      'Illustrations & 3D',
      'Art Direction',
      'Brandbook & Guidelines',
      'Motion Design'
    ]
  },
  {
    title: 'Website',
    intro: `Our website design services blend innovation and creativity to deliver user-centric solutions that elevate your brand and engage your audience.`,
    points: [
      'UX Design',
      'Website Design',
      'Responsive Design',
      'Website Motion',
      'Animations'
    ]
  },
  {
    title: 'Product',
    intro: `Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.`,
    points: [
      'UX Design',
      'User Testing',
      'Prototyping',
      'UI Design',
      'App Design',
      'Interaction Design'
    ]
  }
];

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className={styles.hero}>
        <motion.h1
          className={styles.heroHeading}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Services
        </motion.h1>
      </section>

      {/* Services */}
      <section className={styles.servicesList}>
        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className={styles.serviceItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h2 className={styles.serviceTitle}>{service.title}</h2>

              <p className={styles.serviceIntro}>{service.intro}</p>

              <p className={styles.servicePoints}>
                {service.points.join(' , ')}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}