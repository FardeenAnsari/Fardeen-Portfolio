"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Clock, Globe, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PERSONAL } from "@/lib/data";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFallbackMailto("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch message.");
      }

      setStatus("success");
      if (data.fallbackMailto) {
        setFallbackMailto(data.fallbackMailto);
      }
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      const errText = err instanceof Error ? err.message : "Failed to dispatch message.";
      setErrorMessage(errText);
      // Pre-compose instant direct mail link
      setFallbackMailto(
        `mailto:${PERSONAL.email}?subject=${encodeURIComponent(
          formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
        )}&body=${encodeURIComponent(
          `Hi Fardeen,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
        )}`
      );
    }
  };

  return (
    <section id="contact" className="section border-t border-[var(--color-rule)]" aria-label="Contact Information">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 lg:mb-16">
          <div className="space-y-3">
            <div className="section-label">Direct Communication</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
              Get in Touch
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-ink-2)] max-w-[42ch]">
            Open to full-time Software Engineer, Frontend Engineer, and Full-Stack roles across Bengaluru and remote teams.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Facts (Zero Phone Number Exposure) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[var(--color-ink)] font-display">
                Start a Conversation
              </h3>
              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Whether discussing an engineering role, technical consultation, or architectural challenge, 
                I respond promptly. You can reach out directly via email or submit the verified form.
              </p>
            </div>

            <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)] font-mono text-sm">
              
              {/* Primary Email */}
              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Email</span>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 font-semibold"
                >
                  {PERSONAL.email}
                </a>
              </div>

              {/* Direct Phone */}
              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Phone</span>
                <a
                  href={`tel:${PERSONAL.phone.replace(/\s+/g, "")}`}
                  className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors font-semibold"
                >
                  {PERSONAL.phone}
                </a>
              </div>

              {/* Base Location */}
              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Location</span>
                <span className="text-[var(--color-ink)]">
                  {PERSONAL.location}
                </span>
              </div>

              {/* Response Window */}
              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Response Window</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  &lt; 24 Hours
                </span>
              </div>

              {/* Status */}
              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Availability</span>
                <span className="text-[var(--color-ink)] font-semibold">
                  Open for Full-Time Roles
                </span>
              </div>

            </div>

            {/* Social & Professional Links */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-wider">
                Professional Channels
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 text-xs font-mono touch-manipulation"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={16} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>

                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 text-xs font-mono touch-manipulation"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedinIn size={16} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>

                <a
                  href={`mailto:${PERSONAL.email}?subject=Hello%20Fardeen`}
                  className="p-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 text-xs font-mono touch-manipulation"
                  aria-label="Direct Mail"
                >
                  <Mail size={16} />
                  <span>Direct Mail</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: High-Reliability Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 lg:p-10 shadow-xl">
              
              {status === "success" ? (
                <div className="py-8 space-y-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={28} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[var(--color-ink)] font-display">
                      Message Dispatched
                    </h3>
                    <p className="text-sm text-[var(--color-ink-2)] max-w-[44ch] mx-auto leading-relaxed">
                      Thank you for reaching out. Your note has been transmitted and logged. I will reply directly to your email address promptly.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="btn-ghost py-2.5 px-5 text-xs font-mono"
                    >
                      Send Another Message
                    </button>
                    {fallbackMailto && (
                      <a
                        href={fallbackMailto}
                        className="btn-primary py-2.5 px-5 text-xs font-mono flex items-center gap-2"
                      >
                        <Mail size={14} />
                        <span>Open in Email App</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Honeypot field for anti-bot protection */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                      Your Name <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe / Engineering Recruiter"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] text-base sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                      Your Email Address <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] text-base sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                      Subject / Purpose
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Time Software Engineer Opportunity"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] text-base sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                      Message <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about the role, technical problem, or project collaboration..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] text-base sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                      {fallbackMailto && (
                        <a
                          href={fallbackMailto}
                          className="underline underline-offset-4 text-white hover:text-red-300 font-semibold"
                        >
                          Send via Email App &rarr;
                        </a>
                      )}
                    </div>
                  )}

                  {/* Submit Button & Direct Fallback */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary w-full sm:w-auto py-3 px-8 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-50 touch-manipulation"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL.email}?subject=Hello%20Fardeen`}
                      className="text-xs font-mono text-[var(--color-ink-3)] hover:text-[var(--color-accent)] transition-colors text-center sm:text-right"
                    >
                      Or open mail client directly &rarr;
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
