import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  Github,
  Linkedin,
  MessageSquare,
  CheckCircle2,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { TiltCard } from '@/components/ui/tilt-card.jsx';

const RECIPIENT_EMAIL = 'prnjlrj.work@gmail.com';

export function ContactSection({ profile }) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  function buildGmailComposeUrl({ sender_name, sender_email, subject, message }) {
    const emailSubject = `${subject || 'Portfolio Inquiry'} — from ${sender_name} (${sender_email})`;
    const emailBody = `From: ${sender_name} <${sender_email}>\nReply-To: ${sender_email}\n\n${message}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      RECIPIENT_EMAIL
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  }

  function buildMailtoUrl({ sender_name, sender_email, subject, message }) {
    const emailSubject = `${subject || 'Portfolio Inquiry'} — from ${sender_name} (${sender_email})`;
    const emailBody = `From: ${sender_name} <${sender_email}>\nReply-To: ${sender_email}\n\n${message}`;
    return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const payload = {
      sender_name: formData.sender_name.trim(),
      sender_email: formData.sender_email.trim(),
      subject: formData.subject.trim() || 'Portfolio Inquiry',
      message: formData.message.trim(),
    };

    try {
      // 1. Persist inquiry in backend database (/api/contact)
      const dbPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // 2. Dispatch direct email to prnjlrj.work@gmail.com with Reply-To set to visitor's email
      const emailPromise = fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.sender_name,
          email: payload.sender_email,
          _replyto: payload.sender_email,
          _subject: `${payload.subject} — from ${payload.sender_name} (${payload.sender_email})`,
          message: `Sender Name: ${payload.sender_name}\nSender Email: ${payload.sender_email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch(() => null);

      const [dbRes, emailRes] = await Promise.all([dbPromise, emailPromise]);
      let emailJson = null;
      if (emailRes) {
        try {
          emailJson = await emailRes.json();
        } catch {
          emailJson = null;
        }
      }

      const isDirectEmailSent =
        emailJson && (emailJson.success === true || emailJson.success === 'true');

      const gmailUrl = buildGmailComposeUrl(payload);
      const mailtoUrl = buildMailtoUrl(payload);

      if (isDirectEmailSent) {
        setResult({
          type: 'success',
          text: `Email sent from ${payload.sender_email} to ${RECIPIENT_EMAIL}! Pranjal will reply directly to your email.`,
          gmailUrl,
          mailtoUrl,
        });
        setFormData({ sender_name: '', sender_email: '', subject: '', message: '' });
      } else {
        // Open visitor's mail client / Gmail compose pre-addressed to prnjlrj.work@gmail.com
        // so the email from their account is guaranteed to arrive even before FormSubmit activation
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        setResult({
          type: 'success',
          text:
            emailJson?.message?.toLowerCase().includes('activate')
              ? `Message saved & Gmail compose opened to send directly from ${payload.sender_email} to ${RECIPIENT_EMAIL} (Tip: check ${RECIPIENT_EMAIL} once to click FormSubmit's one-time activation link for instant background delivery).`
              : `Message prepared from ${payload.sender_email} to ${RECIPIENT_EMAIL}! Complete sending in the opened Gmail tab or via your mail app below.`,
          gmailUrl,
          mailtoUrl,
        });
        if (dbRes?.ok) {
          setFormData({ sender_name: '', sender_email: '', subject: '', message: '' });
        }
      }
    } catch {
      const gmailUrl = buildGmailComposeUrl(payload);
      const mailtoUrl = buildMailtoUrl(payload);
      window.open(mailtoUrl, '_self');
      setResult({
        type: 'success',
        text: `Opened your email client to send directly from ${payload.sender_email} to ${RECIPIENT_EMAIL}.`,
        gmailUrl,
        mailtoUrl,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-fuchsia-400">06.</span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              What&apos;s Next?
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Let&apos;s Build Something <span className="text-gradient-aurora">Extraordinary</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3">
            Have an exciting engineering role, project collaboration, or technical question? Send a
            direct message to my inbox or reach out through any channel below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Direct Channels Card */}
          <div className="lg:col-span-5 flex">
            <TiltCard
              intensity={6}
              className="p-6 sm:p-8 flex flex-col justify-between w-full"
            >
              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-bold">Direct Channels</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                    My inbox is always open. Connect with me directly via email, WhatsApp,
                    LinkedIn, or GitHub.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
                    className="glass-subcard flex items-center gap-3.5 rounded-2xl hover:border-fuchsia-500/50 p-4 transition-all"
                  >
                    <div className="h-11 w-11 rounded-xl bg-fuchsia-500/15 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Primary Email</p>
                      <p className="text-sm font-semibold truncate">{RECIPIENT_EMAIL}</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/917830550771?text=Hello%20Pranjal!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-subcard flex items-center gap-3.5 rounded-2xl hover:border-emerald-500/50 p-4 transition-all"
                  >
                    <div className="h-11 w-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">WhatsApp / Phone</p>
                      <p className="text-sm font-semibold">+91 78305 50771</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/pranjal-raj-71b9b624a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-subcard flex items-center gap-3.5 rounded-2xl hover:border-cyan-500/50 p-4 transition-all"
                  >
                    <div className="h-11 w-11 rounded-xl bg-cyan-500/15 flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">LinkedIn Profile</p>
                      <p className="text-sm font-semibold truncate">
                        linkedin.com/in/pranjal-raj-71b9b624a
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/prnjl-rj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-subcard flex items-center gap-3.5 rounded-2xl hover:border-violet-500/50 p-4 transition-all"
                  >
                    <div className="h-11 w-11 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">GitHub Repositories</p>
                      <p className="text-sm font-semibold">github.com/prnjl-rj</p>
                    </div>
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right: Interactive Direct Message Form delivering to prnjlrj.work@gmail.com */}
          <div className="lg:col-span-7 flex">
            <TiltCard intensity={5} className="p-6 sm:p-8 w-full">
              <h3 className="font-display text-2xl font-bold mb-1">Send a Direct Message</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                Enter your email below — your message will be sent directly to{' '}
                <span className="text-fuchsia-600 dark:text-fuchsia-300 font-semibold">{RECIPIENT_EMAIL}</span> with your
                address as the reply recipient.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/85">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Alex Rivera"
                      value={formData.sender_name}
                      onChange={(e) =>
                        setFormData({ ...formData, sender_name: e.target.value })
                      }
                      className="glass-subcard w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-fuchsia-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/85">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.sender_email}
                      onChange={(e) =>
                        setFormData({ ...formData, sender_email: e.target.value })
                      }
                      className="glass-subcard w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-fuchsia-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/85">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Software Engineering Opportunity / Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="glass-subcard w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-fuchsia-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/85">Message *</label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    placeholder="Hi Pranjal, I'd love to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="glass-subcard w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                  />
                </div>

                {result && (
                  <div
                    className={`glass-subcard rounded-xl px-4 py-3 text-xs font-medium space-y-2 ${
                      result.type === 'success'
                        ? 'border-emerald-500/50 text-emerald-800 dark:text-emerald-200'
                        : 'border-rose-500/50 text-rose-800 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{result.text}</span>
                    </div>
                    {result.gmailUrl && (
                      <div className="flex flex-wrap items-center gap-3 pt-1 pl-6">
                        <a
                          href={result.gmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 underline font-semibold text-emerald-700 dark:text-emerald-300 hover:text-fuchsia-500"
                        >
                          <span>Send via Gmail Web</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={result.mailtoUrl}
                          className="inline-flex items-center gap-1 underline font-semibold text-emerald-700 dark:text-emerald-300 hover:text-fuchsia-500"
                        >
                          <span>Open Default Mail App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button type="submit" size="lg" disabled={submitting} className="flex-1">
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting ? 'Sending to prnjlrj.work@gmail.com...' : 'Send Message'}
                    </span>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a
                      href="https://wa.me/917830550771?text=Hello%20Pranjal!"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Say Hello on WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </form>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto max-w-7xl mt-20 pt-8 border-t border-white/10 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Architected &amp; Engineered by{' '}
            <span className="text-foreground font-semibold">Pranjal Raj</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/prnjl-rj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pranjal-raj-71b9b624a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="https://heroic-stardust-148f66.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> Live Site
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
