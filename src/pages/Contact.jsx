import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import heroVideo from '../assets/video.mp4';
import styles from './Contact.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] },
  }),
};

function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection>
            <span className={styles.heroLabel}>Contact</span>
          </AnimatedSection>
          <AnimatedSection delay={1}>
            <h1 className={styles.heroTitle}>
              Let's create<br />something great
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={2}>
            <p className={styles.heroSubtitle}>
              We'd love to hear about your next project
            </p>
          </AnimatedSection>
        </div>

        {/* Video */}
        <AnimatedSection delay={3} className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video
              className={styles.heroVideoPlayer}
              autoPlay
              muted
              loop
              playsInline
              src={heroVideo}
            />
            <div className={styles.videoOverlay} />
          </div>
        </AnimatedSection>
      </section>

      {/* Info Cards */}
      <section className={styles.infoSection}>
        <AnimatedSection className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h3 className={styles.infoCardTitle}>Visit Us</h3>
          <p className={styles.infoCardText}>
            99 Wall Street +1467<br />
            New York, NY 10005
          </p>
          <p className={styles.infoCardMuted}>New York · Toronto · Florida</p>
        </AnimatedSection>

        <AnimatedSection delay={1} className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h3 className={styles.infoCardTitle}>Call Us</h3>
          <p className={styles.infoCardText}>
            <a href="tel:+12124949052">+1 (212) 494-9052</a>
          </p>
          <p className={styles.infoCardMuted}>Mon - Fri, 9am - 6pm EST</p>
        </AnimatedSection>

        <AnimatedSection delay={2} className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3 className={styles.infoCardTitle}>Email Us</h3>
          <p className={styles.infoCardText}>
            <a href="mailto:newbiz@marshallhaber.com">newbiz@marshallhaber.com</a>
          </p>
          <p className={styles.infoCardMuted}>We'll respond within 24 hours</p>
        </AnimatedSection>
      </section>

      {/* Form Section */}
      <section className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <AnimatedSection className={styles.formLeft}>
            <span className={styles.formLabel}>Get in touch</span>
            <h2 className={styles.formTitle}>
              Want to work<br />with us?
            </h2>
            <p className={styles.formSubtext}>
              Let us know a bit about you and your business idea, challenge, or needs. We'll get back to you within one business day.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={1} className={styles.formRight}>
            {submitted ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.successIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Thank you!</h3>
                <p>We've received your message and will be in touch shortly.</p>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={`${styles.inputGroup} ${focused === 'name' ? styles.focused : ''}`}>
                    <label htmlFor="contact-name">Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className={styles.input}
                      required
                      id="contact-name"
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div className={`${styles.inputGroup} ${focused === 'email' ? styles.focused : ''}`}>
                    <label htmlFor="contact-email">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={styles.input}
                      required
                      id="contact-email"
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div className={`${styles.inputGroup} ${focused === 'company' ? styles.focused : ''}`}>
                  <label htmlFor="contact-company">Company</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className={styles.input}
                    id="contact-company"
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div className={`${styles.inputGroup} ${focused === 'message' ? styles.focused : ''}`}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    placeholder="Tell us about your project..."
                    className={styles.textarea}
                    rows="5"
                    required
                    id="contact-message"
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    id="subscribe-checkbox"
                  />
                  <label htmlFor="subscribe-checkbox" className={styles.checkboxLabel}>
                    Send me occasional updates on events, insights, and services
                  </label>
                </div>

                <button type="submit" className={styles.submitBtn} id="contact-submit">
                  <span>Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
}
