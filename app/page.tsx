import CoffeeNavbar from "@/components/coffee-navbar";
import Image from "next/image";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="arrow-icon">
    <path d="M3.5 12.5 12 4M5 4h7v7" />
  </svg>
);

const CoffeeBean = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="bean-icon">
    <path d="M12.7 2.8c3.9.2 7.4 3.9 7.7 8.1.3 4.7-3.3 9.8-7.8 10.3-4.4.5-7.6-3-7.2-7.6.4-4.7 3.3-11 7.3-10.8Z" />
    <path d="M16.8 5.1c-3.9 1.8-6.1 5.5-6 9.2.1 2.4 1.1 4.7 2.8 6.7" />
  </svg>
);

const Sparkle = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="sparkle-icon">
    <path d="m10 1.8 1.3 5.8 5.8 1.3-5.8 1.3L10 16l-1.3-5.8-5.8-1.3 5.8-1.3L10 1.8Z" />
  </svg>
);

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <CoffeeNavbar />

      <main id="main-content">
        <section className="hero section-pad" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkle /> Neighborhood coffee, thoughtfully made</p>
            <h1>A better kind of <span>coffee break.</span></h1>
            <p className="hero-intro">
              Come for the really good coffee. Stay for the soft light, the warm welcome, and one more chapter.
            </p>
            <div className="hero-actions">
              <a className="button button-coral" href="#menu">See what&apos;s brewing <ArrowUpRight /></a>
              <a className="text-link" href="#story">Meet the people <span>↗</span></a>
            </div>
            <div className="hero-meta">
              <div className="avatar-stack" aria-hidden="true">
                <span className="avatar avatar-one">M</span>
                <span className="avatar avatar-two">J</span>
                <span className="avatar avatar-three">S</span>
              </div>
              <p><strong>4.9/5</strong> from the neighborhood<br /><span>your new favorite corner</span></p>
            </div>
          </div>

          <div className="hero-visual" aria-label="A latte on a café table" role="img">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-image" />
            <div className="hero-sticker">
              <span>slow</span>
              <strong>mornings</strong>
              <span>since 2018</span>
            </div>
            <div className="hero-caption">
              <CoffeeBean />
              <span>good things<br />take time</span>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Juniper and Bloom values">
          <div className="marquee-track">
            <span>PASTEL DAYS</span><i>✦</i><span>BIG COFFEE ENERGY</span><i>✦</i><span>PASTEL DAYS</span><i>✦</i><span>BIG COFFEE ENERGY</span><i>✦</i>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-coral">Our menu <span>01</span></p>
              <h2>Your new <em>usual.</em></h2>
            </div>
            <div className="heading-aside">
              <p>Seasonal sips, familiar favorites, and a pastry case that deserves your full attention.</p>
              <a className="text-link" href="#menu-grid">Explore the full menu <span>↗</span></a>
            </div>
          </div>
          <div className="menu-grid" id="menu-grid">
            <article className="menu-card card-latte">
              <div className="menu-card-image menu-image-latte">
                <span className="menu-tag">Staff favorite</span>
                <span className="menu-card-number">01</span>
              </div>
              <div className="menu-card-body">
                <div><h3>Honey oat latte</h3><p>Espresso · Oat milk · Local honey</p></div>
                <strong>$6.50</strong>
              </div>
            </article>
            <article className="menu-card card-matcha">
              <div className="menu-card-image menu-image-matcha">
                <span className="menu-tag">New ritual</span>
                <span className="menu-card-number">02</span>
              </div>
              <div className="menu-card-body">
                <div><h3>Strawberry matcha</h3><p>Uji matcha · Macerated berry · Milk</p></div>
                <strong>$7.00</strong>
              </div>
            </article>
            <article className="menu-card card-scone">
              <div className="menu-card-image menu-image-scone">
                <span className="menu-tag">Baked today</span>
                <span className="menu-card-number">03</span>
              </div>
              <div className="menu-card-body">
                <div><h3>Cardamom morning bun</h3><p>Brown butter · Orange zest · Sugar</p></div>
                <strong>$5.25</strong>
              </div>
            </article>
            <article className="menu-card card-cold-brew">
              <div className="menu-card-image menu-image-cold-brew">
                <span className="menu-tag">Chill favorite</span>
                <span className="menu-card-number">04</span>
              </div>
              <div className="menu-card-body">
                <div><h3>Vanilla cloud cold brew</h3><p>Cold brew · Vanilla cream · Sea salt</p></div>
                <strong>$6.75</strong>
              </div>
            </article>
            <article className="menu-card card-toast">
              <div className="menu-card-image menu-image-toast">
                <span className="menu-tag">Savory pick</span>
                <span className="menu-card-number">05</span>
              </div>
              <div className="menu-card-body">
                <div><h3>Roasted tomato toast</h3><p>Sourdough · Whipped ricotta · Chili oil</p></div>
                <strong>$9.50</strong>
              </div>
            </article>
            <article className="menu-card card-loaf">
              <div className="menu-card-image menu-image-loaf">
                <span className="menu-tag">Baked today</span>
                <span className="menu-card-number">06</span>
              </div>
              <div className="menu-card-body">
                <div><h3>Blueberry lemon loaf</h3><p>Blueberry · Lemon zest · Vanilla glaze</p></div>
                <strong>$5.50</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="story-section section-pad" id="story">
          <div className="story-image" role="img" aria-label="Barista preparing a pour over coffee">
            <span className="image-label">The daily ritual <span>✦</span></span>
          </div>
          <div className="story-copy">
            <p className="eyebrow eyebrow-sage">Our little corner <span>02</span></p>
            <h2>Made for lingering, <em>never rushing.</em></h2>
            <p>Juniper &amp; Bloom started with a simple idea: coffee tastes better when there&apos;s time to enjoy it. So we built a place for the in-between moments — the first sip, the long catch-up, the quiet reset.</p>
            <p>Our beans are sourced with care, our playlists are always soft, and there&apos;s a seat waiting for you.</p>
            <a className="button button-outline" href="#visit">More about us <ArrowUpRight /></a>
            <div className="story-signoff"><span className="signoff-line" /> <span>Made with care in Portland, OR</span></div>
          </div>
        </section>

        <section className="visit-section section-pad" id="visit">
          <div className="visit-card">
            <div className="visit-card-top">
              <p className="eyebrow eyebrow-lavender">Come on in <span>03</span></p>
              <span className="open-pill"><i /> Open today</span>
            </div>
            <h2>Your corner of<br /><em>the neighborhood.</em></h2>
            <div className="visit-details">
              <div><span>Find us</span><strong>1842 SE Division St.<br />Portland, Oregon</strong></div>
              <div><span>Hours</span><strong>Mon–Fri 7am–5pm<br />Sat–Sun 8am–5pm</strong></div>
            </div>
            <a className="button button-light" href="https://maps.google.com/?q=1842+SE+Division+St+Portland+OR" target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a>
          </div>
          <div className="quote-card">
            <div className="quote-top"><span className="quote-mark">“</span><span>Kind words</span></div>
            <blockquote>“The kind of place that makes you want to become a regular before you&apos;ve even finished your coffee.”</blockquote>
            <div className="quote-author"><span className="author-dot">A</span><span><strong>Alex R.</strong><br />local, happy camper</span></div>
            <div className="quote-doodle"><Sparkle /><Sparkle /></div>
          </div>
        </section>

        <section className="newsletter section-pad">
          <div className="newsletter-copy"><p className="eyebrow eyebrow-coral">Stay in the loop</p><h2>A little joy,<br /><em>in your inbox.</em></h2></div>
          <div className="newsletter-form-wrap"><p>New beans, seasonal drinks, and good news from the café. No noise, promise.</p><form className="newsletter-form"><label className="sr-only" htmlFor="email">Your email address</label><input id="email" name="email" type="email" placeholder="Your email address" /><button type="submit" aria-label="Subscribe"><ArrowUpRight /></button></form><span className="form-note">We&apos;ll only send the good stuff. ✦</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><a className="footer-logo" href="#top" aria-label="Juniper & Bloom home"><Image src="/juniper-bloom-logo-wide.svg" alt="Juniper & Bloom" width={404} height={41} className="footer-brand-logo" /></a><p>Good coffee for<br />slow mornings.</p></div>
        <div className="footer-links"><div><span>Explore</span><a href="#menu">The menu</a><a href="#story">Our story</a><a href="#visit">Visit us</a></div><div><span>Say hello</span><a href="mailto:hello@juniperandbloom.com">Email us</a><a href="#top">Instagram</a><a href="#top">TikTok</a></div></div>
        <div className="footer-bottom"><span>© 2024 Juniper &amp; Bloom</span><span>Made for the morning people <span className="heart">♥</span></span></div>
      </footer>
    </div>
  );
}
