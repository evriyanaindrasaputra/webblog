"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  general: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
  resources: [
    { label: "GitHub", href: "https://github.com/evriyanaindrasaputra" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/evriyana/" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/evriyanaindrasaputra", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/evriyana/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:eindrasap@gmail.com", label: "Email" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              NDRS
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Frontend Developer passionate about building beautiful digital experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* General Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              General
            </h4>
            <ul className="space-y-3">
              {footerLinks.general.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h4>
            <p className="text-sm text-muted-foreground">
              Interested in working together?
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <Link href="mailto:eindrasap@gmail.com">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Evriyana Indra Saputra. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
