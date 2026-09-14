import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#home',           label: 'Home' },
  { href: '#about',          label: 'About' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projects' },
  { href: '#experience',     label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#achievements',   label: 'Achievements' },
  { href: '#contact',        label: 'Contact' },
];

export default function Navbar({ onResumeClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = '#home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = `#${section.getAttribute('id')}`;
        }
      });
      setActiveLink(current);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) setMenuOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleResumeClick = (e) => {
    e.preventDefault();
    onResumeClick();
    setMenuOpen(false);
  };

  // Today's date for the edition strip
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      {/* Backdrop for mobile drawer */}
      <div
        className={`navbar__backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        {/* Edition strip — newspaper dateline */}
        <div className="navbar__edition-strip">
          <span>Vol. I &nbsp;·&nbsp; {today} &nbsp;·&nbsp; Vadodara, India</span>
          <span>
            <span className="navbar__edition-strip-accent">KRISH MODI</span>
            &nbsp;— AI/ML &amp; Full Stack Developer
          </span>
        </div>

        {/* Main nav bar */}
        <div className="navbar__inner">
          <a href="#" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
            MK.
          </a>

          <ul className={`navbar__links ${menuOpen ? 'open' : ''}`} id="navLinks">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeLink === link.href ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* Mobile-only resume link */}
            <li className="navbar__mobile-resume-item">
              <a href="#" className="navbar__link navbar__link--resume" onClick={handleResumeClick}>
                <i className="fa-solid fa-file-pdf"></i> View Resume
              </a>
            </li>
          </ul>

          <button className="navbar__cta" onClick={handleResumeClick} aria-label="View Resume">
            <i className="fa-solid fa-file-pdf"></i> Resume
          </button>

          <button
            className="navbar__menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
          </button>
        </div>
      </nav>
    </>
  );
}
