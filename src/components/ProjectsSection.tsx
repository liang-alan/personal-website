import React from 'react';
import useProfile from '../hooks/useProfile';
import ProjectCard from './ProjectCard';
import { Project } from '../types';
import LoadingSpinner from './LoadingSpinner';

const ProjectsSection: React.FC = () => {
  const { profile, loading } = useProfile();
  if (loading) return <LoadingSpinner />;

  const projects: Project[] = profile?.projects || [];

  return (
    <div className="projects container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.link || p.title}
            title={p.title}
            description={p.description}
            technologies={p.technologies || []}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
