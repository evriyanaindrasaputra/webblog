
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
  locale?: string;
  canonicalSlug?: string;
};

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
};

export type GroupedBlogPost = BlogPost & {
  availableLocales: { locale: string; slug: string }[];
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return matter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: data as Metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts(): BlogPost[] {
  return getMDXData(path.join(process.cwd(), 'src/content/posts'));
}

/**
 * Groups blog posts by canonicalSlug.
 * Posts with the same canonicalSlug are grouped together.
 * Returns one representative post per group (prefers 'en') with availableLocales.
 * Single-language posts (no canonicalSlug) are returned as-is.
 */
export function getGroupedBlogPosts(): GroupedBlogPost[] {
  const allPosts = getBlogPosts();

  // Group by canonicalSlug
  const groups = new Map<string, BlogPost[]>();
  const ungrouped: BlogPost[] = [];

  for (const post of allPosts) {
    const canonical = post.metadata.canonicalSlug;
    if (canonical) {
      if (!groups.has(canonical)) {
        groups.set(canonical, []);
      }
      groups.get(canonical)!.push(post);
    } else {
      ungrouped.push(post);
    }
  }

  const result: GroupedBlogPost[] = [];

  // Process grouped posts
  for (const [, posts] of groups) {
    const availableLocales = posts.map((p) => ({
      locale: p.metadata.locale || 'en',
      slug: p.slug,
    }));

    // Prefer English version as the representative
    const representative =
      posts.find((p) => p.metadata.locale === 'en') || posts[0];

    result.push({
      ...representative,
      availableLocales,
    });
  }

  // Process ungrouped posts
  for (const post of ungrouped) {
    result.push({
      ...post,
      availableLocales: [{ locale: post.metadata.locale || 'en', slug: post.slug }],
    });
  }

  return result;
}

/**
 * Get alternate locale versions for a given post slug.
 * Returns an array of { locale, slug } for all versions of the same content.
 */
export function getAlternateLocales(slug: string): { locale: string; slug: string }[] {
  const allPosts = getBlogPosts();
  const currentPost = allPosts.find((p) => p.slug === slug);

  if (!currentPost || !currentPost.metadata.canonicalSlug) {
    return [];
  }

  return allPosts
    .filter((p) => p.metadata.canonicalSlug === currentPost.metadata.canonicalSlug)
    .map((p) => ({
      locale: p.metadata.locale || 'en',
      slug: p.slug,
    }));
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
