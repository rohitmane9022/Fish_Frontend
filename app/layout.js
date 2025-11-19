import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import { ShopProvider } from "@/app/context/ShopContext";
import { SiteFooter } from "@/components/SiteFooter";
import MobileNav from "@/components/MobileNav";   
import CartPopup from "@/components/CartPopup";   
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: "Bombay Fresh Fish",
  description: "Fresh seafood delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ShopProvider>
        <Toaster position="top-right" />
          <Suspense fallback={null}>
            
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 "> 
              {/* ⬅ pb-28 ensures content doesn't hide behind mobile nav */}
              {children}
              <SpeedInsights />
            </main>

            {/* Footer */}
            <SiteFooter />

            {/* Mobile Bottom Cart Popup */}
            <CartPopup />

            {/* Mobile Bottom Navigation */}
            <MobileNav />

          </Suspense>
        </ShopProvider>
      </body>
    </html>
  );
}
