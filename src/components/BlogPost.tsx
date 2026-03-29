import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LoadingSpinner from './LoadingSpinner';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMd = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        setContent(text);
      } catch (e) {
        setContent('# Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchMd();
  }, [slug]);

  const navigate = useNavigate();

  const handleBack = () => {
    try {
      const raw = sessionStorage.getItem('lastScroll');
      if (raw) {
        const { scrollY, hash } = JSON.parse(raw);
        // navigate back to root, then restore scroll after a tick
        navigate('/');
        setTimeout(() => {
          if (hash) {
            window.location.hash = hash;
          }
          window.scrollTo({ top: scrollY || 0, behavior: 'smooth' });
        }, 50);
        return;
      }
    } catch (e) {
      // ignore
    }
    // fallback
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="blog-detail container">
      <button className="back-arrow" onClick={handleBack} aria-label="Back to posts">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
        </svg>
        <span>Back</span>
      </button>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
