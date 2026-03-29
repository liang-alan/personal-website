import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/client';
import { Profile } from '../types';

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return { profile, loading, error };
};

export default useProfile;