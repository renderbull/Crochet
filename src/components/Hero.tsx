'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShoppingBag } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.tagline}>
            <Sparkles size={16} />
            <span>Handmade with Love</span>
          </div>
          
          <h1 className={styles.title}>
            From Yarn to Art — <br />
            <span className={styles.titleHighlight}>Made with Passion</span> & Care
          </h1>
          
          <p className={styles.description}>
            Every piece is thoughtfully handcrafted with love, patience, and attention to detail, 
            bringing warmth, beauty, and a personal touch to every creation.
          </p>
          
          <p className={styles.secondaryText}>
            Whether you&apos;re looking for a meaningful gift, a festive keepsake, or something 
            special for yourself, each item is made to celebrate creativity and craftsmanship.
          </p>
          
          <div className={styles.actions}>
            <a href="#creations" className={styles.primaryBtn}>
              Explore Creations
            </a>
            <a href="#custom-orders" className={styles.secondaryBtn}>
              Custom Orders
            </a>
          </div>
        </motion.div>

        <motion.div 
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.visualBg}></div>
          <div className={styles.visualCard}>
            <div className={styles.cardIcon}>
              <Heart size={28} />
            </div>
            <h3 className={styles.cardTitle}>Stitched with Heart</h3>
            <p className={styles.cardText}>
              Using premium organic cotton yarn and curated accessories. Made to bring joy and warmth to your home.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
