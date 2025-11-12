'use client';
import Link from 'next/link';
import { useShop } from '@/app/context/ShopContext';

export function SiteFooter() {
  const { categories, loading } = useShop();

  return (
    <footer className="border-t">
      <div className="container max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-10 sm:justify-items-end">
        {/* About */}
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-sm text-muted-foreground">
            Bombay Seafood — delivering premium, fresh catch straight from the shore since 1985.
            Trusted for quality, freshness, and same-day delivery.
          </p>
        </div>

        {/* Categories (Dynamic) */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : categories && categories.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/category/${cat._id}`}
                    className="hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No categories available.</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <Link
                href="mailto:bombayseafood1985@gmail.com"
                className="hover:underline"
              >
                bombayseafood1985@gmail.com
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/919769694115"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp: +91 97696 94115
              </Link>
            </li>
            <li>
              <Link
                href="https://instagram.com/bombayseafood_1985"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram: @bombayseafood_1985
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-muted text-center text-xs text-muted-foreground py-4">
        © {new Date().getFullYear()} Bombay Seafood — Since 1985. All rights reserved.
      </div>
    </footer>
  );
}
