import { Link, createFileRoute } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { ArrowRight, BookOpen, Clock, Database, FileJson } from 'lucide-react'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/learning/')({
  component: RouteComponent,
})

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
  hover: {
    y: -5,
    scale: 1.01,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* ================= SQL CARD ================= */}
        <Link
          to="/learning/$course"
          params={{
            course: 'sql',
          }}
          className="w-full block h-full"
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="w-full h-full group/card"
          >
            <div
              className={cn(
                'cursor-pointer overflow-hidden relative aspect-square rounded-2xl',
                // Light Mode: White bg, dark border, standard shadow
                'bg-white border-2 border-slate-100 shadow-xl',
                // Dark Mode: Dark bg, light border, WHITE GLOW shadow for visibility
                'dark:bg-slate-900 dark:border-white/15 dark:shadow-[0_0_20px_rgba(255,255,255,0.08)]',
                // Hover: Colored glow interactions
                'hover:shadow-blue-500/20 hover:border-blue-500/50 dark:hover:shadow-blue-500/20 dark:hover:border-blue-500/50',
                'transition-all duration-500 flex flex-col justify-between',
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  layout="fullWidth"
                  src="https://res.cloudinary.com/testifywebdev/image/upload/v1765739965/Gemini_Generated_Image_l22lsfl22lsfl22l_kenlx4.png?format=webp"
                  alt="SQL Background"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 opacity-90 dark:opacity-60"
                  crossOrigin="anonymous"
                />
                {/* Top Gradient for Text Readability */}
                <div className="absolute top-0 left-0 w-full h-2/3 bg-linear-to-b from-white/90 via-white/40 to-transparent dark:from-slate-950/90 dark:via-slate-950/50 dark:to-transparent pointer-events-none" />
              </div>

              {/* === CONTENT AT TOP === */}
              <div className="z-10 relative p-8 flex flex-col gap-4">
                {/* Header Row: Icon + Meta */}
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                    <Database size={22} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-md text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock size={12} /> 7 Modules
                  </span>
                </div>

                {/* Text Content */}
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    SQL Foundations
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed max-w-[90%]">
                    Master structured query language. Design schemas and
                    optimize database performance.
                  </p>
                </div>
              </div>

              {/* === BOTTOM ACTION === */}
              <div className="z-10 relative p-8 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <BookOpen size={14} /> 41 Lessons
                  </div>

                  {/* Interactive Pill */}
                  <motion.div
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/20 transition-colors bottom-5 right-2 absolute"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-bold">Start Learning</span>
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* ================= MONGODB CARD ================= */}
        <Link
          to="/learning/$course"
          params={{
            course: 'mongodb',
          }}
          className="w-full block h-full"
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="w-full h-full group/card"
          >
            <div
              className={cn(
                'cursor-pointer overflow-hidden relative aspect-square rounded-2xl',
                // Light Mode
                'bg-white border-2 border-slate-100 shadow-xl',
                // Dark Mode: White-ish glow for visibility
                'dark:bg-slate-900 dark:border-white/15 dark:shadow-[0_0_20px_rgba(255,255,255,0.08)]',
                // Hover
                'hover:shadow-green-500/20 hover:border-green-500/50 dark:hover:shadow-green-500/20 dark:hover:border-green-500/50',
                'transition-all duration-500 flex flex-col justify-between',
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  layout="fullWidth"
                  src="https://res.cloudinary.com/testifywebdev/image/upload/v1765740036/Gemini_Generated_Image_uqzwtpuqzwtpuqzw_wztpp6.png?format=webp"
                  alt="MongoDB Background"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 opacity-90 dark:opacity-60"
                  crossOrigin="anonymous"
                />
                {/* Top Gradient */}
                <div className="absolute top-0 left-0 w-full h-2/3 bg-linear-to-b from-white/90 via-white/40 to-transparent dark:from-slate-950/90 dark:via-slate-950/50 dark:to-transparent pointer-events-none" />
              </div>

              {/* === CONTENT AT TOP === */}
              <div className="z-10 relative p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 text-green-600 dark:text-green-400 flex items-center justify-center shadow-sm">
                    <FileJson size={22} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-md text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock size={12} /> 7 Modules
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    MongoDB Aggregations
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed max-w-[90%]">
                    Unlock the power of data pipelines. Filter, group, and
                    transform complex documents.
                  </p>
                </div>
              </div>

              {/* === BOTTOM ACTION === */}
              <div className="z-10 relative p-8 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <BookOpen size={14} /> 36 Lessons
                  </div>

                  <motion.div
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-lg shadow-green-500/20 transition-colors bottom-5 right-2 absolute"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-bold">Start Learning</span>
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  )
}
