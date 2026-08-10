'use client';

import React from 'react';
import { Flower, Phone, Share2 } from 'lucide-react';
import styles from './components.module.css';

interface HeaderProps {
  onCartClick?: () => void;
  cartCount?: number;
}

export default function Header({ onCartClick, cartCount = 0 }: HeaderProps) {
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'tel:+918591055314';
    } else {
      navigator.clipboard.writeText('+918591055314');
      // Dispatch custom event for showing toast
      const event = new CustomEvent('show-toast', { 
        detail: { message: 'Phone number copied to clipboard!' } 
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <header className={styles.header}>
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
      </div>
    </header>
  );
}
