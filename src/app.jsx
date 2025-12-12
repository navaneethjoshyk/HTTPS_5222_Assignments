// src/App.jsx
import React, { useMemo, useState } from "react";
import { Github, Linkedin, ExternalLink, Mail, Sun, Moon } from "lucide-react";
import { useProjects } from "./hooks/useProjects";
import { useSkills } from "./hooks/useSkills";

const PROFILE = {
  name: "Navaneeth Joshy",
  role: "UI/UX Designer & Front-End Dev",
  socials: {
    github: "https://github.com/navaneethjoshyk",
    linkedin: "https://www.linkedin.com/in/navaneethjoshyk/",
    behance: "https://www.behance.net/navaneethjoshyk",
  },
  email: "navaneethjoshyk@gmail.com",
};

const THEMES = {
  dark: {
    label: "Dark",
    pageBg:
      "bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(900px_circle_at_90%_20%,rgba(236,72,153,0.28),transparent_40%),radial-gradient(900px_circle_at_40%_90%,rgba(34,197,94,0.18),transparent_45%)] bg-slate-950",
    headerBg: "bg-slate-950/70",
    card: "bg-white/6",
    border: "border-white/12",
    text: "text-slate-100",
    subtext: "text-slate-300",
    pill: "bg-white/7 border-white/12 text-slate-100",
    btn: "bg-white text-slate-900",
    btnGhost: "bg-white/8 hover:bg-white/12 text-slate-100",
    accent: "text-cyan-200",
  },
  bright: {
    label: "Bright",
    pageBg:
      "bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(255,221,87,0.65),transparent_35%),radial-gradient(900px_circle_at_90%_20%,rgba(255,99,132,0.45),transparent_45%),radial-gradient(900px_circle_at_50%_95%,rgba(54,162,235,0.45),transparent_50%)] bg-slate-50",
    headerBg: "bg-white/70",
    card: "bg-white/75",
    border: "border-slate-200",
    text: "text-slate-900",
    subtext: "text-slate-700",
    pill: "bg-slate-900/5 border-slate-200 text-slate-900",
    btn: "bg-slate-900 text-white",
    btnGhost: "bg-slate-900/5 hover:bg-slate-900/10 text-slate-900",
    accent: "text-blue-700",
  },
};

function Pill({ t, children }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${t.pill}`}>
      {children}
    </span>
  );
}

function SectionTitle({ t, title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${t.text}`}>{title}</h2>
      {subtitle ? <p className={`mt-2 max-w-2xl ${t.subtext}`}>{subtitle}</p> : null}
    </div>
  );
}

function PlaceholderImg({ title, t }) {
  const label = encodeURIComponent(title || "Project");
  const src = `https://placehold.co/900x600?text=${label}`;
  return (
    <div className={`rounded-2xl border overflow-hidden ${t.border}`}>
      <img
        src={src}
        alt={title || "Project screenshot"}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function App() {
  const [themeKey, setThemeKey] = useState("dark");
  const t = useMemo(() => THEMES[themeKey], [themeKey]);

  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { skills, loading: skillsLoading, error: skillsError } = useSkills();

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className={`min-h-screen ${t.pageBg} ${t.text}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur ${t.headerBg} ${t.border}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className={`font-semibold tracking-tight ${t.text}`}>
            {PROFILE.name}
          </a>

          <nav className={`hidden md:flex items-center gap-6 text-sm ${t.subtext}`}>
            <a href="#projects" className="hover:opacity-80 transition">Projects</a>
            <a href="#skills" className="hover:opacity-80 transition">Skills</a>
            <a href="#contact" className="hover:opacity-80 transition">Contact</a>
          </nav>

          <button
            onClick={() => setThemeKey((k) => (k === "dark" ? "bright" : "dark"))}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${t.border} ${t.btnGhost}`}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {themeKey === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {THEMES[themeKey].label}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className={`rounded-3xl border p-8 md:p-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)] ${t.card} ${t.border}`}>
          <p className={t.subtext}>Hi, I’m</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            <span className={t.text}>{PROFILE.name}</span>
          </h1>
          <p className={`mt-4 text-lg md:text-xl max-w-2xl ${t.subtext}`}>
            {PROFILE.role}. I design clean, accessible interfaces and build responsive front-ends.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 transition ${t.border} ${t.btnGhost}`}
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 transition ${t.border} ${t.btnGhost}`}
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href={PROFILE.socials.behance}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 transition ${t.border} ${t.btnGhost}`}
            >
              <ExternalLink size={18} /> Behance
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Pill t={t}>React</Pill>
            <Pill t={t}>UI/UX</Pill>
            <Pill t={t}>API-driven portfolio</Pill>
            <Pill t={t}>MongoDB + Express</Pill>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
        <SectionTitle
          t={t}
          title="Projects"
          subtitle="These are coming from your backend API (Projects collection)."
        />

        {projectsLoading ? <p className={t.subtext}>Loading projects…</p> : null}
        {projectsError ? (
          <p className="text-red-500">
            Couldn’t load projects. Check your API URL / CORS. ({projectsError})
          </p>
        ) : null}

        {!projectsLoading && !projectsError ? (
          <>
            {featured.length ? (
              <>
                <h3 className={`text-xl font-semibold mb-4 ${t.text}`}>Featured</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {featured.map((p) => (
                    <article
                      key={p._id}
                      className={`rounded-2xl border p-5 ${t.card} ${t.border}`}
                    >
                      <PlaceholderImg title={p.title} t={t} />

                      <div className="mt-4">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className={`text-xl font-semibold ${t.text}`}>{p.title}</h4>
                          {p.url ? (
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex items-center gap-1 hover:opacity-80 ${t.accent}`}
                            >
                              View <ExternalLink size={16} />
                            </a>
                          ) : null}
                        </div>

                        <p className={`mt-2 ${t.subtext}`}>{p.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {(p.tags || []).slice(0, 8).map((tag) => (
                            <Pill key={tag} t={t}>{tag}</Pill>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : null}

            <h3 className={`text-xl font-semibold mt-10 mb-4 ${t.text}`}>All Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <article
                  key={p._id}
                  className={`rounded-2xl border p-5 ${t.card} ${t.border}`}
                >
                  <PlaceholderImg title={p.title} t={t} />
                  <h4 className={`mt-4 text-lg font-semibold ${t.text}`}>{p.title}</h4>
                  <p className={`mt-2 ${t.subtext}`}>{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(p.tags || []).slice(0, 6).map((tag) => (
                      <Pill key={tag} t={t}>{tag}</Pill>
                    ))}
                  </div>

                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-4 inline-flex items-center gap-2 hover:opacity-80 ${t.accent}`}
                    >
                      Open <ExternalLink size={16} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
        <SectionTitle
          t={t}
          title="Skills"
          subtitle="These are coming from your backend API (Skills collection)."
        />

        {skillsLoading ? <p className={t.subtext}>Loading skills…</p> : null}
        {skillsError ? (
          <p className="text-red-500">
            Couldn’t load skills. Check your API URL / CORS. ({skillsError})
          </p>
        ) : null}

        {!skillsLoading && !skillsError ? (
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span
                key={s._id}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${t.pill}`}
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-sm opacity-80">{s.level}</span>
                <span className="text-sm opacity-70">· {s.years} yrs</span>
              </span>
            ))}
          </div>
        ) : null}
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <SectionTitle
          t={t}
          title="Contact"
          subtitle="If you want to collaborate or have an opportunity, reach out."
        />

        <div className={`rounded-3xl border p-8 ${t.card} ${t.border}`}>
          <p className={t.subtext}>Email me and I’ll reply as soon as possible.</p>
          <a
            href={`mailto:${PROFILE.email}`}
            className={`mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition hover:opacity-90 ${t.btn}`}
          >
            <Mail size={18} /> {PROFILE.email}
          </a>
        </div>
      </section>

      <footer className={`py-10 text-center border-t ${t.border} ${t.subtext}`}>
        © {new Date().getFullYear()} {PROFILE.name}
      </footer>
    </div>
  );
}
