'use client';

import React, { useState, useEffect } from 'react';
import { Flower, Phone, Menu, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './components.module.css';

interface HeaderProps {
  onCartClick?: () => void;
  cartCount?: number;
}

export default function Header({ onCartClick, cartCount = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = (e: React.MouseEvent) => {
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

  const handleWhatsappGeneral = () => {
    const message = encodeURIComponent("Hello Priya! I visited your website and would love to inquire about your custom handmade creations.");
    window.open(`https://wa.me/918591055314?text=${message}`, '_blank');
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Flower className={styles.logoIcon} size={28} />
            <span>Priya</span>
          </div>
          
          <nav className={styles.nav}>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#creations" className={styles.navLink}>Creations</a>
            <a href="#custom-orders" className={styles.navLink}>Custom Orders</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
            
            <button onClick={handleCall} className={styles.cartButton} aria-label="Call Priya">
              <Phone size={16} />
              <span>Call to Order</span>
            </button>
          </nav>

          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.logo}>
                  <Flower className={styles.logoIcon} size={24} />
                  <span>Priya</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={styles.closeDrawerBtn}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className={styles.drawerNav}>
                <a 
                  href="#about" 
                  className={styles.drawerNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Our Art
                </a>
                <a 
                  href="#creations" 
                  className={styles.drawerNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Creations
                </a>
                <a 
                  href="#custom-orders" 
                  className={styles.drawerNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Custom Orders
                </a>
                <a 
                  href="#contact" 
                  className={styles.drawerNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                
                <div className={styles.drawerActions}>
                  <button onClick={handleCall} className={styles.drawerCallBtn}>
                    <Phone size={18} />
                    <span>Call to Order</span>
                  </button>
                  <button onClick={handleWhatsappGeneral} className={styles.drawerWhatsappBtn}>
                    <MessageSquare size={18} />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

