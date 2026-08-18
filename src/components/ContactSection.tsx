'use client';

import React from 'react';
import { Phone, MessageSquare, Heart, MapPin, Mail, Flower } from 'lucide-react';
import styles from './components.module.css';

export default function ContactSection() {
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
    <footer id="contact" className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <h3 className={styles.footerLogo}>
            <Flower className={styles.footerLogoIcon} size={32} />
            <span>Priya</span>
          </h3>
          <p className={styles.footerText}>
            Every piece is thoughtfully handcrafted with love, patience, and attention to detail, bringing warmth, beauty, and a personal touch to every creation.
          </p>
        </div>

        <div>
          <h4 className={styles.footerHeading}>Explore</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#about" className={styles.footerLink}>Our Story</a></li>
            <li><a href="#creations" className={styles.footerLink}>Products</a></li>
            <li><a href="#custom-orders" className={styles.footerLink}>Custom Creations</a></li>
          </ul>
        </div>

        <div className={styles.footerContact}>
          <h4 className={styles.footerHeading}>Get in Touch</h4>
          
          <div className={styles.contactInfoItem}>
            <div className={styles.contactIcon}>
              <MapPin size={18} />
            </div>
            <span>Handcrafted locally in Mumbai, India</span>
          </div>

          <div className={styles.contactInfoItem}>
            <div className={styles.contactIcon}>
              <Mail size={18} />
            </div>
            <span>inquiries@handmadebypriya.art</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleCall} className={styles.footerActionBtn} aria-label="Call Priya">
              <Phone size={16} />
              <span>Call Priya</span>
            </button>

            <button onClick={handleWhatsappGeneral} className={styles.footerActionBtn} style={{ backgroundColor: 'var(--pastel-mint)' }} aria-label="WhatsApp Priya">
              <MessageSquare size={16} />
              <span>WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Priya Handcrafted Art. Made with <Heart size={14} style={{ display: 'inline', color: 'var(--accent-color)', fill: 'var(--accent-color)' }} /> in India.</p>
      </div>
    </footer>
  );
}
