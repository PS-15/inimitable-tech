import ImpossibleCanvas from './ImpossibleCanvas';
import MotionEffects from './MotionEffects';

export default function Home() {
  return (
    <main>
      <MotionEffects />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="INIMITABLE TECH home">
          <span className="mark" aria-hidden="true">I</span>
          <span>INIMITABLE <b>TECH</b></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="#contact">Book a call <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span /> Independent digital studio · Websites + SEO</p>
          <h1>Built to be<br/><em>impossible</em><br/>to ignore.</h1>
          <p className="hero-intro">INIMITABLE TECH designs high-performance websites and search strategies that turn attention into business.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Book a strategy call <span>↗</span></a>
            <a className="text-link" href="#work">See the work <span>↓</span></a>
          </div>
        </div>

        <div className="hero-object">
          <ImpossibleCanvas />
          <p className="object-label left">01 / FORM</p>
          <p className="object-label right">MOVE TO INTERACT</p>
        </div>

        <div className="hero-meta">
          <span>WEB / SEARCH / SYSTEMS</span>
          <span className="scroll-note">SCROLL TO ENTER <i>↓</i></span>
          <span>INDIA · WORLDWIDE</span>
        </div>
      </section>

      <div className="signal-marquee" aria-hidden="true">
        <div className="signal-marquee-track">
          <span>STRATEGY × DESIGN × DEVELOPMENT × SEARCH × </span>
          <span>STRATEGY × DESIGN × DEVELOPMENT × SEARCH × </span>
        </div>
      </div>

      <section className="work-section" id="work">
        <div className="section-rail work-rail" data-reveal>
          <span>01 / SELECTED WORK</span>
          <span>ARCHIVE 001 · INDEPENDENT CONCEPT</span>
        </div>

        <div className="work-heading" data-reveal>
          <p className="work-kicker">Proof belongs in the work.</p>
          <h2>One idea.<br/><em>Fully engineered.</em></h2>
          <p className="work-lead">A self-initiated commerce concept showing how a decisive point of view becomes a usable, responsive storefront.</p>
        </div>

        <article className="case-study" data-reveal>
          <a className="case-visual" href="https://ps-15.github.io/the-iykyk-store/" target="_blank" rel="noreferrer" aria-label="Open The IYKYK Store live site">
            <img src="/inimitable-tech/iykyk-hero.webp" alt="The IYKYK Store campaign featuring two models in contemporary Indian fashion" />
            <div className="case-frame" aria-hidden="true"><i/><i/><i/><i/></div>
            <span className="case-open">OPEN LIVE PROJECT ↗</span>
            <span className="case-index">PRJ—001</span>
          </a>

          <div className="case-body">
            <div className="case-meta">
              <span>DIGITAL FLAGSHIP</span>
              <span>FASHION / COMMERCE</span>
              <span>2026</span>
            </div>
            <h3>THE IYKYK<br/>STORE</h3>
            <p>A cinematic storefront for a fictional modern Indian fashion label—built around one clear signal instead of catalogue noise.</p>

            <div className="case-scope">
              <div><span>01</span><strong>Direction</strong><small>Editorial commerce system</small></div>
              <div><span>02</span><strong>Experience</strong><small>Responsive shopping journey</small></div>
              <div><span>03</span><strong>Build</strong><small>Working React frontend</small></div>
            </div>

            <div className="case-actions">
              <a className="button primary" href="https://ps-15.github.io/the-iykyk-store/" target="_blank" rel="noreferrer">Experience the site <span>↗</span></a>
            </div>
          </div>
        </article>

        <div className="work-footer" data-reveal>
          <span>SAHIL KANOJIYA / FOUNDER + CREATIVE DEVELOPER</span>
          <span>STRATEGY · DESIGN · DEVELOPMENT</span>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-rail services-rail" data-reveal>
          <span>02 / CAPABILITIES</span>
          <span>TWO ENGINES · ONE OUTCOME</span>
        </div>

        <div className="services-heading" data-reveal>
          <p>Build the presence.<br/>Engineer the discovery.</p>
          <h2>One growth<br/><em>system.</em></h2>
        </div>

        <div className="service-machine" data-reveal>
          <article className="service-panel web-panel">
            <div className="service-panel-top">
              <span className="service-code">SYS / 01</span>
              <span className="service-status"><i/> AVAILABLE NOW</span>
            </div>
            <div className="service-graphic web-graphic" aria-hidden="true">
              <div className="wireframe wf-one"/><div className="wireframe wf-two"/><div className="wireframe wf-three"/>
              <span>STRUCTURE</span><span>INTERFACE</span><span>BUILD</span>
            </div>
            <div className="service-copy">
              <span className="service-index">01</span>
              <h3>Website<br/>Systems</h3>
              <p>Strategy, art direction, interface design, and responsive development—built together so the final site is clear, memorable, and ready to perform.</p>
              <ul>
                <li>Positioning & information architecture</li>
                <li>Distinctive UI and motion direction</li>
                <li>Accessible, performance-led development</li>
              </ul>
            </div>
            <div className="service-outcome"><span>OUTCOME</span><strong>A place worth landing.</strong></div>
          </article>

          <div className="machine-bridge" aria-hidden="true">
            <span>I</span><i/><i/><i/>
          </div>

          <article className="service-panel seo-panel">
            <div className="service-panel-top">
              <span className="service-code">SIG / 02</span>
              <span className="service-status"><i/> RESEARCH-LED</span>
            </div>
            <div className="service-graphic seo-graphic" aria-hidden="true">
              <div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-ring r3"/>
              <div className="radar-sweep"/><b className="signal-dot d1"/><b className="signal-dot d2"/><b className="signal-dot d3"/>
              <span>INTENT</span><span>OPPORTUNITY</span><span>VISIBILITY</span>
            </div>
            <div className="service-copy">
              <span className="service-index">02</span>
              <h3>SEO<br/>Research</h3>
              <p>Search intelligence that finds where demand exists, what competitors miss, and how your website should be structured to earn qualified attention.</p>
              <ul>
                <li>Market, keyword & competitor research</li>
                <li>Technical and on-page opportunity audit</li>
                <li>Content architecture & measurement plan</li>
              </ul>
            </div>
            <div className="service-outcome"><span>OUTCOME</span><strong>A reason to be found.</strong></div>
          </article>
        </div>

        <div className="services-cta" data-reveal>
          <p>Need the full system—not disconnected deliverables?</p>
          <a href="https://www.instagram.com/engineeredbysahil/" target="_blank" rel="noreferrer">Start the conversation <span>↗</span></a>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section-rail process-rail" data-reveal>
          <span>03 / THE METHOD</span>
          <span>EVERYTHING IS ENGINEERED</span>
        </div>

        <div className="process-intro" data-reveal>
          <h2>Built deliberately.<br/><em>Never decorated later.</em></h2>
          <p>One connected path from business clarity to the final deployed experience.</p>
        </div>

        <div className="assembly" data-reveal>
          <div className="assembly-track" aria-hidden="true"><i/><i/><i/><i/><span>INPUT</span><span>OUTPUT</span></div>
          <ol className="process-steps">
            <li>
              <div className="step-build build-discover" aria-hidden="true"><b/><b/><b/></div>
              <span className="step-num">01</span>
              <div><h3>Discover</h3><p>Understand the business, audience, offer, and decision before touching the interface.</p></div>
              <small>CONTEXT / POSITIONING</small>
            </li>
            <li>
              <div className="step-build build-architect" aria-hidden="true"><b/><b/><b/></div>
              <span className="step-num">02</span>
              <div><h3>Architect</h3><p>Turn goals and information into a clear page structure and search-ready content system.</p></div>
              <small>FLOW / SEARCH INTENT</small>
            </li>
            <li>
              <div className="step-build build-engineer" aria-hidden="true"><b/><b/><b/></div>
              <span className="step-num">03</span>
              <div><h3>Engineer</h3><p>Design and develop the experience as one system, with motion serving the message.</p></div>
              <small>DESIGN / CODE / MOTION</small>
            </li>
            <li>
              <div className="step-build build-refine" aria-hidden="true"><b/><b/><b/></div>
              <span className="step-num">04</span>
              <div><h3>Refine</h3><p>Remove friction, test every breakpoint, and prepare the complete experience to launch.</p></div>
              <small>QA / PERFORMANCE / LAUNCH</small>
            </li>
          </ol>
        </div>

        <div className="process-end" data-reveal>
          <span>THE OUTPUT</span>
          <strong>A site that looks intentional<br/>because every decision was.</strong>
          <i aria-hidden="true">I</i>
        </div>
      </section>

      <section className="automation-section" id="automation">
        <div className="section-rail automation-rail" data-reveal>
          <span>04 / NEXT CAPABILITY</span>
          <span>MODULE STATUS · IN DEVELOPMENT</span>
        </div>

        <div className="automation-shell" data-reveal>
          <div className="module-bar">
            <span>AUT / 01</span>
            <strong>SEALED MODULE</strong>
            <span>NO RELEASE DATE</span>
          </div>

          <div className="automation-copy">
            <p className="automation-kicker"><i/> RESEARCH + PROTOTYPING</p>
            <h2>Automation is<br/>entering the <em>system.</em></h2>
            <p className="automation-lead">The next INIMITABLE capability is focused on removing repetitive operational work—connecting the systems a business already uses into clearer, faster workflows.</p>
            <div className="future-list">
              <span>LEAD ROUTING</span><span>WORKFLOW HANDOFFS</span><span>REPORTING</span><span>REPETITIVE OPERATIONS</span>
            </div>
          </div>

          <div className="automation-core" aria-hidden="true">
            <div className="core-ring core-ring-one"/><div className="core-ring core-ring-two"/><div className="core-ring core-ring-three"/>
            <div className="core-i">I</div>
            <i className="core-node n1"/><i className="core-node n2"/><i className="core-node n3"/><i className="core-node n4"/>
            <span className="core-label l1">INPUT</span><span className="core-label l2">LOGIC</span><span className="core-label l3">OUTPUT</span>
          </div>

          <div className="module-footer">
            <div><span>CURRENT PHASE</span><strong>BUILDING / VALIDATING</strong></div>
            <div className="module-pulse"><i/><i/><i/><span>SIGNAL ACTIVE</span></div>
            <a href="https://www.instagram.com/engineeredbysahil/" target="_blank" rel="noreferrer">Follow the signal <span>↗</span></a>
          </div>
        </div>

        <div className="coming-stamp" data-reveal aria-label="Automation coming soon">
          <span>COMING</span><span>SOON</span><i>04</i>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-rail about-rail" data-reveal>
          <span>05 / THE STUDIO</span>
          <span>FOUNDER-LED · INDIA / WORLDWIDE</span>
        </div>

        <div className="about-grid">
          <div className="founder-signal" data-reveal aria-label="Sahil Kanojiya, founder and creative developer">
            <div className="signal-header"><span>AUTHOR / 001</span><span>INDIA · WORLDWIDE</span></div>
            <div className="signal-name" aria-hidden="true"><span>SAHIL</span><span>KANOJIYA</span></div>
            <div className="signal-axis" aria-hidden="true"><i/><i/><i/><i/></div>
            <div className="signal-role"><strong>FOUNDER</strong><span>/ CREATIVE DEVELOPER</span></div>
            <p>ONE MIND.<br/>ONE STANDARD.<br/><em>NO TEMPLATE.</em></p>
          </div>

          <div className="about-copy" data-reveal>
            <p className="about-kicker">PROOF OF AUTHORSHIP</p>
            <h2>A small studio<br/>with a <em>high standard.</em></h2>
            <div className="about-body">
              <p>INIMITABLE TECH is being built by Sahil Kanojiya around a simple belief: a business should not have to choose between clear thinking, strong design, and solid execution.</p>
              <p>The focus is intentionally narrow—building websites worth remembering, making them useful enough to earn their place, and finding the search opportunities that help the right people discover them.</p>
            </div>

            <div className="principles">
              <div><span>01</span><strong>Clarity before spectacle.</strong></div>
              <div><span>02</span><strong>No template thinking.</strong></div>
              <div><span>03</span><strong>Design and code together.</strong></div>
              <div><span>04</span><strong>Performance is part of craft.</strong></div>
            </div>

            <div className="about-links">
              <a href="https://www.instagram.com/engineeredbysahil/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-rail contact-rail" data-reveal>
          <span>06 / START A PROJECT</span>
          <span>DIRECT CONVERSATION · NO SALES FUNNEL</span>
        </div>

        <div className="contact-stage" data-reveal>
          <div className="contact-orbit" aria-hidden="true"><i/><i/><i/><span>I</span></div>
          <p className="contact-kicker"><i/> AVAILABLE FOR SELECT PROJECTS</p>
          <h2>Make your digital<br/>presence <em>inimitable.</em></h2>
          <div className="contact-copy">
            <p>Tell INIMITABLE what your business needs to make clearer, faster, and more valuable online.</p>
            <a href="https://www.instagram.com/engineeredbysahil/" target="_blank" rel="noreferrer">
              <span>Message INIMITABLE</span><b>↗</b>
            </a>
          </div>
        </div>

        <div className="contact-meta" data-reveal>
          <span>WEBSITES / SEO RESEARCH</span>
          <span>INDIA · WORLDWIDE</span>
          <span>NEW BUSINESS / 2026</span>
        </div>
      </section>

      <footer className="footer">
        <a className="footer-brand" href="#top" aria-label="Back to top">
          <span className="mark" aria-hidden="true">I</span>
          <strong>INIMITABLE <b>TECH</b></strong>
        </a>
        <p>Engineering ideas.<br/>Building futures.</p>
        <div className="footer-links">
          <a href="https://www.instagram.com/engineeredbysahil/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <span className="footer-copy">© 2026 / INIMITABLE TECH</span>
      </footer>
    </main>
  );
}
