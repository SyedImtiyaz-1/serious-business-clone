import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TransitionLink from '../components/ui/TransitionLink';
import styles from './Clients.module.css';

/* ─── Inline SVG logos ─── */
const logos = {
    amnesty: () => (
        <svg viewBox="0 0 120 40" width="110" height="36">
            <g fill="currentColor">
                <path d="M10 4 L6 36 H8 L10 20 L14 36 H16 L12 4 Z" />
                <path d="M20 4 V36 H22 V22 L28 36 H30 V4 H28 V20 L22 4 Z" />
                <text x="36" y="14" fontSize="7" fontWeight="800" letterSpacing="0.5">AMNESTY</text>
                <text x="36" y="24" fontSize="7" fontWeight="800" letterSpacing="0.5">INTERNATIONAL</text>
            </g>
        </svg>
    ),
    braunbuffel: () => (
        <svg viewBox="0 0 140 30" width="130" height="28">
            <text x="70" y="17" textAnchor="middle" fontSize="11" fontWeight="400" fontStyle="italic" fontFamily="Georgia, serif" fill="currentColor" letterSpacing="1.5">Braun Büffel</text>
        </svg>
    ),
    vay: () => (
        <svg viewBox="0 0 80 36" width="80" height="36">
            <text x="40" y="26" textAnchor="middle" fontSize="28" fontWeight="900" fill="currentColor" letterSpacing="2">VAY</text>
        </svg>
    ),
    frontify: () => (
        <svg viewBox="0 0 100 30" width="100" height="30">
            <text x="50" y="21" textAnchor="middle" fontSize="16" fontWeight="600" fill="currentColor" letterSpacing="0.5">Frontify</text>
        </svg>
    ),
    play: () => (
        <svg viewBox="0 0 60 40" width="56" height="38">
            <circle cx="30" cy="20" r="18" fill="currentColor" />
            <text x="30" y="27" textAnchor="middle" fontSize="12" fontWeight="800" fill="white" letterSpacing="1">PLAY</text>
        </svg>
    ),
    volkswagen: () => (
        <svg viewBox="0 0 44 44" width="42" height="42">
            <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="22" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="currentColor">VW</text>
        </svg>
    ),
    arculus: () => (
        <svg viewBox="0 0 100 26" width="100" height="26">
            <text x="50" y="19" textAnchor="middle" fontSize="18" fontWeight="300" fill="currentColor" letterSpacing="3">arculus</text>
        </svg>
    ),
    wempe: () => (
        <svg viewBox="0 0 40 40" width="38" height="38">
            <circle cx="20" cy="20" r="18" fill="currentColor" />
            <text x="20" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill="white">W</text>
        </svg>
    ),
    unitednations: () => (
        <svg viewBox="0 0 120 36" width="110" height="34">
            <g fill="currentColor">
                <circle cx="16" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <text x="16" y="23" textAnchor="middle" fontSize="12" fontWeight="700">UN</text>
                <text x="38" y="16" fontSize="8" fontWeight="700" letterSpacing="0.5">UNITED</text>
                <text x="38" y="28" fontSize="8" fontWeight="700" letterSpacing="0.5">NATIONS</text>
            </g>
        </svg>
    ),
    zalando: () => (
        <svg viewBox="0 0 100 30" width="100" height="30">
            <text x="50" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="1">zalando</text>
            <line x1="10" y1="28" x2="90" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),
    deutschebank: () => (
        <svg viewBox="0 0 120 40" width="110" height="38">
            <g fill="currentColor">
                <rect x="4" y="8" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M10 26 L22 14" stroke="currentColor" strokeWidth="3" />
                <text x="36" y="18" fontSize="8" fontWeight="700" letterSpacing="0.5">Deutsche</text>
                <text x="36" y="30" fontSize="8" fontWeight="700" letterSpacing="0.5">Bank</text>
            </g>
        </svg>
    ),
    montblanc: () => (
        <svg viewBox="0 0 120 36" width="110" height="34">
            <g fill="currentColor">
                <circle cx="14" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="14,12 10,20 18,20" fill="currentColor" />
                <text x="30" y="23" fontSize="13" fontWeight="600" letterSpacing="1">Montblanc</text>
            </g>
        </svg>
    ),
    hugoboss: () => (
        <svg viewBox="0 0 120 30" width="116" height="28">
            <text x="60" y="22" textAnchor="middle" fontSize="18" fontWeight="900" fill="currentColor" letterSpacing="4">BOSS</text>
        </svg>
    ),
    porsche: () => (
        <svg viewBox="0 0 110 30" width="106" height="28">
            <text x="55" y="22" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor" letterSpacing="4">PORSCHE</text>
        </svg>
    ),
    audi: () => (
        <svg viewBox="0 0 100 30" width="96" height="28">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="22" cy="15" r="10" />
                <circle cx="38" cy="15" r="10" />
                <circle cx="54" cy="15" r="10" />
                <circle cx="70" cy="15" r="10" />
            </g>
        </svg>
    ),
    sap: () => (
        <svg viewBox="0 0 70 36" width="68" height="34">
            <rect x="4" y="6" width="62" height="24" rx="2" fill="currentColor" />
            <text x="35" y="23" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" letterSpacing="2">SAP</text>
        </svg>
    ),
    siemens: () => (
        <svg viewBox="0 0 120 28" width="116" height="26">
            <text x="60" y="21" textAnchor="middle" fontSize="17" fontWeight="600" fill="currentColor" letterSpacing="2">SIEMENS</text>
        </svg>
    ),
    adidas: () => (
        <svg viewBox="0 0 100 40" width="90" height="36">
            <g fill="currentColor">
                <rect x="24" y="6" width="8" height="22" rx="1" transform="rotate(-15 28 17)" />
                <rect x="36" y="2" width="8" height="26" rx="1" transform="rotate(-15 40 15)" />
                <rect x="48" y="-2" width="8" height="30" rx="1" transform="rotate(-15 52 13)" />
                <text x="50" y="38" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2">adidas</text>
            </g>
        </svg>
    ),
};

/* ─── Client data ─── */
const clients = [
    { name: 'Amnesty International', key: 'amnesty', category: 'Nonprofit' },
    { name: 'Braun Büffel', key: 'braunbuffel', category: 'Luxury' },
    { name: 'VAY', key: 'vay', category: 'Technology' },
    { name: 'Frontify', key: 'frontify', category: 'Technology' },
    { name: 'PLAY', key: 'play', category: 'Media' },
    { name: 'Volkswagen', key: 'volkswagen', category: 'Automotive' },
    { name: 'Arculus', key: 'arculus', category: 'Technology' },
    { name: 'Wempe', key: 'wempe', category: 'Luxury' },
    { name: 'United Nations', key: 'unitednations', category: 'Nonprofit' },
    { name: 'Zalando', key: 'zalando', category: 'Retail' },
    { name: 'Deutsche Bank', key: 'deutschebank', category: 'Finance' },
    { name: 'Montblanc', key: 'montblanc', category: 'Luxury' },
    { name: 'Hugo Boss', key: 'hugoboss', category: 'Fashion' },
    { name: 'Porsche', key: 'porsche', category: 'Automotive' },
    { name: 'Audi', key: 'audi', category: 'Automotive' },
    { name: 'SAP', key: 'sap', category: 'Technology' },
    { name: 'Siemens', key: 'siemens', category: 'Technology' },
    { name: 'Adidas', key: 'adidas', category: 'Fashion' },
];

const categories = ['All', ...Array.from(new Set(clients.map(c => c.category)))];

const stats = [
    { number: '95', suffix: '%', label: 'Of the clients we work with are built on long-term partnerships' },
    { number: '40', suffix: '+', label: 'Top startups across global markets, EU/USA Markets' },
    { number: '180', suffix: '+', label: 'Strategies we have designed for our clients' },
    { number: '320', suffix: 'M€', label: 'Of funding was raised by our partner clients and us' },
];

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
                        const LogoSvg = logos[client.key];
                        return (
                            <FadeIn key={client.key} delay={i * 0.04}>
                                <div className={styles.logoCell}>
                                    <div className={styles.logoContent}>
                                        {LogoSvg ? <LogoSvg /> : <span className={styles.logoName}>{client.name}</span>}
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </motion.div>
            </section>

            {/* Stats */}
            <section className={styles.stats}>
                {stats.map((stat, i) => (
                    <FadeIn key={stat.label} className={styles.statItem} delay={i * 0.08}>
                        <span className={styles.statNumber}>
                            {stat.number}<span className={styles.statSuffix}>{stat.suffix}</span>
                        </span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </FadeIn>
                ))}
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
