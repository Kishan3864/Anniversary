import Bolt from "./Bolt";
import Flag from "./Flag";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <span className="footer-logo-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/wally-nassif-logo-footer.png" alt="Wally Nassif Electrical Contracting Service" width={866} height={274} />
            </span>
            <p className="intro">
              Powering South Florida with reliability and expertise since 1976.
              Residential, commercial &amp; industrial electrical contracting you
              can trust — from planning to power-on.
            </p>
            <p className="lic">
              FL Statewide Licensed Unlimited Electrical Contractor · EC13001410
              <br />
              Licensed · Insured · Bonded
            </p>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="https://maps.google.com/?q=6112+Washington+Rd,+West+Palm+Beach,+FL+33405" target="_blank" rel="noopener noreferrer">
              6112 Washington Rd
              <br />
              West Palm Beach, FL 33405
            </a>
            <a href="tel:+15615822600">(561) 582-2600</a>
            <a href="mailto:info@nassifelectric.com">info@nassifelectric.com</a>
          </div>

          <div className="footer-col">
            <h4>Service Area &amp; Hours</h4>
            <p>Serving Greater South Florida</p>
            <p>Palm Beach County &amp; surrounding areas</p>
            <p style={{ color: "#ffffff", fontWeight: 700 }}>
              <Bolt style={{ verticalAlign: "-3px", marginRight: "5px" }} />
              24/7 Emergency Service Available
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>
            © 1976–2026 Wally Nassif Electrical Contracting Service · Celebrating
            50 Years of Excellence
          </span>
          <span className="footer-usa">
            <Flag width={30} title="United States flag" />
            The Trusted Electrician · Reliable • Licensed • Experienced
          </span>
        </div>
      </div>
    </footer>
  );
}
