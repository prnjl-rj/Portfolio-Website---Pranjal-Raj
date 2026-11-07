import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Github, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { TiltCard } from '@/components/ui/tilt-card.jsx';
import { trackPortfolioEvent } from '@/lib/utils.js';

export function ProjectsSection({ projects = [] }) {
  function handleOpenProjectLink(project) {
    const url = project.readme_url || project.github_url;
    if (!url) return;
    trackPortfolioEvent('project_click', project.title, { url });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="projects" className="relative py-24">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-fuchsia-400">03.</span>
            <span className="h-px w-12 bg-fuchsia-500/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Engineered Systems &amp; Architecture
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Featured <span className="text-gradient-aurora">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
            Click any project card below to open its full GitHub engineering documentation (`README.md`).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, idx) => {
            const highlights = Array.isArray(project.highlights) ? project.highlights : [];
            const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : [];
            const metrics = Array.isArray(project.metrics) ? project.metrics : [];
            const targetUrl = project.readme_url || project.github_url;

            return (
              <motion.div
                key={project.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="flex"
              >
                <TiltCard
                  intensity={8}
                  glowColor={
                    idx === 0
                      ? 'rgba(217, 70, 239, 0.28)'
                      : 'rgba(56, 189, 248, 0.28)'
                  }
                  onClick={() => handleOpenProjectLink(project)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenProjectLink(project);
                    }
                  }}
                  aria-label={`Open ${project.title} README documentation on GitHub`}
                  className="flex flex-col justify-between w-full hover:border-fuchsia-400/55"
                >
                  <div>
                    {/* Project Showcase Image Header */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950/60 border-b border-white/25 dark:border-white/10">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-white/25">
                          <Sparkles className="w-3 h-3 mr-1 text-fuchsia-400" />
                          {project.category}
                        </Badge>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white group-hover:bg-fuchsia-600 group-hover:border-fuchsia-400 transition-colors">
                          <span>Open README.md</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-fuchsia-300 transition-colors">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-0.5">
                            {project.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 space-y-5">
                      {/* Metrics Pills */}
                      {metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2.5">
                          {metrics.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="glass-subcard rounded-xl px-3 py-2"
                            >
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
                                {m.label}
                              </p>
                              <p className="font-display text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-300 mt-0.5 truncate">
                                {m.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Resume Engineering Highlights */}
                      <ul className="space-y-2.5">
                        {highlights.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 shrink-0 mt-0.5" />
                            <span className="text-foreground/90">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Tech Stack + Direct Links */}
                  <div className="p-6 sm:p-7 pt-0 space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/30 dark:border-white/10">
                      {techStack.map((tech) => (
                        <Badge key={tech} variant="default" className="text-[11px]">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <Button
                        asChild
                        size="default"
                        className="w-full sm:w-auto flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackPortfolioEvent('project_readme_button', project.title, {
                            url: targetUrl,
                          });
                        }}
                      >
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Read Full README.md</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </Button>

                      <Button
                        asChild
                        variant="secondary"
                        size="default"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

