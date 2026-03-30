import React, { useMemo, useState } from 'react';
import useProfile from '../hooks/useProfile';
import ProjectCard from './ProjectCard';
import { Project } from '../types';
import LoadingSpinner from './LoadingSpinner';

const ProjectsSection: React.FC = () => {
  const { profile, loading } = useProfile();
  const [tagQuery, setTagQuery] = useState('');

  const projects: Project[] = profile?.projects || [];

  const filteredProjects = useMemo(() => {
    const q = tagQuery.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((project) =>
      (project.tags || []).some((tag) => tag.toLowerCase().includes(q))
    );
  }, [projects, tagQuery]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="projects container">
      <h2>Projects</h2>

      <div className="projects-search">
        <input
          type="text"
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          placeholder="Search by tag..."
          aria-label="Search projects by tag"
          className="projects-search-input"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p>No projects match that tag.</p>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.link || p.title}
              title={p.title}
              description={p.description}
              tags={p.tags || []}
              image={p.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;