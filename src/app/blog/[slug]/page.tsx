
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPosts, formatDate } from '@/lib/mdx';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import rehypePrettyCode from 'rehype-pretty-code';
import { TableOfContents } from '@/components/table-of-contents';
import { Web3Background } from '@/components/web3-background';
import rehypeSlug from 'rehype-slug';
import { calculateReadingTime } from '@/lib/utils/reading-time';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return;
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

const components = {
  h1: (props: any) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4 tracking-tight scroll-m-20" />,
  h2: (props: any) => <h2 {...props} className="text-2xl font-bold mt-8 mb-4 tracking-tight scroll-m-20 border-b pb-2" />,
  h3: (props: any) => <h3 {...props} className="text-xl font-bold mt-6 mb-3 scroll-m-20" />,
  p: (props: any) => <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />,
  ul: (props: any) => <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2" />,
  ol: (props: any) => <ol {...props} className="my-6 ml-6 list-decimal [&>li]:mt-2" />,
  blockquote: (props: any) => <blockquote {...props} className="mt-6 border-l-2 pl-6 italic" />,
  pre: (props: any) => (
    <pre {...props} className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900" />
  ),
  code: (props: any) => (
    <code {...props} className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
  ),
};

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="flex min-h-screen flex-col font-sans relative overflow-hidden">
      <Web3Background />

      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24 max-w-7xl relative z-10">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          <article>
            <div className="space-y-4 mb-8 border-b pb-8">
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
                {post.metadata.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <time>{formatDate(post.metadata.publishedAt)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </span>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode, {
                        theme: 'github-dark',
                        keepBackground: false,
                      }]
                    ]
                  }
                }}
              />
            </div>
          </article>

          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </main>
    </div>
  );
}
