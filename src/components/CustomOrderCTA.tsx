'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';
import styles from './Products.module.css';

export default function CustomOrderCTA() {
  const handleCustomInquiry = () => {
    const text = encodeURIComponent(
      "Hello Priya! I have a unique handcrafted idea in mind and would love to design a custom creation with you."
    );
    window.open(`https://wa.me/918591055314?text=${text}`, '_blank');
  };

  return (
    <section id="custom-orders" className={styles.customSection}>
      <motion.div 
        className={styles.customContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ color: 'var(--accent-color)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Sparkles size={20} />
          <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1rem' }}>Bespoke Designs</span>
        </div>
        
        <h2 className={styles.customTitle}>Have a unique idea in mind?</h2>
        
        <p className={styles.customText}>
          I&apos;d be delighted to create a custom design just for you. Share your vision, and together we&apos;ll turn it into a beautiful handmade creation.
        </p>
        
        <button onClick={handleCustomInquiry} className={styles.customBtn} aria-label="Discuss Custom Order on WhatsApp">
          <MessageSquare size={18} />
          <span>Discuss Custom Order</span>
        </button>
      </motion.div>
    </section>
  );
}
