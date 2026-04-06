import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactModal.module.css';

export default function ContactModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // Escape key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto'; // safety
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Usually an API call here. Just close it for now.
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className={styles.overlay}>
            {/* Backdrop */}
            <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                transition={{ duration: 0.4 }}
            />

            {/* Modal Container */}
            <motion.div
                className={styles.modal}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className={styles.content}>
                    <h2 className={styles.heading}>Let's talk.</h2>
                    <p className={styles.subHeading}>
                        No strings attached. Tell us about your project, and we'll be in touch.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="modal-name">Name</label>
                            <input
                                id="modal-name"
                                type="text"
                                required
                                placeholder="Jane Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="modal-email">Email</label>
                            <input
                                id="modal-email"
                                type="email"
                                required
                                placeholder="jane@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="modal-message">How can we help?</label>
                            <textarea
                                id="modal-message"
                                required
                                rows="4"
                                placeholder="Tell us a little about your goals..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Send Request &rarr;
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
