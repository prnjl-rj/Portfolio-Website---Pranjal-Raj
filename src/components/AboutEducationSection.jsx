import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, MapPin, Terminal, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { TiltCard } from '@/components/ui/tilt-card.jsx';

export function AboutEducationSection({ profile, education = [] }) {
  return (
    <section id="about" className="relative py-24">
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
              01.
            </span>
            <span className="h-px w-12 bg-fuchsia-500/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Engineering Profile &amp; Academics
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            About Me &amp; <span className="text-gradient-aurora">Education</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Bio & Engineering Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-6 flex"
          >
            <TiltCard intensity={6} className="p-6 sm:p-8 flex flex-col justify-between w-full">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    src="/mypicc.jpg"
                    alt="Pranjal Raj"
                    className="h-16 w-16 rounded-2xl object-cover object-top ring-2 ring-fuchsia-500/50"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      {profile?.full_name || 'Pranjal Raj'}
                    </h3>
                    <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-semibold">
                      Software Engineer &amp; MERN Stack Developer
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I am a full-stack software engineer and B.Tech Electronics &amp; Communication
                  undergraduate at{' '}
                  <span className="text-foreground font-semibold">
                    Vellore Institute of Technology (CGPA: 8.30)
                  </span>
                  . I specialize in building scalable web applications, high-frequency mobile
                  systems, and cloud-connected IoT architectures.
                </p>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  From crafting responsive client-facing platforms with{' '}
                  <span className="text-foreground font-semibold">
                    React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui
                  </span>{' '}
                  and robust APIs with{' '}
                  <span className="text-foreground font-semibold">
                    NestJS, Node.js, Express.js, Zod, and PostgreSQL
                  </span>
                  , to optimizing concurrent Dart isolates in Flutter at 60 FPS and engineering
                  ESP32 sensor pipelines, I bridge systems performance with modern product design.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/20">
                <div className="glass-subcard rounded-xl p-3.5">
                  <Terminal className="w-4 h-4 text-violet-600 dark:text-violet-400 mb-1.5" />
                  <p className="font-display text-xl font-extrabold">8.30</p>
                  <p className="text-xs text-muted-foreground">B.Tech CGPA @ VIT</p>
                </div>
                <div className="glass-subcard rounded-xl p-3.5">
                  <Layers className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 mb-1.5" />
                  <p className="font-display text-xl font-extrabold">60 FPS</p>
                  <p className="text-xs text-muted-foreground">Mobile &amp; WebGL2</p>
                </div>
                <div className="glass-subcard rounded-xl p-3.5 col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mb-1.5" />
                  <p className="font-display text-xl font-extrabold">96%</p>
                  <p className="text-xs text-muted-foreground">Grade X Distinction</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right: Academic Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-6 space-y-4"
          >
            {education.map((edu, idx) => (
              <TiltCard
                key={edu.id || idx}
                intensity={6}
                glowColor="rgba(56, 189, 248, 0.22)"
                className="p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="glass-subcard h-9 w-9 rounded-xl flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold leading-snug">
                        {edu.institution}
                      </h3>
                      <p className="text-xs text-fuchsia-700 dark:text-fuchsia-300 font-semibold">
                        {edu.degree}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan">
                      {edu.score_label}: {edu.score_value}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[11px]">
                      {edu.period}
                    </Badge>
                  </div>
                </div>

                {edu.location && (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    {edu.location}
                  </p>
                )}

                {Array.isArray(edu.coursework) && edu.coursework.length > 0 && (
                  <div className="pt-3 border-t border-white/20">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                      Relevant Coursework
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="glass-subcard rounded-lg px-2.5 py-1 text-xs font-medium text-foreground/90"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
