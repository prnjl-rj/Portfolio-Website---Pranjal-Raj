import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { TiltCard } from '@/components/ui/tilt-card.jsx';

export function ExperienceSection({ experiences = [] }) {
  return (
    <section id="experience" className="relative py-24">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400">
              02.
            </span>
            <span className="h-px w-12 bg-fuchsia-500/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Professional Journey
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Work <span className="text-gradient-aurora">Experience</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
            Production full-stack web engineering and real-time mobile systems architecture.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-violet-500/40 space-y-10">
          {experiences.map((exp, index) => {
            const highlights = Array.isArray(exp.highlights) ? exp.highlights : [];
            const techStack = Array.isArray(exp.tech_stack) ? exp.tech_stack : [];
            const metrics = Array.isArray(exp.metrics) ? exp.metrics : [];

            return (
              <motion.div
                key={exp.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Glowing Timeline Node */}
                <div className="absolute -left-[33px] sm:-left-[49px] top-6 h-5 w-5 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 ring-4 ring-background shadow-lg shadow-fuchsia-500/50" />

                <TiltCard
                  intensity={7}
                  glowColor="rgba(168, 85, 247, 0.25)"
                  className="p-6 sm:p-8"
                >
                  {/* Top Row: Role, Company, Dates & Mode */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/20">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Briefcase className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 shrink-0" />
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {exp.role}
                        </h3>
                        {exp.is_current && (
                          <Badge variant="emerald" className="text-[11px]">
                            Active Role
                          </Badge>
                        )}
                      </div>
                      <p className="font-display text-lg font-semibold text-violet-700 dark:text-violet-300">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {exp.start_date} – {exp.end_date}
                        </span>
                      </Badge>
                      <Badge variant="cyan" className="flex items-center gap-1.5 py-1 px-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.work_mode || exp.location}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Key Metrics Highlight Strip */}
                  {metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
                      {metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="glass-subcard rounded-xl px-3.5 py-2.5"
                        >
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                            {m.label}
                          </p>
                          <p className="font-display text-sm sm:text-base font-bold text-cyan-800 dark:text-cyan-300 mt-0.5">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Resume Bullet Points */}
                  <ul className="space-y-3 my-5">
                    {highlights.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 shrink-0 mt-1" />
                        <span className="text-foreground/90 font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  {techStack.length > 0 && (
                    <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mr-1">
                        <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                        Tech Stack:
                      </span>
                      {techStack.map((tech) => (
                        <Badge key={tech} variant="default" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
