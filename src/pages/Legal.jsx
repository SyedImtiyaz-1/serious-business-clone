import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Legal.module.css";

export default function Legal() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fbf0f2";
    document.body.style.color = "#020817";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>Legal</h1>
        <p className={styles.heroSub}>
          Last updated: 2026
        </p>
      </section>

      <article className={styles.body}>
        <section className={styles.block}>
          <h2 className={styles.blockHeading}>Imprint</h2>
          <p>
            Marshall Haber Creative Group
            <br />
            99 Wall Street, Suite #1467
            <br />
            New York, NY 10005, United States
          </p>
          <p>
            Email: <a href="mailto:studio@marshallhaber.com">studio@marshallhaber.com</a>
          </p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>Privacy</h2>
          <p>
            We respect your privacy. Personal data submitted through forms on this site is used solely
            to respond to your inquiry and is never sold or shared with third parties for marketing
            purposes. To request deletion or export of your data, contact us at the email above.
          </p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>Cookies</h2>
          <p>
            This site uses essential cookies for routing and accessibility. We do not use third-party
            tracking cookies. Analytics, when enabled, are anonymized and aggregated.
          </p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>Intellectual Property</h2>
          <p>
            All content, branding, and design assets on this site are the property of Marshall Haber
            Creative Group or our clients. Unauthorized reproduction is prohibited.
          </p>
        </section>
      </article>
    </motion.div>
  );
}
