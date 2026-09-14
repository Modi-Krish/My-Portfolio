export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Edition metadata bar */}
      <div className="footer__edition-bar">
        <span className="footer__edition-text">Vol. I, {year} &mdash; Vadodara Edition</span>
        <span className="footer__edition-text">AI/ML &amp; Full Stack Developer</span>
        <span className="footer__edition-text">Printed in React + Vite</span>
      </div>

      {/* Three-column body */}
      <div className="footer__inner">
        {/* Col 1 — logo & tagline */}
        <div className="footer__col">
          <span className="footer__logo">MK.</span>
          <p className="footer__tagline">
            "All the News That's Fit to Build." &mdash; Crafting intelligent, scalable
            web applications with clarity and purpose.
          </p>
        </div>

        {/* Col 2 — social links */}
        <div className="footer__col">
          <span className="footer__col-label">Connect</span>
          <div className="footer__socials">
            <a
              href="https://github.com/Modi-Krish"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i> GitHub
            </a>
            <a
              href="https://linkedin.com/in/modikrish0311"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i> LinkedIn
            </a>
            <a
              href="https://wa.me/918160443606"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
            <a
              href="mailto:kgmodi3112004@gmail.com"
              className="footer__social"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i> Email
            </a>
          </div>
        </div>

        {/* Col 3 — quick navigation */}
        <div className="footer__col">
          <span className="footer__col-label">Navigation</span>
          <div className="footer__socials">
            {['#about', '#skills', '#projects', '#experience', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                className="footer__social"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-arrow-right"></i>{' '}
                {href.replace('#', '').replace(/^\w/, (c) => c.toUpperCase())}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Colophon */}
      <div className="footer__colophon">
        <p className="footer__text">
          &copy; {year} Modi Krish — All rights reserved
        </p>
        <p className="footer__text">
          Vadodara, Gujarat, India &nbsp;&middot;&nbsp; +91 81604 43606
        </p>
      </div>
    </footer>
  );
}
