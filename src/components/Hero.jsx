import { useState, useEffect } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import avatar from '../assets/avatar.jpg';

function StatCounter({ target, label }) {
  const { ref, count } = useCountUp(target);
  return (
    <div className="hero__stat" ref={ref}>
      <div className="hero__stat-value">{count}+</div>
      <div className="hero__stat-label">{label}</div>
    </div>
  );
}

export default function Hero({ onResumeClick }) {
  const [greeting, setGreeting] = useState('');
  const fullGreeting = 'By Krish Modi';

  // Typing animation for byline
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < fullGreeting.length) {
          setGreeting(fullGreeting.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  // Current date for masthead
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <section className="hero" id="home">
      {/* ── Masthead — the big headline area ── */}
      <div className="hero__masthead">
        <div className="hero__edition-tag">
          <div className="hero__badge">
            <span className="dot"></span>
            Available for Projects
          </div>
          <span className="hero__byline-meta">{today}</span>
        </div>

        <hr className="hero__rule--heavy" />

        <h1 className="hero__name">
          <span className="hero__name-light">Modi</span>
          <br />
          Krish
        </h1>

        <hr className="hero__rule" />
      </div>

      {/* ── Editorial Grid — 8/4 asymmetric ── */}
      <div className="hero__container section__container">
        {/* Left column — content */}
        <div className="hero__content">
          <p className="hero__greeting">{greeting || '\u00A0'}</p>

          <p className="hero__roles">
            🧠 AI/ML Specialist &nbsp;·&nbsp; 💻 Full Stack Developer &nbsp;·&nbsp; 📊 Data Scientist
          </p>

          <p className="hero__desc">
            Building intelligent, scalable web applications powered by data-driven insights.
            I transform complex data into impactful solutions and craft beautiful digital experiences.
          </p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="btn btn--primary"
              onClick={(e) => handleClick(e, '#projects')}
            >
              <i className="fa-solid fa-arrow-right"></i> View My Work
            </a>
            <button className="btn btn--ghost" onClick={onResumeClick}>
              <i className="fa-solid fa-file-pdf"></i> View Resume
            </button>
          </div>
        </div>

        {/* Right column — portrait */}
        <div className="hero__visual">
          <div className="hero__avatar-wrapper">
            <img
              src={avatar}
              alt="Modi Krish — AI/ML & Full Stack Developer"
              className="hero__avatar"
            />
            <div className="hero__avatar-caption">Fig. 1.1 — Modi Krish, Developer, Vadodara</div>
          </div>
        </div>
      </div>

      {/* ── Stats ticker — the news crawl ── */}
      <div className="hero__ticker">
        <div className="hero__ticker-inner">
          <div className="hero__ticker-label">Stats</div>
          <div className="hero__stats">
            <StatCounter target={15} label="Projects Shipped" />
            <StatCounter target={12} label="Technologies" />
            <StatCounter target={1}  label="Year Experience" />
          </div>
        </div>
      </div>
    </section>
  );
}
