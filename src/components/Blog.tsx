import React, { useEffect, useState } from 'react';
import useProfile from '../hooks/useProfile';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { trackEvent } from '../analytics';

const BlogDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { profile } = useProfile();
  const posts = (profile as any)?.blogs || [];
  const post = posts.find((p: any) => p.slug === slug);
  if (!post) return <div>Post not found</div>;
  return (
    <div className="blog-detail container">
      <h2>{post.title}</h2>
      <p className="date">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
    </div>
  );
};

const Blog: React.FC = () => {
  const { profile, loading } = useProfile();

  if (loading) return <LoadingSpinner />;

  const posts = (profile as any)?.blogs || [];

  return (
    <div className="blog container">
      <h2>Blog</h2>
      <div className="blog-grid">
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            className="blog-tile"
            to={`/blog/${post.slug}`}
            onClick={() => {
              trackEvent('blog_click', {
                blog_slug: post.slug,
                blog_title: post.title,
              });
              try {
                sessionStorage.setItem(
                  'lastScroll',
                  JSON.stringify({ scrollY: window.scrollY, hash: window.location.hash || '' })
                );
              } catch (e) {
                // ignore sessionStorage errors
              }
            }}
          >
            <h3>{post.title}</h3>
            <p className="date">{post.date}</p>
            <p className="excerpt">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
