import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ComingSoon() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                width: '100%',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg, #fcfbf8)',
                padding: '2rem',
                textAlign: 'center',
                gap: '2rem'
            }}
        >
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: '#111' }}>
                Coming Soon
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(0, 0, 0, 0.6)', maxWidth: '600px', margin: 0 }}>
                We are actively working on this page. Check back soon!
            </p>
            <Link
                to="/"
                style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#111',
                    color: '#fff',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    marginTop: '1rem'
                }}
            >
                Go back home
            </Link>
        </motion.div>
    );
}
