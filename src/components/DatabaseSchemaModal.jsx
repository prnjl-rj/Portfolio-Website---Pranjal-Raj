import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, X, Copy, Check, Server, Code2, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';

export function DatabaseSchemaModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('schema');
  const [schemaData, setSchemaData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/schema')
      .then((r) => r.json())
      .then((data) => setSchemaData(data))
      .catch(() => {});
  }, [isOpen]);

  function handleCopy() {
    if (!schemaData) return;
    const text = tab === 'schema' ? schemaData.schemaSql : schemaData.seedSql;
    navigator.clipboard.writeText(text || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-ui-interactive="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-surface w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl border border-cyan-500/35 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                  <Database className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold flex items-center gap-2">
                    PostgreSQL Database Architecture &amp; JS Backend
                    <Badge variant="cyan" className="text-[10px]">
                      PostgreSQL 15+
                    </Badge>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Relational schema powering Profile, Experience, Projects, Skills, Contact Messages &amp; Telemetry
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-white/[0.02] border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTab('schema')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    tab === 'schema'
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  database/schema.sql
                </button>
                <button
                  type="button"
                  onClick={() => setTab('seed')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    tab === 'seed'
                      ? 'bg-violet-500/20 text-violet-200 border border-violet-500/40'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  database/seed.sql
                </button>
                <button
                  type="button"
                  onClick={() => setTab('telemetry')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    tab === 'telemetry'
                      ? 'bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/40'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  Live API Telemetry
                </button>
              </div>

              {tab !== 'telemetry' && (
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied SQL
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy SQL
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 font-mono text-xs">
              {tab === 'schema' && (
                <pre className="text-cyan-100/90 leading-relaxed whitespace-pre-wrap">
                  {schemaData?.schemaSql || 'Loading database/schema.sql...'}
                </pre>
              )}
              {tab === 'seed' && (
                <pre className="text-violet-100/90 leading-relaxed whitespace-pre-wrap">
                  {schemaData?.seedSql || 'Loading database/seed.sql...'}
                </pre>
              )}
              {tab === 'telemetry' && (
                <div className="space-y-6 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                      <p className="text-xs text-muted-foreground">Backend Runtime</p>
                      <p className="text-base font-bold text-emerald-400 mt-1">
                        Node.js + Express + pg.Pool
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                      <p className="text-xs text-muted-foreground">Recent Contact Inquiries</p>
                      <p className="text-base font-bold text-fuchsia-400 mt-1">
                        {schemaData?.recentMessages?.length ?? 0} Stored
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                      <p className="text-xs text-muted-foreground">Tracked Portfolio Events</p>
                      <p className="text-base font-bold text-cyan-400 mt-1">
                        {schemaData?.recentEvents?.length ?? 0} Logged
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm mb-2">
                      Recent Analytics Events (`analytics_events` table)
                    </h4>
                    <div className="space-y-2">
                      {(schemaData?.recentEvents || []).length === 0 ? (
                        <p className="text-xs text-muted-foreground">
                          Interact with projects or 3D fur presets to generate live telemetry events.
                        </p>
                      ) : (
                        schemaData.recentEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 border border-white/10 text-xs"
                          >
                            <span className="font-mono text-fuchsia-300">{ev.event_type}</span>
                            <span className="text-foreground truncate max-w-xs">{ev.target}</span>
                            <span className="text-muted-foreground font-mono">
                              {new Date(ev.created_at).toLocaleTimeString()}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

