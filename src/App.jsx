import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_PORTFOLIO_DATA } from '../server/portfolioData.js';
import { FurBackground } from '@/components/FurBackground.jsx';
import { FurControlDock } from '@/components/FurControlDock.jsx';
import { Navbar } from '@/components/Navbar.jsx';
import { HeroSection } from '@/components/HeroSection.jsx';
import { AboutEducationSection } from '@/components/AboutEducationSection.jsx';
import { ExperienceSection } from '@/components/ExperienceSection.jsx';
import { ProjectsSection } from '@/components/ProjectsSection.jsx';
import { SkillsSection } from '@/components/SkillsSection.jsx';
import { AchievementsSection } from '@/components/AchievementsSection.jsx';
import { ContactSection } from '@/components/ContactSection.jsx';
import { DatabaseSchemaModal } from '@/components/DatabaseSchemaModal.jsx';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO_DATA);
  const [isDark, setIsDark] = useState(false);
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);

  // 3D GPU Fur Simulation state (defaults to Light Theme + Cloud Sky 'meadow' environment on startup)
  const [presetId, setPresetId] = useState('sakura');
  const [envId, setEnvId] = useState('meadow');
  const [gpuFurEnabled, setGpuFurEnabled] = useState(true);
  const [windStrength, setWindStrength] = useState(0.95);
  const [interactiveOrbit, setInteractiveOrbit] = useState(false);
  const [boopTrigger, setBoopTrigger] = useState(0);

  // Load portfolio data from Express + PostgreSQL API
  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type: 'app_mounted', target: window.location.href }),
    }).catch(() => {});

    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.profile) {
          setPortfolioData((prev) => ({
            ...prev,
            profile: data.profile || prev.profile,
            experiences: data.experiences?.length ? data.experiences : prev.experiences,
            projects: data.projects?.length ? data.projects : prev.projects,
            skills: data.skills?.length ? data.skills : prev.skills,
            education: data.education?.length ? data.education : prev.education,
            achievements: data.achievements?.length ? data.achievements : prev.achievements,
          }));
        }
      })
      .catch(() => {
        // Fallback to initial data
      });
  }, []);

  // Default to Light theme on website startup
  useEffect(() => {
    setIsDark(false);
    setEnvId('meadow');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('pranjal_theme', 'light');
  }, []);

  function handleToggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('pranjal_theme', 'dark');
        setEnvId('studio');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('pranjal_theme', 'light');
        setEnvId('meadow');
      }
      return next;
    });
  }

  return (
    <div className="relative min-h-screen selection:bg-fuchsia-500/30">
      {/* 1. Full-Screen 3D WebGL2/GPGPU Fur Simulation Background */}
      <FurBackground
        presetId={presetId}
        envId={envId}
        gpuFurEnabled={gpuFurEnabled}
        windStrength={windStrength}
        interactiveOrbit={interactiveOrbit}
        boopTrigger={boopTrigger}
      />

      {/* 2. Top Floating Navbar */}
      <Navbar
        profile={portfolioData.profile}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenSchemaModal={() => setSchemaModalOpen(true)}
        interactiveOrbit={interactiveOrbit}
        setInteractiveOrbit={setInteractiveOrbit}
      />

      {/* 3. Interactive 3D Studio Mode HUD Banner */}
      <AnimatePresence>
        {interactiveOrbit && (
          <motion.div
            data-ui-interactive="true"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-surface rounded-full px-5 py-2.5 border border-cyan-400/50 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium text-cyan-100"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>
              <strong>3D Fur Studio Active:</strong> Drag across Mochi-Puff to pet &amp; comb fur ·
              Click to boop · Orbit &amp; zoom with mouse
            </span>
            <button
              type="button"
              onClick={() => setInteractiveOrbit(false)}
              className="ml-2 rounded-full bg-cyan-500/30 hover:bg-cyan-500/50 px-3 py-1 text-xs font-bold text-white transition-colors"
            >
              Return to Portfolio
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Main Portfolio Content Sections */}
      <main
        className={`relative z-10 transition-opacity duration-500 ${
          interactiveOrbit ? 'opacity-10 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        <HeroSection
          profile={portfolioData.profile}
          onTriggerBoop={() => setBoopTrigger((c) => c + 1)}
          setInteractiveOrbit={setInteractiveOrbit}
        />
        <AboutEducationSection
          profile={portfolioData.profile}
          education={portfolioData.education}
        />
        <ExperienceSection experiences={portfolioData.experiences} />
        <ProjectsSection projects={portfolioData.projects} />
        <SkillsSection skills={portfolioData.skills} />
        <AchievementsSection achievements={portfolioData.achievements} />
        <ContactSection
          profile={portfolioData.profile}
          onOpenSchemaModal={() => setSchemaModalOpen(true)}
        />
      </main>

      {/* 5. Floating 3D GPU Fur Simulation Control Dock */}
      <FurControlDock
        presetId={presetId}
        setPresetId={setPresetId}
        envId={envId}
        setEnvId={setEnvId}
        gpuFurEnabled={gpuFurEnabled}
        setGpuFurEnabled={setGpuFurEnabled}
        windStrength={windStrength}
        setWindStrength={setWindStrength}
        interactiveOrbit={interactiveOrbit}
        setInteractiveOrbit={setInteractiveOrbit}
        onTriggerBoop={() => setBoopTrigger((c) => c + 1)}
      />

      {/* 6. PostgreSQL Database Schema & Telemetry Modal */}
      <DatabaseSchemaModal
        isOpen={schemaModalOpen}
        onClose={() => setSchemaModalOpen(false)}
      />
    </div>
  );
}

