import {
  Album,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Disc3,
  GraduationCap,
  Headphones,
  ImagePlus,
  Mail,
  Menu,
  Mic2,
  Phone,
  PlayCircle,
  Sparkles,
  Waves,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import founderPhoto from './assets/founder-photo.webp'
import deskAnglePhoto from './assets/gallery-desk-angle.png'
import deskWidePhoto from './assets/gallery-desk-wide.png'
import headphonesPhoto from './assets/gallery-headphones.png'
import pianoFrontPhoto from './assets/gallery-piano-front.png'
import pianoSidePhoto from './assets/gallery-piano-side.png'
import wallLogoPhoto from './assets/gallery-wall-logo.png'
import logo from './assets/ogha-logo.png'
import artistCornerPhoto from './assets/studio-artist-corner.png'
import liveRoomPhoto from './assets/studio-live-room.png'
import { supabase } from './lib/supabase'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Courses', href: '/courses' },
  { label: 'Contact', href: '/contact' },
]

const serviceCards = [
  {
    icon: Mic2,
    title: 'Studio for Rent',
    description:
      'World-class recording environment equipped for artists, producers, and creators.',
    features: ['Recording Sessions', 'Rehearsals', 'Mixing Room Access'],
    cta: 'Book Now',
  },
  {
    icon: GraduationCap,
    title: 'Courses',
    description:
      'Learn music production, recording techniques, composition, and industry practices.',
    features: ['Music Production', 'Sound Engineering', 'Practical Sessions'],
    cta: 'Explore Courses',
  },
]

const courseCards = [
  {
    title: 'Music Production',
    duration: '12 Weeks',
    format: 'Hybrid Studio Lab',
    copy: 'Creative DAW workflow, arrangement, sonic identity, and release-ready production methods.',
    outcome: 'Build, arrange, mix, and present a polished final project.',
  },
  {
    title: 'Sound Engineering',
    duration: '10 Weeks',
    format: 'Hands-On Technical Track',
    copy: 'Signal flow, recording practice, gain staging, mic placement, and mix translation fundamentals.',
    outcome: 'Learn confident recording and technical studio decision-making.',
  },
  {
    title: 'Composition Lab',
    duration: '8 Weeks',
    format: 'Creative Mentorship Format',
    copy: 'Melody, harmony, scoring structure, mood design, and modern composition for media and artists.',
    outcome: 'Develop musical storytelling and arrangement confidence.',
  },
]

const galleryPhotos = [
  {
    title: 'Production Desk',
    note: 'The central workstation for arranging, recording, editing, and monitoring.',
    image: deskWidePhoto,
    className: 'lg:col-span-2',
  },
  {
    title: 'Mix Position',
    note: 'A focused monitoring setup built around detail, balance, and workflow.',
    image: liveRoomPhoto,
    className: '',
  },
  {
    title: 'Vocal Room',
    note: 'A treated recording area designed for intimate vocal takes and creative performances.',
    image: artistCornerPhoto,
    className: '',
  },
  {
    title: 'Headphone Detail',
    note: 'Close-up texture from the desk: monitoring, references, and session focus.',
    image: headphonesPhoto,
    className: '',
  },
  {
    title: 'Keys and Composition',
    note: 'Piano-focused space for composing, teaching, and shaping musical ideas.',
    image: pianoFrontPhoto,
    className: 'lg:col-span-2',
  },
  {
    title: 'Desk Angle',
    note: 'The production desk from a working session perspective.',
    image: deskAnglePhoto,
    className: '',
  },
  {
    title: 'Piano Side',
    note: 'A warm writing corner for practice, arrangement, and sketching ideas.',
    image: pianoSidePhoto,
    className: '',
  },
  {
    title: 'OGHA Wall',
    note: 'Brand wall and acoustic treatment details inside the studio.',
    image: wallLogoPhoto,
    className: 'lg:col-span-2',
  },
]

const galleryPreviewPhotos = [
  {
    title: 'Live Room',
    note: 'A focused production space with monitoring, keys, and a polished working desk.',
    image: liveRoomPhoto,
  },
  {
    title: 'Artist Corner',
    note: 'A treated recording area designed for intimate vocal takes and creative performances.',
    image: artistCornerPhoto,
  },
]

const showcaseTracks = [
  {
    title: 'Cinematic Vocal Texture',
    format: 'Audio Preview Placeholder',
    copy: 'Replace this with an embedded track, private link, or mastered preview when your portfolio is ready.',
  },
  {
    title: 'Film Score Mood Study',
    format: 'Showreel Clip Placeholder',
    copy: 'Perfect for background scoring examples, atmospheric compositions, or sync-ready stems.',
  },
  {
    title: 'Production Before / After',
    format: 'A/B Presentation Placeholder',
    copy: 'Use this block to show how OGHA transforms raw ideas into polished release-ready sound.',
  },
]

const equipmentGroups = [
  {
    title: 'Microphones',
    items: ['Large-Diaphragm Condensers', 'Dynamic Vocal Mics', 'Instrument Capture Options'],
  },
  {
    title: 'Monitoring',
    items: ['Nearfield Studio Monitors', 'Reference Headphones', 'Acoustic-Tuned Listening Position'],
  },
  {
    title: 'Production Chain',
    items: ['Audio Interface', 'Preamps and Signal Routing', 'Professional DAW Environment'],
  },
  {
    title: 'Creative Tools',
    items: ['MIDI Controllers', 'Virtual Instruments', 'Composition and Arrangement Suites'],
  },
]

const socialLinks = {
  instagram: 'https://instagram.com/',
  youtube: 'https://www.youtube.com/channel/UC_7rQYDduIxftuyJa_thSLg',
  facebook: 'https://facebook.com/',
}

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function SectionHeading({ eyebrow, title, copy, align = 'center' }) {
  return (
    <motion.div
      className={`mx-auto mb-14 max-w-3xl ${align === 'left' ? 'text-left' : 'text-center'}`}
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <p className="mb-4 font-sans text-xs uppercase tracking-[0.45em] text-[#F5D67A]">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight text-white md:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-white/70 md:text-lg">{copy}</p> : null}
    </motion.div>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.08)] ${className}`}
    >
      {children}
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return <motion.div className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-[#D4AF37]" style={{ scaleX }} />
}

function SocialIcon({ type }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    youtube: (
      <>
        <path d="M21 12c0 2.8-.3 4.6-.8 5.5-.4.8-1 1.4-1.8 1.8-.9.5-2.7.8-6.4.8s-5.5-.3-6.4-.8c-.8-.4-1.4-1-1.8-1.8C3.3 16.6 3 14.8 3 12s.3-4.6.8-5.5c.4-.8 1-1.4 1.8-1.8C6.5 4.2 8.3 4 12 4s5.5.2 6.4.7c.8.4 1.4 1 1.8 1.8.5.9.8 2.7.8 5.5Z" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </>
    ),
    facebook: (
      <>
        <path d="M14 8h2V4h-3c-3 0-5 2-5 5v3H5v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
      {paths[type]}
    </svg>
  )
}

function BrandLogo({ size = 'md', framed = false, className = '' }) {
  const sizeMap = {
    sm: 'h-10 md:h-12',
    md: 'h-14',
    lg: 'h-24',
    xl: 'h-44',
    hero: 'w-[78%]',
  }

  const imageClass = size === 'hero' ? sizeMap.hero : `${sizeMap[size] ?? sizeMap.md} w-auto`

  if (!framed) {
    return <img src={logo} alt="OGHA Soundworks logo" className={`${imageClass} ${className}`} />
  }

  return (
    <div
      className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/25 bg-[radial-gradient(circle_at_30%_30%,rgba(245,214,122,0.12),rgba(20,16,8,0.82),rgba(0,0,0,0.96))] shadow-[0_0_45px_rgba(212,175,55,0.18)] ${className}`}
    >
      <div className="absolute inset-[9%] rounded-full border border-[#D4AF37]/12" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_62%)]" />
      <img
        src={logo}
        alt="OGHA Soundworks logo"
        className={`${imageClass} relative z-10 object-contain drop-shadow-[0_0_24px_rgba(212,175,55,0.3)]`}
      />
    </div>
  )
}

function AmbientWaveform({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="waveform-layer waveform-layer-a absolute inset-x-[-10%] top-[16%] h-32 opacity-45" />
      <div className="waveform-layer waveform-layer-b absolute inset-x-[-12%] top-[42%] h-40 opacity-35" />
      <div className="waveform-layer waveform-layer-c absolute inset-x-[-8%] bottom-[10%] h-28 opacity-30" />
    </div>
  )
}

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
    >
      <AmbientWaveform className="opacity-60" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: [0, 2, 0, -2, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-3xl" />
          <BrandLogo size="xl" framed className="w-44" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.55em' }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-xs uppercase text-[#F5D67A]"
        >
          Sound in Motion
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 md:px-6 ${
          scrolled
            ? 'border-white/10 bg-black/55 shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur-xl'
            : 'border-white/8 bg-white/[0.03]'
        }`}
      >
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <BrandLogo size="sm" />
          <div className="hidden min-[420px]:block">
            <p className="font-display text-lg tracking-[0.2em] text-white">OGHA</p>
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-[#F5D67A]">Soundworks</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm tracking-[0.18em] transition hover:text-[#F5D67A] ${
                  isActive ? 'text-[#F5D67A]' : 'text-white/80'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="gold-button">
            Book Studio
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-black/90 p-5 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.22em] ${
                      isActive
                        ? 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F5D67A]'
                        : 'border-white/8 text-white/85'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contact" className="gold-button mt-2 text-center" onClick={() => setIsOpen(false)}>
                Book Studio
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,214,122,0.18),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%,rgba(212,175,55,0.08)_100%)]" />
      <div className="sound-grid absolute inset-0 opacity-30" />
      <div className="wave-field absolute inset-x-0 bottom-[-8%] top-[20%]" />
      <AmbientWaveform />
      {[...Array.from({ length: 18 })].map((_, index) => (
        <span
          key={index}
          className="float-note absolute text-[#F5D67A]/25"
          style={{
            left: `${5 + index * 5}%`,
            top: `${10 + (index % 6) * 12}%`,
            animationDelay: `${index * 0.4}s`,
            fontSize: `${16 + (index % 4) * 7}px`,
          }}
        >
          ♪
        </span>
      ))}
      {[...Array.from({ length: 28 })].map((_, index) => (
        <span
          key={`particle-${index}`}
          className="particle absolute rounded-full bg-[#F5D67A]/45"
          style={{
            left: `${index * 3.6}%`,
            top: `${12 + (index % 5) * 15}%`,
            width: `${2 + (index % 3)}px`,
            height: `${2 + (index % 3)}px`,
            animationDelay: `${index * 0.25}s`,
          }}
        />
      ))}
    </div>
  )
}

function ParallaxSection({ id, className = '', children, glow = false }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -70])

  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {glow ? <motion.div style={{ y }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_42%)]" /> : null}
      <motion.div style={{ y }} className="absolute inset-0 opacity-30">
        <AmbientWaveform />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 130])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32 md:px-8">
      <HeroBackground />
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <h1 className="hero-title max-w-4xl text-5xl leading-none text-white md:text-7xl lg:text-[5.6rem]">
            Crafting Sound.
            <span className="block text-[#F5D67A]">Creating Emotion.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
            Professional Recording Studio, Music Education, and Music Production Solutions.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/services" className="gold-button inline-flex items-center justify-center gap-2">
              Explore Services
              <ChevronRight size={18} />
            </Link>
            <Link to="/contact" className="ghost-button inline-flex items-center justify-center gap-2">
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative z-10 mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-0 rounded-full bg-[#D4AF37]/22 blur-3xl" />
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <GlassCard className="relative overflow-hidden rounded-[2.5rem] border-[#D4AF37]/20 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,214,122,0.18),transparent_36%)]" />
              <div className="equalizer-ring relative mx-auto flex aspect-square w-full max-w-[27rem] items-center justify-center rounded-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="hero-cd absolute inset-[3%] z-0 rounded-full"
                />
                <BrandLogo size="hero" className="relative z-10 drop-shadow-[0_0_45px_rgba(212,175,55,0.38)]" />
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesSection({ preview = false }) {
  const cards = preview ? serviceCards.slice(0, 3) : serviceCards

  return (
    <ParallaxSection className="px-4 py-24 md:px-8" glow>
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title={preview ? 'What We Offer' : 'Services Designed For Serious Sound'}
          copy="Every offering is designed to merge technical excellence with an emotionally rich creative experience."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.title}
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -10, scale: 1.01 }}
              >
                <GlassCard className="group h-full p-8 transition duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_55px_rgba(212,175,55,0.16)]">
                  <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F5D67A]">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display text-3xl text-white">{service.title}</h3>
                  <p className="mt-4 text-base leading-8 text-white/68">{service.description}</p>
                  <ul className="mt-8 space-y-3 text-sm uppercase tracking-[0.18em] text-white/82">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-[#F5D67A] transition group-hover:translate-x-1"
                  >
                    {service.cta}
                    <ArrowRight size={16} />
                  </Link>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </ParallaxSection>
  )
}

function FounderSection() {
  return (
    <ParallaxSection className="px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_60%)] blur-3xl" />
            <div className="relative flex aspect-square items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[radial-gradient(circle_at_30%_30%,rgba(245,214,122,0.18),rgba(255,255,255,0.05),rgba(0,0,0,0.78))] p-8 shadow-[0_0_60px_rgba(212,175,55,0.14)]">
              <div className="absolute inset-5 rounded-full border border-dashed border-[#D4AF37]/20" />
              <div className="absolute inset-[11%] rounded-full border border-white/8" />
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full">
                <img
                  src={founderPhoto}
                  alt="Founder of OGHA Soundworks"
                  className="h-full w-full scale-[1.18] object-cover object-[52%_42%]"
                />
              </div>
            </div>
            <div className="absolute bottom-5 right-0 z-20 rounded-3xl border border-[#D4AF37]/20 bg-black/70 px-5 py-4 backdrop-blur-xl">
              <p className="text-[0.65rem] uppercase tracking-[0.42em] text-[#F5D67A]">Founder</p>
              <p className="mt-2 font-display text-2xl text-white">OGHA Soundworks</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionHeading
            eyebrow="About Founder"
            title="Meet The Founder"
            align="left"
            copy="OGHA Soundworks was born from a simple vision—to create a space where musicians and creators can come together, collaborate, and inspire one another. Alongside delivering professional audio services, my mission is to promote music production and sound engineering education by sharing knowledge and supporting aspiring artists and engineers on their creative journey."
          />
          <GlassCard className="mt-8 border-[#D4AF37]/20 p-6">
            <p className="font-display text-2xl leading-relaxed text-white">
              "Sound is more than technique. It is memory, feeling, atmosphere, and presence."
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}

function GallerySection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  return (
    <ParallaxSection className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            eyebrow="Studio Gallery"
            title="A visual story of the space"
            copy="A closer look at the rooms where OGHA Soundworks shapes recordings, rehearsals, and production ideas."
          />
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="gold-button inline-flex items-center justify-center gap-2"
          >
            <ImagePlus size={18} />
            View Gallery
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {galleryPreviewPhotos.map((item, index) => (
            <motion.div
              key={item.title}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={index === 0 ? 'gallery-frame gallery-frame-large' : 'gallery-frame'}
            >
              <div className="relative overflow-hidden rounded-[1.7rem]">
                <div className="relative min-h-[30rem] overflow-hidden md:min-h-[32rem]">
                  <img
                    src={item.image}
                    alt={`OGHA Soundworks ${item.title.toLowerCase()}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.2)_42%,rgba(0,0,0,0.78))]" />
                  <div className="absolute inset-4 rounded-[1.35rem] border border-white/12" />
                  <div className="relative z-10 flex min-h-[30rem] flex-col justify-end p-6 md:min-h-[32rem] md:p-8">
                    {index === 0 ? (
                      <div className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-black/45 text-[#F5D67A] backdrop-blur-md">
                        <ImagePlus size={24} />
                      </div>
                    ) : null}
                    <h3 className={`${index === 0 ? 'mt-6 text-4xl' : 'text-3xl'} font-display text-white`}>
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md leading-7 text-white/68">{item.note}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isGalleryOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-black/90 px-4 py-6 backdrop-blur-xl md:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="sticky top-4 z-10 mb-6 flex items-center justify-between rounded-full border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-xl">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#F5D67A]">Studio Gallery</p>
                  <p className="mt-1 hidden text-sm text-white/55 sm:block">OGHA Soundworks photo showcase</p>
                </div>
                <button
                  type="button"
                  aria-label="Close gallery"
                  onClick={() => setIsGalleryOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#D4AF37]/45 hover:text-[#F5D67A]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {galleryPhotos.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.24) }}
                    className="gallery-frame p-2"
                  >
                    <div className="relative overflow-hidden rounded-[1.45rem]">
                      <div className="relative min-h-[18rem] overflow-hidden md:min-h-[21rem]">
                        <img
                          src={item.image}
                          alt={`OGHA Soundworks ${item.title.toLowerCase()}`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(0,0,0,0.76))]" />
                        <div className="relative z-10 flex min-h-[18rem] flex-col justify-end p-5 md:min-h-[21rem]">
                          <h3 className="font-display text-2xl text-white">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/62">{item.note}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ParallaxSection>
  )
}

function MusicShowcaseSection() {
  return (
    <ParallaxSection className="px-4 py-24 md:px-8" glow>
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Music Showcase"
          title="A premium area for your tracks, showreels, and previews"
          copy="These player-style panels are ready for sample tracks, embedded videos, score excerpts, or before-and-after production showcases."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {showcaseTracks.map((track, index) => (
            <motion.div
              key={track.title}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full p-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#F5D67A]">{track.format}</p>
                  <PlayCircle size={22} className="text-[#F5D67A]" />
                </div>
                <h3 className="mt-6 font-display text-3xl text-white">{track.title}</h3>
                <p className="mt-4 leading-8 text-white/68">{track.copy}</p>
                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                  <div className="mb-4 flex items-center justify-between text-sm text-white/55">
                    <span>00:00</span>
                    <span>Preview Placeholder</span>
                    <span>01:42</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,#F5D67A,#D4AF37)]" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}

function EquipmentSection() {
  return (
    <ParallaxSection className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Equipment"
          title="Tools chosen for clarity, workflow, and feel"
          copy="This section can be updated later with your exact gear list. For now, it presents the studio as technically serious and production-ready."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {equipmentGroups.map((group, index) => (
            <motion.div
              key={group.title}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard className="h-full p-7">
                <h3 className="font-display text-3xl text-white">{group.title}</h3>
                <ul className="mt-6 space-y-3 text-sm uppercase tracking-[0.16em] text-white/72">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}

function BookingSection() {
  const initialBookingState = {
    name: '',
    email: '',
    phone: '',
    sessionType: 'Recording Session',
    preferredDate: '',
    duration: '2 Hours',
    message: '',
  }
  const [bookingData, setBookingData] = useState(initialBookingState)
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setBookingData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!supabase) {
      setSubmitState({
        status: 'error',
        message: 'Supabase is not configured yet. Add your Supabase URL and key first.',
      })
      return
    }

    setSubmitState({
      status: 'submitting',
      message: 'Sending your booking enquiry...',
    })

    const bookingMessage = [
      '[Booking Request]',
      `Session Type: ${bookingData.sessionType}`,
      `Preferred Date: ${bookingData.preferredDate}`,
      `Duration: ${bookingData.duration}`,
      '',
      bookingData.message.trim() || 'No additional notes provided.',
    ].join('\n')

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: bookingData.name.trim(),
        email: bookingData.email.trim(),
        phone: bookingData.phone.trim(),
        message: bookingMessage,
      },
    ])

    if (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Something went wrong while sending your booking request.',
      })
      return
    }

    const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
      body: {
        submissionType: 'booking',
        name: bookingData.name.trim(),
        email: bookingData.email.trim(),
        phone: bookingData.phone.trim(),
        message: bookingData.message.trim() || 'No additional notes provided.',
        sessionType: bookingData.sessionType,
        preferredDate: bookingData.preferredDate,
        duration: bookingData.duration,
      },
    })

    setBookingData(initialBookingState)

    if (emailError) {
      setSubmitState({
        status: 'warning',
        message: 'Your booking enquiry was saved, but the email notification did not complete.',
      })
      return
    }

    setSubmitState({
      status: 'success',
      message: 'Your booking enquiry has been sent successfully.',
    })
  }

  return (
    <ParallaxSection id="booking" className="px-4 py-24 md:px-8" glow>
      <div className="mx-auto max-w-7xl">
        <GlassCard className="overflow-hidden border-[#D4AF37]/20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
              <SectionHeading
                eyebrow="Book Studio"
                title="Plan a session with clarity before you arrive"
                align="left"
                copy="This booking flow lets visitors choose the session type, preferred date, duration, and project notes before reaching out."
              />
              <div className="grid gap-4 text-white/68">
                {[
                  [CalendarDays, 'Choose a preferred recording or rehearsal date.'],
                  [Clock3, 'Share the session length so scheduling feels easier.'],
                  [Mic2, 'Tell OGHA what kind of creative setup you need.'],
                ].map(([Icon, text]) => (
                  <div key={text} className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#F5D67A]">
                      <Icon size={18} />
                    </div>
                    <p className="leading-7">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: 'Name', name: 'name', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Phone', name: 'phone', type: 'tel' },
                    { label: 'Preferred Date', name: 'preferredDate', type: 'date' },
                  ].map((field) => (
                    <label key={field.name} className="grid gap-2">
                      <span className="text-sm uppercase tracking-[0.22em] text-white/55">{field.label}</span>
                      <input
                        name={field.name}
                        type={field.type}
                        value={bookingData[field.name]}
                        onChange={handleChange}
                        required
                        className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/55"
                      />
                    </label>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm uppercase tracking-[0.22em] text-white/55">Session Type</span>
                    <select
                      name="sessionType"
                      value={bookingData.sessionType}
                      onChange={handleChange}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#D4AF37]/55"
                    >
                      {['Recording Session', 'Rehearsal Session', 'Mixing Review', 'Production Consultation'].map((option) => (
                        <option key={option} value={option} className="bg-black text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm uppercase tracking-[0.22em] text-white/55">Duration</span>
                    <select
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleChange}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#D4AF37]/55"
                    >
                      {['2 Hours', '4 Hours', 'Half Day', 'Full Day'].map((option) => (
                        <option key={option} value={option} className="bg-black text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm uppercase tracking-[0.22em] text-white/55">Project Notes</span>
                  <textarea
                    name="message"
                    rows="5"
                    value={bookingData.message}
                    onChange={handleChange}
                    placeholder="Tell OGHA about the type of project, artist count, or any special setup you need."
                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/55"
                  />
                </label>
                <button
                  type="submit"
                  disabled={submitState.status === 'submitting'}
                  className="gold-button mt-4 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState.status === 'submitting' ? 'Sending...' : 'Request Booking'}
                  <ArrowRight size={18} />
                </button>
                {submitState.message ? (
                  <p
                    className={`text-sm ${
                      submitState.status === 'success'
                        ? 'text-emerald-300'
                        : submitState.status === 'warning'
                          ? 'text-amber-300'
                          : 'text-rose-300'
                    }`}
                  >
                    {submitState.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </GlassCard>
      </div>
    </ParallaxSection>
  )
}

function ContactSection({ compact = false }) {
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }
  const [formData, setFormData] = useState(initialFormState)
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!supabase) {
      setSubmitState({
        status: 'error',
        message: 'Supabase is not configured yet. Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      })
      return
    }

    setSubmitState({
      status: 'submitting',
      message: 'Sending your message...',
    })

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      },
    ])

    if (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Something went wrong while sending your message.',
      })
      return
    }

    const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
      body: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      },
    })

    if (emailError) {
      setFormData(initialFormState)
      setSubmitState({
        status: 'warning',
        message: 'Your message was saved, but the email notification is not live yet.',
      })
      return
    }

    setFormData(initialFormState)
    setSubmitState({
      status: 'success',
      message: 'Your message has been sent successfully.',
    })
  }

  return (
    <ParallaxSection className="px-4 py-24 md:px-8" glow>
      <div className="mx-auto max-w-7xl">
        <GlassCard className="overflow-hidden border-[#D4AF37]/20">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 md:p-12">
              <SectionHeading
                eyebrow="Contact"
                title="Let's create something unforgettable"
                align="left"
                copy={
                  compact
                    ? 'Reach out to book the studio or ask about custom production work.'
                    : 'Reach out for bookings, collaborations, classes, or production inquiries.'
                }
              />

              <form className="grid gap-4" onSubmit={handleSubmit}>
                {[
                  { label: 'Name', name: 'name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Phone', name: 'phone', type: 'tel' },
                ].map((field) => (
                  <label key={field.label} className="grid gap-2">
                    <span className="text-sm uppercase tracking-[0.22em] text-white/55">{field.label}</span>
                    <input
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      required={field.name !== 'phone'}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/55"
                    />
                  </label>
                ))}
                <label className="grid gap-2">
                  <span className="text-sm uppercase tracking-[0.22em] text-white/55">Message</span>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project"
                    required
                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/55"
                  />
                </label>
                <button
                  type="submit"
                  disabled={submitState.status === 'submitting'}
                  className="gold-button mt-4 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState.status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={18} />
                </button>
                {submitState.message ? (
                  <p
                    className={`text-sm ${
                      submitState.status === 'success'
                        ? 'text-emerald-300'
                        : submitState.status === 'warning'
                          ? 'text-amber-300'
                          : 'text-rose-300'
                    }`}
                  >
                    {submitState.message}
                  </p>
                ) : null}
              </form>
            </div>

            <div className="relative border-t border-white/10 bg-[linear-gradient(180deg,rgba(245,214,122,0.12),rgba(0,0,0,0.2))] p-8 md:p-12 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_34%)]" />
              <div className="relative">
                <BrandLogo size="lg" framed className="w-24" />
                <h3 className="mt-8 font-display text-3xl text-white">OGHA Soundworks</h3>
                <div className="mt-8 space-y-4 text-white/72">
                  <p className="flex items-center gap-3">
                    <Mail size={18} className="text-[#F5D67A]" />
                    info@oghasoundworks.com
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone size={18} className="text-[#F5D67A]" />
                    +91 XXXXX XXXXX
                  </p>
                  <p className="flex items-center gap-3">
                    <Album size={18} className="text-[#F5D67A]" />
                    Recording Studio, Education, Composition
                  </p>
                </div>

                <div className="mt-10 flex gap-4">
                  {['instagram', 'youtube', 'facebook'].map((type) => (
                    <a
                      key={type}
                      href={socialLinks[type]}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white transition hover:border-[#D4AF37]/45 hover:text-[#F5D67A]"
                    >
                      <SocialIcon type={type} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </ParallaxSection>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/30 px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo size="md" />
          <div>
            <p className="font-display text-xl tracking-[0.24em] text-white">OGHA</p>
            <p className="text-xs uppercase tracking-[0.42em] text-[#F5D67A]">Soundworks</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm uppercase tracking-[0.18em] text-white/68">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className="transition hover:text-[#F5D67A]">
              {item.label}
            </NavLink>
          ))}
        </div>

        <p className="text-sm text-white/48">© 2026 OGHA Soundworks. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

function PageHero({ eyebrow, title, copy, icon: Icon }) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 md:px-8">
      <AmbientWaveform />
      <div className="mx-auto max-w-6xl">
        <GlassCard className="relative overflow-hidden border-[#D4AF37]/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_30%)]" />
          <div className="relative max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#F5D67A]">
              <Icon size={16} />
              {eyebrow}
            </div>
            <h1 className="mt-8 font-display text-5xl leading-none text-white md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">{copy}</p>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection preview />
      <FounderSection />
      <GallerySection />
      <MusicShowcaseSection />
      <EquipmentSection />
      <ContactSection compact />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Studio spaces and production support with a luxury edge"
        copy="From recording sessions to composition work, every OGHA service is designed to feel elevated, focused, and artist-first."
        icon={Disc3}
      />
      <ServicesSection />
      <ParallaxSection className="px-4 pb-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ['Session Curation', 'Flexible bookings, artist support, and smooth session preparation.'],
            ['Production Consulting', 'Arrangement, sonic direction, and release-focused creative guidance.'],
            ['Custom Deliverables', 'Composition, programming, and tailored music assets for artists and media.'],
          ].map(([title, copy]) => (
            <GlassCard key={title} className="p-8">
              <h3 className="font-display text-3xl text-white">{title}</h3>
              <p className="mt-4 leading-8 text-white/68">{copy}</p>
            </GlassCard>
          ))}
        </div>
      </ParallaxSection>
    </>
  )
}

function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Learn inside a studio environment shaped by practice"
        copy="Courses are presented as premium learning journeys with technical depth, real-world workflow, and creative development."
        icon={GraduationCap}
      />
      <ParallaxSection className="px-4 py-24 md:px-8" glow>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Programs"
            title="Focused learning tracks"
            copy="A premium education section for music creators, producers, and aspiring engineers."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {courseCards.map((course, index) => (
              <motion.div
                key={course.title}
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full p-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#F5D67A]">{course.duration}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/45">{course.format}</p>
                  <h3 className="mt-5 font-display text-3xl text-white">{course.title}</h3>
                  <p className="mt-4 leading-8 text-white/68">{course.copy}</p>
                  <p className="mt-4 text-sm leading-7 text-white/55">{course.outcome}</p>
                  <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[#F5D67A]">
                    Enquire Now
                    <ArrowRight size={16} />
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>
      <ParallaxSection className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="grid gap-6 p-8 md:grid-cols-3 md:p-10">
            {[
              [Headphones, 'Practical Sessions'],
              [Waves, 'Studio Workflow'],
              [Sparkles, 'Creative Mentorship'],
            ].map(([Icon, label]) => (
              <div key={label} className="text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#F5D67A]">
                  <Icon size={24} />
                </div>
                <p className="mt-4 font-display text-2xl text-white">{label}</p>
              </div>
            ))}
          </GlassCard>
        </div>
      </ParallaxSection>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <BookingSection />
      <ContactSection />
    </>
  )
}

function AppShell() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative overflow-x-hidden bg-black text-white">
      <ScrollToTop />
      <ScrollProgress />
      <AnimatePresence>{loading ? <Loader key="loader" /> : null}</AnimatePresence>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
