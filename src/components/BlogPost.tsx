import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import LoadingSpinner from './LoadingSpinner';
import NotePopup from './NotePopup';
import { getBlogUrl, IMAGE_BASE_URL } from '../config';


type NoteMap = Record<string, string>;

function parseNotes(markdown: string): NoteMap {
  const lines = markdown.split('\n');
  const notesHeadingIndex = lines.findIndex((line) =>
    /^##\s+Notes\s*$/i.test(line.trim())
  );

  if (notesHeadingIndex === -1) return {};

  const notes: NoteMap = {};
  let currentNumber: string | null = null;
  let currentText: string[] = [];

  for (let i = notesHeadingIndex + 1; i < lines.length; i++) {
    const line = lines[i];

    if (/^##\s+/.test(line.trim())) break;

    const match = line.match(/^(\d+)\.\s+(.*)$/);

    if (match) {
      if (currentNumber) {
        notes[currentNumber] = currentText.join(' ').trim();
      }
      currentNumber = match[1];
      currentText = [match[2]];
    } else if (currentNumber && line.trim()) {
      currentText.push(line.trim());
    }
  }

  if (currentNumber) {
    notes[currentNumber] = currentText.join(' ').trim();
  }

  return notes;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => {
    // ensure navigation to a blog post starts at the top of the page
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      // fallback for environments where window may be undefined
      if (typeof document !== 'undefined') document.documentElement.scrollTop = 0;
    }
  }, [slug]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMd = async () => {
      try {
        const res = await fetch(getBlogUrl(slug || ''));
        if (!res.ok) throw new Error('Not found');

        const text = await res.text();

        const updatedText = text.replaceAll(
          '](/api/images/',
          `](${IMAGE_BASE_URL}/`
        );

        setContent(updatedText);
      } catch {
        setContent('# Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchMd();
  }, [slug]);

  const notes = useMemo(() => parseNotes(content), [content]);

  const handleBack = () => {
    try {
      const raw = sessionStorage.getItem('lastScroll');
      if (raw) {
        const { scrollY, hash } = JSON.parse(raw);
        navigate('/');
        setTimeout(() => {
          if (hash) window.location.hash = hash;
          window.scrollTo({ top: scrollY || 0, behavior: 'smooth' });
        }, 50);
        return;
      }
    } catch {
      // ignore
    }

    navigate(-1);
  };

  if (loading)
    return (
      <div className="blog-detail container loading">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="blog-detail container">
      <button className="back-arrow" onClick={handleBack} aria-label="Back to posts">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
        </svg>
        <span>Back</span>
      </button>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          sup: ({ children }) => {
            const noteNumber = String(children).trim();
            const noteText = notes[noteNumber];

            return (
              <span className="note-ref-wrapper">
                <sup className="note-ref">{noteNumber}</sup>
                {noteText ? <NotePopup text={noteText} /> : null}
              </span>
            );
          },
          img: ({ src, alt }) => (
            <figure className="blog-image-figure">
              <img className="blog-image" src={src || ''} alt={alt || ''} loading="lazy" />
              {alt ? <figcaption className="blog-image-caption">{alt}</figcaption> : null}
            </figure>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPost;
