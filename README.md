# Listing Template

A lightweight, forkable template for building listing and affiliate websites. Casinos, VPNs, hosting providers, SaaS tools — fork it, fill in your content, deploy.

Built with **Next.js 15**, **Payload CMS 3**, **SQLite**, and **Tailwind CSS 4**.

## Features

- **Page builder** — 7 block types: Hero, Listing Table, Rich Content, FAQ, Pros/Cons, Comparison Table, CTA Banner
- **Listing management** — Ratings, rankings, badges, pros/cons, affiliate links, detailed reviews
- **Blog** — Full blog with categories, featured images, excerpts
- **SEO built-in** — Auto-generated meta tags, sitemap, robots.txt, JSON-LD structured data (Review, FAQ, BlogPosting, BreadcrumbList)
- **Theme system** — Colors, fonts, gradients — all editable from the admin panel, applied via CSS custom properties
- **Single-file database** — SQLite, no external DB needed
- **Docker ready** — One command to deploy anywhere

## Quick Start

```bash
# Clone / fork
git clone https://github.com/YOUR_USER/listing-template.git my-site
cd my-site

# Install
npm install --legacy-peer-deps

# Set up environment
cp .env.example .env
# Edit .env — at minimum change PAYLOAD_SECRET

# Run
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) to create your first user and start adding content.

## Project Structure

```
├── payload.config.ts          # Payload CMS configuration
├── src/
│   ├── app/
│   │   ├── (frontend)/        # Public site routes
│   │   ├── (payload)/         # Admin panel (auto-generated)
│   │   ├── api/               # Payload API routes
│   │   ├── sitemap.ts         # Dynamic XML sitemap
│   │   └── robots.ts          # Dynamic robots.txt
│   ├── collections/           # Payload collections
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   ├── Categories.ts
│   │   ├── Listings.ts
│   │   ├── Pages.ts
│   │   └── BlogPosts.ts
│   ├── globals/               # Payload globals
│   │   ├── SiteSettings.ts    # Site name, theme, SEO defaults, analytics
│   │   ├── Navigation.ts      # Header menu
│   │   └── Footer.ts          # Footer columns, disclaimer
│   ├── blocks/                # Page builder block definitions
│   └── components/            # React components
│       ├── blocks/            # Block renderers
│       └── seo/               # JSON-LD structured data
├── data/                      # SQLite database (gitignored)
├── media/                     # Uploaded files (gitignored)
├── Dockerfile
└── docker-compose.yml
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PAYLOAD_SECRET` | Secret key for Payload auth | **Required** — change this |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `http://localhost:3000` |
| `DATABASE_URI` | SQLite database path (optional) | Auto-resolved to `data/database.db` |

## Content Types

### Listings
The core content type. Each listing has:
- Name, slug, logo, rating (0-10), rank
- Short description, badges, pros/cons
- CTA button with affiliate link
- Full rich-text detailed review
- Categories, featured flag, draft/published status
- Full SEO field group

### Pages
Page-builder pages using blocks. Create a page with slug `home` for your homepage.

### Blog Posts
Standard blog with title, featured image, rich text content, excerpt, categories, and publish date.

### Categories
Used to organize both listings and blog posts. Category pages auto-render at `/{category-slug}`.

## Page Builder Blocks

| Block | Description |
|---|---|
| **Hero** | Gradient banner with heading, subtitle, badges, CTA |
| **Listing Table** | Ranked listing cards, filterable by category |
| **Rich Content** | Lexical rich text editor |
| **FAQ** | Accordion Q&A (generates FAQPage JSON-LD) |
| **Pros & Cons** | Two-column layout |
| **Comparison Table** | Side-by-side listing comparison |
| **CTA Banner** | Call-to-action strip |

## Theme System

All theme values are editable from **Site Settings** in the admin panel:

- Primary, secondary, accent colors
- Hero gradient start/end
- Background, card background
- Text and heading colors
- Font family (Inter, DM Sans, System)

Changes apply immediately — no rebuild needed.

## SEO

Every content type includes a full SEO field group:
- Meta title & description (auto-generated, manually overridable)
- Focus keyword, canonical URL
- Open Graph title, description, image
- noindex / nofollow toggles

Auto-generated:
- `/sitemap.xml` — all published pages, listings, categories, blog posts
- `/robots.txt` — allows all, blocks `/admin/`
- JSON-LD structured data on all pages

## Docker Deployment

```bash
# Build and run
docker compose up -d

# Or build manually
docker build -t listing-site .
docker run -p 3000:3000 -v ./data:/app/data -v ./media:/app/media --env-file .env listing-site
```

Data persists via volume mounts for `data/` (SQLite) and `media/` (uploads).

## Fork & Customize

1. Fork this repo
2. Update `.env` with your `PAYLOAD_SECRET` and `NEXT_PUBLIC_SITE_URL`
3. `npm run dev` and go to `/admin`
4. Set your site name, colors, and navigation in globals
5. Create categories, listings, and pages
6. Deploy with Docker or any Node.js host

## License

MIT
