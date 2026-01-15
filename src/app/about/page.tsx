"use client"

import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"
import { Web3Background } from "@/components/web3-background"
import { SKILLS } from "@/lib/constants"

const EXPERIENCE = [
  {
    role: "Frontend Developer",
    company: "Stechoq Robotika Indonesia",
    period: "2021 - Present",
    description: "Building responsive web applications using Vue.js. Implementing complex UI features and optimizing performance.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <Web3Background />

      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >

          {/* Header */}
          <section className="space-y-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-muted shrink-0">
                <Image
                  src="https://github.com/evriyanaindrasaputra.png"
                  alt="Evriyana Indra Saputra"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Hi, I&apos;m Evriyana Indra Saputra. I&apos;m a passionate Frontend Developer based in Indonesia.
                  I love building beautiful, functional, and user-friendly digital experiences.
                </p>
              </div>
            </div>
          </section>

          {/* Bio */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">My Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              I started my journey in web development with a curiosity for how things work on the internet.
              Over the years, I&apos;ve honed my skills in modern frontend technologies, focusing on creating
              clean code and intuitive user interfaces. I enjoy solving problems and continuously learning
              new tools to improve my craft.
            </p>
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-secondary/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="space-y-8">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l border-primary/20 last:border-0">
                  <span className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-primary font-medium text-sm mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  )
}
