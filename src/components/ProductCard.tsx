'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import { getCategoryTheme, ColorTheme } from '@/lib/colorExtractor';
import Image from 'next/image';
import styles from './Products.module.css';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const theme = getCategoryTheme(product.category);

  return (
    <motion.div 
      className={styles.card}
      style={{
        // Inject dynamic theme colors as custom properties
        '--theme-accent': theme.accent,
        '--theme-accent-hover': theme.accentHover,
        '--theme-light-bg': theme.lightBg,
        '--theme-border': theme.border,
        '--theme-glow': theme.glow,
      } as React.CSSProperties}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20, 
        layout: { duration: 0.3 } 
      }}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.cardCategory}>{product.category.replace('-', ' ')}</div>
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          className={styles.image}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
      
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
          <button 
            onClick={() => onViewDetails(product)} 
            className={styles.viewBtn}
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={16} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
