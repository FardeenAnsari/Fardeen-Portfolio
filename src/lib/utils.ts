import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function generateWhatsAppUrl(phone: string, message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function generateMailtoUrl(
  email: string,
  subject: string,
  body: string
) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function analyzeMessage(message: string): {
  category: string;
  urgency: string;
} {
  const lower = message.toLowerCase();

  // Category detection
  let category = "General Inquiry";

  if (lower.includes("job") || lower.includes("hire") || lower.includes("position") || lower.includes("role") || lower.includes("opportunity")) {
    category = "Job Opportunity";
  } else if (lower.includes("freelance") || lower.includes("project") || lower.includes("build") || lower.includes("develop") || lower.includes("contract")) {
    category = "Freelance / Project";
  } else if (lower.includes("collaborate") || lower.includes("partner") || lower.includes("team") || lower.includes("together")) {
    category = "Collaboration";
  } else if (lower.includes("mentor") || lower.includes("advice") || lower.includes("guidance") || lower.includes("learn")) {
    category = "Mentorship";
  } else if (lower.includes("speak") || lower.includes("event") || lower.includes("talk") || lower.includes("presentation")) {
    category = "Speaking";
  } else if (lower.includes("business") || lower.includes("company") || lower.includes("enterprise") || lower.includes("startup")) {
    category = "Business";
  }

  // Urgency detection
  let urgency = "Medium";
  if (lower.includes("urgent") || lower.includes("asap") || lower.includes("immediately") || lower.includes("today") || lower.includes("deadline")) {
    urgency = "High";
  } else if (lower.includes("whenever") || lower.includes("no rush") || lower.includes("someday") || lower.includes("eventually")) {
    urgency = "Low";
  }

  return { category, urgency };
}

export function generateSubject(message: string, category: string): string {
  const truncated = message.length > 60 ? message.substring(0, 57) + "..." : message;

  const prefixes: Record<string, string> = {
    "Job Opportunity": "Career Opportunity: ",
    "Freelance / Project": "Project Inquiry: ",
    "Collaboration": "Collaboration Proposal: ",
    "Mentorship": "Mentorship Request: ",
    "Speaking": "Speaking Invitation: ",
    "Business": "Business Inquiry: ",
    "General Inquiry": "Hello from ",
  };

  const prefix = prefixes[category] || "Inquiry: ";

  if (category === "General Inquiry") {
    return `${prefix}${truncated}`;
  }

  return `${prefix}${truncated}`;
}
