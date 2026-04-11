import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import WorkExperience from './components/WorkExperience';
import ProjectsSection from './components/ProjectsSection';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import LoadingArcade from './components/LoadingArcade';
import LazySection from './components/LazySection';
// About intentionally omitted; intro/portfolio sits at top of the page
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

const App: React.FC = () => {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Colors to interpolate between (you can change these)
    const bright = getComputedStyle(document.documentElement).getPropertyValue('--bg-start');
    const dark = getComputedStyle(document.documentElement).getPropertyValue('--bg-end') || '#272757';

    const hexToRgb = (hex: string) => {
      const h = hex.replace('#', '').trim();
      return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
    };
    const rgbToHex = (r: number, g: number, b: number) =>
      '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');

    const mix = (a: string, b: string, t: number) => {
      const ra = hexToRgb(a);
      const rb = hexToRgb(b);
      const r = Math.round(ra[0] + (rb[0] - ra[0]) * t);
      const g = Math.round(ra[1] + (rb[1] - ra[1]) * t);
      const bl = Math.round(ra[2] + (rb[2] - ra[2]) * t);
      return rgbToHex(r, g, bl);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const t = Math.min(1, Math.max(0, scrollTop / max));
        // Use ease (optional) — here linear
        const color = mix(bright, dark.trim(), t);
        document.documentElement.style.setProperty('--bg-start', color);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return (
    <BrowserRouter basename="/personal-website/">
      <div id="top">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LazySection id="portfolio">
                    <Portfolio />
                  </LazySection>
                  <LazySection id="work">
                    <WorkExperience />
                  </LazySection>
                  <LazySection id="projects">
                    <ProjectsSection />
                  </LazySection>
                  <LazySection id="blog">
                    <Blog />
                  </LazySection>
                  <LazySection id="contact">
                    <Contact />
                  </LazySection>
                </>
              }
            />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/arcade" element={<LoadingArcade mode="play" />} />
          </Routes>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
