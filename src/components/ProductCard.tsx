'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import { extractThemeFromImage, ColorTheme, DEFAULT_THEME } from '@/lib/colorExtractor';
import styles from './Products.module.css';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [theme, setTheme] = useState<ColorTheme>(DEFAULT_THEME);

  useEffect(() => {
    if (product.images && product.images[0]) {
      extractThemeFromImage(product.images[0]).then(setTheme);
    }
  }, [product.images]);

  return (
    <motion.div 
      className={styles.card}
      style={{
        // Inject dynamic theme colors as custom properties
        ['--theme-accent' as any]: theme.accent,
        ['--theme-accent-hover' as any]: theme.accentHover,
        ['--theme-light-bg' as any]: theme.lightBg,
        ['--theme-border' as any]: theme.border,
        ['--theme-glow' as any]: theme.glow,
      }}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.cardCategory}>{product.category.replace('-', ' ')}</div>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className={styles.image}
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
