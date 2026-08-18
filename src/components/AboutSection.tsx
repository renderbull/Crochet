'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Leaf, Compass } from 'lucide-react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutContainer}>
        
        {/* Visual element on left/right */}
        <motion.div 
          className={styles.aboutVisual}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.imageWrapper}>
            <img 
              src="/accessories/accessories_02.jpeg" 
              alt="Crafting crochet art" 
              className={styles.aboutImage}
            />
            <div className={styles.experienceBadge}>
              <span className={styles.expNumber}>100%</span>
              <span className={styles.expText}>Handmade Art</span>
            </div>
          </div>
        </motion.div>

        {/* Content detail on the right */}
        <motion.div 
          className={styles.aboutContent}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          <div className={styles.tagline}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>Our Artistry & Story</span>
          </div>

          <h2 className={styles.title}>
            Meticulously Stitched, <br />
            Designed to Inspire
          </h2>

          <p className={styles.description}>
            Welcome to the studio of Priya. What started as a simple hobby of working with yarn has grown into an artisan boutique specializing in premium, tactile creations. We believe in the warmth of physical items crafted one stitch at a time.
          </p>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Leaf size={18} />
              </div>
              <h3 className={styles.pillarTitle}>Organic Yarn</h3>
              <p className={styles.pillarText}>
                We select the finest organic cotton threads and high-quality yarns that are soft, hypoallergenic, and durable.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Heart size={18} />
              </div>
              <h3 className={styles.pillarTitle}>Made with Love</h3>
              <p className={styles.pillarText}>
                Every product is stitched completely by hand in Mumbai, embedding care and warm energy in every piece.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Compass size={18} />
              </div>
              <h3 className={styles.pillarTitle}>Bespoke Design</h3>
              <p className={styles.pillarText}>
                No two handmade products are identical. Your purchase is uniquely yours, reflecting artistic individuality.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Sparkles size={18} />
              </div>
              <h3 className={styles.pillarTitle}>Festive Touch</h3>
              <p className={styles.pillarText}>
                From personalized couple Rakhis to daily statement earrings, we bring festive joy to your doorstep.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
