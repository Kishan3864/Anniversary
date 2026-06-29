import Reveal from "./Reveal";

export default function ExperienceQuote() {
  return (
    <section className="section experience">
      <Reveal className="container">
        <div className="quote-mark" aria-hidden="true">&ldquo;</div>
        <blockquote>
          <p>
            <span className="stack">Technology changes.</span>
            <span className="stack">Electrical codes evolve.</span>
            <span className="stack">Equipment advances.</span>
            <span className="stack green-text" style={{ marginTop: "0.6rem", display: "block" }}>
              But experience is earned — through decades of solving problems,
              building trust, and standing behind every installation.
            </span>
          </p>
        </blockquote>
        <p className="punch">That&apos;s what 50 years represents.</p>
      </Reveal>
    </section>
  );
}
