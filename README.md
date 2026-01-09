# Portfolio Website

A modern, Web3-inspired portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Content**: MDX for blog posts
- **Package Manager**: pnpm

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd learn

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── blog/              # Blog index and posts
│   ├── projects/          # Projects showcase
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── code-window.tsx   # Code display component
│   ├── navbar.tsx        # Navigation bar
│   ├── project-card.tsx  # Project card component
│   ├── site-footer.tsx   # Footer component
│   └── web3-background.tsx # Animated background
├── content/              # MDX blog posts
│   └── posts/
├── lib/                  # Utilities and helpers
│   ├── constants.ts      # Shared constants
│   ├── mdx.ts           # MDX utilities
│   └── utils/
│       └── reading-time.ts # Reading time calculator
└── styles/              # Global styles
```

## ✨ Features

- **Web3 Aesthetic**: Glassmorphism, gradient effects, and animated backgrounds
- **Blog System**: MDX-powered blog with syntax highlighting and table of contents
- **Reading Time**: Automatic reading time estimation for blog posts
- **Smooth Scrolling**: Enhanced navigation experience
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, OpenGraph, and Twitter cards
- **Dark Mode**: Built-in theme switching

## 🛠️ Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Adding Blog Posts

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: "Your Post Title"
publishedAt: "2026-01-09"
summary: "Brief description"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Adding Projects

Update `src/lib/constants.ts`:

```typescript
export const PROJECTS = [
  {
    title: "Project Name",
    description: "Description",
    tags: ["Tech1", "Tech2"],
    link: "https://...",
    githubLink: "https://github.com/...",
    image: "https://...",
  },
];
```

## 📝 Code Quality

This project follows DRY principles:
- Shared utilities in `src/lib/`
- Constants in `src/lib/constants.ts`
- Reusable components in `src/components/`

## 📄 License

MIT

## 👤 Author

**Evriyana Indra Saputra**
- GitHub: [@evriyanaindrasaputra](https://github.com/evriyanaindrasaputra)
- LinkedIn: [evriyana](https://www.linkedin.com/in/evriyana/)
- Email: eindrasap@gmail.com
