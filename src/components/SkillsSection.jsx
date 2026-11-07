import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Cloud,
  Activity,
  Sparkles,
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const CATEGORY_META = {
  All: { icon: Sparkles, color: 'text-fuchsia-600 dark:text-fuchsia-400' },
  'Programming Languages': { icon: Code2, color: 'text-violet-600 dark:text-violet-400' },
  'Frontend & UI': { icon: Layout, color: 'text-pink-600 dark:text-pink-400' },
  'Backend & Databases': { icon: Server, color: 'text-cyan-600 dark:text-cyan-400' },
  'DevOps & Cloud': { icon: Cloud, color: 'text-emerald-600 dark:text-emerald-400' },
  'Monitoring & Workflow': { icon: Activity, color: 'text-amber-600 dark:text-amber-400' },
};

export function SkillsSection({ skills = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(skills.map((s) => s.category)));
    return ['All', ...unique];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [skills, selectedCategory]);

  const groupedByCategory = useMemo(() => {
    const map = {};
    for (const s of filteredSkills) {
      if (!map[s.category]) map[s.category] = [];
      map[s.category].push(s);
    }
    return Object.entries(map);
  }, [filteredSkills]);

  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-fuchsia-400">04.</span>
            <span className="h-px w-12 bg-fuchsia-500/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Technical Stack &amp; Tooling
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Skills &amp; <span className="text-gradient-aurora">Arsenal</span>
          </h2>
        </motion.div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            const MetaIcon = CATEGORY_META[cat]?.icon || Sparkles;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all border ${
                  active
                    ? 'border-fuchsia-400/60 bg-gradient-to-r from-violet-600/85 to-fuchsia-600/85 text-white shadow-lg shadow-fuchsia-500/20'
                    : 'glass-surface text-muted-foreground hover:text-foreground hover:border-violet-400/50'
                }`}
              >
                <MetaIcon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {groupedByCategory.map(([category, items]) => {
              const MetaIcon = CATEGORY_META[category]?.icon || Code2;
              const iconColor = CATEGORY_META[category]?.color || 'text-violet-600 dark:text-violet-400';

              return (
                <motion.div
                  key={category}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiltCard
                    intensity={8}
                    className="p-6 h-full hover:border-violet-400/50"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="glass-subcard h-10 w-10 rounded-xl flex items-center justify-center">
                          <MetaIcon className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <h3 className="font-display text-lg font-bold">{category}</h3>
                      </div>
                      <Badge variant="outline" className="font-mono text-[11px]">
                        {items.length}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {items.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="font-medium text-foreground/95 flex items-center gap-1.5">
                              {skill.name}
                              {skill.is_highlighted && (
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                              )}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-900/10 dark:bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

