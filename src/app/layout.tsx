import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priya | Handcrafted Crochet Art & Accessories",
  description: "Exquisite handmade rakhis, crochet earrings, scrunchies, and keychains made with passion and premium yarn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
