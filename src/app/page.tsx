import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CustomOrderCTA from '@/components/CustomOrderCTA';
import ContactSection from '@/components/ContactSection';
import Toast from '@/components/Toast';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <CustomOrderCTA />
      </main>
      <ContactSection />
      <Toast />
    </>
  );
}
