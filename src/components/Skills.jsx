import ScrollReveal from './ScrollReveal';

const SKILLS = [
  {
    icon: '⚛️',
    title: 'Frameworks & Tools',
    desc: 'Building scalable applications with modern frameworks and robust API architectures.',
    tags: ['React.js', 'Django', 'RESTful APIs', 'Node.js', 'Express'],
  },
  {
    icon: '🧠',
    title: 'AI/ML & LLMs',
    desc: 'Developing intelligent systems using computer vision and large language models.',
    tags: ['DeepFace', 'LLM Concepts', 'Prompt Engineering', 'OpenCV', 'TensorFlow'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    desc: 'Managing infrastructure and streamlining development with cloud services and version control.',
    tags: ['AWS', 'Git', 'API Integration', 'Docker', 'CI/CD'],
  },
  {
    icon: '💻',
    title: 'Programming Languages',
    desc: 'Core languages used for backend logic, data processing, and frontend interactions.',
    tags: ['Python', 'JavaScript', 'SQL', 'TypeScript'],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    desc: 'Designing and managing efficient data storage solutions for high-performance apps.',
    tags: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    icon: '🛠️',
    title: 'Other Tools',
    desc: 'Additional libraries and tools used for automation and specialized tasks.',
    tags: ['OpenCV', 'gspread', 'Pandas', 'NumPy', 'Agile', 'Scrum'],
  },
];

function SkillCard({ skill, index }) {
  // No 3D tilt — incompatible with the flat newsprint aesthetic
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="skill-card">
        <div className="skill-card__icon">{skill.icon}</div>
        <h3 className="skill-card__title">{skill.title}</h3>
        <p className="skill-card__desc">{skill.desc}</p>
        <div className="skill-card__tags">
          {skill.tags.map((tag) => (
            <span key={tag} className="skill-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">Skills & Tools</span>
            <h2 className="section__title">My Tech Arsenal</h2>
            <p className="section__subtitle">Technologies and tools I use to bring ideas to life.</p>
          </div>
        </ScrollReveal>

        {/* Collapsed newspaper grid */}
        <div className="skills__grid">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
