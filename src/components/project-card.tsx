"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link?: string
  githubLink?: string
  image?: string
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  githubLink,
  image,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all">
        {/* Project Image */}
        {image && (
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {link && (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            )}
          </div>
          <CardDescription className="line-clamp-2 mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary/50">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        {githubLink && (
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Code
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}
