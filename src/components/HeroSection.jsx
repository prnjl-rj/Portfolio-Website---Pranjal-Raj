import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Cpu,
  Layers,
  Database,
  Hand,
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { TiltCard } from '@/components/ui/tilt-card.jsx';
import { trackPortfolioEvent } from '@/lib/utils.js';

export function HeroSection({ profile, onTriggerBoop, setInteractiveOrbit }) {
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 500], [0, 75]);
  const opacityHero = useTransform(scrollY, [0, 480], [1, 0.15]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Glassmorphism Box */}
          <motion.div
            style={{ y: yHeroText, opacity: opacityHero }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 glass-surface rounded-3xl p-6 sm:p-9 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="secondary" className="px-3.5 py-1 text-xs">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-fuchsia-600 dark:text-fuchsia-400" />
                WebGL2 / GPGPU 3D Fur Simulation Active
              </Badge>
              <Badge variant="cyan" className="px-3.5 py-1 text-xs">
                VIT Vellore · B.Tech ECE &apos;28 (8.30 CGPA)
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-fuchsia-600 dark:text-fuchsia-400 font-bold">
                Hello, I&apos;m {profile?.full_name || 'Pranjal Raj'}
              </p>
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.06]">
                Software Engineer &amp;{' '}
                <span className="text-gradient-aurora block sm:inline">
                  MERN Stack Developer
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Architecting high-performance full-stack web ecosystems with{' '}
              <span className="text-foreground font-semibold">
                React, Next.js, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, NestJS, and PostgreSQL
              </span>
              , alongside 60 FPS Flutter mobile systems and real-time IoT cloud pipelines.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button asChild size="lg">
                <a href="#projects">
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>

              <Button asChild variant="secondary" size="lg">
                <a href="#experience">
                  <span>View Experience</span>
                </a>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  onTriggerBoop();
                  trackPortfolioEvent('hero_boop_click', 'Mochi-Puff');
                }}
                className="glass-subcard border-fuchsia-500/40 hover:bg-fuchsia-500/15"
              >
                <Hand className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                <span>Boop 3D Fur</span>
              </Button>
            </div>

            {/* Social & Contact Glass Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com/prnjl-rj"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subcard inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold hover:border-violet-400/60 transition-all"
              >
                <Github className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>github.com/prnjl-rj</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pranjal-raj-71b9b624a/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subcard inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold hover:border-cyan-400/60 transition-all"
              >
                <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:prnjlrj.work@gmail.com"
                className="glass-subcard inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold hover:border-fuchsia-400/60 transition-all"
              >
                <Mail className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                <span>prnjlrj.work@gmail.com</span>
              </a>
              <a
                href="tel:+917830550771"
                className="glass-subcard inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold hover:border-emerald-400/60 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>+91 7830550771</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Portrait Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[390px]">
              {/* Decorative Orbital Glow Rings */}
              <div className="pointer-events-none absolute -inset-4 rounded-[2.2rem] bg-gradient-to-tr from-violet-600/30 via-fuchsia-500/20 to-cyan-400/30 blur-2xl animate-pulseGlow" />

              <TiltCard
                intensity={12}
                glowColor="rgba(236, 72, 153, 0.30)"
                className="p-4 sm:p-5 rounded-[2rem]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-950 border border-white/20">
                  <img
                    src="/mypicc.jpg"
                    alt="Pranjal Raj — Software Engineer"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-xl font-bold text-white">
                          Pranjal Raj
                        </p>
                        <p className="text-xs text-fuchsia-300 font-medium">
                          Full-Stack &amp; Mobile Systems Engineer
                        </p>
                      </div>
                      {/* <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInteractiveOrbit(true);
                        }}
                        className="rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold text-white border border-white/25 transition-all"
                      >
                        Pet 3D Fur
                      </button> */}
                    </div>
                  </div>
                </div>

                {/* Floating Tech Metrics Row inside Portrait Card */}
                <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                  <div className="glass-subcard rounded-xl p-2">
                    <Code2 className="w-4 h-4 text-violet-600 dark:text-violet-400 mx-auto mb-1" />
                    <p className="text-[11px] font-bold">React 18+</p>
                    <p className="text-[9px] text-muted-foreground">Next.js</p>
                  </div>
                  <div className="glass-subcard rounded-xl p-2">
                    <Layers className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 mx-auto mb-1" />
                    <p className="text-[11px] font-bold">NestJS</p>
                    <p className="text-[9px] text-muted-foreground">Node/Express</p>
                  </div>
                  <div className="glass-subcard rounded-xl p-2">
                    <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mx-auto mb-1" />
                    <p className="text-[11px] font-bold">Postgres</p>
                    <p className="text-[9px] text-muted-foreground">Firebase/SQL</p>
                  </div>
                  <div className="glass-subcard rounded-xl p-2">
                    <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                    <p className="text-[11px] font-bold">Flutter</p>
                    <p className="text-[9px] text-muted-foreground">ESP32 IoT</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
