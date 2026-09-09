import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ImagePlus,
  Mail,
  Menu,
  Mic2,
  Minus,
  Music2,
  Phone,
  Play,
  Plus,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import contactMusicCta from './assets/contact-music-cta.png'
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
  { label: 'Audiography', href: '/works' },
  { label: 'Contact', href: '/contact' },
]

const serviceCards = [
  {
    icon: Mic2,
    titles: [
      'Studio for Rent',
      'Music Composition and Production',
      'Sound Designing',
      'Mixing and Mastering',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Piano and Music Production Classes',
    details: ['Session duration - 1.5 hours', '4 sessions per month', 'One-to-one session'],
    syllabus: [
      'Music Theory and Piano Training',
      'Sound Theory',
      'Fundamentals of Music Production',
      'DAW and Production Workflow',
      'Synthesizers',
      'Rhythm and Groove',
      'Composition and Arrangements',
      'Sound Design',
      'Mixing and Mastering',
    ],
    cta: 'Explore Courses',
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

const achievementSlides = [
  { image: deskWidePhoto, label: 'Achievement 01' },
  { image: liveRoomPhoto, label: 'Achievement 02' },
  { image: pianoFrontPhoto, label: 'Achievement 03' },
  { image: artistCornerPhoto, label: 'Achievement 04' },
]

const youtubeWorks = [
  {
    title: 'Maayum Neela',
    category: 'Original Song',
    youtubeUrl: 'https://www.youtube.com/watch?v=0U1VVLQq46w',
  },
  {
    title: 'Baana Taare',
    category: 'Original Song',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y5Nth2XVwMU',
  },
  {
    title: 'Ganesha Pandal Song',
    category: 'Original Song',
    youtubeUrl: 'https://www.youtube.com/watch?v=yptc-HLoC84',
  },
  {
    title: 'Mamsa',
    category: 'Original Song',
    youtubeUrl: 'https://www.youtube.com/watch?v=I4kie4B3AlY',
  },
  {
    title: 'Ramana Agamana | Jai Shri Ram',
    category: 'Original Song',
    youtubeUrl: 'https://www.youtube.com/watch?v=WKDdl9Bx4Lw',
  },
]

const socialLinks = {
  instagram: 'https://www.instagram.com/ogha_music/',
  youtube: 'https://www.youtube.com/channel/UC_7rQYDduIxftuyJa_thSLg',
}

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

function getYouTubeVideoId(url) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1).split('/')[0]
    }

    if (parsedUrl.pathname.startsWith('/shorts/') || parsedUrl.pathname.startsWith('/embed/')) {
      return parsedUrl.pathname.split('/')[2]
    }

    return parsedUrl.searchParams.get('v') ?? ''
  } catch {
    return ''
  }
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function SectionHeading({ eyebrow, title, copy, align = 'center', titleClassName = 'text-white' }) {
  return (
    <motion.div
      className={`mx-auto mb-10 max-w-3xl md:mb-14 ${align === 'left' ? 'text-left' : 'text-center'}`}
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {eyebrow ? (
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.32em] text-[#F5D67A] sm:tracking-[0.45em]">{eyebrow}</p>
      ) : null}
      <h2 className={`font-display text-4xl leading-tight md:text-5xl ${titleClassName}`}>{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-white/70 md:text-lg">{copy}</p> : null}
    </motion.div>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.08)] md:rounded-[2rem] ${className}`}
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-4 sm:py-4 md:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-4 sm:py-3 md:px-6 ${
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
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
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
  return (
    <section className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-14 pt-28 sm:pt-32 md:px-8">
      <img
        src={deskWidePhoto}
        alt="OGHA Soundworks recording studio"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.38),rgba(0,0,0,0.1)_42%,rgba(0,0,0,0.75))]" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="hero-title font-display text-5xl font-semibold leading-none text-[#F5D67A] drop-shadow-[0_0_36px_rgba(212,175,55,0.28)] sm:text-6xl md:text-8xl lg:text-[6.5rem]">
            OGHA
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.38em] text-[#F5D67A] sm:tracking-[0.48em] md:text-sm">
            Soundworks
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-xl">
            Professional Recording Studio, Music and Film Sound Solutions.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <Link to="/services" className="gold-button inline-flex items-center justify-center gap-2 text-center">
              Explore Services
              <ChevronRight size={18} />
            </Link>
            <Link to="/contact" className="ghost-button inline-flex items-center justify-center gap-2 text-center">
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesSection({ preview = false }) {
  const cards = serviceCards

  return (
    <ParallaxSection
      className={preview ? 'px-4 py-16 md:px-8 md:py-24' : 'px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44'}
      glow
    >
      <div className="mx-auto max-w-7xl">
        {preview ? (
          <SectionHeading title="What We Offer" titleClassName="text-[#F5D67A]" />
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.title ?? service.titles[0]}
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -10, scale: 1.01 }}
              >
                <GlassCard className="group flex h-full flex-col p-5 transition duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_55px_rgba(212,175,55,0.16)] sm:p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F5D67A] sm:mb-7 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={26} />
                  </div>

                  {service.titles ? (
                    <>
                      <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">Studio Services</h3>
                      <ul className="mt-7 space-y-3">
                        {service.titles.map((title, titleIndex) => (
                          <li
                            key={title}
                            className="flex items-start gap-3 rounded-lg border border-white/12 bg-black/20 px-4 py-3.5 sm:items-center sm:gap-4 sm:px-5 sm:py-4"
                          >
                            <span className="text-xs font-semibold text-[#F5D67A]">
                              {String(titleIndex + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-base font-semibold leading-6 text-white">{title}</h3>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contact"
                        className="mt-auto inline-flex items-center gap-2 pt-10 text-sm uppercase tracking-[0.24em] text-[#F5D67A] transition group-hover:translate-x-1"
                      >
                        Book Now
                        <ArrowRight size={16} />
                      </Link>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">{service.title}</h3>

                      <div className="mt-7 space-y-3">
                        <details
                          className="group/accordion rounded-lg border border-white/12 bg-black/20 open:border-[#D4AF37]/30"
                        >
                          <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5 [&::-webkit-details-marker]:hidden">
                            <span className="text-xs font-semibold text-[#F5D67A]">01</span>
                            <h4 className="flex-1 text-base font-semibold text-white">Course Details</h4>
                            <Plus size={18} className="text-white/70 group-open/accordion:hidden" />
                            <Minus size={18} className="hidden text-[#F5D67A] group-open/accordion:block" />
                          </summary>
                          <ul className="list-disc space-y-2 border-t border-white/8 px-4 py-4 pl-9 text-sm leading-7 text-white/72 marker:text-[#D4AF37] sm:px-5 sm:pl-10 sm:text-base">
                            {service.details.map((detail) => (
                              <li key={detail} className="pl-1">{detail}</li>
                            ))}
                          </ul>
                        </details>

                        <details className="group/accordion rounded-lg border border-white/12 bg-black/20 open:border-[#D4AF37]/30">
                          <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5 [&::-webkit-details-marker]:hidden">
                            <span className="text-xs font-semibold text-[#F5D67A]">02</span>
                            <h4 className="flex-1 text-base font-semibold text-white">Syllabus</h4>
                            <Plus size={18} className="text-white/70 group-open/accordion:hidden" />
                            <Minus size={18} className="hidden text-[#F5D67A] group-open/accordion:block" />
                          </summary>
                          <ul className="space-y-2.5 border-t border-white/8 px-4 py-4 text-xs uppercase tracking-[0.1em] text-white/82 sm:px-5 sm:text-sm sm:tracking-[0.12em]">
                            {service.syllabus.map((topic) => (
                              <li key={topic} className="flex items-start gap-3 leading-6">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>

                      <Link
                        to="/contact"
                        className="mt-auto inline-flex items-center gap-2 pt-10 text-sm uppercase tracking-[0.24em] text-[#F5D67A] transition group-hover:translate-x-1"
                      >
                        {service.cta}
                        <ArrowRight size={16} />
                      </Link>
                    </>
                  )}
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
    <ParallaxSection className="px-4 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl leading-tight text-[#F5D67A] sm:text-4xl md:text-5xl">Founder&apos;s Note</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
            OGHA Soundworks was born from a simple vision—to create a space where musicians and creators can come
            together, collaborate, and inspire one another. Alongside delivering professional audio services, my mission
            is to promote music production and sound engineering education by sharing knowledge and supporting aspiring
            artists and engineers on their creative journey.
          </p>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}

function AchievementCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % achievementSlides.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + achievementSlides.length) % achievementSlides.length)
  }

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % achievementSlides.length)
  }

  return (
    <ParallaxSection className="px-4 pb-10 pt-6 md:px-8 md:pt-8">
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-7 text-center">
          <h2 className="font-display text-3xl leading-tight text-[#F5D67A] sm:text-4xl md:text-5xl">Milestones Along The Way</h2>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-[#D4AF37]/30 bg-[#0a0a0a] shadow-[0_0_45px_rgba(212,175,55,0.1)]">
          <div className="relative aspect-[4/3] sm:aspect-[16/8] md:aspect-[16/7]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide}
                src={achievementSlides[activeSlide].image}
                alt={`${achievementSlides[activeSlide].label} placeholder`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:gap-4 sm:p-5 md:p-7">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[#F5D67A]">
                  {achievementSlides[activeSlide].label}
                </p>
                <p className="mt-2 font-display text-xl text-white sm:text-2xl md:text-3xl">Achievement Highlight</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous achievement"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:border-[#F5D67A]/60 hover:text-[#F5D67A] sm:h-11 sm:w-11"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next achievement"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:border-[#F5D67A]/60 hover:text-[#F5D67A] sm:h-11 sm:w-11"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-white/10 px-5 py-4">
            {achievementSlides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${slide.label}`}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index ? 'w-9 bg-[#F5D67A]' : 'w-4 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </ParallaxSection>
  )
}

function WorksPage() {
  return (
    <ParallaxSection className="px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <section aria-labelledby="works-audio-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h1 id="works-audio-heading" className="font-display text-4xl text-[#F5D67A] sm:text-5xl md:text-6xl">
              Audiography
            </h1>
            <Music2 className="hidden text-[#F5D67A] sm:block" size={28} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {youtubeWorks.map((work, index) => {
              const videoId = getYouTubeVideoId(work.youtubeUrl)

              return (
                <motion.article
                  key={work.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                  className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.035]"
              >
                  <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[#080808]">
                    {videoId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        title={work.title}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_48%)] text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 text-[#F5D67A]">
                          <Play size={25} fill="currentColor" />
                        </span>
                        <p className="text-xs uppercase tracking-[0.25em] text-white/45">YouTube video coming here</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#F5D67A]">{work.category}</p>
                    <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">{work.title}</h3>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>
      </div>
    </ParallaxSection>
  )
}

function GallerySection() {
  const [galleryView, setGalleryView] = useState(null)
  const activePhotos = galleryView === 'studio' ? galleryPreviewPhotos : galleryPhotos

  useEffect(() => {
    if (!galleryView) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setGalleryView(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryView])

  return (
    <ParallaxSection className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center md:mb-14">
          <p className="mb-5 text-base uppercase tracking-[0.32em] text-[#F5D67A] sm:tracking-[0.45em] md:mb-6 md:text-lg">Studio Gallery</p>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            {[
              { label: 'Moments', view: 'gallery', image: deskWidePhoto },
              { label: 'Studio', view: 'studio', image: artistCornerPhoto },
            ].map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => setGalleryView(item.view)}
                className="group relative min-h-36 overflow-hidden rounded-lg border border-[#D4AF37]/35 text-left shadow-[0_0_35px_rgba(212,175,55,0.1)] transition hover:-translate-y-1 hover:border-[#F5D67A]/70 sm:min-h-44"
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/60 transition group-hover:bg-black/48" />
                <span className="relative flex min-h-36 items-end justify-between p-5 sm:min-h-44 sm:p-6">
                  <span className="font-display text-2xl text-white sm:text-3xl">{item.label}</span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5D67A]/50 bg-black/45 text-[#F5D67A] backdrop-blur-md">
                    <ImagePlus size={20} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {createPortal(<AnimatePresence>
        {galleryView ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] overflow-y-auto bg-black/95 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6 md:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="sticky top-2 z-10 mb-4 flex items-center justify-between rounded-full border border-white/10 bg-black/70 px-4 py-2.5 backdrop-blur-xl sm:top-4 sm:mb-6 sm:px-5 sm:py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#F5D67A]">
                    {galleryView === 'studio' ? 'Studio' : 'Moments'}
                  </p>
                  <p className="mt-1 hidden text-sm text-white/55 sm:block">
                    {galleryView === 'studio' ? 'A closer look inside the recording rooms' : 'OGHA Soundworks photo showcase'}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close gallery"
                  onClick={() => setGalleryView(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#D4AF37]/45 hover:text-[#F5D67A]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {activePhotos.map((item, index) => (
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
      </AnimatePresence>, document.body)}
    </ParallaxSection>
  )
}

function ContactSection() {
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
    <ParallaxSection className="px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-36" glow>
      <div className="mx-auto max-w-7xl">
        <GlassCard className="overflow-hidden border-[#D4AF37]/20">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <div className="p-5 sm:p-8 md:p-12">
              <SectionHeading
                eyebrow="Contact"
                title="Let's create something unforgettable"
                align="left"
                copy="Reach out for bookings, collaborations, classes, or production inquiries."
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
                      className="min-w-0 rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/55 sm:rounded-2xl sm:px-5 sm:py-4"
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
                    className="min-w-0 resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/55 sm:rounded-2xl sm:px-5 sm:py-4"
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

            <div className="relative border-t border-white/10 bg-[linear-gradient(180deg,rgba(245,214,122,0.12),rgba(0,0,0,0.2))] p-5 sm:p-8 md:p-12 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_34%)]" />
              <div className="relative">
                <BrandLogo size="lg" framed className="w-24" />
                <h3 className="mt-8 font-display text-3xl text-white">OGHA Soundworks</h3>
                <div className="mt-8 space-y-4 text-white/72">
                  <a
                    href="mailto:oghasoundworks@gmail.com"
                    className="flex min-w-0 items-center gap-3 transition hover:text-[#F5D67A]"
                  >
                    <Mail size={18} className="text-[#F5D67A]" />
                    <span className="min-w-0 break-all">oghasoundworks@gmail.com</span>
                  </a>
                  <a
                    href="tel:+918497066312"
                    className="flex items-center gap-3 transition hover:text-[#F5D67A]"
                  >
                    <Phone size={18} className="text-[#F5D67A]" />
                    8497066312
                  </a>
                </div>

                <div className="mt-10 flex gap-4">
                  {['instagram', 'youtube'].map((type) => (
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

function HomeContactCta() {
  return (
    <ParallaxSection className="px-4 py-10 md:px-8 md:py-12" glow>
      <div className="mx-auto flex max-w-7xl justify-center">
        <Link
          to="/contact"
          className="group relative flex min-h-32 w-full max-w-2xl items-end overflow-hidden rounded-lg border border-[#D4AF37]/40 shadow-[0_0_35px_rgba(212,175,55,0.12)] transition hover:-translate-y-1 hover:border-[#F5D67A]/75 sm:min-h-36"
        >
          <img
            src={contactMusicCta}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/68 transition group-hover:bg-black/58" />
          <span className="relative flex w-full items-center justify-between gap-4 p-5 sm:p-6 md:p-8">
            <span>
              <span className="block text-xs uppercase tracking-[0.28em] text-[#F5D67A] sm:tracking-[0.38em]">Get In Touch</span>
              <span className="mt-2 block font-display text-2xl text-white sm:text-3xl md:text-4xl">Contact Us</span>
            </span>
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F5D67A]/50 bg-black/45 text-[#F5D67A] backdrop-blur-md transition group-hover:translate-x-1">
              <ArrowRight size={21} />
            </span>
          </span>
        </Link>
      </div>
    </ParallaxSection>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/30 px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <BrandLogo size="md" />
          <div>
            <p className="font-display text-xl tracking-[0.24em] text-white">OGHA</p>
            <p className="text-xs uppercase tracking-[0.42em] text-[#F5D67A]">Soundworks</p>
          </div>
        </div>

        <p className="text-sm text-white/48">© 2026 OGHA Soundworks. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection preview />
      <GallerySection />
      <AchievementCarousel />
      <FounderSection />
      <HomeContactCta />
    </>
  )
}

function ServicesPage() {
  return <ServicesSection />
}

function ContactPage() {
  return <ContactSection />
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
            <Route path="/courses" element={<Navigate to="/services" replace />} />
            <Route path="/works" element={<WorksPage />} />
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
