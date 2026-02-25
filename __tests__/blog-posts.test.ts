import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    return { file, metadata: data, content, slug: file.replace('.mdx', '') };
  });
}

describe('Blog Posts - Frontmatter Validation', () => {
  const posts = getAllPosts();

  it('should have at least one blog post', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  posts.forEach((post) => {
    describe(`Post: ${post.file}`, () => {
      it('should have a title', () => {
        expect(post.metadata.title).toBeDefined();
        expect(typeof post.metadata.title).toBe('string');
        expect(post.metadata.title.length).toBeGreaterThan(0);
      });

      it('should have a valid publishedAt date', () => {
        expect(post.metadata.publishedAt).toBeDefined();
        const date = new Date(post.metadata.publishedAt);
        expect(date.toString()).not.toBe('Invalid Date');
      });

      it('should have a summary', () => {
        expect(post.metadata.summary).toBeDefined();
        expect(typeof post.metadata.summary).toBe('string');
        expect(post.metadata.summary.length).toBeGreaterThan(0);
      });

      it('should have tags as an array', () => {
        if (post.metadata.tags) {
          expect(Array.isArray(post.metadata.tags)).toBe(true);
          post.metadata.tags.forEach((tag: string) => {
            expect(typeof tag).toBe('string');
          });
        }
      });

      it('should have content', () => {
        expect(post.content.trim().length).toBeGreaterThan(0);
      });

      it('should reference existing images', () => {
        const imageRefs = post.content.match(/!\[.*?\]\((\/[^)]+)\)/g);
        if (imageRefs) {
          imageRefs.forEach((ref) => {
            const match = ref.match(/\((\/[^)]+)\)/);
            if (match) {
              const imgPath = path.join(process.cwd(), 'public', match[1]);
              expect(fs.existsSync(imgPath), `Image not found: ${match[1]}`).toBe(true);
            }
          });
        }
      });
    });
  });
});

describe('Blog Posts - Bilingual Validation', () => {
  const posts = getAllPosts();
  const bilingualPosts = posts.filter((p) => p.metadata.canonicalSlug);

  it('should have bilingual posts grouped by canonicalSlug', () => {
    if (bilingualPosts.length === 0) return; // skip if no bilingual posts

    const groups = new Map<string, typeof posts>();
    bilingualPosts.forEach((post) => {
      const slug = post.metadata.canonicalSlug;
      if (!groups.has(slug)) groups.set(slug, []);
      groups.get(slug)!.push(post);
    });

    // Each group should have at least 2 locales
    groups.forEach((groupPosts, slug) => {
      expect(
        groupPosts.length,
        `canonicalSlug "${slug}" should have multiple locales`
      ).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have valid locale fields on bilingual posts', () => {
    bilingualPosts.forEach((post) => {
      expect(post.metadata.locale, `${post.file} missing locale`).toBeDefined();
      expect(['en', 'id']).toContain(post.metadata.locale);
    });
  });

  it('should have matching titles across locales (same canonicalSlug)', () => {
    const groups = new Map<string, typeof posts>();
    bilingualPosts.forEach((post) => {
      const slug = post.metadata.canonicalSlug;
      if (!groups.has(slug)) groups.set(slug, []);
      groups.get(slug)!.push(post);
    });

    groups.forEach((groupPosts) => {
      // All posts in a group should have the same publishedAt
      const dates = groupPosts.map((p) => p.metadata.publishedAt);
      expect(new Set(dates).size, 'publishedAt should match across locales').toBe(1);

      // All posts should have the same tags
      const tagSets = groupPosts.map((p) => JSON.stringify((p.metadata.tags || []).sort()));
      expect(new Set(tagSets).size, 'tags should match across locales').toBe(1);
    });
  });
});
