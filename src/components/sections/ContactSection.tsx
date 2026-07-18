"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { CONTACT, PERSONAL } from "@/lib/data";
import { analyzeMessage, generateSubject, generateWhatsAppUrl, generateMailtoUrl, cn } from "@/lib/utils";

type MessageAnalysis = {
  category: string;
  urgency: string;
  emoji: string;
};

const URGENCY_COLORS: Record<string, string> = {
  High: "text-red-400 bg-red-500/10 border-red-500/20",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Low: "text-green-400 bg-green-500/10 border-green-500/20",
};

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [analysis, setAnalysis] = useState<MessageAnalysis | null>(null);
  const [step, setStep] = useState<"compose" | "choose" | "done">("compose");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Real-time analysis with debounce
  useEffect(() => {
    if (message.length < 20) {
      setAnalysis(null);
      return;
    }
    const timer = setTimeout(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setAnalysis(analyzeMessage(message));
        setIsAnalyzing(false);
      }, 600);
    }, 500);
    return () => clearTimeout(timer);
  }, [message]);

  const handleAnalyze = () => {
    if (!message.trim() || message.length < 10) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeMessage(message));
      setIsAnalyzing(false);
      setStep("choose");
    }, 800);
  };

  const handleEmail = () => {
    const subject = analysis
      ? generateSubject(message, analysis.category)
      : `Hello from ${name || "your portfolio visitor"}`;

    const body = `Hi Fardeen,\n\n${message}\n\n${name ? `Best regards,\n${name}` : ""}`;

    window.location.href = generateMailtoUrl(CONTACT.email, subject, body);
    setStep("done");
  };

  const handleWhatsApp = () => {
    const greeting = name ? `Hi Fardeen, I'm ${name}.\n\n` : "Hi Fardeen,\n\n";
    const fullMessage = `${greeting}${message}`;
    window.open(generateWhatsAppUrl(CONTACT.whatsapp, fullMessage), "_blank");
    setStep("done");
  };

  const reset = () => {
    setMessage("");
    setName("");
    setAnalysis(null);
    setStep("compose");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative"
      aria-label="Contact section"
    >
      <div className="container-portfolio">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="section-label mx-auto">Let&apos;s Connect</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              Have something in{" "}
              <span className="font-serif italic text-gradient">mind?</span>
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              Whether it&apos;s a job opportunity, collaboration, or just a hello — I&apos;d love to hear from you.
              Type your message and I&apos;ll help you send it the best way.
            </p>
          </div>

          {/* Contact interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {step === "compose" && (
                <motion.div
                  key="compose"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="glass-card p-8 space-y-6 border border-border-subtle">
                    {/* Name input */}
                    <div>
                      <label className="text-sm text-secondary mb-2 block font-medium">
                        Your name (optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full glass rounded-xl px-4 py-3 border border-border-subtle focus:border-accent-blue/50 text-primary placeholder-muted outline-none transition-colors bg-transparent font-sans"
                      />
                    </div>

                    {/* Message textarea */}
                    <div>
                      <label className="text-sm text-secondary mb-2 block font-medium">
                        Your message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hi Fardeen! I came across your portfolio and would love to discuss..."
                        rows={6}
                        className="w-full glass rounded-xl px-4 py-3 border border-border-subtle focus:border-accent-blue/50 text-primary placeholder-muted outline-none transition-colors bg-transparent font-sans resize-none leading-relaxed"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted">
                          {message.length < 20 ? "Keep typing to analyze your message..." : ""}
                        </span>
                        <span className="text-xs text-muted font-mono">{message.length} chars</span>
                      </div>
                    </div>

                    {/* AI Analysis panel */}
                    <AnimatePresence>
                      {(analysis || isAnalyzing) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="glass rounded-xl p-4 border border-accent-blue/20 bg-accent-blue/5">
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles size={14} className="text-accent-blue" />
                              <span className="text-xs font-semibold text-accent-blue">AI Message Analysis</span>
                              {isAnalyzing && <Loader2 size={12} className="animate-spin text-accent-blue" />}
                            </div>

                            {analysis && !isAnalyzing && (
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <span className="text-xs text-muted block mb-1">Category Detected</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{analysis.emoji}</span>
                                    <span className="text-sm font-semibold text-primary">{analysis.category}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs text-muted block mb-1">Urgency</span>
                                  <span className={cn("text-xs font-semibold px-2 py-1 rounded-full border", URGENCY_COLORS[analysis.urgency])}>
                                    {analysis.urgency}
                                  </span>
                                </div>
                              </div>
                            )}

                            {isAnalyzing && (
                              <div className="flex items-center gap-2 text-secondary text-sm">
                                <span>Analyzing message intent...</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Send button */}
                    <motion.button
                      onClick={handleAnalyze}
                      disabled={message.trim().length < 10}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === "choose" && analysis && (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Message preview */}
                  <div className="glass-card p-6 border border-border-subtle space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">Message Preview</span>
                      <button onClick={() => setStep("compose")} className="text-xs text-accent-blue hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="glass rounded-xl p-4 border border-border-subtle">
                      <p className="text-secondary text-sm leading-relaxed line-clamp-3">{message}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="tech-badge">
                        {analysis.emoji} {analysis.category}
                      </span>
                      <span className={cn("tech-badge border", URGENCY_COLORS[analysis.urgency])}>
                        {analysis.urgency} Priority
                      </span>
                      {name && <span className="tech-badge">From: {name}</span>}
                    </div>
                  </div>

                  {/* Subject preview */}
                  <div className="glass rounded-xl p-4 border border-accent-blue/20 bg-accent-blue/5">
                    <span className="text-xs text-muted block mb-1">Suggested email subject:</span>
                    <span className="text-sm text-primary font-medium">
                      &ldquo;{generateSubject(message, analysis.category)}&rdquo;
                    </span>
                  </div>

                  <p className="text-center text-secondary text-sm">How would you like to send this?</p>

                  {/* Channel options */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <motion.button
                      onClick={handleEmail}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-card p-6 border border-border-subtle hover:border-accent-blue/40 text-left space-y-3 group"
                      data-cursor-label="Email"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Mail className="text-white" size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-gradient transition-all">Send via Email</h3>
                        <p className="text-secondary text-sm">Opens your email client with subject and body pre-filled.</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-accent-blue">
                        <span>{CONTACT.email}</span>
                        <ArrowRight size={12} />
                      </div>
                    </motion.button>

                    {/* WhatsApp */}
                    <motion.button
                      onClick={handleWhatsApp}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-card p-6 border border-border-subtle hover:border-green-500/40 text-left space-y-3 group"
                      data-cursor-label="WhatsApp"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <MessageCircle className="text-white" size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-gradient transition-all">Send via WhatsApp</h3>
                        <p className="text-secondary text-sm">Opens WhatsApp with your message pre-formatted and ready to send.</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-green-400">
                        <span>+91 91238 81320</span>
                        <ArrowRight size={12} />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-12 text-center border border-border-subtle space-y-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl"
                  >
                    🎉
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                    <p className="text-secondary">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                  </div>
                  <button onClick={reset} className="btn-ghost">
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Direct links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { label: "LinkedIn", href: CONTACT.linkedin, icon: "in" },
              { label: "GitHub", href: PERSONAL.github, icon: "gh" },
              { label: "Email", href: `mailto:${CONTACT.email}`, icon: "@" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl px-5 py-3 border border-border-subtle hover:border-border-default flex items-center gap-2 text-secondary hover:text-primary transition-all"
                data-cursor-label={link.label}
              >
                <span className="font-mono text-accent-blue text-sm font-bold">[{link.icon}]</span>
                <span className="text-sm">{link.label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
