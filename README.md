# Personal Portfolio Website

A personal portfolio website built with **React**, **Vite**, and static portfolio content hosted in **Amazon S3**. It showcases work experience, projects, blog posts, and contact information.

## Tech Stack

- React
- TypeScript
- Vite
- Amazon S3
- React Router
- Axios
- React Markdown

## Features

- Responsive portfolio site
- Work experience section with expandable tiles
- Projects section with searchable tag chips
- Clickable project cards and tags
- Blog section with Markdown-rendered posts
- Images served directly from S3
- Static frontend and static content deployment setup

## Deployment

This project defaults to:

- **Frontend:** GitHub Pages
- **Content:** Amazon S3

For local development, the app also reads from the S3 bucket by default.

The default content base is:

```env
VITE_CONTENT_BASE_URL=https://alanliang-portfolio.s3.us-east-2.amazonaws.com
```

If you ever want to switch back to the old local Express server for testing, set `VITE_CONTENT_BASE_URL=` to an empty value and keep:

```env
VITE_API_BASE_URL=http://localhost:5001
```
