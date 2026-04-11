import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  id: string;
  rootMargin?: string;
  threshold?: number | number[];
  children: React.ReactNode;
}

// Reveal each section once it approaches the viewport.
const LazySection: React.FC<LazySectionProps> = ({
  id,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.2,
  children,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const thresholdValue = Array.isArray(threshold) ? threshold[0] : threshold;

          if (entry.isIntersecting && entry.intersectionRatio >= thresholdValue) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <section id={id} ref={ref} className="lazy-section">
      <div className={`lazy-section-content ${isRevealed ? 'revealed' : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default LazySection;
