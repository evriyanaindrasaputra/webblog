"use client"

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CodeWindow } from '@/components/code-window';
import { SiteFooter } from '@/components/site-footer';
import { Web3Background } from '@/components/web3-background';
import { TECH_STACK } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans relative overflow-hidden">
      <Web3Background />

      <Navbar />
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-muted mb-6">
              <Image
                src="https://github.com/evriyanaindrasaputra.png"
                alt="Evriyana Indra Saputra"
                fill
                className="object-cover"
                priority
              />
            </div>
            <Badge variant="outline" className="px-3 py-1 rounded-full text-primary border-primary/20 bg-primary/10">
              Available for hire
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Building digital <br />
              <span className="text-primary">products</span> & brands.
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I&apos;m Evriyana Indra Saputra, a Frontend Developer passionate about building high-quality web applications.
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
              <Link href="https://github.com/evriyanaindrasaputra" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/evriyana/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="mailto:eindrasap@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full hidden md:block">
            <CodeWindow />
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-4 py-16 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TECH_STACK.map((tech) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-white/10 text-center hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="container mx-auto px-4 py-16 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/projects" className="block">
                  <div className="group relative overflow-hidden rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all p-6">
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">Pinjoc DeFi Web3</h3>
                    <p className="text-muted-foreground text-sm mb-4">Decentralized finance platform built for Mamothon Hackathon</p>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js', 'Wagmi', 'Solidity'].map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/projects" className="block">
                  <div className="group relative overflow-hidden rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all p-6">
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">Taggiot</h3>
                    <p className="text-muted-foreground text-sm mb-4">Modern IoT management platform with Turborepo architecture</p>
                    <div className="flex flex-wrap gap-2">
                      {['Turborepo', 'Next.js', 'Tailwind'].map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div >
  );
}
