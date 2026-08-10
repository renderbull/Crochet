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
        <h2 className={styles.title}>Handmade Creations</h2>
        <p className={styles.subtitle}>
          Explore our collection of yarn crafts, carefully hand-stitched with love and high quality materials.
        </p>
      </div>

      {/* Category Tabs */}
      <div className={styles.categoriesWrapper}>
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.categoryBtnActive : ''}`}
        >
          All Creations
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category.slug}
            onClick={() => setSelectedCategory(category.slug)}
            className={`${styles.categoryBtn} ${selectedCategory === category.slug ? styles.categoryBtnActive : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading beautiful creations...
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
