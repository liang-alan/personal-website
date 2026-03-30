import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazySectionProps {
  id: string;
  rootMargin?: string;
  threshold?: number | number[];
  children: React.ReactNode;
}

// Default: wait until ~15% of the section is visible (and allow a slight bottom offset)
const LazySection: React.FC<LazySectionProps> = ({ id, rootMargin = '0px 0px -20% 0px', threshold = 0.15, children }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // require some intersectionRatio (threshold) to reduce early mounts
          if (entry.isIntersecting && entry.intersectionRatio >= (Array.isArray(threshold) ? (threshold[0] as number) : (threshold as number))) {
            setVisible(true);
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
    <section id={id} ref={ref} className={`lazy-section ${visible ? 'mounted' : 'placeholder'}`}>
      {visible ? children : <div style={{ padding: '48px 0' }}><LoadingSpinner /></div>}
    </section>
  );
};

export default LazySection;
