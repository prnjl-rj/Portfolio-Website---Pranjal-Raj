import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Orbit, Cpu, Eye, ChevronUp, Hand } from 'lucide-react';
import { FUR_PRESETS, SCENE_ENVIRONMENTS } from '@/fur/presets.js';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { trackPortfolioEvent } from '@/lib/utils.js';

export function FurControlDock({
  presetId,
  setPresetId,
  envId,
  setEnvId,
  gpuFurEnabled,
  setGpuFurEnabled,
  windStrength,
  setWindStrength,
  interactiveOrbit,
  setInteractiveOrbit,
  onTriggerBoop,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-ui-interactive="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="glass-surface w-80 rounded-2xl p-4 shadow-2xl border border-violet-500/30"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span className="font-display font-bold text-sm tracking-tight">
                  3D GPU Fur Simulation
                </span>
              </div>
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                {gpuFurEnabled ? '60k Strands + GPGPU' : 'WebGL 26k'}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Move cursor over Mochi-Puff in the background to pet &amp; comb fur in real time, or click to boop!
            </p>

            {/* Fur Coat Presets */}
            <div className="mb-3">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Marschner Hair Coat Preset
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {FUR_PRESETS.map((p) => {
                  const active = p.id === presetId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPresetId(p.id);
                        trackPortfolioEvent('fur_preset_change', p.name);
                      }}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs font-medium transition-all border ${
                        active
                          ? 'border-fuchsia-500/70 bg-fuchsia-500/20 text-foreground shadow-sm'
                          : 'glass-subcard text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/30"
                        style={{
                          background: `linear-gradient(135deg, ${p.baseColor}, ${p.tipColor})`,
                        }}
                      />
                      <span className="truncate">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Scene Environment */}
            <div className="mb-3">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                3D Environment Stage
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {SCENE_ENVIRONMENTS.map((env) => {
                  const active = env.id === envId;
                  return (
                    <button
                      key={env.id}
                      type="button"
                      onClick={() => {
                        setEnvId(env.id);
                        trackPortfolioEvent('fur_env_change', env.id);
                      }}
                      className={`rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all border ${
                        active
                          ? 'border-cyan-500/70 bg-cyan-500/20 text-cyan-800 dark:text-cyan-200'
                          : 'glass-subcard text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {env.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wind Strength Slider */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  Turbulent Wind Field
                </span>
                <span className="font-mono text-[11px] text-foreground">
                  {windStrength.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2.2"
                step="0.05"
                value={windStrength}
                onChange={(e) => setWindStrength(parseFloat(e.target.value))}
                className="w-full accent-fuchsia-500 cursor-pointer h-1.5 rounded-lg bg-white/15"
              />
            </div>

            {/* Action Toggles */}
            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setGpuFurEnabled(!gpuFurEnabled)}
                className="flex-1 text-xs"
              >
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
                {gpuFurEnabled ? 'GPGPU Verlet ON' : 'WebGL Mode'}
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => {
                  onTriggerBoop();
                  trackPortfolioEvent('fur_boop', presetId);
                }}
                className="text-xs px-3"
              >
                <Hand className="w-3.5 h-3.5" />
                Boop!
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Bar */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setInteractiveOrbit(!interactiveOrbit)}
          className={`glass-surface flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all shadow-lg border ${
            interactiveOrbit
              ? 'border-cyan-400 bg-cyan-500/25 text-cyan-100 shadow-cyan-500/30'
              : 'border-white/15 hover:border-violet-400/50 text-foreground/90'
          }`}
          title="Toggle full 3D Orbit & Petting Studio Mode"
        >
          {interactiveOrbit ? (
            <>
              <Eye className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Exit 3D Studio View</span>
            </>
          ) : (
            <>
              <Orbit className="w-3.5 h-3.5 text-fuchsia-400" />
              <span className="hidden sm:inline">3D Fur Studio Mode</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="glass-surface flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold border border-violet-500/40 hover:border-fuchsia-400/70 text-foreground shadow-lg shadow-violet-500/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Fur Controls</span>
          <ChevronUp
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
}

