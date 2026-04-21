const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

const DEFAULT_CONTENT_BASE_URL =
    'https://alanliang-portfolio.s3.us-east-2.amazonaws.com';
const DEFAULT_SITE_URL =
    'https://liang-alan.github.io/personal-website';

const contentBaseUrl = import.meta.env.VITE_CONTENT_BASE_URL !== undefined
    ? trimTrailingSlash(import.meta.env.VITE_CONTENT_BASE_URL)
    : DEFAULT_CONTENT_BASE_URL;

export const CONTENT_BASE_URL = contentBaseUrl;
export const SITE_URL = trimTrailingSlash(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL);
export const PROFILE_URL = `${CONTENT_BASE_URL}/profile.json`;
export const IMAGE_BASE_URL = `${CONTENT_BASE_URL}/images`;
export const RSS_URL = `${SITE_URL}/rss.xml`;
export const FOLLOW_IT_FORM_ACTION = import.meta.env.VITE_FOLLOW_IT_FORM_ACTION?.trim() || '';
export const BUTTONDOWN_USERNAME = import.meta.env.VITE_BUTTONDOWN_USERNAME?.trim() || '';
export const BUTTONDOWN_SUBSCRIBE_URL = BUTTONDOWN_USERNAME
    ? `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`
    : '';

export const getBlogUrl = (slug: string): string =>
    `${CONTENT_BASE_URL}/blogs/${slug}.md`;
