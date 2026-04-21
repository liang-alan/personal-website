import React from 'react';
import { BUTTONDOWN_SUBSCRIBE_URL, BUTTONDOWN_USERNAME } from '../config';

type NewsletterSignupProps = {
  variant?: 'default' | 'compact';
};

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ variant = 'default' }) => {
  const isCompact = variant === 'compact';

  if (!BUTTONDOWN_SUBSCRIBE_URL) {
    return (
      <div className={`newsletter-panel ${isCompact ? 'newsletter-panel-compact' : ''}`}>
        <p className="newsletter-kicker">Subscribe</p>
        <h3>{isCompact ? 'Mailing list unavailable' : 'Turn on the mailing list'}</h3>
        <p>
          Add your Buttondown username in <code>VITE_BUTTONDOWN_USERNAME</code> to show the email signup
          form on this page.
        </p>
        <a
          className="newsletter-link"
          href="https://buttondown.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Buttondown
        </a>
      </div>
    );
  }

  return (
    <form
      action={BUTTONDOWN_SUBSCRIBE_URL}
      method="post"
      target="_blank"
      className={`newsletter-panel ${isCompact ? 'newsletter-panel-compact' : ''}`}
    >
      <p className="newsletter-kicker">Subscribe</p>
      <h3>{'Get post updates by email!'}</h3>
      <p>Join the list to get notified when new posts arrive!</p>
      <div className="newsletter-form-row">
        <input
          type="email"
          name="email"
          placeholder={isCompact ? 'Email address' : 'you@example.com'}
          aria-label="Email address"
          required
        />
        <input type="hidden" value="1" name="embed" />
        <button type="submit">Subscribe</button>
      </div>
      <div className="newsletter-footer-row">
        <a
          className="newsletter-powered-by"
          href={`https://buttondown.com/${BUTTONDOWN_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Buttondown
        </a>
      </div>
    </form>
  );
};

export default NewsletterSignup;
