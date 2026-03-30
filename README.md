# Personal Portfolio Website

A personal portfolio website built with **React**, **Vite**, and an **Express API**. It showcases work experience, projects, blog posts, and contact information.

## Tech Stack

- React
- TypeScript
- Vite
- Express
- React Router
- Axios
- React Markdown

## Features

- Responsive portfolio site
- Work experience section with expandable tiles
- Projects section with searchable tag chips
- Clickable project cards and tags
- Blog section with Markdown-rendered posts
- Images served through the backend API
- Separate frontend and backend deployment setup

## Deployment

This project uses a split deployment setup:

- **Frontend:** GitHub Pages
- **Backend:** Render

The React frontend is built with Vite and deployed as a static site, while the Express server is hosted separately on Render to serve profile data, blog markdown files, and images.