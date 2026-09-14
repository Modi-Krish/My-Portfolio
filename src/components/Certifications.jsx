import ScrollReveal from './ScrollReveal';

const CERTIFICATIONS = [
  {
    icon: '☁️',
    date: 'Jul 2025 — Aug 2025',
    title: 'AWS Academy Graduate',
    desc: 'Cloud Foundations, Amazon Web Services (AWS). (Completed)',
  },
  {
    icon: '🐍',
    date: 'Nov 2024 — Dec 2024',
    title: 'Python Programming',
    desc: 'Etrain (Score: 90%)',
  },
  {
    icon: '🛡️',
    date: 'Sep 2024 — Oct 2024',
    title: 'Cybersecurity Fundamentals',
    desc: 'Introduction to Cybersecurity, Cisco. (Completed)',
  },
];

export default function Certifications() {
  return (
    <section className="section certifications-section" id="certifications">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">Learning</span>
            <h2 className="section__title">Courses &amp; Certifications</h2>
          </div>
        </ScrollReveal>

        {/* Shares grid layout with achievements — light variant */}
        <div className="achievements__grid">
          {CERTIFICATIONS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <div className="achievement-card">
                <div className="achievement-card__icon">{item.icon}</div>
                <span className="certification__date">{item.date}</span>
                <h3 className="achievement-card__title">{item.title}</h3>
                <p className="achievement-card__desc">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
