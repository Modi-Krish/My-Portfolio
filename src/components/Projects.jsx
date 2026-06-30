import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

import { PROFILE_DATA } from '../constants/profileData';
import projectCivic from '../assets/project-civic.png';
import projectData from '../assets/project-data.png';
import projectWeb from '../assets/project-web.png';

const GITHUB_USERNAME = PROFILE_DATA.githubUsername;
const FEATURED_TOPIC = PROFILE_DATA.featuredTopic;

const PROJECT_IMAGES = {
  // Civic
  'Civic-Issue-Tracker': projectCivic,
  'Civic-Issues-Reporting-Portal': projectCivic,
  
  // Travel
  'Traveloop': projectWeb,
  'Travel-App': projectWeb,
  
  // ProduX / Data
  'ProduX-': projectData,
  'AI-Based-Learning-Monitor': projectData,
  'Face-Recognition-Attendance': projectData,
  
  // Web / Generic
  'Internship-Cell-Web-Portal': projectWeb,
  'Hotspot-Base-Attendance-System': projectWeb,
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  // Get mapped image or fallback to GitHub OpenGraph
  const localImage = PROJECT_IMAGES[project.name];
  const [imgSrc, setImgSrc] = useState(localImage || `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${project.name}`);

  const handleImageError = () => {
    // If the image fails to load, fallback to projectWeb as a default placeholder
    if (imgSrc !== projectWeb) {
      setImgSrc(projectWeb);
    }
  };

  return (
    <ScrollReveal delay={index * 0.15}>
      <div
        className="project-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
            {project.description || 'No description provided. Add a description to your GitHub repository to see it here.'}
          </p>
          <div className="project-card__tech">
            {project.topics && project.topics.filter(t => t !== FEATURED_TOPIC).map((t) => (
              <span key={t} className="project-card__tech-tag">{t}</span>
            ))}
          </div>
          <div className="project-card__links">
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <i className="fa-brands fa-github"></i> Source Code
            </a>
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="project-card__link">
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        
        // Filter repos that have the 'portfolio' topic
        const featured = data.filter(repo => repo.topics && repo.topics.includes(FEATURED_TOPIC));
        
        setProjects(featured);
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
          <span className="section__label">My Work</span>
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">
            Dynamic showcase of my GitHub repositories tagged with "{FEATURED_TOPIC}".
          </p>
        </ScrollReveal>

        {loading ? (
          <div className="loading-state">
            <i className="fa-solid fa-spinner fa-spin"></i> Loading Repositories...
          </div>
        ) : error ? (
          <div className="error-state">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            No projects found. Add the topic <strong>"{FEATURED_TOPIC}"</strong> to your GitHub repositories to display them here!
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

