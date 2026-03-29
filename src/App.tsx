import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import WorkExperience from './components/WorkExperience';
import ProjectsSection from './components/ProjectsSection';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
// About intentionally omitted; intro/portfolio sits at top of the page
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div id="top">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="portfolio">
                    <Portfolio />
                  </section>
                  <section id="work">
                    <WorkExperience />
                  </section>
                  <section id="projects">
                    <ProjectsSection />
                  </section>
                  <section id="blog">
                    <Blog />
                  </section>
                  <section id="contact">
                    <Contact />
                  </section>
                </>
              }
            />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;