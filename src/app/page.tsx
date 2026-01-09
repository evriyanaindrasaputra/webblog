
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <Badge variant="outline" className="px-3 py-1 rounded-full text-primary border-primary/20 bg-primary/10">
              Available for hire
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Building digital <br />
              <span className="text-primary">products</span> & brands.
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I&apos;m a Product Engineer passionate about building high-quality web applications.
              I specialize in React, Next.js, and TypeScript.
            </p>
            <div className="flex items-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">About Me</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[400px] hidden md:block">
            {/* Abstract visual or placeholder for now */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-3xl border border-white/5 backdrop-blur-3xl overflow-hidden p-8">
              <div className="bg-card w-full h-full rounded-2xl border shadow-2xl p-6 relative overflow-hidden">
                <div className="space-y-4">
                  <div className="h-8 w-1/3 bg-muted rounded animate-pulse"></div>
                  <div className="h-32 w-full bg-muted/50 rounded animate-pulse delay-75"></div>
                  <div className="flex gap-4">
                    <div className="h-10 w-24 bg-primary/20 rounded animate-pulse delay-150"></div>
                    <div className="h-10 w-24 bg-muted rounded animate-pulse delay-200"></div>
                  </div>
                </div>
                {/* Decorative code circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section (Placeholder) */}
        <section className="container mx-auto px-4 py-16 border-t">
          <h2 className="text-2xl font-bold mb-8">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-lg border bg-card p-2 transition-all hover:shadow-lg">
              <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm">View Project</Button>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-semibold text-xl mb-2">Project Alpha</h3>
                <p className="text-muted-foreground text-sm">A comprehensive dashboard for analytics.</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border bg-card p-2 transition-all hover:shadow-lg">
              <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm">View Project</Button>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-semibold text-xl mb-2">Beta App</h3>
                <p className="text-muted-foreground text-sm">Mobile-first e-commerce application.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DevPortfolio. Built with Next.js & Shadcn.</p>
        </div>
      </footer>
    </div>
  );
}
