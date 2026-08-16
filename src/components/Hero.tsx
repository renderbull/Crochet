'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, Leaf, Gift } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative ambient blobs */}
      <div className={`${styles.glowBlob} ${styles.blob1}`} />
      <div className={`${styles.glowBlob} ${styles.blob2}`} />
      
      <div className={styles.heroContainer}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.tagline}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>Handmade with Love & Care</span>
          </div>
          
          <h1 className={styles.title}>
            From Yarn to Art — <br />
            <span className={styles.titleHighlight}>Made with Passion</span> & Joy
          </h1>
          
          <p className={styles.description}>
            Every creation is carefully handcrafted with patience and precision, bringing warmth, modern aesthetics, and a personal touch to your everyday life and special celebrations.
          </p>
          
          <div className={styles.actions}>
            <a href="#creations" className={styles.primaryBtn}>
              Explore Creations
            </a>
            <a href="#custom-orders" className={styles.secondaryBtn}>
              Bespoke Request
            </a>
          </div>

          {/* Social Proof / Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <Leaf size={16} />
              <span>100% Organic Yarn</span>
            </div>
            <div className={styles.badge}>
              <Heart size={16} />
              <span>Handcrafted Locally</span>
            </div>
            <div className={styles.badge}>
              <Gift size={16} />
              <span>Custom Gift Wrapping</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.visualBg}></div>
          
          {/* Main Visual Card */}
          <div className={styles.visualCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Heart size={24} style={{ fill: 'var(--accent-color)' }} />
              </div>
              <span className={styles.cardBadge}>Studio Piece</span>
            </div>
            <h3 className={styles.cardTitle}>Stitched with Heart</h3>
            <p className={styles.cardText}>
              Using premium organic cotton yarn and curated accessories. Made to bring joy and warmth to your home.
            </p>
            <div className={styles.cardFooter}>
              <span>By Priya In Mumbai, IN</span>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className={`${styles.floatingElement} ${styles.yarnElement}`}>🧶</div>
          <div className={`${styles.floatingElement} ${styles.flowerElement}`}>🌸</div>
        </motion.div>
      </div>
    </section>
  );
}

