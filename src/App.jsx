import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Download,
  Eye,
  Github,
  GraduationCap,
  Image,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import photo from "../assets/images/fardeen-passport.png";
import cv from "../assets/cv/Fardeen-Ansari-CV.pdf";
import detailedCv from "../assets/cv/Fardeen-Ansari-Detailed-CV.pdf";
import sihCertificate from "../assets/certificates/sih-2023-grand-finale.jpeg";
import geoCertificate from "../assets/certificates/ngp-dst-geo-innovation.jpeg";
import rtetCertificate from "../assets/certificates/rtet-2024.png";
import juCertificate from "../assets/certificates/jadavpur-esiot-certificate.jpeg";
import icdmaiCertificate from "../assets/certificates/icdmai-2025.pdf";

const profile = {
  name: "Fardeen Ansari",
  role: "Full-stack Developer",
  location: "Kolkata, West Bengal, India",
  phone: "+91 91238 81320",
  whatsapp: "919123881320",
  email: "imailfard@gmail.com",
  linkedin: "https://linkedin.com/in/itsfardeen",
  github: "https://github.com/FardeenAnsari",
  summary:
    "Final-year B.Tech CSE student building scalable web applications with React, Node.js, Express.js, PostgreSQL, and Supabase."
};

const assets = {
  photo,
  cv,
  detailedCv,
  certificates: {
    sih: sihCertificate,
    geo: geoCertificate,
    rtet: rtetCertificate,
    ju: juCertificate,
    icdmai: icdmaiCertificate
  }
};

const stats = ["CGPA 7.35", "Immediate availability", "No active backlogs"];

const skills = [
  {
    index: "01",
    title: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "C", "Python"]
  },
  {
    index: "02",
    title: "Frontend",
    items: ["HTML", "CSS", "React.js", "Responsive UI"]
  },
  {
    index: "03",
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Validation"]
  },
  {
    index: "04",
    title: "Data & Tools",
    items: ["PostgreSQL", "Supabase", "SQL", "Git", "VS Code"]
  },
  {
    index: "05",
    title: "Core CS",
    items: ["OOPs", "Data Structures", "DBMS", "SDLC", "Problem Solving"]
  },
  {
    index: "06",
    title: "Languages Known",
    items: ["English", "Hindi", "Bengali"]
  }
];

const projects = [
  {
    title: "Payroll Management System",
    category: "full-stack",
    label: "Full-stack",
    stack: "React • Node • PostgreSQL",
    live: "https://fardeenansari.github.io/payroll-system/",
    repo: "https://github.com/FardeenAnsari/payroll-system",
    description:
      "Payroll and leave management platform with RESTful APIs, relational database schemas, role-oriented flows, and secure input validation."
  },
  {
    title: "Tiny-Link - URL Shortener",
    category: "full-stack",
    label: "Full-stack",
    stack: "TypeScript • Node • PostgreSQL",
    live: "https://tiny-link-snowy.vercel.app/",
    repo: "https://github.com/FardeenAnsari/tiny-link",
    description:
      "Database-backed URL shortener with efficient mapping logic, fast redirects, and optimized query patterns for scalable link handling."
  },
  {
    title: "Research Methodology Booklet",
    category: "research",
    label: "Academic tool",
    stack: "HTML • CSS • JavaScript",
    live: "https://fardeenansari.github.io/Research-Methodology/",
    repo: "https://github.com/FardeenAnsari/Research-Methodology",
    description:
      "Interactive academic booklet with collapsible navigation, PDF export, mobile-friendly reading, and clean study-focused presentation."
  },
  {
    title: "Skill-Route",
    category: "frontend",
    label: "Frontend",
    stack: "HTML • CSS • JavaScript",
    live: "https://fardeenansari.github.io/Skill-Route/",
    repo: "https://github.com/FardeenAnsari/Skill-Route",
    description:
      "Static web experience from the public project collection with a working GitHub Pages preview and accessible source repository."
  },
  {
    title: "College Application Form",
    category: "frontend",
    label: "Frontend",
    stack: "HTML",
    live: "https://fardeenansari.github.io/College-Application-Form/",
    repo: "https://github.com/FardeenAnsari/College-Application-Form",
    description:
      "Browser-based application form project with a public repository and deployed GitHub Pages preview."
  }
];

const timeline = [
  {
    year: "2024",
    title: "Summer Intern - Jadavpur University",
    copy:
      "Worked on system design and development as part of a team project, gaining practical experience in workflows, debugging, presentations, and demonstrations. Awarded Grade A."
  },
  {
    year: "2023",
    title: "Smart India Hackathon - National Finalist",
    copy:
      "Developed a full-stack platform to route civic issues to government authorities, showing end-to-end design and collaborative delivery."
  },
  {
    year: "2024",
    title: "NGP-DST Geo Innovation Challenge",
    copy:
      "Presented a flood risk management and early warning system at a national-level geospatial innovation challenge."
  },
  {
    year: "2024",
    title: "International Seminar Presenter - RTET 2024",
    copy:
      "Presented a research framework on NLP model evaluation, including work around labelled datasets and BERT model evaluation."
  },
  {
    year: "2025",
    title: "ICDMAI 2025 Attendee",
    copy:
      "Participated in sessions on large language models, diffusion models, trustworthy AI, and current data science research themes."
  }
];

const certificates = [
  {
    year: "2023",
    title: "Smart India Hackathon Grand Finale",
    type: "image",
    src: assets.certificates.sih
  },
  {
    year: "2024",
    title: "NGP-DST Geo Innovation Challenge",
    type: "image",
    src: assets.certificates.geo
  },
  {
    year: "2024",
    title: "International Seminar Presenter - RTET 2024",
    type: "image",
    src: assets.certificates.rtet
  },
  {
    year: "2024",
    title: "Jadavpur University ESIoT Internship",
    type: "image",
    src: assets.certificates.ju
  },
  {
    year: "2025",
    title: "ICDMAI 2025",
    type: "pdf",
    src: assets.certificates.icdmai
  }
];

const contactDefaults = {
  name: "",
  email: "",
  subject: "Portfolio enquiry",
  message: ""
};

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [contact, setContact] = useState(contactDefaults);
  const [sendMode, setSendMode] = useState("whatsapp");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const header = document.querySelector("[data-elevate]");
    const elevateHeader = () => header?.classList.toggle("is-elevated", window.scrollY > 8);
    elevateHeader();
    window.addEventListener("scroll", elevateHeader, { passive: true });
    return () => window.removeEventListener("scroll", elevateHeader);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-lock", Boolean(modal));
  }, [modal]);

  const filteredProjects = useMemo(() => {
    return filter === "all" ? projects : projects.filter((project) => project.category === filter);
  }, [filter]);

  const contactBody = useMemo(() => {
    const visitor = contact.name.trim() || "Portfolio visitor";
    return [
      `Hi Fardeen, I saw your portfolio and want to connect.`,
      "",
      `Name: ${visitor}`,
      `Email: ${contact.email.trim() || "Not provided"}`,
      `Subject: ${contact.subject.trim() || "Portfolio enquiry"}`,
      "",
      contact.message.trim()
    ].join("\n");
  }, [contact]);

  const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(contactBody)}`;
  const mailUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    contact.subject.trim() || "Portfolio enquiry"
  )}&body=${encodeURIComponent(contactBody)}`;

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContact((current) => ({ ...current, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!contact.name.trim() || !contact.message.trim()) return;

    const target = sendMode === "whatsapp" ? whatsappUrl : mailUrl;
    if (sendMode === "whatsapp") {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = target;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header" data-elevate>
        <a className="brand" href="#home" aria-label="Fardeen Ansari home">
          <span className="brand-mark">FA</span>
          <span>Fardeen Ansari</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {["About", "Skills", "Projects", "Certificates", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <button
          className="icon-button theme-toggle"
          type="button"
          aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </button>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img src={assets.photo} alt="" />
          </div>
          <div className="hero-overlay" />
          <div className="hero-content reveal">
            <p className="eyebrow">Full-stack developer • CSE 2026 • Kolkata</p>
            <h1 id="hero-title">{profile.name}</h1>
            <p className="hero-copy">{profile.summary}</p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button primary" href={assets.cv} download>
                <Download aria-hidden="true" />
                Download CV
              </a>
              <button
                className="button"
                type="button"
                onClick={() => setModal({ type: "image", title: profile.name, src: assets.photo })}
              >
                <Image aria-hidden="true" />
                View Photo
              </button>
              <a className="button ghost" href={assets.detailedCv} download>
                <BadgeCheck aria-hidden="true" />
                Detailed CV
              </a>
            </div>
          </div>
          <div className="hero-status reveal" aria-label="Profile highlights">
            {stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </section>

        <section className="section intro-band" id="about" aria-labelledby="about-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Profile</p>
            <h2 id="about-title">Software builder with a practical, product-minded core.</h2>
          </div>
          <div className="about-grid">
            <article className="panel reveal">
              <h3>Professional Summary</h3>
              <p>
                Strong foundations in Java, JavaScript, C, object-oriented programming, data
                structures, DBMS, and SDLC. Experienced in building full-stack applications, REST
                APIs, relational schemas, input validation, and secure data handling.
              </p>
            </article>
            <article className="panel reveal">
              <h3>Focus Areas</h3>
              <ul className="clean-list">
                <li>Full-stack web development with React, Node.js, Express.js, and PostgreSQL.</li>
                <li>Database-backed workflows with Supabase, SQL, and REST API design.</li>
                <li>Real-world problem solving through hackathons, seminars, and internships.</li>
              </ul>
            </article>
            <article className="panel reveal">
              <h3>Education</h3>
              <dl className="detail-list">
                <div>
                  <dt>B.Tech - Computer Science & Engineering</dt>
                  <dd>Supreme Knowledge Foundation Group of Institutions, MAKAUT • 2022-2026</dd>
                </div>
                <div>
                  <dt>Class XII - WBCHSE</dt>
                  <dd>77.2% • 2022</dd>
                </div>
                <div>
                  <dt>Class X - WBBSE</dt>
                  <dd>69.0% • 2020</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Technical Skills</p>
            <h2 id="skills-title">A balanced stack for frontend, backend, and data-backed systems.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card reveal" key={skill.title}>
                <span className="skill-index">{skill.index}</span>
                <h3>{skill.title}</h3>
                <div className="tag-row">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected Work</p>
            <h2 id="projects-title">Live previews, source links, and project context in one place.</h2>
          </div>

          <div className="project-filters reveal" role="tablist" aria-label="Project filters">
            {["all", "full-stack", "frontend", "research"].map((item) => (
              <button
                className={`filter-button ${filter === item ? "active" : ""}`}
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                role="tab"
                aria-selected={filter === item}
              >
                {item === "all" ? "All" : item.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <div className="preview-shell">
                  <div className="browser-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <iframe
                    title={`${project.title} live preview`}
                    src={project.live}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span>{project.label}</span>
                    <span>{project.stack}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <button
                      className="mini-button"
                      type="button"
                      onClick={() =>
                        setModal({ type: "preview", title: project.title, src: project.live })
                      }
                    >
                      <Eye aria-hidden="true" />
                      Preview
                    </button>
                    <a className="mini-button" href={project.repo} target="_blank" rel="noreferrer">
                      <Github aria-hidden="true" />
                      Repo
                    </a>
                    <a className="mini-button" href={project.live} target="_blank" rel="noreferrer">
                      <ArrowUpRight aria-hidden="true" />
                      Live
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section timeline-section" aria-labelledby="timeline-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience & Recognition</p>
            <h2 id="timeline-title">Internship, hackathons, seminars, and applied problem solving.</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item reveal" key={`${item.year}-${item.title}`}>
                <span className="timeline-year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="certificates" aria-labelledby="certificates-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Certificates</p>
            <h2 id="certificates-title">Proof points from internships, hackathons, and seminars.</h2>
          </div>
          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card reveal" key={certificate.title}>
                {certificate.type === "image" ? (
                  <img src={certificate.src} alt={`${certificate.title} certificate preview`} />
                ) : (
                  <div className="pdf-thumb" aria-hidden="true">
                    <BadgeCheck />
                  </div>
                )}
                <div>
                  <p>{certificate.year}</p>
                  <h3>{certificate.title}</h3>
                  <button
                    className="mini-button"
                    type="button"
                    onClick={() => setModal(certificate)}
                  >
                    <Eye aria-hidden="true" />
                    View
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Let’s turn a good opportunity into a real conversation.</h2>
          </div>
          <div className="contact-layout">
            <div className="contact-grid compact">
              <a className="contact-link reveal" href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                <span>Email</span>
                <strong>{profile.email}</strong>
              </a>
              <a className="contact-link reveal" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <Phone aria-hidden="true" />
                <span>Phone</span>
                <strong>{profile.phone}</strong>
              </a>
              <a className="contact-link reveal" href={profile.linkedin} target="_blank" rel="noreferrer">
                <Sparkles aria-hidden="true" />
                <span>LinkedIn</span>
                <strong>linkedin.com/in/itsfardeen</strong>
              </a>
              <a className="contact-link reveal" href={profile.github} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" />
                <span>GitHub</span>
                <strong>github.com/FardeenAnsari</strong>
              </a>
            </div>

            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <div className="form-header">
                <MessageCircle aria-hidden="true" />
                <h3>Send a Message</h3>
              </div>
              <div className="form-grid">
                <label>
                  Name
                  <input
                    name="name"
                    value={contact.name}
                    onChange={handleContactChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                  {submitted && !contact.name.trim() ? <small>Name is required.</small> : null}
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={contact.email}
                    onChange={handleContactChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  name="subject"
                  value={contact.subject}
                  onChange={handleContactChange}
                  placeholder="Portfolio enquiry"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={handleContactChange}
                  placeholder="Write your message..."
                  rows="6"
                  required
                />
                {submitted && !contact.message.trim() ? <small>Message is required.</small> : null}
              </label>
              <div className="send-toggle" role="tablist" aria-label="Send message through">
                <button
                  type="button"
                  className={sendMode === "whatsapp" ? "active" : ""}
                  onClick={() => setSendMode("whatsapp")}
                >
                  <MessageCircle aria-hidden="true" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  className={sendMode === "email" ? "active" : ""}
                  onClick={() => setSendMode("email")}
                >
                  <Mail aria-hidden="true" />
                  Email
                </button>
              </div>
              <div className="form-actions">
                <button className="button primary" type="submit">
                  <Send aria-hidden="true" />
                  Send Message
                </button>
                <button
                  className="button ghost"
                  type="button"
                  onClick={() => {
                    setContact(contactDefaults);
                    setSubmitted(false);
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <span>{profile.location}</span>
        <span>2026 pass-out</span>
      </footer>

      {modal ? <Modal modal={modal} onClose={() => setModal(null)} /> : null}
    </>
  );
}

function Modal({ modal, onClose }) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return (
    <div className="modal is-open" aria-hidden="false" role="dialog" aria-modal="true">
      <button className="modal-backdrop" type="button" aria-label="Close preview" onClick={onClose} />
      <div className="modal-panel">
        <div className="modal-header">
          <h2 id="modal-title">{modal.title}</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close preview">
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="modal-content">
          {modal.type === "image" ? (
            <img src={modal.src} alt={modal.title} />
          ) : (
            <iframe
              src={modal.type === "pdf" ? `${modal.src}#toolbar=0` : modal.src}
              title={modal.title}
              loading="lazy"
              sandbox={modal.type === "preview" ? "allow-scripts allow-same-origin allow-forms allow-popups" : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
