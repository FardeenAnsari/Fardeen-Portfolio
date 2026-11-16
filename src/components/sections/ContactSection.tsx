"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PERSONAL } from "@/lib/data";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message. Please reach out via email directly.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message. Please reach out directly at imailfard@gmail.com"
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
            Open to full-time Software Engineer, Frontend Engineer, and Full-Stack roles.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Facts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[var(--color-ink)] font-display">
                Start a Conversation
              </h3>
              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Whether discussing an engineering role, technical consultation, or architectural challenge, 
                I respond promptly. Feel free to connect via direct email or form submission.
              </p>
            </div>

            <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)] font-mono text-sm">
              
              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Email</span>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4"
                >
                  {PERSONAL.email}
                </a>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Phone</span>
                <a
                  href={`tel:${PERSONAL.phone.replace(/\s+/g, "")}`}
                  className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {PERSONAL.phone}
                </a>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Location</span>
                <span className="text-[var(--color-ink)]">Bengaluru, Karnataka, IN</span>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-ink-3)] uppercase">Profiles</span>
                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href={PERSONAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                </div>
              </div>

            </div>

            <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 text-xs text-[var(--color-ink-3)] font-mono space-y-1">
              <div className="text-[var(--color-ink-2)] font-semibold">RESPONSE SLA:</div>
              <p>Typically replies within 24 hours for verified recruitment inquiries.</p>
            </div>
          </div>

          {/* Right Column: High-Integrity Minimalist Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 sm:p-8 md:p-10">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                    Full Name <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-base sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-3)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                      Email Address <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-base sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-3)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 90000 00000"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-base sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-3)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-[var(--color-ink-2)]">
                    Message Details <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe the role, project, or collaboration opportunity..."
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-base sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-3)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Status Banners */}
                {status === "success" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message delivered successfully.</p>
                      <p className="text-xs text-emerald-400/80">Thank you for reaching out. I will get back to you shortly.</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to dispatch message via server.</p>
                      <p className="text-xs text-amber-300/80">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
