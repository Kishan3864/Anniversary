import Emblem from "./Emblem";
import Reveal from "./Reveal";

export default function Legacy() {
  return (
    <section className="section legacy" id="legacy">
      <div className="container legacy-grid">
        <Reveal className="legacy-figure">
          <Emblem size={230} id="legacy" spin={false} />
          <div className="badge-float">
            <b>1976</b>
            <span>Where it all began</span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow">Our Story</span>
          <h2>A Legacy Built One Customer at a Time</h2>
          <p>
            Since beginning his electrical career in 1976, Wally Nassif has
            dedicated his life to delivering safe, reliable, and professional
            electrical installations.
          </p>
          <p>
            From small residential repairs to complex industrial power
            distribution systems, every project has been completed with the
            same commitment to excellence — the same care, whether it&apos;s a
            single outlet or an entire facility.
          </p>
          <p>
            Today, that commitment continues with modern technology while
            preserving the traditional values that have defined our company for
            over five decades.
          </p>
          <div className="signature">
            Wally Nassif
            <span>Master Electrical Contractor · Est. 1976</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
