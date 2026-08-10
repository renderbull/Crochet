import { supabase } from './supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  isAvailable: boolean;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Rakhi', slug: 'rakhi', description: 'Handcrafted designer Rakhis made with love and premium yarn.' },
  { id: '2', name: 'Couple Rakhi', slug: 'couple-rakhi', description: 'Beautiful matching Rakhi sets for couples.' },
  { id: '3', name: 'Earrings', slug: 'earrings', description: 'Elegant handmade earrings and crochet statement pieces.' },
  { id: '4', name: 'Accessories', slug: 'accessories', description: 'Handcrafted crochet and yarn accessories.' },
  { id: '5', name: 'Hair Accessories', slug: 'hair-accessories', description: 'Cute pastel scrunchies, clips, and hair ornaments.' },
  { id: '6', name: 'Keychains', slug: 'keychains', description: 'Charming handmade miniature keychains and bag charms.' }
];

// Generate products based on the files in public folders
export const PRODUCTS: Product[] = [
  // Rakhi (17 items)
  ...Array.from({ length: 17 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `rakhi-${num}`,
      name: `Handcrafted Rakhi Premium Edition ${num}`,
      slug: `handcrafted-rakhi-premium-${num}`,
      category: 'rakhi',
      price: 120 + (i % 5) * 20,
      description: 'A beautiful handcrafted Rakhi crafted carefully using premium soft yarn, festive threads, and elegant details to make your brother feel special.',
      images: [`/Rakhi/Rakhi_${num}.jpeg`],
      isAvailable: true
    };
  }),

  // Couple Rakhi (9 items)
  ...Array.from({ length: 9 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `couple-rakhi-${num}`,
      name: `Couple Rakhi Set Classic ${num}`,
      slug: `couple-rakhi-set-classic-${num}`,
      category: 'couple-rakhi',
      price: 250 + (i % 3) * 30,
      description: 'Elegant matching Bhaiya-Bhabhi Rakhi set, handcrafted with intricate patterns and complementary colors to celebrate sibling bonds.',
      images: [`/couple rakhi/couple rakhi_${num}.jpeg`],
      isAvailable: true
    };
  }),

  // Earrings (9 items)
  ...Array.from({ length: 9 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `earrings-${num}`,
      name: `Crochet Dangle Earrings ${num}`,
      slug: `crochet-dangle-earrings-${num}`,
      category: 'earrings',
      price: 150 + (i % 4) * 20,
      description: 'Stunning lightweight statement earrings meticulously hand-stitched. Features soft pastel tones and high-quality hypoallergenic hooks.',
      images: [`/earrings/earrings_${num}.jpeg`],
      isAvailable: true
    };
  }),

  // Accessories (8 items)
  ...Array.from({ length: 8 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `accessories-${num}`,
      name: `Handmade Cozy Accessory ${num}`,
      slug: `handmade-cozy-accessory-${num}`,
      category: 'accessories',
      price: 180 + (i % 4) * 40,
      description: 'A premium handmade crochet accessory, designed to blend utility with elegant handwoven aesthetics.',
      images: [`/accessories/accessories_${num}.jpeg`],
      isAvailable: true
    };
  }),

  // Hair Accessories (2 items)
  ...Array.from({ length: 2 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `hair-accessories-${num}`,
      name: `Pastel Crochet Hairbow / Scrunchie ${num}`,
      slug: `pastel-crochet-hairbow-scrunchie-${num}`,
      category: 'hair-accessories',
      price: 99,
      description: 'Cute and gentle hair accessory handcrafted from premium organic cotton yarn. Soft on hair, adds a whimsical touch to any outfit.',
      images: [`/hair accesories/hair accesories_${num}.jpeg`],
      isAvailable: true
    };
  }),

  // Keychains (15 items)
  ...Array.from({ length: 15 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `keychains-${num}`,
      name: `Aesthetic Crochet Keychain ${num}`,
      slug: `aesthetic-crochet-keychain-${num}`,
      category: 'keychains',
      price: 110 + (i % 3) * 15,
      description: 'Adorable miniature charm keychain, hand-knit with passion. Ideal for adding a warm, personal aesthetic to keys, bags, or backpacks.',
      images: [`/keycahins/keycahins_${num}.jpeg`],
      isAvailable: true
    };
  })
];

// Fetch helpers with Supabase query logic and local fallbacks
export async function getCategories(): Promise<Category[]> {
  if (!supabase) return CATEGORIES;
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error || !data) return CATEGORIES;
    return data.map(item => ({
      id: String(item.id),
      name: item.name,
      slug: item.slug,
      description: item.description || ''
    }));
  } catch {
    return CATEGORIES;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return PRODUCTS;
  try {
    const { data, error } = await supabase.from('products').select('*, categories(slug)');
    if (error || !data || data.length === 0) return PRODUCTS;
    return data.map(item => ({
      id: String(item.id),
      name: item.name,
      slug: item.slug,
      category: item.categories?.slug || 'rakhi',
      price: Number(item.price),
      description: item.description || '',
      images: item.images || [],
      isAvailable: item.is_available ?? true
    }));
  } catch {
    return PRODUCTS;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter(p => p.category === categorySlug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const allProducts = await getProducts();
  return allProducts.find(p => p.slug === slug) || null;
}
