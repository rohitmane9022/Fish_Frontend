import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import { ShopProvider } from "@/app/context/ShopContext";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Bombay Fresh Fish",
  description: "Fresh seafood delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ShopProvider>
          <Suspense fallback={null}>
            {/* Header */}
            <Header />

            {/* Main content grows to fill space */}
            <main className="flex-1">{children}</main>

            {/* Footer stays at bottom if page is short */}
            <SiteFooter />
          </Suspense>
        </ShopProvider>
      </body>
    </html>
  );
}
