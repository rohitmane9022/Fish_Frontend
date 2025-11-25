'use client';
import Link from 'next/link';
import { useShop } from '@/app/context/ShopContext';
import { Mail, PhoneCall, Instagram } from "lucide-react";

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

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : categories?.length > 0 ? (
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
  <ul className="text-sm text-muted-foreground space-y-3">

    {/* Email */}
    <li>
      <Link
        href="mailto:bombayseafood1985@gmail.com"
        className="flex items-center gap-2 hover:underline"
      >
        <span className="text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M3 5V4a1 1 0 0 0-1 1zm18 0h1a1 1 0 0 0-1-1zM3 6h18V4H3zm17-1v12h2V5zm-1 13H5v2h14zM4 17V5H2v12zm1 1a1 1 0 0 1-1-1H2a3 3 0 0 0 3 3zm15-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 5l9 9l9-9"/></g></svg></span>
        bombayseafood1985@gmail.com
      </Link>
    </li>

    {/* WhatsApp */}
    <li>
      <Link
        href="https://wa.me/919769694115"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline"
      >
        <span className="text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg></span>
        +91 97696 94115
      </Link>
    </li>

    {/* Instagram */}
    <li>
      <Link
        href="https://instagram.com/bombayseafood_1985"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline"
      >
        
        <span className="text-pink-600"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg></span>
        @bombayseafood_1985
      </Link>
    </li>

  </ul>
</div>
      </div>

      {/* Bottom */}
      <div className="bg-muted text-center text-xs text-muted-foreground py-4">
        © {new Date().getFullYear()} Bombay Seafood — Since 1985. All rights reserved.
      </div>
    </footer>
  );
}
