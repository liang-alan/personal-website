import React from 'react';
import useProfile from '../hooks/useProfile';
import LoadingSpinner from './LoadingSpinner';

const WorkExperience: React.FC = () => {
  const { profile, loading } = useProfile();

    if (loading) return <LoadingSpinner />;

  const work = (profile as any)?.work || [];

  return (
    <div className="work-experience container">
      <h2>Work Experience</h2>
      {work.length === 0 && <p>No work experience added yet.</p>}
      <ul>
        {work.map((job: any, i: number) => (
          <li key={job.company + i} className="job">
            <h3>{job.title} — {job.company}</h3>
            <p className="dates">{job.start} — {job.end || 'Present'}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkExperience;
