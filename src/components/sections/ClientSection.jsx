import { motion } from "framer-motion";
import styles from "./ClientSection.module.css";

const clients = [
  { name: 'JPMorgan Chase', logo: 'jpmorgan.png' },
  { name: 'Berkshire Hathaway', logo: 'berkshire-hathaway-logonew.png' },
  { name: 'Jeffries', logo: '09_Jeffries_Logo.png' },
  { name: 'Eurotech', logo: '16_Eurotech_Logo.png' },
  { name: 'Signature Bank', logo: '23_Signature_Bank.png' },
  { name: 'Celadon', logo: 'Celadon_Logo.png' },
  { name: 'MIZ', logo: 'MIZ_Logo_SVG_Gadrientdark.png' },
  { name: 'Centerbridge', logo: 'centerbridge.png' },
];

export default function ClientSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>Trusted by Industry Leaders</p>
          <h2 className={styles.title}>Credibility that delivers results.</h2>
        </div>

        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[...clients, ...clients].map((client, i) => (
              <div key={`${client.name}-${i}`} className={styles.clientLogo}>
                <img 
                  src={`/CliendLogo/${client.logo}`} 
                  alt={client.name} 
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
