'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Phone } from 'lucide-react';
import { Product } from '@/lib/products';
import { getCategoryTheme, ColorTheme, DEFAULT_THEME } from '@/lib/colorExtractor';
import styles from './Products.module.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const theme = product ? getCategoryTheme(product.category) : DEFAULT_THEME;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const handleWhatsappOrder = () => {
    const productLink = `${window.location.origin}/#product-${product.slug}`;
    const text = encodeURIComponent(
      `Hello Priya! I would love to order the handcrafted product: "${product.name}" (Price: ₹${product.price}).\n\nLink to product: ${productLink}`
    );
    window.open(`https://wa.me/918591055314?text=${text}`, '_blank');
  };

  const handleCallOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'tel:+918591055314';
    } else {
      navigator.clipboard.writeText('+918591055314');
      const event = new CustomEvent('show-toast', { 
        detail: { message: 'Phone number copied to clipboard!' } 
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div 
          className={styles.modalContent}
          style={{
            '--theme-accent': theme.accent,
            '--theme-accent-hover': theme.accentHover,
            '--theme-light-bg': theme.lightBg,
            '--theme-border': theme.border,
            '--theme-glow': theme.glow,
          } as React.CSSProperties}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            <X size={20} />
          </button>
          
          <div className={styles.modalImageWrapper}>
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className={styles.modalImage} 
            />
          </div>
          
          <div className={styles.modalDetails}>
            <div>
              <span className={styles.modalCategory}>{product.category.replace('-', ' ')}</span>
              <h2 className={styles.modalTitle}>{product.name}</h2>
            </div>
            
            <div className={styles.modalPrice}>₹{product.price}</div>
            
            <p className={styles.modalDesc}>{product.description}</p>
            
            <div className={styles.actionSection}>
              <h4 className={styles.actionHeading}>Order & Inquiries</h4>
              <div className={styles.btnGroup}>
                <button onClick={handleCallOrder} className={`${styles.modalBtn} ${styles.callBtn}`}>
                  <Phone size={18} color="#f59e0b" />
                  <span>Contact</span>
                </button>
                <button onClick={handleWhatsappOrder} className={`${styles.modalBtn} ${styles.whatsappBtn}`}>
                  <MessageSquare size={18} color="#34d399" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
