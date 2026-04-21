import React from 'react';

type ProjectCardProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  link?: string;
  onTagClick?: (tag: string) => void;
  activeTags?: string[];
  onProjectOpen?: (details: { title: string; link?: string; tags: string[] }) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  date,
  description,
  tags,
  image,
  link,
  onTagClick,
  activeTags = [],
  onProjectOpen,
}) => {
  const handleCardClick = () => {
    if (link) {
      onProjectOpen?.({ title, link, tags });
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!link) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onProjectOpen?.({ title, link, tags });
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`project-card ${link ? 'project-card-clickable' : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={link ? 'link' : undefined}
      tabIndex={link ? 0 : undefined}
    >
      {image && (
        <img src={image} alt={`${title} screenshot`} className="project-image" />
      )}

      <h3>{title}</h3>
      <div className="project-date">{date}</div>
      <p>{description}</p>

      <div className="project-tags">
        {tags.map((tag, index) => {
          const isActive = activeTags.some(
            (activeTag) => activeTag.toLowerCase() === tag.toLowerCase()
          );

          return (
            <button
              key={index}
              type="button"
              className={`project-tag ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
