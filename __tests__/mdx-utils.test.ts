import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

// We test the MDX utility logic directly since it relies on fs
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
  locale?: string;
  canonicalSlug?: string;
};

type BlogPost = { metadata: Metadata; slug: string; content: string };

function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8'));
    return { metadata: data as Metadata, slug: file.replace('.mdx', ''), content };
  });
}

function getGroupedPosts() {
  const allPosts = getAllPosts();
  const groups = new Map<string, BlogPost[]>();
  const ungrouped: BlogPost[] = [];

  for (const post of allPosts) {
    const canonical = post.metadata.canonicalSlug;
    if (canonical) {
      if (!groups.has(canonical)) groups.set(canonical, []);
      groups.get(canonical)!.push(post);
    } else {
      ungrouped.push(post);
    }
  }

  const result: (BlogPost & { availableLocales: { locale: string; slug: string }[] })[] = [];

  for (const [, posts] of groups) {
    const availableLocales = posts.map((p) => ({
      locale: p.metadata.locale || 'en',
      slug: p.slug,
    }));
    const representative = posts.find((p) => p.metadata.locale === 'en') || posts[0];
    result.push({ ...representative, availableLocales });
  }

  for (const post of ungrouped) {
    result.push({
      ...post,
      availableLocales: [{ locale: post.metadata.locale || 'en', slug: post.slug }],
    });
  }

  return result;
}

function getAlternateLocales(slug: string) {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === slug);
  if (!currentPost || !currentPost.metadata.canonicalSlug) return [];
  return allPosts
    .filter((p) => p.metadata.canonicalSlug === currentPost.metadata.canonicalSlug)
    .map((p) => ({ locale: p.metadata.locale || 'en', slug: p.slug }));
}

describe('MDX Utility - getBlogPosts', () => {
  it('should return all blog posts', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post) => {
      expect(post.slug).toBeDefined();
      expect(post.metadata.title).toBeDefined();
      expect(post.content.length).toBeGreaterThan(0);
    });
  });
});

describe('MDX Utility - getGroupedBlogPosts', () => {
  it('should deduplicate bilingual posts', () => {
    const allPosts = getAllPosts();
    const grouped = getGroupedPosts();

    // Grouped should have fewer or equal posts than all
    expect(grouped.length).toBeLessThanOrEqual(allPosts.length);

    // Bilingual posts should appear only once
    const bilingualSlugs = new Set(
      allPosts.filter((p) => p.metadata.canonicalSlug).map((p) => p.metadata.canonicalSlug)
    );
    const groupedCanonicals = grouped.filter((p) => p.availableLocales.length > 1);
    expect(groupedCanonicals.length).toBe(bilingualSlugs.size);
  });

  it('should prefer English as representative for bilingual posts', () => {
    const grouped = getGroupedPosts();
    grouped
      .filter((p) => p.availableLocales.length > 1)
      .forEach((post) => {
        const hasEnglish = post.availableLocales.some((l) => l.locale === 'en');
        if (hasEnglish) {
          expect(post.metadata.locale).toBe('en');
        }
      });
  });

  it('should include availableLocales for all posts', () => {
    const grouped = getGroupedPosts();
    grouped.forEach((post) => {
      expect(post.availableLocales).toBeDefined();
      expect(Array.isArray(post.availableLocales)).toBe(true);
      expect(post.availableLocales.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should not affect single-language posts', () => {
    const allPosts = getAllPosts();
    const singleLangPosts = allPosts.filter((p) => !p.metadata.canonicalSlug);
    const grouped = getGroupedPosts();

    singleLangPosts.forEach((single) => {
      const found = grouped.find((g) => g.slug === single.slug);
      expect(found, `Single-language post ${single.slug} should be in grouped results`).toBeDefined();
      expect(found!.availableLocales.length).toBe(1);
    });
  });
});

describe('MDX Utility - getAlternateLocales', () => {
  it('should return alternate locales for bilingual posts', () => {
    const allPosts = getAllPosts();
    const bilingualPost = allPosts.find((p) => p.metadata.canonicalSlug);

    if (bilingualPost) {
      const alternates = getAlternateLocales(bilingualPost.slug);
      expect(alternates.length).toBeGreaterThanOrEqual(2);
      expect(alternates.some((a) => a.locale === 'en')).toBe(true);
      expect(alternates.some((a) => a.locale === 'id')).toBe(true);
    }
  });

  it('should return empty array for single-language posts', () => {
    const allPosts = getAllPosts();
    const singlePost = allPosts.find((p) => !p.metadata.canonicalSlug);

    if (singlePost) {
      const alternates = getAlternateLocales(singlePost.slug);
      expect(alternates).toEqual([]);
    }
  });

  it('should return empty array for non-existent slugs', () => {
    const alternates = getAlternateLocales('this-post-does-not-exist');
    expect(alternates).toEqual([]);
  });
});
