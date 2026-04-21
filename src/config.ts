const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

const DEFAULT_CONTENT_BASE_URL =
    'https://alanliang-portfolio.s3.us-east-2.amazonaws.com';

export const API_BASE_URL = trimTrailingSlash(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'
);

const contentBaseUrl = import.meta.env.VITE_CONTENT_BASE_URL !== undefined
    ? trimTrailingSlash(import.meta.env.VITE_CONTENT_BASE_URL)
    : DEFAULT_CONTENT_BASE_URL;

export const CONTENT_BASE_URL = contentBaseUrl || null;
export const PROFILE_URL = CONTENT_BASE_URL
    ? `${CONTENT_BASE_URL}/profile.json`
    : `${API_BASE_URL}/api/profile`;
export const IMAGE_BASE_URL = CONTENT_BASE_URL
    ? `${CONTENT_BASE_URL}/images`
    : `${API_BASE_URL}/api/images`;

export const getBlogUrl = (slug: string): string =>
    CONTENT_BASE_URL
        ? `${CONTENT_BASE_URL}/blogs/${slug}.md`
        : `${API_BASE_URL}/api/blog/${slug}`;
