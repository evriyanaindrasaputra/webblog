"use client"

import { Navbar } from "@/components/navbar"
import { ProjectCard } from "@/components/project-card"
import { Web3Background } from "@/components/web3-background"
import { motion } from "framer-motion"
import { PROJECTS } from "@/lib/constants"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <Web3Background />

      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              A collection of digital products and experiments I&apos;ve built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pt-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
