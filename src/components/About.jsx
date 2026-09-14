import ScrollReveal from './ScrollReveal';
import avatar from '../assets/avatar.jpg';

import { PROFILE_DATA } from '../constants/profileData';

export default function About() {
  const { about } = PROFILE_DATA;

  return (
    <section className="section" id="about">
      <div className="section__container">
        {/* Section header with heavy bottom rule */}
        <div className="about__header">
          <ScrollReveal>
            <span className="section__label">About Me</span>
            <h2 className="section__title">{about.greeting}</h2>
          </ScrollReveal>
        </div>

        {/* 5/7 editorial split */}
        <div className="about__grid">
          {/* Left — portrait */}
          <ScrollReveal className="about__image-wrapper">
            <img
              src={avatar}
              alt={`${PROFILE_DATA.name} — Portrait`}
              className="about__image"
            />
            <div className="about__image-caption">Fig. 1.2 — {PROFILE_DATA.name}, Vadodara, India</div>
          </ScrollReveal>

          {/* Right — editorial body */}
          <ScrollReveal className="about__content-wrapper">
            <div className="about__content">
              {about.description.map((para, i) => (
                <p
                  key={i}
                  className={`about__text${i === 0 ? ' about__text--dropcap' : ''}`}
                  dangerouslySetInnerHTML={{
                    __html: para.replace(/Krish Modi/g, '<strong>Krish Modi</strong>'),
                  }}
                />
              ))}

              {/* Numbered highlight cards */}
              <div className="about__highlights">
                {about.highlights.map((h, i) => (
                  <div key={i} className="about__highlight-card">
                    <div className="about__highlight-num">0{i + 1}</div>
                    <div className="about__highlight-icon">{h.icon}</div>
                    <div className="about__highlight-title">{h.title}</div>
                    <div className="about__highlight-desc">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
