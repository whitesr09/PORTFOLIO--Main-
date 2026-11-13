import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight, ArrowUp, Menu, X, MapPin, GraduationCap, Smartphone,
  Code2, LayoutDashboard, PenTool, GitBranch, Database, Sparkles, Coffee,
  Check, Copy, Mail, Send, Github, Instagram, MessageCircle,
} from 'lucide-react'
import { PROFILE, SOCIALS, STATS, SKILLS, PROJECTS, JOURNEY, MARQUEE } from './data'

/* Motion stays on transform/opacity only — 60fps, no layout thrash. */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}
const viewport = { once: true, margin: '-60px' }

function SectionHead({ eyebrow, title, sub }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="title">{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </motion.div>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return }
    const t0 = performance.now(), dur = 1100
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref}>{n}<em>{suffix}</em></span>
}

const SKILL_ICONS = { code: Code2, layout: LayoutDashboard, pen: PenTool, git: GitBranch, phone: Smartphone, db: Database, spark: Sparkles, coffee: Coffee }
const SOCIAL_ICONS = { github: Github, instagram: Instagram, whatsapp: MessageCircle, telegram: Send, mail: Mail }

const NAV = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['projects', 'Projects'], ['journey', 'Journey'], ['contact', 'Contact'],
]

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-38% 0px -55% 0px' },
    )
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return active
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [copied, setCopied] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        setShowTop(window.scrollY > 700)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email) } catch { /* clipboard unavailable */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />

      <div className="nav-shell">
        <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Main">
          <a href="#home" className="logo">nshd<b>.</b></a>
          <div className="nav-links">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary btn-sm nav-cta">Let&apos;s Talk <ArrowUpRight size={15} /></a>
          <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
              {NAV.map(([id, label], i) => (
                <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                  {label}<span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)' }}>0{i + 1}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HERO */}
      <header className="hero wrap" id="home">
        <div className="hero-grid-bg" aria-hidden />
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <span className="badge"><span className="dot" />{PROFILE.availability}</span>
          <h1>
            <span className="thin">Hey, I&apos;m</span><br />
            AHAMMED<br />NISHAD <span className="mark">K.</span>
          </h1>
          <p className="lede">
            {PROFILE.role} from Kerala, India — crafting <strong style={{ color: 'var(--text)' }}>StudyFlow, JARVIS-2.0, DayLoop</strong> and
            more, with a designer&apos;s eye for minimal, futuristic interfaces.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Work <ArrowUpRight size={16} /></a>
            <a href="#contact" className="btn btn-ghost">Get In Touch</a>
          </div>
          <div className="hero-meta">
            <span><MapPin size={13} /> Kerala, IN</span>
            <span><GraduationCap size={13} /> B-Pharm, KUHS</span>
            <span><Smartphone size={13} /> Built 100% on phone</span>
          </div>
        </motion.div>

        <div className="bento">
          {STATS.slice(0, 3).map((s, i) => (
            <motion.div key={s.label} className="tile" custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <span className="num"><Counter value={s.value} suffix={s.suffix} /></span>
              <span className="lbl">{s.label}</span>
            </motion.div>
          ))}
          <motion.a href="#projects" className="tile accent-tile" custom={3} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <span className="num">6 live</span>
            <span className="lbl">Open-source projects on GitHub — explore them <ArrowUpRight size={14} style={{ verticalAlign: '-2px' }} /></span>
          </motion.a>
        </div>
      </header>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>{MARQUEE.map((m) => <span key={`${k}-${m}`} style={{ gap: '2.6rem' }}>{m} <i>◆</i></span>)}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="wrap" id="about">
        <SectionHead eyebrow="About Me" title="Developer by passion, designer at heart." />
        <div className="about-grid">
          <motion.div className="card" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p>I&apos;m <strong>Ahammed Nishad</strong> — a 22-year-old B-Pharm student at KUHS who fell in love with building Android apps. Everything I ship is designed and coded <strong>entirely from my phone</strong> — architecture, CI, signing, releases.</p>
            <p>My happy place is the intersection of engineering and aesthetics: futuristic minimal interfaces, buttery animations, and apps that feel premium in the hand. When I&apos;m not coding, I&apos;m exploring AI automation and building client work like the Kidzone Cradle store.</p>
          </motion.div>
          <motion.div className="card" custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <dl className="facts">
              <div><dt>Name</dt><dd>Ahammed Nishad K</dd></div>
              <div><dt>Based in</dt><dd>Kerala, India</dd></div>
              <div><dt>Education</dt><dd>B-Pharm, KUHS</dd></div>
              <div><dt>GitHub</dt><dd><a href="https://github.com/whitesr09" target="_blank" rel="noreferrer">github.com/whitesr09</a></dd></div>
              <div><dt>Status</dt><dd>Open to work</dd></div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="wrap" id="skills" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="Skills" title="What I bring to the table." sub="A phone-first toolkit refined over years of late-night builds." />
        <div className="skills-grid">
          {SKILLS.map((s, i) => {
            const Icon = SKILL_ICONS[s.icon]
            return (
              <motion.div key={s.name} className="skill" custom={i % 4} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
                <span className="icon"><Icon size={19} /></span>
                <h3>{s.name}</h3>
                <p>{s.note}</p>
                <div className="bar">
                  <motion.i initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={viewport}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />
                </div>
                <span className="pct">{s.level}%</span>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="wrap" id="projects" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="Projects" title="Things I've been building." sub="Real apps and products, designed and developed end-to-end by me." />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <motion.a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="project"
              custom={i % 3} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
              onMouseMove={spotlight}>
              <div className="top">
                <span className="mono-badge">{p.accent}</span>
                <ArrowUpRight size={18} className="arrow" />
              </div>
              <h3>{p.title}</h3>
              <span className="tagline">{p.tagline}</span>
              <p>{p.description}</p>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="wrap" id="journey" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="Journey" title="The road so far." />
        <div className="timeline">
          {JOURNEY.map((j, i) => (
            <motion.div key={j.period} className="tl-item" custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <span className="when">{j.period}</span>
              <div><h3>{j.title}</h3><p>{j.text}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="wrap" id="contact" style={{ paddingTop: 0 }}>
        <SectionHead eyebrow="Contact" title="Let's build something great together." />
        <motion.div className="contact-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div>
            <h3>Have a project in mind, a question, or just want to say hi?</h3>
            <p className="lead">My inbox is always open. The fastest way to reach me is WhatsApp or Instagram — or copy my email and write me a proper one.</p>
            <button className="btn btn-primary copy-btn" onClick={copyEmail}>
              {copied ? <><Check size={16} /> Email copied</> : <><Copy size={16} /> Copy my email</>}
            </button>
          </div>
          <div className="socials">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.key]
              return (
                <a key={s.key} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <span className="s-icon"><Icon size={18} /></span>{s.label}<small>{s.handle}</small>
                </a>
              )
            })}
          </div>
        </motion.div>
      </section>

      <footer>
        <div className="wrap foot">
          <span className="logo" style={{ fontSize: '0.95rem' }}>nshd<b>.</b></span>
          <span>Designed &amp; built by Nishad Ahammed · Kerala, India</span>
          <div className="icons">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.key]
              return <a key={s.key} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><Icon size={16} /></a>
            })}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button className="to-top" aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
