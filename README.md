# AI Prompt Hub

AI Prompt Hub is a polished Astro website for curated AI prompt templates, content workflows, and category-driven knowledge for creators, marketers, developers, and teams.

## Features

- AI Prompt categories for ChatGPT, Marketing, SEO, Business, Coding, YouTube, Social Media, and Productivity
- 100 auto-generated markdown articles from `data/topics.json`
- SEO-ready metadata with canonical URLs, Open Graph, and schema markup
- Sitemap and `robots.txt` support
- Contact, Privacy, Terms, and About pages
- Google AdSense placeholder component
- Netlify deployment configuration

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Generate article content

```sh
npm run generate-articles
```

## Deployment

This project includes `netlify.toml` for Netlify static hosting and builds to `dist/`.
