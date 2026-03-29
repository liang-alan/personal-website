import React from 'react';
import useProfile from '../hooks/useProfile';
import LoadingSpinner from './LoadingSpinner';

const Contact: React.FC = () => {
  const { profile, loading } = useProfile();

  if (loading) return <LoadingSpinner />;

  const email = profile?.email;
  const phone = (profile as any)?.phone;
  const social = (profile as any)?.social || profile?.socialMedia || {};

  return (
    <div className="contact container">
      <h2>Contact</h2>
      {email ? (
        <p>
          You can reach me at <a href={`mailto:${email}`}>{email}</a>
        </p>
      ) : (
        <p>Email not provided.</p>
      )}
    </div>
  );
};

export default Contact;
