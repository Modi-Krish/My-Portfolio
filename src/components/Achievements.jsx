import ScrollReveal from './ScrollReveal';

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'First Prize – Ideathon',
    desc: 'Awarded for innovative thinking and problem-solving at the University Ideathon.',
  },
  {
    icon: '🔬',
    title: 'First Prize – Scienti-X',
    desc: 'Recognized for the Best Science Project, demonstrating technical depth and creativity.',
  },
  {
    icon: '🇮🇳',
    title: 'Top 50 Nationwide',
    desc: 'Ranked among the top 50 teams in the Innovate Nation Hackathon by the Government of Delhi.',
  },
  {
    icon: '⚡',
    title: 'Hackathon Finalist',
    desc: 'Participated in a grueling 36-hour AI/ML Hackathon, building complex solutions under pressure.',
  },
];

export default function Achievements() {
  return (
    /* Full-bleed inverted black section */
    <section className="achievements-section" id="achievements">
      <div className="section">
        <div className="section__container">
          <ScrollReveal>
            <span className="section__label">Recognition</span>
            <h2 className="section__title">Achievements</h2>
            <p className="section__subtitle">
              Milestones and recognition for my work in technology and innovation.
            </p>
          </ScrollReveal>

          {/* 2-column collapsed grid on black */}
          <div className="achievements__grid">
            {ACHIEVEMENTS.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <div className="achievement-card">
                  <div className="achievement-card__num">No. 0{index + 1}</div>
                  <div className="achievement-card__icon">{item.icon}</div>
                  <h3 className="achievement-card__title">{item.title}</h3>
                  <p className="achievement-card__desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
