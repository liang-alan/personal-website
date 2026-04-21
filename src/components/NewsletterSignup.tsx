import React from 'react';
import { FOLLOW_IT_FORM_ACTION, RSS_URL } from '../config';

const NewsletterSignup: React.FC = () => {
  if (!FOLLOW_IT_FORM_ACTION) {
    return (
      <div className="newsletter-panel">
        <p className="newsletter-kicker">Subscribe</p>
        <h3>Get new blog posts by RSS</h3>
        <p>Open the RSS feed in your favorite reader while the email signup is still being configured.</p>
        <a className="newsletter-link" href={RSS_URL} target="_blank" rel="noopener noreferrer">
          Open RSS feed
        </a>
      </div>
    );
  }

  return (
    <form
      action={FOLLOW_IT_FORM_ACTION}
      method="post"
      target="_blank"
      className="newsletter-panel"
    >
      <p className="newsletter-kicker">Subscribe</p>
      <h3>Get new blog posts by email</h3>
      <p>Follow along and get a notification whenever a new blog post goes live.</p>
      <div className="newsletter-form-row">
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          aria-label="Email address"
          required
        />
        <button type="submit">Subscribe</button>
      </div>
      <div className="newsletter-footer-row">
        <a className="newsletter-link" href={RSS_URL} target="_blank" rel="noopener noreferrer">
          Prefer RSS instead?
        </a>
        <a
          className="newsletter-powered-by"
          href="https://follow.it"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by follow.it
        </a>
      </div>
    </form>
  );
};

export default NewsletterSignup;
