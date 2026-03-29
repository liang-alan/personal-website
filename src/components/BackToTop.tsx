import React, { useEffect, useState } from 'react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

    useEffect(() => {
      const onScroll = () => setVisible(window.scrollY > 300 && (window.innerHeight + window.scrollY) < (document.body.scrollHeight - 100));
      window.addEventListener('scroll', onScroll);
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    if (!visible) return null;

  return (
      <button
        className={`back-to-top circular ${visible ? 'visible' : ''}`}
        onClick={handleClick}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="chev">↑</span>
    </button>
  );
};

export default BackToTop;
