import { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../constants/profileData';

export default function Resume({ isOpen, onClose }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const originalTitle = document.title;
    document.title = `${PROFILE_DATA.name.replace(/\s+/g, '-')}-Resume`;

    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${PROFILE_DATA.githubUsername}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        const featured = data.filter(repo => repo.topics && repo.topics.includes(PROFILE_DATA.featuredTopic));
        setProjects(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();

    document.body.classList.add('resume-open');

    return () => {
      document.title = originalTitle;
      document.body.classList.remove('resume-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal">
      <div className="resume-modal__overlay" onClick={onClose}></div>
      <div className="resume-modal__content">
        <div className="resume-modal__actions no-print">
          <button className="btn btn--primary" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print / Save as PDF
          </button>
          <button className="btn btn--ghost" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i> Close
          </button>
        </div>

        <div className="resume-paper" id="resume-printable">
          {/* HEADING */}
          <header className="latex-header">
            <h1 className="latex-name">{PROFILE_DATA.name}</h1>
            <div className="latex-contact">
              <i className="fa-solid fa-phone"></i> {PROFILE_DATA.contact.phone} <span className="latex-pipe">|</span>
              <i className="fa-solid fa-envelope"></i> <a href={`mailto:${PROFILE_DATA.contact.email}`}>{PROFILE_DATA.contact.email}</a> <span className="latex-pipe">|</span>
              <i className="fa-solid fa-location-dot"></i> {PROFILE_DATA.contact.location}
              <br />
              <i className="fa-brands fa-github"></i> <a href={PROFILE_DATA.contact.socials.github} target="_blank" rel="noreferrer">GitHub</a> <span className="latex-pipe">|</span>
              <i className="fa-brands fa-linkedin"></i> <a href={PROFILE_DATA.contact.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> <span className="latex-pipe">|</span>
              <i className="fa-solid fa-globe"></i> <a href={PROFILE_DATA.contact.socials.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
            </div>
          </header>

          {/* SUMMARY */}
          <section className="latex-section">
            <h2 className="latex-section-title">SUMMARY</h2>
            <div className="latex-section-content">
              <p className="latex-text">{PROFILE_DATA.summary}</p>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="latex-section">
            <h2 className="latex-section-title">EDUCATION</h2>
            <div className="latex-section-content">
              {PROFILE_DATA.education.map((edu, i) => (
                <div key={i} className="latex-subheading">
                  <div className="latex-subheading-row">
                    <span className="latex-bold">{edu.institution}</span>
                    <span className="latex-date">{edu.date}</span>
                  </div>
                  <div className="latex-subheading-row">
                    <span className="latex-italic" dangerouslySetInnerHTML={{__html: edu.degree.replace('(CGPA: 7.36)', '<b>(CGPA: 7.36)</b>')}}></span>
                    <span className="latex-date">{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="latex-section">
            <h2 className="latex-section-title">EXPERIENCE</h2>
            <div className="latex-section-content">
              {PROFILE_DATA.experience.map((exp, i) => (
                <div key={i} className="latex-subheading">
                  <div className="latex-subheading-row">
                    <span className="latex-bold">{exp.company}</span>
                    <span className="latex-date">{exp.date}</span>
                  </div>
                  <div className="latex-subheading-row">
                    <span className="latex-italic">{exp.title}</span>
                    <span className="latex-date">{exp.location}</span>
                  </div>
                  <ul className="latex-list">
                    {exp.desc.split('|').map((item, j) => (
                      <li key={j} className="latex-list-item">{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="latex-section">
            <h2 className="latex-section-title">PROJECTS</h2>
            <div className="latex-section-content">
              {loading ? (
                <p className="latex-text">Loading projects...</p>
              ) : projects.length > 0 ? (
                projects.map((project) => {
                  const projectDate = PROFILE_DATA.projectDates[project.name] || project.language || '';
                  return (
                    <div key={project.id} className="latex-subheading">
                      <div className="latex-subheading-row">
                        <span className="latex-bold" style={{ textTransform: 'capitalize' }}>{project.name.replace(/-/g, ' ')}</span>
                        <span className="latex-date">{projectDate}</span>
                      </div>
                      <ul className="latex-list">
                        <li className="latex-list-item">{project.description || 'GitHub Project'}</li>
                      </ul>
                    </div>
                  );
                })
              ) : (
                <p className="latex-text">No featured projects found.</p>
              )}
            </div>
          </section>

          {/* SKILLS */}
          <section className="latex-section">
            <h2 className="latex-section-title">SKILLS</h2>
            <div className="latex-section-content">
              <p className="latex-text">{PROFILE_DATA.skills}</p>
            </div>
          </section>

          {/* ACHIEVEMENTS & CERTIFICATIONS */}
          <section className="latex-section">
            <h2 className="latex-section-title">ACHIEVEMENTS & CERTIFICATIONS</h2>
            <div className="latex-section-content">
              <ul className="latex-list">
                {Object.entries(PROFILE_DATA.achievementsAndCertifications).map(([key, value]) => (
                  <li key={key} className="latex-list-item">
                    <span className="latex-bold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

