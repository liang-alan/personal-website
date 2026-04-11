import React, { useEffect, useMemo, useRef, useState } from 'react';
import useProfile from '../hooks/useProfile';
import ProjectCard from './ProjectCard';
import { Project } from '../types';
import LoadingSpinner from './LoadingSpinner';

const PROJECTS_PER_PAGE = 6;
const sortOptions = [
  { value: 'date-desc', label: 'Date: Newest first' },
  { value: 'date-asc', label: 'Date: Oldest first' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
] as const;

type SortOption = (typeof sortOptions)[number]['value'];

const monthOrder: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

const getDateValue = (rawDate?: string): number => {
  if (!rawDate) return 0;

  const value = rawDate.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(value).getTime();
  }

  const yearOnlyMatch = value.match(/^(\d{4})$/);
  if (yearOnlyMatch) {
    return new Date(Number(yearOnlyMatch[1]), 0, 1).getTime();
  }

  const monthYearMatch = value.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!monthYearMatch) return 0;

  const monthKey = monthYearMatch[1].slice(0, 3).toLowerCase();
  const month = monthOrder[monthKey];
  const year = Number(monthYearMatch[2]);

  if (month === undefined || Number.isNaN(year)) return 0;

  return new Date(year, month, 1).getTime();
};

const ProjectsSection: React.FC = () => {
  const { profile, loading } = useProfile();
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = profile?.projects || [];

  const normalizedSelectedTags = selectedTags.map((tag) => tag.toLowerCase());

  const filteredProjects = useMemo(() => {
    if (normalizedSelectedTags.length === 0) return projects;

    return projects.filter((project) => {
      const projectTitle = project.title.toLowerCase();
      const projectTags = (project.tags || []).map((tag) => tag.toLowerCase());

      return normalizedSelectedTags.every((selectedTag) =>
        projectTitle.includes(selectedTag) ||
        projectTags.some((tag) => tag.includes(selectedTag))
      );
    });
  }, [projects, normalizedSelectedTags]);

  const sortedProjects = useMemo(() => {
    const nextProjects = [...filteredProjects];

    nextProjects.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return getDateValue(a.date) - getDateValue(b.date) || collator.compare(a.title, b.title);
        case 'date-desc':
          return getDateValue(b.date) - getDateValue(a.date) || collator.compare(a.title, b.title);
        case 'name-desc':
          return collator.compare(b.title, a.title);
        case 'name-asc':
        default:
          return collator.compare(a.title, b.title);
      }
    });

    return nextProjects;
  }, [filteredProjects, sortBy]);

  const visibleProjects = useMemo(() => {
    return sortedProjects.slice(0, visibleCount);
  }, [sortedProjects, visibleCount]);

  const currentSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || 'Sort';

  useEffect(() => {
    if (!sortMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setSortMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSortMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sortMenuOpen]);

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
    setVisibleCount(PROJECTS_PER_PAGE);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) =>
      prev.filter((tag) => tag.toLowerCase() !== tagToRemove.toLowerCase())
    );
    setVisibleCount(PROJECTS_PER_PAGE);
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setSortMenuOpen(false);
    setVisibleCount(PROJECTS_PER_PAGE);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="projects container">
      <h2>Projects</h2>

      <div className="projects-search projects-toolbar">
        <div className="projects-search-box">
          {selectedTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="selected-tag-chip"
              onClick={() => removeTag(tag)}
              aria-label={`Remove filter ${tag}`}
            >
              {tag} <span aria-hidden="true">×</span>
            </button>
          ))}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a project name or tag and press Enter..."
            aria-label="Search projects by name or tags"
            className="projects-search-input"
          />
        </div>

        <div className="projects-sort" ref={sortMenuRef}>
          <button
            type="button"
            className={`projects-sort-button ${sortMenuOpen ? 'open' : ''}`}
            onClick={() => setSortMenuOpen((current) => !current)}
            aria-haspopup="menu"
            aria-expanded={sortMenuOpen}
          >
            <span>Sort</span>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {sortMenuOpen ? (
            <div className="projects-sort-menu" role="menu" aria-label="Sort projects">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={sortBy === option.value}
                  className={`projects-sort-option ${sortBy === option.value ? 'active' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  <span>{option.label}</span>
                  {sortBy === option.value ? <span aria-hidden="true">✓</span> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <p className="projects-sort-label">Sorted by {currentSortLabel}</p>

      {sortedProjects.length === 0 ? (
        <p>No projects match those filters.</p>
      ) : (
        <>
          <div className="projects-grid">
            {visibleProjects.map((p) => (
              <ProjectCard
                key={p.link || p.title}
                title={p.title}
                date={p.date}
                description={p.description}
                tags={p.tags || []}
                image={p.image}
                link={p.link || ''}
                onTagClick={handleTagClick}
                activeTags={selectedTags}
              />
            ))}
          </div>

          {visibleCount < sortedProjects.length && (
            <div className="projects-load-more">
              <button
                type="button"
                className="load-more-button"
                onClick={handleLoadMore}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsSection;
