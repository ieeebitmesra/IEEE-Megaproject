'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { Image } from '@unpic/react'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Code2,
  Database,
  FileJson,
  Keyboard,
  Menu,
  Mouse,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'
import type { MotionValue } from 'motion/react'
import { Button } from '@/components/ui/button'

// ==========================================
// CONFIGURATION DATA
// ==========================================

const FEATURES_ROTATION = [
  'Mongo ↔ SQL Converter',
  'NLP to Query Engine',
  'AI Query Optimizer',
  'Interactive SQL Typer',
]

const CODE_DEMO = [
  {
    type: 'nlp',
    label: 'Natural Language',
    text: 'Find all users who signed up last month and have more than 5 orders',
  },
  {
    type: 'sql',
    label: 'Generated SQL',
    text: 'SELECT * FROM users \nWHERE signup_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) \nAND order_count > 5;',
  },
]

const SCROLL_FEATURES = [
  {
    icon: FileJson,
    title: 'Mongo ↔ SQL Converter',
    description:
      'Instantly translate logic between NoSQL documents and Relational tables without losing context.',
    position: 'left',
    range: [0.15, 0.3],
  },
  {
    icon: Search,
    title: 'NLP Query Engine',
    description:
      'Type in plain English. Our AI analyzes schema relationships and outputs optimized SQL code.',
    position: 'right',
    range: [0.35, 0.5],
  },
  {
    icon: Settings,
    title: 'AI Query Optimizer',
    description:
      'Detect bottlenecks automatically. We suggest indexing strategies and query rewrites for O(1) performance.',
    position: 'left',
    range: [0.55, 0.7],
  },
  {
    icon: Keyboard,
    title: 'Interactive SQL Typer',
    description:
      'Practice your syntax speed. Real-time validation helps you build muscle memory for complex joins.',
    position: 'right',
    range: [0.75, 0.9],
  },
]

export default function Page() {
  return (
    // IMPORTANT: No overflow-hidden on the root, or sticky positioning breaks
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/20">
      <main>
        <Hero />
        <ScrollAnimationSection />

        {/* Footer / Continue Section */}
        <section className="relative z-20 bg-muted/30 border-t border-border/50 py-32">
          <div className="container px-4 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Master Your Database?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join thousands of developers writing better, faster queries today.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8">
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>
        <section>
          <p className="text-center text-5xl md:text-9xl lg:text-[18rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
            EVERY AI
          </p>
        </section>
      </main>
    </div>
  )
}

// ==========================================
// 2. HERO SECTION
// ==========================================

function Hero() {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-20 lg:pt-32">
      {/* Background Grids */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The Ultimate Database Playground</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                Master Databases using <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-primary">
                  QueryRight
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-[600px]"
            >
              Write, convert, and optimize queries with AI precision. Switch
              between MongoDB and SQL instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base gap-2 shadow-lg shadow-primary/20 rounded-full"
              >
                Start Querying <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base gap-2 rounded-full"
              >
                <BookOpen className="w-4 h-4" /> View Courses
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 text-sm text-muted-foreground pt-4"
            >
              <FeatureTicker />
            </motion.div>
          </div>

          {/* Right Column: Interactive Editor Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto lg:mx-0 w-full max-w-lg"
          >
            <div className="relative rounded-xl border bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
              <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  editor.queryright.ai
                </div>
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="p-6 space-y-6">
                <TypewriterDemo />
              </div>
              <div className="bg-primary/5 p-4 border-t flex justify-between items-center text-xs font-mono">
                <span className="flex items-center gap-2 text-primary">
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  Optimizing...
                </span>
                <span className="text-muted-foreground">Execution: 0.04ms</span>
              </div>
            </div>

            {/* Floating Badges */}
            <FloatingBadge
              icon={Database}
              title="Mongo to SQL"
              subtitle="Instant"
              position="left"
              delay={0}
            />
            <FloatingBadge
              icon={Code2}
              title="Syntax Typer"
              subtitle="Practice"
              position="right"
              delay={1}
            />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </div>
  )
}

// ==========================================
// 3. SCROLL ANIMATION SECTION (Sticky Scrollytelling)
// ==========================================

function ScrollAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll relative to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Animation values for the lines - increased distance for high speed feel
  const fastFlow = useTransform(scrollYProgress, [0, 1], [0, -3000])
  const mediumFlow = useTransform(scrollYProgress, [0, 1], [0, -1800])
  const slowFlow = useTransform(scrollYProgress, [0, 1], [0, -1200])
  const reverseFlow = useTransform(scrollYProgress, [0, 1], [0, 3000])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothFast = useSpring(fastFlow, springConfig)
  const smoothMedium = useSpring(mediumFlow, springConfig)
  const smoothSlow = useSpring(slowFlow, springConfig)
  const smoothReverse = useSpring(reverseFlow, springConfig)

  return (
    // Height 500vh to slow down the scroll.
    <div ref={containerRef} className="relative h-[500vh] bg-transparent z-0">
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Visual Layer: Data Lines & DB */}
        {/* Full width container to stretch lines */}
        <div className="relative w-full max-w-[95vw] flex items-center justify-between z-0 h-[600px]">
          {/* Left Data Highway */}
          <div className="flex-1 h-full min-w-0">
            <LeftDataLine
              fast={smoothFast}
              medium={smoothMedium}
              slow={smoothSlow}
            />
          </div>

          {/* Center Database */}
          <div className="relative z-10 shrink-0 mx-[-20px] md:mx-[-60px]">
            <Image
              src="./db.svg" // Make sure this file exists in /public/db.svg
              alt="Database Logo"
              width={300}
              height={300}
              className="drop-shadow-[0_0_50px_rgba(59,130,246,0.6)] w-[150px] md:w-[250px]"
            />
          </div>

          {/* Right Data Highway */}
          <div className="flex-1 h-full min-w-0">
            <RightDataLine
              fast={smoothReverse}
              medium={smoothMedium}
              slow={smoothSlow}
            />
          </div>
        </div>

        {/* Content Layer: Feature Cards */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 max-w-7xl mx-auto">
          {SCROLL_FEATURES.map((feature, idx) => (
            <FeatureCard
              key={idx}
              feature={feature}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Helper Text */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 text-muted-foreground text-xs uppercase tracking-widest font-medium animate-bounce"
        >
          Keep Scrolling
        </motion.div>
      </div>
    </div>
  )
}

// ==========================================
// 4. SUB-COMPONENTS
// ==========================================

const FeatureCard = ({
  feature,
  scrollYProgress,
}: {
  feature: (typeof SCROLL_FEATURES)[0]
  scrollYProgress: MotionValue<number>
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [
      feature.range[0] - 0.1,
      feature.range[0],
      feature.range[1],
      feature.range[1] + 0.1,
    ],
    [0, 1, 1, 0],
  )

  const y = useTransform(
    scrollYProgress,
    [feature.range[0] - 0.1, feature.range[1]],
    [50, -50],
  )

  const positionClass =
    feature.position === 'left'
      ? 'left-4 md:left-20 lg:left-32'
      : 'right-4 md:right-20 lg:right-32'

  const Icon = feature.icon

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-1/2 -translate-y-1/2 ${positionClass} w-[280px] md:w-[350px]`}
    >
      <div className="p-6 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold leading-none">{feature.title}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {feature.description}
        </p>
      </div>

      {/* Connecting Line */}
      <div
        className={`absolute top-1/2 h-px w-10 md:w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent 
        ${feature.position === 'left' ? '-right-10 md:-right-24' : '-left-10 md:-left-24'}`}
      />
    </motion.div>
  )
}

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{
        opacity: { duration: 1, delay: 1.5 },
        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
      onClick={() => {
        window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })
      }}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium transition-colors group-hover:text-primary">
        Scroll
      </span>
      <div className="relative">
        <Mouse className="w-6 h-6 text-foreground/80 transition-colors group-hover:text-primary" />
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[2px] h-[3px] bg-primary rounded-full"
        />
      </div>
      <ChevronDown className="w-4 h-4 text-muted-foreground/50 -mt-1" />
    </motion.div>
  )
}

const FeatureTicker = () => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % FEATURES_ROTATION.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="font-medium text-foreground">Includes:</span>
      <div className="relative h-6 w-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-0 whitespace-nowrap"
          >
            {FEATURES_ROTATION[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const FloatingBadge = ({
  icon: Icon,
  title,
  subtitle,
  position,
  delay,
}: any) => (
  <motion.div
    animate={{ y: [0, position === 'left' ? -10 : 10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    className={`absolute top-20 ${position === 'left' ? '-left-8' : '-right-4 top-auto bottom-20'} bg-background border shadow-lg p-3 rounded-lg flex items-center gap-3 z-20`}
  >
    <div
      className={`p-2 rounded-md ${position === 'left' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}
    >
      <Icon
        className={`w-5 h-5 ${position === 'left' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}
      />
    </div>
    <div>
      <div className="text-xs font-bold">{title}</div>
      <div className="text-[10px] text-muted-foreground">{subtitle}</div>
    </div>
  </motion.div>
)

const TypewriterDemo = () => {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const cycle = async () => {
      setStep(0)
      await new Promise((r) => setTimeout(r, 3500))
      setStep(1)
      await new Promise((r) => setTimeout(r, 1000))
      setStep(2)
      await new Promise((r) => setTimeout(r, 4000))
      cycle()
    }
    cycle()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
          <span>Input: Natural Language</span>
          <span className="text-primary">NLP Engine Active</span>
        </div>
        <div className="p-3 rounded-md bg-muted/30 border border-muted font-mono text-sm min-h-[60px] relative">
          <span className="text-foreground">{CODE_DEMO[0].text}</span>
          {step === 0 && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
            />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <motion.div
          animate={
            step === 1 ? { rotate: 180, scale: 1.2 } : { rotate: 0, scale: 1 }
          }
          className={`p-2 rounded-full ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          {step === 1 ? (
            <RefreshCw className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </motion.div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
          <span>Output: SQL Query</span>
          <div className="flex gap-2">
            <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 rounded">
              Optimized
            </span>
          </div>
        </div>
        <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 font-mono text-sm text-blue-300 min-h-[80px] shadow-inner relative overflow-hidden">
          {step === 2 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SyntaxHighlight code={CODE_DEMO[1].text} />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-600 text-xs italic">
              {step === 1 ? 'Converting logic...' : 'Waiting for input...'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SyntaxHighlight = ({ code }: { code: string }) => {
  const parts = code.split(/(\s+)/)
  const keywords = [
    'SELECT',
    'FROM',
    'WHERE',
    'AND',
    'DATE_SUB',
    'NOW',
    'INTERVAL',
  ]
  return (
    <div>
      {parts.map((part, i) => {
        if (keywords.includes(part.toUpperCase())) {
          return (
            <span key={i} className="text-purple-400 font-bold">
              {part}
            </span>
          )
        }
        return (
          <span key={i} className="text-zinc-300">
            {part}
          </span>
        )
      })}
    </div>
  )
}

// ==========================================
// 5. GLOWING SVG LINE COMPONENTS (FULL WIDTH & DENSE)
// ==========================================

const packetDashArray = '10 60'

interface LineProps {
  fast: MotionValue<number>
  medium: MotionValue<number>
  slow: MotionValue<number>
}

const LeftDataLine: React.FC<LineProps> = ({ fast, medium, slow }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="opacity-100 w-full h-full"
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0000FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="glowEffect">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform="matrix(-1 0 0 1 1000 0)">
        {/* Glow Layer */}
        <g filter="url(#glowEffect)" opacity="0.5">
          <motion.g
            stroke="url(#blueGradient)"
            strokeWidth="6"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: fast }}
          >
            <path d="M0 300 C 300 300, 600 300, 1000 300" fill="none" />
            <path d="M0 300 C 300 250, 700 100, 1000 50" fill="none" />
            <path d="M0 300 C 300 350, 700 500, 1000 550" fill="none" />
          </motion.g>
        </g>

        {/* Core Layer */}
        <g>
          {/* FAST FLOW */}
          <motion.g
            stroke="url(#blueGradient)"
            strokeWidth="3"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: fast }}
          >
            <path d="M0 300 C 300 300, 600 300, 1000 300" fill="none" />
            <path d="M0 300 C 300 280, 700 200, 1000 150" fill="none" />
            <path d="M0 300 C 300 320, 700 400, 1000 450" fill="none" />
            {/* Outer Swoops */}
            <path d="M0 300 C 200 100, 500 50, 1000 20" fill="none" />
            <path d="M0 300 C 200 500, 500 550, 1000 580" fill="none" />
          </motion.g>

          {/* MEDIUM FLOW */}
          <motion.g
            stroke="url(#blueGradient)"
            strokeWidth="2"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: medium }}
          >
            <path d="M0 300 C 400 300, 700 250, 1000 220" fill="none" />
            <path d="M0 300 C 400 300, 700 350, 1000 380" fill="none" />
            {/* Wide angles */}
            <path d="M0 300 C 150 200, 400 100, 1000 80" fill="none" />
            <path d="M0 300 C 150 400, 400 500, 1000 520" fill="none" />
          </motion.g>

          {/* SLOW FLOW */}
          <motion.g
            stroke="url(#blueGradient)"
            strokeWidth="1"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: slow }}
          >
            <path d="M0 300 C 250 290, 800 280, 1000 280" fill="none" />
            <path d="M0 300 C 250 310, 800 320, 1000 320" fill="none" />
            <path d="M0 300 C 100 150, 300 50, 1000 10" fill="none" />
            <path d="M0 300 C 100 450, 300 550, 1000 590" fill="none" />
          </motion.g>
        </g>

        {/* Static Background */}
        <g
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.05"
          strokeDasharray="5 5"
        >
          <path d="M0 300 C 300 300, 600 300, 1000 300" fill="none" />
          <path d="M0 300 C 300 250, 700 100, 1000 50" fill="none" />
          <path d="M0 300 C 300 350, 700 500, 1000 550" fill="none" />
          <path d="M0 300 C 200 100, 500 50, 1000 20" fill="none" />
          <path d="M0 300 C 200 500, 500 550, 1000 580" fill="none" />
        </g>
      </g>
    </svg>
  )
}

const RightDataLine: React.FC<LineProps> = ({ fast, medium, slow }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="opacity-100 w-full h-full"
    >
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
          <stop offset="50%" stopColor="#C084FC" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="glowEffectRight">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g>
        {/* Glow Layer */}
        <g filter="url(#glowEffectRight)" opacity="0.5">
          <motion.g
            stroke="url(#purpleGradient)"
            strokeWidth="6"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: fast }}
          >
            <path d="M0 300 C 300 300, 600 300, 1000 300" fill="none" />
            <path d="M0 300 C 300 200, 700 100, 1000 50" fill="none" />
            <path d="M0 300 C 300 400, 700 500, 1000 550" fill="none" />
          </motion.g>
        </g>

        {/* Core Layer */}
        <g>
          {/* FAST FLOW */}
          <motion.g
            stroke="url(#purpleGradient)"
            strokeWidth="3"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: fast }}
          >
            <path d="M0 300 C 400 300, 700 300, 1000 300" fill="none" />
            <path d="M0 300 C 300 180, 600 120, 1000 100" fill="none" />
            <path d="M0 300 C 300 420, 600 480, 1000 500" fill="none" />
            {/* Edge flows */}
            <path d="M0 300 C 200 50, 500 20, 1000 10" fill="none" />
            <path d="M0 300 C 200 550, 500 580, 1000 590" fill="none" />
          </motion.g>

          {/* MEDIUM FLOW */}
          <motion.g
            stroke="url(#purpleGradient)"
            strokeWidth="2"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: medium }}
          >
            <path d="M0 300 C 350 280, 700 250, 1000 240" fill="none" />
            <path d="M0 300 C 350 320, 700 350, 1000 360" fill="none" />
            <path d="M0 300 C 200 150, 500 100, 1000 80" fill="none" />
            <path d="M0 300 C 200 450, 500 500, 1000 520" fill="none" />
          </motion.g>

          {/* SLOW FLOW */}
          <motion.g
            stroke="url(#purpleGradient)"
            strokeWidth="1"
            strokeDasharray={packetDashArray}
            style={{ strokeDashoffset: slow }}
          >
            <path d="M0 300 C 300 290, 600 280, 1000 290" fill="none" />
            <path d="M0 300 C 300 310, 600 320, 1000 310" fill="none" />
            <path d="M0 300 C 150 100, 400 40, 1000 30" fill="none" />
            <path d="M0 300 C 150 500, 400 560, 1000 570" fill="none" />
          </motion.g>
        </g>

        {/* Static Background */}
        <g
          stroke="#a855f7"
          strokeWidth="1"
          opacity="0.05"
          strokeDasharray="5 5"
        >
          <path d="M0 300 C 300 300, 600 300, 1000 300" fill="none" />
          <path d="M0 300 C 300 200, 700 100, 1000 50" fill="none" />
          <path d="M0 300 C 300 400, 700 500, 1000 550" fill="none" />
          <path d="M0 300 C 200 50, 500 20, 1000 10" fill="none" />
          <path d="M0 300 C 200 550, 500 580, 1000 590" fill="none" />
        </g>
      </g>
    </svg>
  )
}
