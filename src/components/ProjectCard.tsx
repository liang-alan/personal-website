import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, image }) => {
  return (
    <div className="project-card">
      {image && (
        <img src={image} alt={`${title} screenshot`} className="project-image" />
      )}
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;