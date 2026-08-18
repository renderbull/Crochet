'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import styles from './CustomOrderCTA.module.css';

export default function CustomOrderCTA() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    category: 'rakhi',
    description: '',
    budget: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.description) {
      const errorEvent = new CustomEvent('show-toast', { 
        detail: { message: 'Please fill in all required fields!' } 
      });
      window.dispatchEvent(errorEvent);
      return;
    }

    const message = `Hello Priya! I'd love to request a custom order:
- *Name*: ${formData.name}
- *Contact*: ${formData.contact}
- *Category*: ${formData.category}
- *Idea*: ${formData.description}
${formData.budget ? `- *Budget/Timeline*: ${formData.budget}` : ''}`;

    const encodedText = encodeURIComponent(message);
    
    // Dispatch Toast
    const toastEvent = new CustomEvent('show-toast', { 
      detail: { message: 'Opening WhatsApp with your request details!' } 
    });
    window.dispatchEvent(toastEvent);

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/918591055314?text=${encodedText}`, '_blank');
    }, 800);
  };

  return (
    <section id="custom-orders" className={styles.customSection}>
      <motion.div 
        className={styles.customContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.taglineWrapper}>
          <Sparkles size={16} className={styles.sparkleIcon} />
          <span className={styles.tagline}>Bespoke Designs</span>
        </div>
        
        <h2 className={styles.customTitle}>Create a Custom Piece</h2>
        
        <p className={styles.customText}>
          Have a unique idea or color palette in mind? Fill out this request, and let&apos;s collaborate on a custom creation stitched just for you.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Your Name *</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contact" className={styles.label}>WhatsApp / Phone / Email *</label>
              <input 
                type="text" 
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>Category Type *</label>
              <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="rakhi">Rakhi / Designer Rakhi</option>
                <option value="couple-rakhi">Couple Rakhi Set</option>
                <option value="earrings">Statement Earrings</option>
                <option value="accessories">Cozy Accessory / Bags</option>
                <option value="hair-accessories">Scrunchies & Hairbows</option>
                <option value="keychains">Aesthetic Keychains</option>
                <option value="other">Other Unique Custom Craft</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="budget" className={styles.label}>Expected Budget / Delivery Date</label>
              <input 
                type="text" 
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. Under ₹500, by next week"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Describe your Custom Design Idea *</label>
            <textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell me about colors, sizing, patterns, or specific design requests you have in mind..."
              className={styles.textarea}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} aria-label="Submit Custom Inquiry Details">
            <Send size={18} />
            <span>Send Request via WhatsApp</span>
          </button>
        </form>
      </motion.div>
    </section>
  );
}
