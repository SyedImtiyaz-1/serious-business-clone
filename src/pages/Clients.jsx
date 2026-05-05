import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import TransitionLink from '../components/ui/TransitionLink';
import styles from './Clients.module.css';

/* ─── Client data mapping ─── */
const clients = [
    { name: 'JPMorgan Chase', logo: 'jpmorgan.png', category: 'Finance' },
    { name: 'Berkshire Hathaway', logo: 'berkshire-hathaway-logonew.png', category: 'Finance' },
    { name: 'Jeffries', logo: '09_Jeffries_Logo.png', category: 'Finance' },
    { name: 'Special Olympics', logo: '1200px-Special_Olympics_logo.svg_-1.png', category: 'Nonprofit' },
    { name: 'Eurotech', logo: '16_Eurotech_Logo.png', category: 'Technology' },
    { name: 'Signature Bank', logo: '23_Signature_Bank.png', category: 'Finance' },
    { name: 'Burson Marsteller', logo: 'Burson-Marsteller-logo_250px.png', category: 'Communications' },
    { name: 'Celadon', logo: 'Celadon_Logo.png', category: 'Technology' },
    { name: 'Humankind Investments', logo: 'HumankindInvestments_Logo.png', category: 'Finance' },
    { name: 'MIZ', logo: 'MIZ_Logo_SVG_Gadrientdark.png', category: 'Technology' },
    { name: 'Y&R', logo: 'YR.png', category: 'Advertising' },
    { name: 'Centerbridge', logo: 'centerbridge.png', category: 'Finance' },
    { name: 'Kaplan', logo: 'kaplan.png', category: 'Education' },
    { name: 'Rivington', logo: 'rivington.png', category: 'Finance' },
    { name: 'Trish McEvoy', logo: 'trishmcevoy-1.png', category: 'Beauty' },
    { name: 'Usher', logo: 'usher-new-logo_white.png', category: 'Entertainment' },
];

const categories = ['All', ...Array.from(new Set(clients.map(c => c.category)))];

/* ─── Fade-in wrapper ─── */
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

/* ─── Main ─── */
export default function Clients() {
    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#fbf0f2";
        document.body.style.color = "#020817";
        return () => {
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
        };
    }, []);

    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? clients
        : clients.filter(c => c.category === activeFilter);

    return (
        <motion.div
            className={styles.page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero */}
            <section className={styles.hero}>
                <motion.p
                    className={styles.heroLabel}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Our Partners
                </motion.p>
                <motion.h1
                    className={styles.heroHeading}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    Credibility has an impact<br />in numbers
                </motion.h1>
                <motion.p
                    className={styles.heroSub}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                >
                    Bookings in Europe and the Americas partner with us for our expertise in Brand Strategy, Identity, Marketing &amp; Product.
                </motion.p>
            </section>

            {/* Filter pills */}
            <div className={styles.filters}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Logo grid */}
            <section className={styles.gridSection}>
                <p className={styles.gridHeading}>Trusted by industry leaders</p>
                <p className={styles.gridSubtext}>
                    Bookings in Europe and the Americas partner with us for our expertise in Brand Strategy, Identity, Marketing &amp; Product.
                </p>
                <motion.div className={styles.logoGrid} layout>
                    {filtered.map((client, i) => {
                        return (
                            <FadeIn key={client.name} delay={i * 0.04}>
                                <div className={styles.logoCell}>
                                    <div className={styles.logoContent}>
                                        <img 
                                            src={`/CliendLogo/${client.logo}`} 
                                            alt={client.name} 
                                            className={styles.clientLogoImg}
                                        />
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </motion.div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <FadeIn>
                    <h2 className={styles.ctaHeading}>Want to join our client roster?</h2>
                    <TransitionLink to="/contact" className={styles.ctaButton}>
                        Get in Touch
                    </TransitionLink>
                </FadeIn>
            </section>
        </motion.div>
    );
}
