import Reveal from "./Reveal";

export default function ExperienceQuote() {
  return (
    <section className="section experience">
      <Reveal className="container">
        <div className="quote-mark" aria-hidden="true">&ldquo;</div>
        <blockquote>
          <p className="q-lead">
            <span>Technology changes.</span>
            <span>Electrical codes evolve.</span>
            <span>Equipment advances.</span>
          </p>
          <span className="q-divider" aria-hidden="true" />
          <p className="q-main">
            But experience is earned — through decades of solving problems,
            building trust, and standing behind every installation.
          </p>
        </blockquote>
        <p className="punch">That&apos;s what 50 years represents.</p>
      </Reveal>
    </section>
  );
}
