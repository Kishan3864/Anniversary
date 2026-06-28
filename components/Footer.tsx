export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="brand" style={{ alignItems: "center" }}>
            <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="fbm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f4d778" />
                  <stop offset="100%" stopColor="#b38728" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="22" stroke="url(#fbm)" strokeWidth="1.6" />
              <path d="M26 9 L14 27 H22 L20 39 L34 19 H25 L29 9 Z" fill="url(#fbm)" />
            </svg>
            <span>
              <span className="brand-name">Wally Nassif Electrical</span>
              <span className="brand-sub" style={{ display: "block" }}>
                Master Electrical Contractor · Est. 1976
              </span>
            </span>
          </div>

          <div className="footer-contact">
            <div>
              <span>Email</span>
              <b>info@wallynassif.com</b>
            </div>
            <div>
              <span>Service Area</span>
              <b>Florida &amp; Beyond</b>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 1976–2026 Wally Nassif Electrical Contracting Service · Celebrating
            50 Years of Excellence
          </span>
          <span>Licensed · Insured · Code Compliant</span>
        </div>
      </div>
    </footer>
  );
}
