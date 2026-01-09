
import Link from 'next/link';
import { getBlogPosts, formatDate } from '@/lib/mdx';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Web3Background } from '@/components/web3-background';
import { calculateReadingTime } from '@/lib/utils/reading-time';

export const metadata = {
  title: 'Blog - DevPortfolio',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  const posts = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <div className="flex min-h-screen flex-col font-sans relative overflow-hidden">
      <Web3Background />

      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24 max-w-4xl relative z-10">
        <div className="flex flex-col space-y-4 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">Writing</h1>
          <p className="text-muted-foreground text-lg">
            Thoughts, tutorials, and insights on the world of software.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => {
            const readingTime = calculateReadingTime(post.content);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="flex flex-col space-y-2 p-4 -mx-4 rounded-xl transition-colors hover:bg-muted/50">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {post.metadata.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground whitespace-nowrap ml-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {readingTime} min
                      </span>
                      <span className="hidden sm:inline">{formatDate(post.metadata.publishedAt)}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.metadata.summary}
                  </p>
                  <div className="flex gap-2 pt-2">
                    {post.metadata.tags?.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
