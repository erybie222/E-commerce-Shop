export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-200 border-t border-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-yellow-400">MarketPlace</h2>
            <p className="text-sm text-slate-400 max-w-xs">
              Your trusted multi-vendor marketplace for everything you need.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Help Center
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Customer Support
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  FAQs
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Shipping Info
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Seller Dashboard
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Start Selling
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Seller Center
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Seller Resources
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-white" href="#">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 text-center text-xs text-slate-400">
          © {year} MarketPlace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
