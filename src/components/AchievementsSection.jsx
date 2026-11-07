import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Users, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

export function AchievementsSection({ achievements = [] }) {
  const cocurriculars = achievements.filter((a) => a.kind === 'cocurricular');
  const certifications = achievements.filter((a) => a.kind === 'certification');
  const hackathons = achievements.filter((a) => a.kind === 'hackathon');

  return (
    <section id="achievements" className="relative py-24">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-fuchsia-400">05.</span>
            <span className="h-px w-12 bg-fuchsia-500/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Leadership, Credentials &amp; Competitions
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Co-Curriculars, Certifications &amp;{' '}
            <span className="text-gradient-aurora">Hackathons</span>
          </h2>
        </motion.div>

        {/* Co-Curricular Leadership Banner (from Resume PDF page 2) */}
        {cocurriculars.length > 0 && (
          <div className="mb-10">
            {cocurriculars.map((item, idx) => (
              <TiltCard
                key={item.id || idx}
                intensity={6}
                glowColor="rgba(56, 189, 248, 0.25)"
                className="p-6 sm:p-8 hover:border-cyan-500/45"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/30 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="glass-subcard h-11 w-11 rounded-2xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-cyan-700 dark:text-cyan-300 font-semibold">{item.organization}</p>
                    </div>
                  </div>
                  <Badge variant="cyan" className="self-start sm:self-center">
                    {item.period}
                  </Badge>
                </div>

                {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                  <ul className="space-y-2.5 mt-4">
                    {item.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/90"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-1" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </TiltCard>
            ))}
          </div>
        )}

        {/* Two Columns: Certifications & Hackathons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certifications Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 mb-2">
              <Award className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
              <h3 className="font-display text-2xl font-bold">Certifications</h3>
            </div>
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <TiltCard
                  intensity={6}
                  className="p-5 hover:border-fuchsia-400/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg font-bold text-foreground">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400 mt-0.5">
                        {cert.organization}
                      </p>
                      {cert.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      Verified
                    </Badge>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Hackathons Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 mb-2">
              <Trophy className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h3 className="font-display text-2xl font-bold">Hackathons &amp; Arenas</h3>
            </div>
            {hackathons.map((hack, idx) => (
              <motion.div
                key={hack.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <TiltCard
                  intensity={6}
                  className="p-5 hover:border-violet-400/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg font-bold text-foreground">
                        {hack.title}
                      </h4>
                      <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mt-0.5">
                        {hack.organization}
                      </p>
                      {hack.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                          {hack.description}
                        </p>
                      )}
                    </div>
                    {hack.period && (
                      <Badge variant="default" className="shrink-0 font-mono">
                        {hack.period}
                      </Badge>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

