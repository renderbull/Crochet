'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, Product, getProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import styles from './Products.module.css';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="creations" className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTagline}>Handmade Gallery</span>
        <h2 className={styles.title}>Explore Creations</h2>
        <p className={styles.subtitle}>
          Carefully hand-stitched yarn pieces, bringing timeless craftsmanship and whimsical designs to life.
        </p>
      </div>

      {/* Category Tabs with sliding background */}
      <div className={styles.categoriesWrapper}>
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.categoryBtnActive : ''}`}
        >
          {selectedCategory === 'all' && (
            <motion.span 
              layoutId="activeCategoryBg" 
              className={styles.activeCategoryBg} 
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className={styles.categoryText}>All Creations</span>
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category.slug}
            onClick={() => setSelectedCategory(category.slug)}
            className={`${styles.categoryBtn} ${selectedCategory === category.slug ? styles.categoryBtnActive : ''}`}
          >
            {selectedCategory === category.slug && (
              <motion.span 
                layoutId="activeCategoryBg" 
                className={styles.activeCategoryBg} 
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className={styles.categoryText}>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading beautiful creations...</p>
        </div>
      ) : (
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onViewDetails={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}

