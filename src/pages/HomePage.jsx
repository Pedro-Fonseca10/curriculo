import { useEffect, useRef, useState } from "react";
import { profileData } from "../data/data";
import { PiDotBold } from "react-icons/pi";
import "./HomePage.css";

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds?.[0] ?? "home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.08, 0.12, 0.18] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [sectionIds]);

  return active;
}

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HomePage() {
  useRevealOnScroll();

  const { hero, links, about, skills, projects, timeline, contact } =
    profileData;
  const heroHeadline = hero?.headline ?? "";
  const heroHighlights = hero?.highlights ?? [];
  const aboutParagraphs = about?.paragraphs ?? [];
  const aboutExpectations = about?.expectations ?? [];
  const aboutStack = about?.preferredStack ?? [];
  const skillGroups = skills?.groups ?? [];
  const projectItems = projects?.items ?? [];
  const timelineItems = timeline?.items ?? [];
  const footerNote =
    contact?.footerNote ?? `© ${new Date().getFullYear()} ${hero?.name ?? ""}`;

  const sectionIds = ["home", "about", "skills", "projects", "timeline"];
  const active = useActiveSection(sectionIds);

  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY < 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const navItems = [
    { id: "about", label: "Sobre" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projetos" },
    { id: "timeline", label: "Linha do tempo" },
  ];

  return (
    <div className="hp">
      <header
        ref={headerRef}
        className={`hp-header ${!isTop ? "hp-header--solid" : ""}`}
      >
        <div className="hp-container hp-header__inner">
          <nav
            className="hp-nav hp-nav--desktop"
            aria-label="Navegação principal"
          >
            {navItems.map((it) => (
              <button
                key={it.id}
                className={`hp-nav__link${
                  active === it.id ? " is-active" : ""
                }`}
                onClick={() => smoothScrollTo(it.id)}
              >
                {it.label}
              </button>
            ))}
          </nav>

          <div className="hp-actions">
            <button
              className={`hp-burger${menuOpen ? " is-open" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="hp-drawer"
            >
              <span className="hp-burger__line" />
              <span className="hp-burger__line" />
              <span className="hp-burger__line" />
            </button>

            <div className="hp-actions__links">
              <a
                className="hp-pill"
                href={links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="hp-pill"
                href={links.email}
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
              <a
                className="hp-pill "
                href={links.wpp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        id="hp-drawer"
        className={`hp-drawer${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <button
          className="hp-drawer__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar"
        />

        <div className="hp-drawer__panel">
          <div className="hp-drawer__top">
            <div className="hp-drawer__title">Navegação</div>
            <button
              className="hp-x"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>

          <div className="hp-drawer__links">
            {navItems.map((it) => (
              <button
                key={it.id}
                className={`hp-drawer__link${
                  active === it.id ? " is-active" : ""
                }`}
                onClick={() => {
                  setMenuOpen(false);
                  smoothScrollTo(it.id);
                }}
              >
                {it.label}
              </button>
            ))}
          </div>

          <div className="hp-drawer__actions">
            <a
              className="hp-pill"
              href={links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="hp-pill hp-pill--primary"
              href={links.email}
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>
            <a
              className="hp-pill hp-pill--primary"
              href={links.wpp}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <main className="hp-main">
        <section id="home" className="hp-hero">
          <div className="hp-container hp-hero__grid">
            <div className="hp-hero__content" data-reveal>
              <h1 className="hp-h1">
                {heroHeadline.split(" — ").map((p, i) => (
                  <span
                    key={i}
                    className={i === 0 ? "hp-h1__accent" : "hp-h1__hidden"}
                  >
                    {p}
                  </span>
                ))}
              </h1>

              <p className="hp-lead">{heroHeadline}</p>

              <div className="hp-stats">
                {heroHighlights.map((h) => (
                  <div key={h.label} className="hp-stat">
                    <div className="hp-stat__value">{h.value}</div>
                    <div className="hp-stat__label">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hp-hero__cardWrap" data-reveal>
              <div className="hp-card hp-card--glass">
                <div className="hp-card__top">
                  <div>
                    <div className="hp-card__name">{hero?.name}</div>
                    <div className="hp-card__role">{hero?.role}</div>
                  </div>
                </div>

                <div className="hp-card__body">
                  <div className="hp-miniTitle">Foco atual </div>
                  <div className="hp-badges">
                    {[
                      "Interfaces modernas (React + Vite)",
                      "Back-end e dados (Node + Supabase/PostgreSQL)",
                      "Segurança (RLS + RPC)",
                      "Deploy e produto (Vercel, performance, UX)",
                    ].map((t) => (
                      <span key={t} className="hp-badge">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="hp-divider" />

                  <div className="hp-miniTitle">Acesso rápido</div>
                  <div className="hp-quick">
                    <a
                      className="hp-quick__link"
                      href={links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub →
                    </a>
                    <a className="hp-quick__link" href={links.email}>
                      Email →
                    </a>
                    <a className="hp-quick__link" href={links.wpp}>
                      WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hp-scrollHint" aria-hidden="true">
            <span className="hp-scrollHint__mouse" />
            <span className="hp-scrollHint__text">Role para baixo</span>
          </div>
        </section>

        <section id="about" className="hp-section">
          <div className="hp-container">
            <div className="hp-section__head" data-reveal>
              <h2 className="hp-h2">{about?.title ?? "Sobre"}</h2>
            </div>

            <div className="hp-grid2" data-reveal>
              <div className="hp-panel">
                {aboutParagraphs.map((p) => (
                  <p key={p} className="hp-p">
                    {p}
                  </p>
                ))}
              </div>

              <div className="hp-panel hp-panel--soft">
                <div className="hp-miniTitle">O que você pode esperar</div>
                <ul className="hp-list">
                  {aboutExpectations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="hp-miniTitle">Experiência em ferramentas</div>
                <div className="hp-badges">
                  {aboutStack.map((t) => (
                    <span key={t} className="hp-badge hp-badge--soft">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="hp-section hp-section--alt">
          <div className="hp-container">
            <div className="hp-section__head" data-reveal>
              <h2 className="hp-h2">{skills?.title ?? "Skills"}</h2>
            </div>

            <div className="hp-skillGrid">
              {skillGroups.map((s) => (
                <div key={s.group} className="hp-skillCard" data-reveal>
                  <div className="hp-skillCard__top">
                    <div className="hp-skillCard__title">{s.group}</div>
                    <div className="hp-skillCard__line" />
                  </div>
                  <div className="hp-tags">
                    {s.items.map((it) => (
                      <span key={it} className="hp-tag">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="hp-section">
          <div className="hp-container">
            <div className="hp-section__head" data-reveal>
              <h2 className="hp-h2">{projects?.title ?? "Projetos"}</h2>
            </div>

            <div className="hp-projectGrid">
              {projectItems.map((p) => (
                <article key={p.title} className="hp-projectCard" data-reveal>
                  <div className="hp-projectCard__top">
                    <h3 className="hp-h3">{p.title}</h3>
                    <div className="hp-projectTags">
                      {p.tags.map((t) => (
                        <span key={t} className="hp-badge hp-badge--soft">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="hp-p hp-p--muted">{p.description}</p>
                  </div>

                  <div className="hp-projectTags">
                    {p.metrics.map((t) => (
                      <span
                        key={`${t.label}-${t.value}`}
                        className="hp-badge hp-badge--soft"
                      >
                        {t.value}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="hp-section hp-section--alt">
          <div className="hp-container">
            <div className="hp-section__head" data-reveal>
              <h2 className="hp-h2">{timeline?.title ?? "Linha do tempo"}</h2>
            </div>

            <div className="hp-timeline" data-reveal>
              {timelineItems.map((t) => (
                <div key={t.title} className="hp-timelineItem">
                  <div className="hp-timelineItem__when">{t.when}</div>
                  <div className="hp-timelineItem__dot" aria-hidden="true" />
                  <div className="hp-timelineItem__content">
                    <div className="hp-timelineItem__title">{t.title}</div>
                    <div className="hp-timelineItem__desc">{t.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="hp-section">
          <div className="hp-container">
            {/* <div className="hp-contact" data-reveal>
              <div>
                <h2 className="hp-h2">{contact?.title ?? "Contato"}</h2>
                <p className="hp-sub">
                  {contact?.subtitle ??
                    "Quer que eu adapte este currículo para uma vaga específica ou inclua mais projetos?"}
                </p>
              </div>

              <div className="hp-contact__actions">
                {contactActions.map((action) => {
                  const isExternal = action.href?.startsWith("http");
                  return (
                    <a
                      key={action.label}
                      className={`hp-btn${
                        action.variant === "primary" ? " hp-btn--primary" : ""
                      }`}
                      href={action.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      {action.label}
                    </a>
                  );
                })}
              </div>
            </div> */}

            <footer className="hp-footer">
              <span>{footerNote}</span>
              <PiDotBold size={32} />
              <button
                className="hp-footer__link"
                onClick={() => smoothScrollTo("home")}
              >
                Voltar ao topo ↑
              </button>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
