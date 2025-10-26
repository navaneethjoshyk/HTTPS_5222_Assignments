// src/App.jsx
import React from "react";
import { portfolioData } from "./data/portfolioData";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* ---------- STICKY HEADER NAV (NO NAME, RIGHT-ALIGNED) ---------- */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-end">
          <nav className="flex items-center gap-12 text-lg text-slate-300 font-medium">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* ---------- HERO SECTION ---------- */}
      <section
        id="home"
        className="scroll-mt-28 min-h-[90vh] flex flex-col justify-center items-center text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {portfolioData.name}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300">
          {portfolioData.role}
        </p>
        <p className="mt-6 max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed">
          I blend design and analytics to craft visually appealing, data-driven
          solutions that help businesses grow and users engage.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-12">
          <a
            href={portfolioData.socials?.github}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            title="GitHub"
          >
            <Github className="w-7 h-7" />
          </a>
          <a
            href={portfolioData.socials?.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            title="LinkedIn"
          >
            <Linkedin className="w-7 h-7" />
          </a>
          <a
            href={portfolioData.socials?.behance}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            title="Behance"
          >
            <ExternalLink className="w-7 h-7" />
          </a>
        </div>
      </section>

      {/* ---------- PROJECTS SECTION ---------- */}
      <section id="projects" className="scroll-mt-28 py-32 bg-slate-900/40">
        <h2 className="text-4xl font-semibold text-center mb-14 tracking-tight">
          Featured Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-10">
          {(portfolioData.projects || []).map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={p.cover}
                alt={p.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {p.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- CONTACT SECTION ---------- */}
      <section id="contact" className="scroll-mt-28 py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-8">
            Contact
          </h2>
          <p className="text-slate-300 text-lg">
            Interested in collaborating or hiring? I’m open to roles and freelance work.
          </p>
          <a
            href={`mailto:${portfolioData.email || "antony@example.com"}?subject=Let%27s%20Connect`}
            className="inline-block mt-10 px-8 py-4 rounded-xl bg-white text-black hover:bg-slate-200 transition text-lg font-medium"
          >
            Email Right now!!
          </a>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="py-14 text-center text-slate-500 text-base border-t border-white/10">
        © {new Date().getFullYear()} {portfolioData.name} — Built with ❤️ React
        & TailwindCSS.
      </footer>
    </div>
  );
}
