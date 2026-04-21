const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

const DEFAULT_CONTENT_BASE_URL =
    'https://alanliang-portfolio.s3.us-east-2.amazonaws.com';

const contentBaseUrl = import.meta.env.VITE_CONTENT_BASE_URL !== undefined
    ? trimTrailingSlash(import.meta.env.VITE_CONTENT_BASE_URL)
    : DEFAULT_CONTENT_BASE_URL;

export const CONTENT_BASE_URL = contentBaseUrl;
export const PROFILE_URL = `${CONTENT_BASE_URL}/profile.json`;
export const IMAGE_BASE_URL = `${CONTENT_BASE_URL}/images`;
export const BUTTONDOWN_USERNAME = import.meta.env.VITE_BUTTONDOWN_USERNAME?.trim() || '';
export const BUTTONDOWN_SUBSCRIBE_URL = BUTTONDOWN_USERNAME
    ? `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`
    : '';

export const getBlogUrl = (slug: string): string =>
    `${CONTENT_BASE_URL}/blogs/${slug}.md`;
