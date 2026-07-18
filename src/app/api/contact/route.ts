import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;
const store: { ip: string; count: number; first: number }[] = [];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-+()]*$/;

function validate(body: unknown): { name: string; email: string; phone: string; message: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid body" };
  const b = body as Record<string, unknown>;
  const honeypot = b.website;
  if (honeypot !== undefined && honeypot !== "") return { error: "Invalid submission" };

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || name.length < 2) return { error: "Name must be at least 2 characters" };
  if (!email) return { error: "Email is required" };
  if (!emailRegex.test(email)) return { error: "Invalid email address" };
  if (phone && !phoneRegex.test(phone)) return { error: "Invalid phone number" };
  if (!message || message.length < 10) return { error: "Message must be at least 10 characters" };

  return { name, email, phone, message };
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const parsed = validate(await request.json().catch(() => ({})));
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { name, email, phone, message } = parsed;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || "imailfard@gmail.com";

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS not set");
    return NextResponse.json(
      { error: "Contact form is not configured. Please try email directly." },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: smtpUser, pass: smtpPass },
    });

    const html = `
      <h2>New contact form message</h2>
      <p><strong>From:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <h3>Message</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
      <hr>
      <p style="color: #71717a; font-size: 12px;">Sent via portfolio contact form. IP: ${escapeHtml(ip)}</p>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio: Message from ${name}`,
      text: `From: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\n\nMessage:\n${message}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try email directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
