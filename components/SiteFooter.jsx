import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-10 sm:justify-items-end">

       
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-sm text-muted-foreground">
            Bombay Seafood — delivering premium, fresh catch straight from the shore since 1985.
            Trusted for quality, freshness, and same-day delivery.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/category/1" className="hover:underline">
                Fresh Fish
              </Link>
            </li>
            <li>
              <Link href="/category/2" className="hover:underline">
                Fresh Chicken Raw
              </Link>
            </li>
            <li>
              <Link href="/category/3" className="hover:underline">
                Zorabian (Raw Chicken / Ready to Cook Item)
              </Link>
            </li>
            <li>
              <Link href="/category/5" className="hover:underline">
                Venky’s (Ready to Cook Product)
              </Link>
            </li>
            <li>
              <Link href="/category/4" className="hover:underline">
                Captain Cook (Ready to Cook Product)
              </Link>
            </li>
            <li>
              <Link href="/category/6" className="hover:underline">
                Gadre (Ready to Cook Fish)
              </Link>
            </li>
            <li>
              <Link href="/category/7" className="hover:underline">
                McCain (Ready to Cook Product)
              </Link>
            </li>
            <li>
              <Link href="/category/8" className="hover:underline">
                Green Peas
              </Link>
            </li>
            <li>
              <Link href="/category/9" className="hover:underline">
                Paratha
              </Link>
            </li>
          </ul>
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
  )
}