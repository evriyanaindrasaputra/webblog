"use client"

import { motion } from "framer-motion"
import { Check, Copy, Terminal } from "lucide-react"
import { useState } from "react"

const CODE_snippet = `// Evriyana's Portfolio
const developer = {
  name: "Evriyana Indra Saputra",
  role: "Frontend Developer",
  skills: [
    "React", "Next.js", 
    "TypeScript", "Tailwind"
  ],
  passion: "Building digital experiences",
  status: "Available for hire"
};

export default function deploy() {
  return <AwesomeProject />;
}`

export function CodeWindow() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />

      <div className="relative rounded-xl overflow-hidden bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            developer.tsx
          </div>
          <button
            onClick={copyCode}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed">
            <code className="block">
              <span className="text-gray-500">// Evriyana&apos;s Portfolio</span>{'\n'}
              <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}{'\n'}
              {'  '}<span className="text-red-400">name</span>: <span className="text-green-400">"Evriyana Indra Saputra"</span>,{'\n'}
              {'  '}<span className="text-red-400">role</span>: <span className="text-green-400">"Frontend Developer"</span>,{'\n'}
              {'  '}<span className="text-red-400">skills</span>: [{'\n'}
              {'    '}<span className="text-green-400">"React"</span>, <span className="text-green-400">"Next.js"</span>, {'\n'}
              {'    '}<span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"Tailwind"</span>{'\n'}
              {'  '}],{'\n'}
              {'  '}<span className="text-red-400">passion</span>: <span className="text-green-400">"Building digital experiences"</span>,{'\n'}
              {'  '}<span className="text-red-400">status</span>: <span className="text-green-400">"Available for hire"</span>{'\n'}
              {'}'};{'\n'}{'\n'}
              <span className="text-purple-400">export default function</span> <span className="text-blue-400">deploy</span>() {'{'}{'\n'}
              {'  '}<span className="text-purple-400">return</span> &lt;<span className="text-yellow-400">AwesomeProject</span> /&gt;;{'\n'}
              {'}'}
            </code>
          </pre>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 bg-gradient-to-r from-primary/10 to-purple-600/10">
          <div className="p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Experience</div>
            <div className="text-lg font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              2+ Years
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
