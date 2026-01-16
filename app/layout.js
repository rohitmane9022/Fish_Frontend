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
  title: "Bombay Sea Food – Fresh Fish & Seafood Delivery in Mumbai",
  description: "Order online fresh fish, prawns, and seafood with Bombay Sea Food. Fast home delivery of premium quality, sustainable catch in Mumbai.",
  icons: {
    // This is what Google Search looks for (must be a square PNG)
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    // Backup for older browsers
    shortcut: '/favicon.ico',
    // Specifically for Apple devices
    apple: '/apple-touch-icon.png',
  },
  // This links the manifest file you just moved to public/
  manifest: '/site.webmanifest',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ShopProvider>
        <Toaster position="top-right" />
          <Suspense fallback={null}>
            
            
            <Header />

            
            <main className="flex-1 "> 
             
              {children}
              <SpeedInsights />
            </main>

            
            <SiteFooter />

           
            <CartPopup />

            
            <MobileNav />

          </Suspense>
        </ShopProvider>
      </body>
    </html>
  );
}
