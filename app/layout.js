import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import { ShopProvider } from "@/app/context/ShopContext";

export const metadata = {
  title: "Bombay Fresh Fish",
  description: "Fresh seafood delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ShopProvider>
          <Suspense fallback={null}>
            <Header />
            <main className="min-h-[60vh]">{children}</main>
          </Suspense>
        </ShopProvider>
      </body>
    </html>
  );
}
