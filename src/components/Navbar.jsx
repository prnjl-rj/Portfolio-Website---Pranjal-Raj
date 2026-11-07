import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FileText,
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { trackPortfolioEvent } from '@/lib/utils.js';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  profile,
  isDark,
  onToggleTheme,
}) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      // Update active section based on viewport position
      const scrollPos = window.scrollY + 220;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 origin-left z-[60]"
      />

      <header
        data-ui-interactive="true"
        className="fixed top-3 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6"
      >
        {/* Pill-shaped Navbar with fully rounded ends (rounded-full) */}
        <div
          className={`glass-surface mx-auto max-w-7xl rounded-full transition-all duration-300 ${
            scrolled
              ? 'py-2.5 px-5 sm:px-7'
              : 'py-3 px-5 sm:px-7'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo + Status Badge */}
            <div className="flex items-center gap-3 pl-1">
              <a
                href="#home"
                className="font-brand text-xl sm:text-2xl tracking-wider uppercase text-gradient-aurora drop-shadow-sm"
              >
                {profile?.full_name || 'Pranjal Raj'}
              </a>
              <Badge
                variant="emerald"
                className="hidden xl:inline-flex text-[11px] py-0.5 px-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1" />
                Open to Opportunities
              </Badge>
            </div>

            {/* Desktop Navigation Pill Links */}
            <nav className="glass-subcard hidden lg:flex items-center gap-1 rounded-full p-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 shadow-md shadow-fuchsia-500/25 -z-10"
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions: Theme Toggle, Resume, Profile Avatar */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle color theme"
                className="glass-subcard flex h-9 w-9 items-center justify-center rounded-full hover:border-violet-400/50 transition-all"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-violet-600" />
                )}
              </button>

              {/* Resume CTA */}
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex rounded-full px-4"
                onClick={() => trackPortfolioEvent('resume_open', '/resume.pdf')}
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              </Button>

              {/* Profile Picture Avatar Button */}
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                aria-label="Open Pranjal Raj profile card"
                className="relative group h-10 w-10 rounded-full p-[2px] bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400 shadow-md shadow-fuchsia-500/25 hover:scale-105 transition-transform"
              >
                <img
                  src="/mypicc.jpg"
                  alt="Pranjal Raj"
                  className="h-full w-full rounded-full object-cover object-top bg-zinc-900"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-background" />
              </button>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="glass-subcard lg:hidden flex h-9 w-9 items-center justify-center rounded-full"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Floating Drawer (keeps main navbar rounded-full) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="lg:hidden mx-auto max-w-7xl mt-2 glass-surface rounded-3xl p-4 border border-violet-500/25 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-1.5 pb-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold ${
                      activeSection === item.id
                        ? 'bg-violet-600/30 text-white border border-violet-400/40'
                        : 'text-muted-foreground hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <Button asChild size="sm" className="w-full rounded-full">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-3.5 h-3.5" />
                    Resume PDF
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Profile Card Modal */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProfileOpen(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-surface relative w-full max-w-md rounded-3xl p-6 sm:p-8 border border-violet-500/35 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close profile modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4 h-28 w-28 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400 shadow-xl shadow-fuchsia-500/30">
                  <img
                    src="/mypicc.jpg"
                    alt="Pranjal Raj"
                    className="h-full w-full rounded-full object-cover object-top bg-zinc-900"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold">
                  {profile?.full_name || 'Pranjal Raj'}
                </h3>
                <p className="text-sm font-medium text-fuchsia-400 mt-0.5">
                  {profile?.headline || 'Software Engineer & MERN Stack Developer'}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Vellore Institute of Technology · Vellore, TN
                </p>
              </div>

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="space-y-2.5 text-sm">
                <a
                  href={`mailto:${profile?.email || 'prnjlrj.work@gmail.com'}`}
                  className="glass-subcard flex items-center justify-between rounded-xl hover:border-violet-500/40 px-4 py-2.5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    <span>{profile?.email || 'prnjlrj.work@gmail.com'}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>

                <a
                  href="tel:+917830550771"
                  className="glass-subcard flex items-center justify-between rounded-xl hover:border-violet-500/40 px-4 py-2.5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>+91 78305 50771</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>

                <a
                  href="https://github.com/prnjl-rj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subcard flex items-center justify-between rounded-xl hover:border-violet-500/40 px-4 py-2.5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <span>github.com/prnjl-rj</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>

                <a
                  href="https://www.linkedin.com/in/pranjal-raj-71b9b624a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subcard flex items-center justify-between rounded-xl hover:border-violet-500/40 px-4 py-2.5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>linkedin.com/in/pranjal-raj-71b9b624a</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>

                <a
                  href="https://heroic-stardust-148f66.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subcard flex items-center justify-between rounded-xl hover:border-violet-500/40 px-4 py-2.5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>heroic-stardust-148f66.netlify.app</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
