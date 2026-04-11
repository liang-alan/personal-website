import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../api/client';
import { Profile } from '../types';
import LoadingArcade from './LoadingArcade';

const Portfolio = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        setError((err as Error).message || String(err));
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
  }, []);

  if (loading) {
    return <LoadingArcade />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="portfolio container portfolio-grid">
      <div className="portfolio-content">
        <h1>{profile?.name}</h1>
        <p>{profile?.description}</p>
      </div>
      {profile?.introImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <div className="portfolio-image">
          <img src={profile.introImage} alt={`${profile.name} photo`} />
        </div>
      )}
    </div>
  );
};

export default Portfolio;
