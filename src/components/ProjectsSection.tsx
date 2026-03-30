import React, { useMemo, useState } from 'react';
import useProfile from '../hooks/useProfile';
import ProjectCard from './ProjectCard';
import { Project } from '../types';
import LoadingSpinner from './LoadingSpinner';

const ProjectsSection: React.FC = () => {
  const { profile, loading } = useProfile();
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects: Project[] = profile?.projects || [];

  const normalizedSelectedTags = selectedTags.map((tag) => tag.toLowerCase());

  const filteredProjects = useMemo(() => {
    if (normalizedSelectedTags.length === 0) return projects;

    return projects.filter((project) => {
      const projectTags = (project.tags || []).map((tag) => tag.toLowerCase());

      return normalizedSelectedTags.every((selectedTag) =>
        projectTags.some((tag) => tag.includes(selectedTag))
      );
    });
  }, [projects, normalizedSelectedTags]);

  const addTag = (rawTag: string) => {
    const newTag = rawTag.trim();
    if (!newTag) return;

    const alreadyExists = selectedTags.some(
      (tag) => tag.toLowerCase() === newTag.toLowerCase()
    );
    if (alreadyExists) {
      setTagInput('');
      return;
    }

    setSelectedTags((prev) => [...prev, newTag]);
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) =>
      prev.filter((tag) => tag.toLowerCase() !== tagToRemove.toLowerCase())
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }

    if (e.key === 'Backspace' && !tagInput.trim() && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  const handleTagClick = (tag: string) => {
    const exists = selectedTags.some(
      (selected) => selected.toLowerCase() === tag.toLowerCase()
    );

    if (exists) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="projects container">
      <h2>Projects</h2>

      <div className="projects-search">
        <div className="projects-search-box">
          {selectedTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="selected-tag-chip"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
            >
              {tag} <span aria-hidden="true">×</span>
            </button>
          ))}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a tag and press Enter..."
            aria-label="Search projects by tags"
            className="projects-search-input"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p>No projects match those tags.</p>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.link || p.title}
              title={p.title}
              date={p.date}
              description={p.description}
              tags={p.tags || []}
              image={p.image}
              link={p.link || ""}
              onTagClick={handleTagClick}
              activeTags={selectedTags}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;