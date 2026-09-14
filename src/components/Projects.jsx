import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

import { PROFILE_DATA } from '../constants/profileData';

const GITHUB_USERNAME = PROFILE_DATA.githubUsername;
const FEATURED_TOPIC  = PROFILE_DATA.featuredTopic;

// Inline SVG used as a last-resort placeholder (no external file needed)
const PLACEHOLDER_SRC = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23E5E5E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23A3A3A3'%3ENo Preview%3C/text%3E%3C/svg%3E`;

function ProjectCard({ project, index }) {
  // No 3D tilt — incompatible with the flat newsprint aesthetic
  const [imgSrc, setImgSrc] = useState(
    `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${project.name}`
  );

  const handleImageError = () => {
    if (imgSrc !== PLACEHOLDER_SRC) setImgSrc(PLACEHOLDER_SRC);
  };

  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="project-card">
        <div className="project-card__image-container">
          <img
            src={imgSrc}
            alt={project.name}
            className="project-card__image"
            onError={handleImageError}
          />
        </div>

        <div className="project-card__content">
          <span className="project-card__category">{project.language || 'Project'}</span>
          <h3 className="project-card__title">{project.name.replace(/-/g, ' ')}</h3>
          <p className="project-card__desc">
            {project.description ||
              'No description provided. Add a description to your GitHub repository to see it here.'}
          </p>

          <div className="project-card__tech">
            {project.topics &&
              project.topics
                .filter((t) => t !== FEATURED_TOPIC)
                .map((t) => (
                  <span key={t} className="project-card__tech-tag">{t}</span>
                ))}
          </div>

          <div className="project-card__links">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              <i className="fa-brands fa-github"></i> Source Code
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!res.ok) throw new Error('Failed to fetch repositories');
        const data = await res.json();
        setProjects(data.filter((r) => r.topics && r.topics.includes(FEATURED_TOPIC)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section className="section" id="projects">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">My Work</span>
            <h2 className="section__title">Featured Projects</h2>
            <p className="section__subtitle">
              Dynamic showcase of my GitHub repositories tagged with &ldquo;{FEATURED_TOPIC}&rdquo;.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="loading-state">
            <i className="fa-solid fa-spinner fa-spin"></i> Loading Repositories…
          </div>
        ) : error ? (
          <div className="error-state">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            No projects found. Add the topic <strong>&ldquo;{FEATURED_TOPIC}&rdquo;</strong> to your
            GitHub repositories to display them here.
          </div>
        ) : (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
