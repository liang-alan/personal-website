import React, { useState } from 'react';
import useProfile from '../hooks/useProfile';
import LoadingSpinner from './LoadingSpinner';

const WorkExperience: React.FC = () => {
  const { profile, loading } = useProfile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (loading) return <LoadingSpinner />;

  const work = (profile as any)?.work || [];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="work-experience container">
      <h2>Work Experience</h2>
      {work.length === 0 && <p>No work experience added yet.</p>}

      <div className="work-tiles">
        {work.map((job: any, i: number) => {
          const opened = openIndex === i;
          const responsibilities: string[] = job.responsibilities || (job.description ? [job.description] : []);
          return (
            <article key={job.company + i} className={`work-tile ${opened ? 'open' : ''}`}>
              <header className="work-tile-header" onClick={() => toggle(i)}>
                <div className="work-tile-left">
                  {job.image && (
                    <img src={job.image} alt={`${job.company} logo`} className="work-avatar" />
                  )}
                  <div>
                    <h3>{job.title}</h3>
                    <div className="dates">{job.company} • {job.start} — {job.end || 'Present'}</div>
                  </div>
                </div>
                <button className="toggle-arrow" aria-expanded={opened} aria-label={opened ? 'Collapse' : 'Expand'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </header>
              <div className="work-tile-body" aria-hidden={!opened}>
                <ul>
                  {responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default WorkExperience;