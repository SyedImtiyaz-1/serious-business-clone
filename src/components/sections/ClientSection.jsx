import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ClientSection.module.css";

const clients = [
  { name: 'JPMorgan Chase', logo: 'jpmorgan.png' },
  { name: 'Berkshire Hathaway', logo: 'berkshire-hathaway-logonew.png' },
  { name: 'Jeffries', logo: '09_Jeffries_Logo.png' },
  { name: 'Special Olympics', logo: '1200px-Special_Olympics_logo.svg_-1.png' },
  { name: 'Eurotech', logo: '16_Eurotech_Logo.png' },
  { name: 'Signature Bank', logo: '23_Signature_Bank.png' },
  { name: 'Burson Marsteller', logo: 'Burson-Marsteller-logo_250px.png' },
  { name: 'Celadon', logo: 'Celadon_Logo.png' },
  { name: 'Humankind Investments', logo: 'HumankindInvestments_Logo.png' },
  { name: 'MIZ', logo: 'MIZ_Logo_SVG_Gadrientdark.png' },
  { name: 'Y&R', logo: 'YR.png' },
  { name: 'Centerbridge', logo: 'centerbridge.png' },
  { name: 'Kaplan', logo: 'kaplan.png' },
  { name: 'Hotel on Rivington', logo: 'rivington.png' },
  { name: 'Trish McEvoy', logo: 'trishmcevoy-1.png' },
  { name: 'Usher', logo: 'usher-new-logo_white.png' },
];

function FadeIn({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ClientSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Clients:</p>

        <motion.div className={styles.logoGrid} layout>
          {clients.map((client, i) => (
            <FadeIn key={client.name} delay={i * 0.04}>
              <div className={styles.logoCell}>
                <div className={styles.logoContent}>
                  <img
                    src={`/CliendLogo/${client.logo}`}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className={styles.clientLogoImg}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
