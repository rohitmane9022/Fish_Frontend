import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import { ShopProvider } from "@/app/context/ShopContext";
import { SiteFooter } from "@/components/SiteFooter";
import MobileNav from "@/components/MobileNav";   
import CartPopup from "@/components/CartPopup";   
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from '@vercel/speed-insights/next';
import favicon from "../public/favicon.ico"

export const metadata = {
  title: "Bombay Sea Food – Fresh Fish & Seafood Delivery in Mumbai",
  description: "Order online fresh fish, prawns, and seafood with Bombay Sea Food. Fast home delivery of premium quality, sustainable catch in Mumbai.",
  icons:{
    icon: "/favicon.ico",
  }
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
