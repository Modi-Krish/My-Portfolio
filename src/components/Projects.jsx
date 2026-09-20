import ScrollReveal from './ScrollReveal';
import devsyncData from '../constants/devsyncData.json';
import { PROFILE_DATA } from '../constants/profileData';

const GITHUB_USERNAME = PROFILE_DATA.githubUsername;

// Inline SVG used as a last-resort placeholder
const PLACEHOLDER_SRC = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23E5E5E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23A3A3A3'%3ENo Preview%3C/text%3E%3C/svg%3E`;

function ProjectCard({ project, index }) {
  const imgSrc = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${project.name}`;

  const handleImageError = (e) => {
    if (e.target.src !== PLACEHOLDER_SRC) e.target.src = PLACEHOLDER_SRC;
  };

  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="project-card">
        <div className="project-card__image-container">
          <img
            src={imgSrc}
            alt={project.title}
            className="project-card__image"
            onError={handleImageError}
          />
        </div>

        <div className="project-card__content">
          <span className="project-card__category">Project</span>
          <h3 className="project-card__title">{project.title.replace(/-/g, ' ')}</h3>
          <p className="project-card__desc">
            {project.description ||
              'No description provided. Add a description to your GitHub repository to see it here.'}
          </p>

          <div className="project-card__tech">
            {project.technologies &&
              project.technologies.map((t) => (
                  <span key={t} className="project-card__tech-tag">{t}</span>
                ))}
          </div>

          <div className="project-card__links">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              <i className="fa-brands fa-github"></i> Source Code
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Projects() {
  const projects = devsyncData?.projects || [];

  return (
    <section className="section" id="projects">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">My Work</span>
            <h2 className="section__title">Featured Projects</h2>
            <p className="section__subtitle">
              Dynamically synced from DevSync CMS showcasing my top GitHub repositories.
            </p>
          </div>
        </ScrollReveal>

        {projects.length === 0 ? (
          <div className="empty-state">
            No projects found. Trigger the DevSync publish job to populate this section.
          </div>
        ) : (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
