'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import styles from './Products.module.css';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <motion.div 
      className={styles.card}
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
