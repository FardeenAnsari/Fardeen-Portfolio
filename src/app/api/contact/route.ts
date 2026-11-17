import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;
let store: { ip: string; count: number; first: number }[] = [];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Clean up entries older than the rate limit window to avoid unbounded memory growth
  store = store.filter((e) => now - e.first <= RATE_LIMIT_WINDOW_MS);

  const entry = store.find((e) => e.ip === ip);
  if (!entry) {
    store.push({ ip, count: 1, first: now });
    return false;
  }
  if (now - entry.first > RATE_LIMIT_WINDOW_MS) {
    entry.count = 1;
    entry.first = now;
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Max allowed request size: 16 KB (prevents memory exhaustion attacks)
const MAX_PAYLOAD_BYTES = 16 * 1024;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeString(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

function validate(body: unknown): { name: string; email: string; subject?: string; message: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request payload." };
  const b = body as Record<string, unknown>;
  
  // 1. Anti-bot honeypot check (hidden field that only bots fill in)
  const honeypot = b.website;
  if (honeypot !== undefined && honeypot !== "") {
    return { error: "Automated submission detected." };
  }

  // 2. Anti-bot submission speed verification
  // Automated headless scripts populate DOM and submit in < 1.5 seconds
  if (typeof b.renderedAt === "number") {
    const elapsedMs = Date.now() - b.renderedAt;
    if (elapsedMs < 1200) {
      return { error: "Submission received too quickly. Please take your time." };
    }
    // Stale form session (> 3 hours)
    if (elapsedMs > 3 * 60 * 60 * 1000) {
      return { error: "Form session expired. Please refresh the page." };
    }
  }

  // 3. Email header injection defense (strip newlines \r, \n) and sanitize script fragments
  const rawName = typeof b.name === "string" ? sanitizeString(b.name.trim()) : "";
  const rawEmail = typeof b.email === "string" ? b.email.trim() : "";
  const rawSubject = typeof b.subject === "string" ? sanitizeString(b.subject.trim()) : "Portfolio Contact Inquiry";
  const rawMessage = typeof b.message === "string" ? sanitizeString(b.message.trim()) : "";

  const name = rawName.replace(/[\r\n]/g, " ").slice(0, 100);
  const email = rawEmail.replace(/[\r\n]/g, "").slice(0, 120);
  const subject = rawSubject.replace(/[\r\n]/g, " ").slice(0, 150);
  const message = rawMessage.slice(0, 5000);

  // 4. Validation bounds
  if (!name || name.length < 2) return { error: "Name must be at least 2 characters." };
  if (!email || !emailRegex.test(email)) return { error: "A valid email address is required." };
  if (!message || message.length < 10) return { error: "Message must be at least 10 characters." };

  return { name, email, subject, message };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  // Defense 1: Reject payload if content-length exceeds 16KB
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { error: "Payload too large. Maximum 16KB allowed." },
      { status: 413, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Defense 2: IP-based rate limiting (5 req / min)
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit reached. Please wait a minute before retrying." },
      { status: 429, headers: { "Cache-Control": "no-store" } }
    );
  }

  const parsed = validate(await request.json().catch(() => ({})));
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const { name, email, subject, message } = parsed;
  const targetEmail = process.env.CONTACT_TO_EMAIL || "imailfard@gmail.com";

  // Pre-generate fallback mailto link
  const fallbackMailto = `mailto:${targetEmail}?subject=${encodeURIComponent(
    subject || `Portfolio Contact from ${name}`
  )}&body=${encodeURIComponent(`Hi Fardeen,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Path 1: SMTP delivery via Nodemailer if credentials configured
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass },
      });

      const html = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2>New Message from Portfolio Website</h2>
          <p><strong>Sender:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject || "Portfolio Inquiry")}</p>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
          <h3>Message</h3>
          <p style="white-space: pre-wrap; background: #f4f4f5; padding: 16px; border-radius: 8px;">${escapeHtml(
            message
          )}</p>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="color: #71717a; font-size: 12px;">Sent from Fardeen Ansari's Portfolio. Client IP: ${escapeHtml(
            ip
          )}</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
        to: targetEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject || name}`,
        text: `From: ${name}\nEmail: ${email}\nSubject: ${subject || "None"}\n\nMessage:\n${message}`,
        html,
      });

      return NextResponse.json({
        success: true,
        message: "Your message has been delivered directly to Fardeen's inbox.",
      });
    } catch (smtpErr) {
      console.warn("SMTP send failed, falling back to webhook / direct delivery:", smtpErr);
    }
  }

  // Path 2: Universal serverless forwarder (formsubmit.co)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const forwardRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: `[Portfolio Inquiry] ${subject || name}`,
        message,
        _replyto: email,
        _template: "table",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (forwardRes.ok) {
      return NextResponse.json({
        success: true,
        message: "Your message has been dispatched successfully.",
      });
    }
  } catch (forwardErr) {
    console.warn("Form forwarder unavailable or timed out:", forwardErr);
  }

  // Path 3: Graceful fallback — log message and provide client fallback mailto
  console.log("Recorded Contact Submission:", {
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    message,
    ip,
  });

  return NextResponse.json({
    success: true,
    message: "Your message has been recorded. You can also open your mail client directly.",
    fallbackMailto,
  });
}
