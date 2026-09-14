import ScrollReveal from './ScrollReveal';
import { PROFILE_DATA } from '../constants/profileData';

// Combine experience and education into a single ruled timeline
const TIMELINE = [
  ...PROFILE_DATA.experience.map((e) => ({ ...e, isEdu: false })),
  ...PROFILE_DATA.education.map((e) => ({
    date: e.date,
    title: e.degree.replace('(CGPA: 7.36)', '').trim(),
    company: e.institution,
    desc: `Location: ${e.location}`,
    isEdu: true,
  })),
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">Experience</span>
            <h2 className="section__title">My Journey</h2>
            <p className="section__subtitle">
              A timeline of my professional growth and education.
            </p>
          </div>
        </ScrollReveal>

        {/* Ruled vertical timeline with numbered markers */}
        <div className="timeline">
          {TIMELINE.map((item, index) => (
            <ScrollReveal key={index} className="timeline__item-wrapper">
              <div className="timeline__item">
                <div className="timeline__date">{item.date}</div>
                <h3 className="timeline__title">{item.title}</h3>
                <div className="timeline__company">{item.company}</div>

                {!item.isEdu && item.desc ? (
                  <ul
                    style={{
                      listStyleType: 'disc',
                      paddingLeft: '1.1rem',
                      marginTop: '0.5rem',
                      color: 'var(--fg-caption)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.87rem',
                      lineHeight: '1.8',
                    }}
                  >
                    {item.desc.split('|').map((point, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>
                        {point.trim()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="timeline__desc">{item.desc}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
