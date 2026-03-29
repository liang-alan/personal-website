import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies, image }) => {
  return (
    <div className="project-card">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={`${title} screenshot`} className="project-image" />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {technologies.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;