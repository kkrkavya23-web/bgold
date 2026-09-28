import { useState, useEffect, useRef } from 'react'

import imgHero      from '@/imports/Screenshot_2026-09-21_235808.png'  // green-pink bridal — hero
import imgParty     from '@/imports/Screenshot_2026-09-21_235823.png'  // colorful lehenga party
import imgRed       from '@/imports/Screenshot_2026-09-21_235832.png'  // red lehenga bride
import imgLilac     from '@/imports/Screenshot_2026-09-21_235838.png'  // lilac engagement
import imgKundan    from '@/imports/Screenshot_2026-09-21_235844.png'  // red kundan bride
import imgCinematic from '@/imports/Screenshot_2026-09-21_235853.png'  // dramatic cinematic bride
import imgFloral    from '@/imports/Screenshot_2026-09-21_235903.png'  // floral lehenga sangeet
import imgPink      from '@/imports/Screenshot_2026-09-21_235911.png'  // aerial pink lehenga
import imgMaroon    from '@/imports/Screenshot_2026-09-21_235919.png'  // maroon velvet bride
import imgMoody     from '@/imports/Screenshot_2026-09-21_235940.png'  // moody dark portrait

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      '.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-blur,.reveal-rotate,.stagger,.divider'
    )
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Floating 3D balls ────────────────────────────────────────────────────────
const BALLS = [
  { s:88,  t:'5%',  l:'2%',  cls:'float-1', o:.62, c:'radial-gradient(circle at 34% 34%,#D9B98C,#8A5A35)' },
  { s:52,  t:'10%', r:'5%',  cls:'float-2', o:.52, c:'radial-gradient(circle at 34% 34%,#EFE4D3,#B88A55)' },
  { s:36,  t:'32%', l:'1%',  cls:'float-3', o:.42, c:'radial-gradient(circle at 34% 34%,#D9B98C,#5A3827)' },
  { s:68,  t:'50%', r:'2%',  cls:'float-4', o:.58, c:'radial-gradient(circle at 34% 34%,#EFE4D3,#8A5A35)' },
  { s:44,  t:'68%', l:'4%',  cls:'float-5', o:.48, c:'radial-gradient(circle at 34% 34%,#D9B98C,#B88A55)' },
  { s:30,  t:'78%', r:'8%',  cls:'float-6', o:.42, c:'radial-gradient(circle at 34% 34%,#EFE4D3,#8A5A35)' },
  { s:56,  t:'20%', l:'43%', cls:'float-7', o:.28, c:'radial-gradient(circle at 34% 34%,#E6D5BE,#B88A55)' },
  { s:26,  t:'57%', l:'27%', cls:'float-8', o:.32, c:'radial-gradient(circle at 34% 34%,#EFE4D3,#5A3827)' },
]

function FloatingBalls() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex:0}}>
      {BALLS.map((b,i) => (
        <div key={i} className={`ball-3d ${b.cls} pulse-glow`}
          style={{ width:b.s, height:b.s, top:b.t, left:b.l, right:(b as any).r,
            background:b.c, opacity:b.o,
            boxShadow:'0 8px 32px rgba(138,90,53,.28), inset 0 -4px 8px rgba(0,0,0,.12)' }} />
      ))}
    </div>
  )
}

// ─── Marquee banner ───────────────────────────────────────────────────────────
function Marquee() {
  const items = ['✦ Bridal Makeup','✦ Party Glam','✦ Airbrush Art','✦ HD Makeup','✦ Hair Styling','✦ Pre-Bridal','✦ Engagement','✦ Saree Draping']
  const doubled = [...items, ...items]
  return (
    <div style={{ background:'linear-gradient(90deg,#8A5A35,#5A3827)', overflow:'hidden', padding:'.55rem 0', zIndex:10, position:'relative' }}>
      <div className="marquee-inner">
        {doubled.map((t,i) => (
          <span key={i} style={{ color:'white', fontFamily:'Jost,sans-serif', fontWeight:500, fontSize:'.75rem',
            letterSpacing:'.12em', whiteSpace:'nowrap', padding:'0 2rem' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:'smooth' })
  }

  const links = ['Home','Services','Gallery','About','Reviews','FAQ','Contact']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(253,246,249,.95)' : 'rgba(253,246,249,.72)',
        borderBottom: scrolled ? '1px solid rgba(184,138,85,.25)' : 'none',
        boxShadow: scrolled ? '0 2px 40px rgba(138,90,53,.12)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => go('home')} className="flex flex-col leading-tight text-left">
          <span style={{ fontFamily:"'Great Vibes',cursive", fontSize:'1.8rem', color:'#8A5A35', lineHeight:1 }}>
            Ayushi
          </span>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.48rem', letterSpacing:'.22em',
            color:'#5A3827', textTransform:'uppercase', fontWeight:700 }}>
            Makeup Studio · Prayagraj
          </span>
        </button>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <li key={l}>
              <button onClick={() => go(l)}
                className="relative text-sm font-medium group"
                style={{ color:'#3B281D', fontFamily:'Jost,sans-serif', fontWeight:500 }}>
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-pink-500 transition-all duration-300 group-hover:w-full rounded" />
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => go('contact')} className="btn-primary px-5 py-2.5 text-sm">Book Now ✨</button>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
          {[0,1,2].map(i => (
            <span key={i} className="block h-0.5 rounded transition-all duration-300"
              style={{ width: i===1?(open?'1.5rem':'1rem'):'1.5rem', background:'#8A5A35',
                transform: open?(i===0?'rotate(45deg) translateY(8px)':i===2?'rotate(-45deg) translateY(-8px)':'none'):'none',
                opacity: open&&i===1?0:1 }} />
          ))}
        </button>
      </div>

      <div className={`mobile-nav lg:hidden px-5 pb-5 ${open?'open':''}`}
        style={{ background:'rgba(253,246,249,.98)', borderBottom:'1px solid rgba(184,138,85,.2)' }}>
        {links.map(l => (
          <button key={l} onClick={() => go(l)}
            className="block w-full text-left py-3 border-b text-sm font-medium"
            style={{ color:'#3B281D', borderColor:'rgba(184,138,85,.15)', fontFamily:'Jost' }}>{l}</button>
        ))}
        <button onClick={() => go('contact')} className="btn-primary w-full py-3.5 mt-4 text-sm">
          Book Appointment 💄
        </button>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background:'linear-gradient(135deg,#F8F4EC 0%,#EFE4D3 45%,#FBF7F0 100%)' }}>
      <div className="blur-orb" style={{width:700,height:700,top:'-220px',left:'-180px',background:'rgba(184,138,85,.14)'}} />
      <div className="blur-orb" style={{width:500,height:500,bottom:'-140px',right:'-120px',background:'rgba(138,90,53,.12)'}} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-14 items-center w-full py-16">
        {/* Text */}
        <div className="text-center lg:text-left">
          <div className="section-eyebrow mb-6 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            ✨ Premium Bridal Makeup · Prayagraj, UP
          </div>
          <h1 className="reveal font-script mb-1"
            style={{ fontSize:'clamp(3.5rem,10vw,7.5rem)', color:'#5A3827', lineHeight:.95 }}>
            Ayushi
          </h1>
          <h2 className="reveal font-display gradient-text"
            style={{ fontSize:'clamp(1rem,2.5vw,1.7rem)', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', marginBottom:'.5rem' }}>
            Makeup Studio
          </h2>
          <p className="reveal" style={{ fontFamily:'Jost', color:'#8A5A35', fontSize:'.76rem', letterSpacing:'.14em', fontWeight:600, marginBottom:'1.75rem' }}>
            Lukarganj, Prayagraj · Uttar Pradesh
          </p>
          <p className="reveal" style={{ fontFamily:'Jost', color:'#6A4936', fontSize:'1.02rem', lineHeight:1.88, maxWidth:'30rem', margin:'0 auto 2rem', textAlign:'inherit' }}>
            Where every bride becomes unforgettable. Artistry rooted in tradition, elevated by modern technique — transforming Prayagraj's most beautiful brides with precision, grace, and passion.
          </p>

          {/* Stats row */}
          <div className="flex justify-center lg:justify-start gap-8 mb-10 stagger reveal">
            {[['600+','Brides'],['7+','Yrs Exp.'],['5.0 ⭐','Rating'],['100%','Satisfaction']].map(([n,l]) => (
              <div key={l} className="text-center">
                <div className="stat-val">{n}</div>
                <div style={{color:'#5A3827',fontSize:'.68rem',fontFamily:'Jost',fontWeight:600,letterSpacing:'.05em'}}>{l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal">
            <button className="btn-primary px-9 py-4 text-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>
              Book Appointment 💄
            </button>
            <button className="btn-outline px-9 py-4 text-sm" onClick={() => document.getElementById('gallery')?.scrollIntoView({behavior:'smooth'})}>
              View Our Work →
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end reveal-rotate">
          <div style={{position:'relative',display:'inline-block'}}>
            {/* Outer spinning conic ring */}
            <div style={{
              position:'absolute', inset:'-16px',
              background:'conic-gradient(from 0deg,#B88A55,#E6D5BE,#8A5A35,#5A3827,#B88A55)',
              animation:'orbRotate 14s linear infinite',
              borderRadius:'60% 40% 55% 45%/45% 55% 40% 60%',
              zIndex:0,
            }} />
            {/* Dashed outer ring */}
            <div style={{
              position:'absolute', inset:'-32px',
              border:'1.5px dashed rgba(184,138,85,.38)',
              animation:'orbRotate 25s linear infinite reverse',
              borderRadius:'42% 58% 42% 58%/58% 42% 58% 42%',
              zIndex:0,
            }} />
            {/* Photo */}
            <div className="morph-border" style={{
              width:'clamp(280px,36vw,420px)', height:'clamp(360px,48vw,540px)',
              overflow:'hidden', position:'relative', zIndex:1,
              boxShadow:'0 40px 100px rgba(138,90,53,.42)',
              border:'5px solid rgba(255,255,255,.88)',
            }}>
              <img src={imgHero as string} alt="Ayushi Makeup Studio — Bridal Makeup Prayagraj"
                style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 55%,rgba(138,90,53,.07) 100%)'}} />
            </div>
            {/* Badges */}
            <div className="glass absolute -bottom-6 -left-7 px-5 py-3 rounded-2xl text-center"
              style={{boxShadow:'0 8px 36px rgba(138,90,53,.26)',zIndex:2,minWidth:138}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.3rem',fontWeight:700,color:'#8A5A35'}}>5.0 ⭐</div>
              <div style={{fontSize:'.6rem',color:'#5A3827',fontFamily:'Jost',fontWeight:700}}>Google Rated</div>
            </div>
            <div className="glass absolute -top-5 -right-6 px-4 py-3 rounded-2xl text-center"
              style={{boxShadow:'0 8px 36px rgba(138,90,53,.26)',zIndex:2}}>
              <div style={{fontSize:'1.3rem'}}>💄</div>
              <div style={{fontSize:'.6rem',color:'#5A3827',fontFamily:'Jost',fontWeight:700}}>Bridal Expert</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span style={{fontSize:'.6rem',color:'#8A5A35',letterSpacing:'.16em',fontFamily:'Jost',fontWeight:600}}>SCROLL</span>
        <div style={{width:1.5,height:28,background:'linear-gradient(#8A5A35,transparent)',borderRadius:2}} />
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {icon:'👰',title:'Bridal Makeup',desc:'Traditional & modern North Indian bridal looks — from heavy bridal to soft glam, tailored to your features.',price:'₹6,000+'},
  {icon:'🌸',title:'Party & Event Glam',desc:'Glamorous looks for receptions, engagements, sangeet, and all occasions — camera-ready, all night.',price:'₹2,500+'},
  {icon:'💄',title:'Airbrush Makeup',desc:'Flawless airbrushed skin that photographs perfectly. Lightweight, buildable, and ultra-long-lasting.',price:'₹4,500+'},
  {icon:'✨',title:'HD Makeup',desc:'High-definition makeup that looks stunning on-screen and in person — ideal for shoots and ceremonies.',price:'₹3,500+'},
  {icon:'💍',title:'Engagement Makeup',desc:'Luminous dewy looks that complement your ring, outfit, and venue — a softer elegance for the ring ceremony.',price:'₹3,000+'},
  {icon:'💇','title':'Hair Styling',desc:'Bridal buns, cascading curls, intricate braids, and traditional hairdos — complete with gajra and accessories.',price:'₹1,800+'},
  {icon:'🎀',title:'Pre-Bridal Package',desc:'Full skin-prep, waxing, threading, facial and trial makeup session — the perfect bridal runway.',price:'₹5,500+'},
  {icon:'🌺',title:'Mehendi & Sangeet',desc:'Effortless glow for mehendi and haldi ceremonies — light, romantic looks that enhance your natural radiance.',price:'₹2,000+'},
]

function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden"
      style={{background:'linear-gradient(175deg,#F4EADD 0%,#F8F4EC 100%)'}}>
      <div className="blur-orb" style={{width:360,height:360,top:'6%',right:'-80px',background:'rgba(184,138,85,.1)'}} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16 reveal">
          <div className="divider" />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#8A5A35',lineHeight:1.1}}>Our Expertise</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'#302319',marginTop:'.25rem'}}>
            Artistry for Every Occasion
          </h2>
          <p style={{color:'#6A4936',fontFamily:'Jost',maxWidth:540,margin:'.9rem auto 0',fontSize:'.92rem',lineHeight:1.8}}>
            From intimate home ceremonies to grand wedding mandaps in Prayagraj — full professional glam at your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger reveal">
          {SERVICES.map((s) => (
            <div key={s.title} className="card-tilt rounded-3xl p-7 text-center"
              style={{background:'rgba(255,255,255,.9)',backdropFilter:'blur(18px)',
                border:'1px solid rgba(184,138,85,.16)',boxShadow:'0 6px 30px rgba(138,90,53,.06)'}}>
              <div className="mx-auto mb-5 flex items-center justify-center rounded-2xl"
                style={{width:62,height:62,fontSize:'2rem',background:'linear-gradient(135deg,#EFE4D3,#E6D5BE)'}}>
                {s.icon}
              </div>
              <h3 className="font-display mb-2" style={{fontWeight:700,fontSize:'1.1rem',color:'#302319'}}>{s.title}</h3>
              <p style={{color:'#6A4936',fontSize:'.78rem',fontFamily:'Jost',lineHeight:1.75}} className="mb-5">{s.desc}</p>
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{background:'linear-gradient(135deg,#8A5A35,#B88A55)',color:'white',fontFamily:'Jost'}}>
                {s.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
const GALLERY = [
  {src:imgHero,     alt:'Green-pink bridal with gold maang tikka',big:true},
  {src:imgCinematic,alt:'Dramatic cinematic bridal portrait',big:false},
  {src:imgRed,      alt:'Bride in red lehenga with green kundan',big:false},
  {src:imgPink,     alt:'Aerial view — bride in pink lehenga',big:false},
  {src:imgMaroon,   alt:'Bride in maroon velvet lehenga',big:false},
  {src:imgMoody,    alt:'Moody dark artistic bridal portrait',big:false},
  {src:imgParty,    alt:'Colorful party glam look',big:false},
  {src:imgFloral,   alt:'Sangeet look in floral lehenga',big:false},
  {src:imgLilac,    alt:'Lilac engagement gown look',big:false},
  {src:imgKundan,   alt:'Red bridal with heavy kundan jewelry',big:false},
]

function Gallery() {
  const [lb, setLb] = useState<string|null>(null)

  return (
    <section id="gallery" className="relative py-24 overflow-hidden noise"
      style={{background:'linear-gradient(135deg,#302319 0%,#3B281D 55%,#302319 100%)'}}>
      <div className="blur-orb" style={{width:420,height:420,top:'12%',left:'-110px',background:'rgba(184,138,85,.13)'}} />
      <div className="blur-orb" style={{width:380,height:380,bottom:'8%',right:'-90px',background:'rgba(138,90,53,.13)'}} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16 reveal">
          <div className="divider" style={{background:'linear-gradient(90deg,transparent,#E6D5BE,white,#E6D5BE,transparent)'}} />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#E6D5BE',lineHeight:1.1}}>Our Portfolio</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'white',marginTop:'.25rem'}}>
            Bridal Gallery
          </h2>
          <p style={{color:'rgba(252,228,238,.82)',fontFamily:'Jost',maxWidth:500,margin:'.9rem auto 0',fontSize:'.9rem'}}>
            Every look is a masterpiece. Real brides transformed by Ayushi Makeup Studio — Prayagraj's most trusted bridal artist.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger reveal">
          {GALLERY.map((img,i) => (
            <div key={i}
              className={`gallery-item rounded-2xl ${i===0?'row-span-2 col-span-2 md:col-span-1 md:row-span-2':''}`}
              style={{height: i===0?520:240}}
              onClick={() => setLb(img.src as string)}>
              <img src={img.src as string} alt={img.alt}
                style={{objectPosition:'center top'}} />
              <div className="gallery-overlay flex items-end p-4">
                <span style={{color:'white',fontFamily:'Jost',fontSize:'.7rem',fontWeight:500}}>{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lb && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{background:'rgba(0,0,0,.93)',backdropFilter:'blur(12px)'}}
          onClick={() => setLb(null)}>
          <img src={lb} alt="Full view"
            style={{maxWidth:'90vw',maxHeight:'90vh',objectFit:'contain',borderRadius:14,
              boxShadow:'0 0 100px rgba(138,90,53,.45)'}} />
          <button className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{background:'rgba(138,90,53,.85)'}} onClick={() => setLb(null)}>×</button>
        </div>
      )}
    </section>
  )
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const WHY = [
  {icon:'🎨',title:'Certified Bridal Artist',desc:'7+ years of bridal expertise in North Indian styles — Banarasi, Lucknowi, Rajasthani and contemporary fusion looks.'},
  {icon:'📸',title:'Camera-Perfect Results',desc:'We understand what looks stunning on camera and in real life. Every look is designed to be reel-worthy.'},
  {icon:'🏠',title:'Doorstep Studio Service',desc:'We come to you! Full bridal setup and service available at your home or venue across Prayagraj and Allahabad.'},
  {icon:'💎',title:'Premium Products Only',desc:'MAC, Huda Beauty, NARS, Kryolan, Kay Beauty — only professional-grade, skin-safe brands every time.'},
  {icon:'⏰',title:'Always Punctual',desc:'We arrive early and work to your timeline. Wedding mornings should be calm — we make sure they are.'},
  {icon:'💖',title:'Personalised Consultation',desc:'Every bride gets a dedicated consultation. We study your skin tone, outfit, venue, and vision before we begin.'},
]

function WhyChooseUs() {
  return (
    <section id="about" className="relative py-24 overflow-hidden"
      style={{background:'linear-gradient(175deg,#F8F4EC 0%,#EFE4D3 100%)'}}>
      <div className="blur-orb" style={{width:420,height:420,bottom:'-100px',left:'-100px',background:'rgba(244,184,206,.26)'}} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16 reveal">
          <div className="divider" />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#8A5A35',lineHeight:1.1}}>Why Choose Us</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'#302319',marginTop:'.25rem'}}>
            The Ayushi Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 stagger reveal">
          {WHY.map(item => (
            <div key={item.title} className="card-tilt flex gap-5 p-7 rounded-3xl"
              style={{background:'rgba(255,255,255,.82)',border:'1px solid rgba(184,138,85,.16)',
                boxShadow:'0 8px 32px rgba(138,90,53,.07)'}}>
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{background:'linear-gradient(135deg,#EFE4D3,#E6D5BE)'}}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-display mb-2" style={{fontWeight:700,color:'#302319',fontSize:'1.05rem'}}>{item.title}</h3>
                <p style={{color:'#6A4936',fontSize:'.8rem',fontFamily:'Jost',lineHeight:1.78}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COMPLIMENTS (5 sections) ─────────────────────────────────────────────────
interface ComplimentProps {
  img: string; eyebrow: string; quote: string; name: string; detail: string; flip?: boolean; dark?: boolean;
}
function ComplimentBlock({ img, eyebrow, quote, name, detail, flip, dark }: ComplimentProps) {
  const textSide = (
    <div className={`space-y-5 ${flip ? 'reveal-left' : 'reveal-right'}`}>
      <div className="font-script" style={{fontSize:'2rem',color: dark?'#E6D5BE':'#8A5A35',lineHeight:1}}>{eyebrow}</div>
      <div className="quote-mark">"</div>
      <h2 className="font-display" style={{fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:700,color: dark?'white':'#302319',marginTop:'-2rem',lineHeight:1.25}}>
        {quote}
      </h2>
      <p style={{color: dark?'rgba(252,228,238,.88)':'#6A4936',fontFamily:'Jost',lineHeight:1.9,fontSize:'.9rem'}}>{detail}</p>
      <div className="flex gap-1">{Array.from({length:5}).map((_,i) => <span key={i} style={{color:'#f0c040',fontSize:'1.1rem'}}>★</span>)}</div>
    </div>
  )
  const photoSide = (
    <div className={`${flip ? 'reveal-right' : 'reveal-left'} flex justify-center`}>
      <div style={{width:'clamp(260px,35vw,400px)',height:'clamp(320px,44vw,510px)',borderRadius:'2.5rem',overflow:'hidden',
        boxShadow: dark?'0 24px 80px rgba(0,0,0,.5)':'0 24px 70px rgba(138,90,53,.24)',
        border: dark?'3px solid rgba(244,184,206,.25)':'3px solid rgba(255,255,255,.9)'}}>
        <img src={img} alt={name} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />
      </div>
    </div>
  )

  return (
    <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
      {flip ? <>{photoSide}{textSide}</> : <>{textSide}{photoSide}</>}
    </div>
  )
}

function Compliments() {
  return (
    <section className="relative py-24 overflow-hidden" style={{background:'#F8F4EC'}}>
      <div className="blur-orb" style={{width:380,height:380,top:'5%',right:'-80px',background:'rgba(184,138,85,.1)'}} />
      <div className="blur-orb" style={{width:300,height:300,bottom:'10%',left:'-60px',background:'rgba(138,90,53,.08)'}} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-20 reveal">
          <div className="divider" />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#8A5A35',lineHeight:1.1}}>Bridal Stories</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'#302319',marginTop:'.25rem'}}>
            Words That Moved Us
          </h2>
        </div>

        {/* Compliment I */}
        <ComplimentBlock
          img={imgCinematic as string} eyebrow="Compliment I"
          quote='"She made me feel like the most beautiful woman in the room"'
          name="Priya Tiwari, Bride 2024"
          detail="— Priya Tiwari, Bride 2024 · Prayagraj&nbsp;&nbsp;&nbsp;&quot;Ayushi ji's work is beyond anything I imagined. The cinematic bridal look she created for me had everyone in tears of joy. My makeup lasted all six hours of the wedding and still looked fresh in every photograph.&quot;"
        />

        {/* Compliment II */}
        <ComplimentBlock
          img={imgPink as string} eyebrow="Compliment II"
          quote='"The most magical transformation I have ever experienced"'
          name="Neha Gupta, Bride 2024"
          detail="— Neha Gupta, Bride 2024 · Allahabad&nbsp;&nbsp;&nbsp;&quot;I wore a pink lehenga and was nervous about the makeup matching. Ayushi ji chose the perfect palette and the result was literally straight out of a magazine spread. Every single guest asked who did my makeup!&quot;"
          flip
        />

        {/* Dark premium compliment III */}
        <div className="rounded-[2.5rem] p-10 md:p-16 mb-24 reveal noise"
          style={{background:'linear-gradient(135deg,#302319,#3B281D)',boxShadow:'0 36px 100px rgba(48,35,25,.5)'}}>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-5">
              <div className="font-script" style={{fontSize:'2rem',color:'#E6D5BE'}}>Compliment III</div>
              <div className="quote-mark" style={{color:'rgba(244,184,206,.12)'}}>&ldquo;</div>
              <h2 className="font-display" style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:700,color:'white',marginTop:'-2rem',lineHeight:1.3}}>
                "Every photo looks like it belongs in Vogue India"
              </h2>
              <p style={{color:'rgba(252,228,238,.88)',fontFamily:'Jost',lineHeight:1.9,fontSize:'.9rem'}}>
                — Aishwarya Shukla, Bride 2025 · Naini&nbsp;&nbsp;&nbsp;"The HD airbrush makeup Ayushi di did was absolutely next-level. My wedding photographer said it was the easiest shoot of his career — my skin looked perfect under every lighting. I will recommend Ayushi Makeup Studio to every bride I know."
              </p>
              <div className="flex gap-1">{Array.from({length:5}).map((_,i) => <span key={i} style={{color:'#f0c040',fontSize:'1.1rem'}}>★</span>)}</div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              {[imgMaroon,imgMoody].map((src,i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{width:180,height:230,boxShadow:'0 12px 40px rgba(0,0,0,.5)',border:'2px solid rgba(244,184,206,.2)'}}>
                  <img src={src as string} alt="Bride" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliment IV */}
        <ComplimentBlock
          img={imgKundan as string} eyebrow="Compliment IV"
          quote='"I cried when I saw myself in the mirror — tears of pure joy"'
          name="Roshni Verma, Bride 2025"
          detail="— Roshni Verma, Bride 2025 · Phaphamau&nbsp;&nbsp;&nbsp;&quot;I had specific references from Pinterest and Ayushi di not only matched them — she exceeded them. The kundan jewelry look she created for me was absolutely regal. I felt like a queen walking down the aisle.&quot;"
        />

        {/* Compliment V */}
        <ComplimentBlock
          img={imgFloral as string} eyebrow="Compliment V"
          quote='"The most effortless glam I have ever worn — pure artistry"'
          name="Simran Bajpai, Sangeet 2025"
          detail="— Simran Bajpai, Sangeet Look · Prayagraj&nbsp;&nbsp;&nbsp;&quot;Ayushi ji did my sangeet makeup and hair and I felt like a completely different (better!) version of myself. The soft floral look she chose perfectly matched my lehenga. Dancing all night and still looking flawless — that's her superpower!&quot;"
          flip
        />
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
const REVIEWS = [
  {name:'Ankita Srivastava',role:'Bride, Jan 2025',img:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop',text:'Ayushi ji is an absolute magician. She understood my vision immediately and the result was stunning. My bridal look lasted the entire day through all rituals. Best decision I made for my wedding was booking her!',stars:5},
  {name:'Priya Pandey',role:'Party Makeup',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop',text:'I have been getting my makeup done from Ayushi Studio for every family event now. The quality is consistently amazing, she always delivers something more beautiful than what I imagined. Highly recommend!',stars:5},
  {name:'Deepa Mishra',role:'Bride, Nov 2024',img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',text:'Got my bridal makeup done from Ayushi Makeup Studio and I am so glad I did. She came home on time, was so professional and calm, and the makeup was absolutely perfect. My mother-in-law even complimented it!',stars:5},
  {name:'Shruti Dubey',role:'Engagement Look',img:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&h=120&fit=crop',text:'Had the most beautiful engagement makeup done by Ayushi di. The soft dewy look she created for me was perfect — everyone kept saying I looked like I was glowing from within. Will definitely book again for the wedding!',stars:5},
  {name:'Kavita Yadav',role:'Bride, Feb 2025',img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop',text:'The airbrush makeup Ayushi ji does is literally like a filter in real life. It looked so natural yet flawless. 10 hours later at the reception and I still looked as fresh as the morning. Worth every rupee and more!',stars:5},
  {name:'Pooja Tripathi',role:'Bride, Dec 2024',img:'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=120&h=120&fit=crop',text:'I live in Naini and Ayushi ji came all the way for my wedding. So professional and dedicated. The look she created for my red lehenga was absolutely breathtaking. My photos are magazine-worthy because of her!',stars:5},
]

function Reviews() {
  return (
    <section id="reviews" className="relative py-24 overflow-hidden noise"
      style={{background:'linear-gradient(135deg,#5A3827 0%,#8A5A35 55%,#5A3827 100%)'}}>
      <div className="blur-orb" style={{width:500,height:500,top:'-100px',right:'-150px',background:'rgba(255,255,255,.05)'}} />
      <div className="blur-orb" style={{width:400,height:400,bottom:'-100px',left:'-100px',background:'rgba(0,0,0,.14)'}} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16 reveal">
          <div className="divider" style={{background:'linear-gradient(90deg,transparent,#EFE4D3,white,#EFE4D3,transparent)'}} />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#EFE4D3',lineHeight:1.1}}>Kind Words</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'white',marginTop:'.25rem'}}>
            Our Happy Brides
          </h2>
          <p style={{color:'rgba(252,228,238,.82)',fontFamily:'Jost',maxWidth:480,margin:'.9rem auto 0',fontSize:'.9rem'}}>
            600+ brides and counting — Prayagraj's most trusted makeup studio for every celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger reveal">
          {REVIEWS.map(r => (
            <div key={r.name} className="card-hover glass-dark rounded-3xl p-7"
              style={{boxShadow:'0 8px 44px rgba(0,0,0,.2)'}}>
              <div className="flex gap-1 mb-4">{Array.from({length:r.stars}).map((_,s) => <span key={s} style={{color:'#f0c040',fontSize:'1.05rem'}}>★</span>)}</div>
              <p style={{color:'rgba(252,228,238,.9)',fontFamily:'Jost',fontSize:'.84rem',lineHeight:1.82,fontStyle:'italic'}} className="mb-6">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <img src={r.img} alt={r.name} style={{width:42,height:42,borderRadius:'50%',objectFit:'cover',border:'2px solid rgba(244,184,206,.45)'}} />
                <div>
                  <div className="font-display" style={{color:'white',fontWeight:600,fontSize:'.94rem'}}>{r.name}</div>
                  <div style={{color:'rgba(244,184,206,.75)',fontFamily:'Jost',fontSize:'.68rem'}}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 reveal">
          <div className="inline-flex items-center gap-8 px-12 py-7 rounded-3xl glass"
            style={{boxShadow:'0 8px 44px rgba(0,0,0,.22)'}}>
            <div>
              <div className="font-display" style={{fontSize:'4.2rem',fontWeight:800,color:'white',lineHeight:1}}>5.0</div>
              <div className="flex justify-center gap-0.5 mt-1">{Array.from({length:5}).map((_,i) => <span key={i} style={{color:'#f0c040',fontSize:'1.3rem'}}>★</span>)}</div>
            </div>
            <div style={{width:1,height:60,background:'rgba(255,255,255,.28)'}} />
            <div>
              <div className="font-display" style={{color:'white',fontWeight:700,fontSize:'1.5rem'}}>600+ Reviews</div>
              <div style={{color:'rgba(252,228,238,.72)',fontFamily:'Jost',fontSize:'.78rem'}}>Google · Instagram · Prayagraj</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {q:'How early should I book for my bridal makeup?',a:'For bridal makeup in Prayagraj, we recommend booking 2–4 months ahead, especially for peak wedding season (October–March). For party or engagement makeup, 2–3 weeks notice is usually fine.'},
  {q:'Do you offer home/venue service?',a:'Yes! We provide full doorstep bridal service across Prayagraj, Allahabad, Naini, Phaphamau, and surrounding areas. Please mention your location while booking so we can plan accordingly.'},
  {q:'Is a bridal trial session available?',a:'Absolutely recommended! A trial 1–2 weeks before the wedding lets us perfect your look, test products on your skin, and ensure you are 100% confident going into your big day.'},
  {q:'How long does bridal makeup + hair take?',a:'Full bridal makeup and hair typically takes 3–5 hours. We schedule arrival well before ceremony time so there is no rush and you feel completely calm.'},
  {q:'What products do you use?',a:'We use only professional-grade products — MAC, Huda Beauty, NARS, Kryolan, Kay Beauty, and more. All products are skin-safe and tested for sensitive skin. Please mention allergies during consultation.'},
  {q:'Can you handle the full bridal party?',a:'Yes! For larger groups, we bring an additional trained assistant. Please mention the total number of people during booking so we can plan the timeline.'},
  {q:'What is your cancellation policy?',a:'Cancellations 7+ days before the event: full advance refund. Within 7 days: 50% advance non-refundable. Rescheduling is accommodated based on availability at no extra charge.'},
  {q:'Do you also do pre-bridal skincare?',a:'Yes — our Pre-Bridal Package includes facial, threading, waxing, skin prep, and a full trial makeup session. Start 1–2 months before your wedding for the best results.'},
]

function FAQ() {
  const [open,setOpen] = useState<number|null>(null)
  return (
    <section id="faq" className="relative py-24 overflow-hidden"
      style={{background:'linear-gradient(175deg,#F8F4EC 0%,#EFE4D3 100%)'}}>
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16 reveal">
          <div className="divider" />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#8A5A35',lineHeight:1.1}}>Got Questions?</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'#302319',marginTop:'.25rem'}}>
            Frequently Asked
          </h2>
        </div>
        <div className="space-y-4 stagger reveal">
          {FAQS.map((f,i) => (
            <div key={i} className="rounded-2xl overflow-hidden"
              style={{background:'rgba(255,255,255,.92)',
                border:open===i?'1px solid rgba(138,90,53,.48)':'1px solid rgba(184,138,85,.16)',
                boxShadow:open===i?'0 8px 32px rgba(138,90,53,.14)':'0 2px 12px rgba(138,90,53,.05)',
                transition:'box-shadow .3s ease, border-color .3s ease'}}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open===i?null:i)}>
                <span className="font-display" style={{fontWeight:600,color:'#302319',fontSize:'1rem'}}>{f.q}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-4 text-white transition-transform duration-300"
                  style={{background:'linear-gradient(135deg,#8A5A35,#B88A55)',transform:open===i?'rotate(45deg)':'none',fontSize:'1.3rem',fontWeight:700}}>
                  +
                </span>
              </button>
              <div className={`faq-body ${open===i?'open':''} px-6 pb-5`}>
                <p style={{color:'#6A4936',fontFamily:'Jost',fontSize:'.86rem',lineHeight:1.8}}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Appointment ──────────────────────────────────────────────────────────────
function Appointment() {
  const [form,setForm] = useState({name:'',phone:'',email:'',service:'',date:'',message:''})
  const [sent,setSent] = useState(false)

  const submit = (e:React.FormEvent) => {
    e.preventDefault()
    const msg = `Hello Ayushi Makeup Studio! I'd like to book an appointment.%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AService: ${form.service}%0ADate: ${form.date}%0AMessage: ${form.message}`
    window.open(`https://wa.me/917617055381?text=${msg}`,'_blank')
    setSent(true); setTimeout(()=>setSent(false),4000)
  }

  const is = {background:'rgba(255,255,255,.92)',border:'1px solid rgba(184,138,85,.25)',color:'#302319',fontFamily:'Jost'}
  const ic = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"

  return (
    <section id="contact" className="relative py-24 overflow-hidden noise"
      style={{background:'linear-gradient(135deg,#302319 0%,#3B281D 100%)'}}>
      <div className="blur-orb" style={{width:460,height:460,top:'-100px',right:'-100px',background:'rgba(184,138,85,.08)'}} />
      <div className="blur-orb" style={{width:360,height:360,bottom:'-100px',left:'-80px',background:'rgba(244,184,206,.07)'}} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div className="reveal-left">
          <div className="divider" style={{background:'linear-gradient(90deg,transparent,#E6D5BE,#EFE4D3,#E6D5BE,transparent)',margin:'0 0 1.5rem'}} />
          <p className="font-script" style={{fontSize:'2.8rem',color:'#E6D5BE',lineHeight:1.1}}>Book Now</p>
          <h2 className="font-display" style={{fontSize:'clamp(2rem,4vw,2.9rem)',fontWeight:700,color:'white',marginTop:'.25rem',marginBottom:'1.5rem'}}>
            Reserve Your<br />Glamour Session
          </h2>
          <p style={{color:'rgba(252,228,238,.84)',fontFamily:'Jost',lineHeight:1.88,fontSize:'.9rem'}} className="mb-10">
            Fill the form and we'll redirect you to WhatsApp to confirm your booking. We reply within 24 hours with a personalised consultation questionnaire.
          </p>
          <div className="space-y-5">
            {[
              {icon:'📍',label:'Studio Address',val:'12A, 1, Lukarganj, Prayagraj, Uttar Pradesh 211001'},
              {icon:'📞',label:'Mobile / WhatsApp',val:'07617055381'},
              {icon:'📸',label:'Instagram',val:'instagram.com'},
            ].map(item => (
              <div key={item.label} className="flex gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                  style={{background:'rgba(244,184,206,.12)',border:'1px solid rgba(244,184,206,.26)'}}>
                  {item.icon}
                </div>
                <div>
                  <div style={{color:'rgba(244,184,206,.65)',fontFamily:'Jost',fontSize:'.66rem',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase'}}>{item.label}</div>
                  <div style={{color:'white',fontFamily:'Jost',fontSize:'.88rem',marginTop:'.2rem'}}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Feature photo */}
          <div className="mt-10 rounded-2xl overflow-hidden" style={{height:200,boxShadow:'0 14px 44px rgba(0,0,0,.4)'}}>
            <img src={imgLilac as string} alt="Ayushi Makeup Studio — elegant look"
              style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />
          </div>
        </div>

        {/* Form */}
        <div className="reveal-right">
          <form onSubmit={submit} className="glass-dark rounded-3xl p-8 space-y-4"
            style={{boxShadow:'0 24px 70px rgba(0,0,0,.34)'}}>
            <h3 className="font-display" style={{fontWeight:700,color:'white',fontSize:'1.5rem',marginBottom:'.5rem'}}>
              Appointment Details ✨
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Your Name" className={ic} style={is} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
              <input required placeholder="Phone Number" className={ic} style={is} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            </div>
            <input type="email" placeholder="Email Address" className={ic} style={is} value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <select required className={ic} style={{...is,cursor:'pointer'}} value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
              <option value="">Select Service</option>
              {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
            </select>
            <input type="date" required className={ic} style={is} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
            <textarea placeholder="Any special requests..." rows={3} className={ic} style={{...is,resize:'none'}} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
            <button type="submit" className="btn-primary w-full py-4 text-sm">
              {sent?'✅ Opening WhatsApp...':'💄 Book via WhatsApp'}
            </button>
            <p style={{color:'rgba(244,184,206,.5)',fontFamily:'Jost',fontSize:'.66rem',textAlign:'center'}}>
              Details sent securely via WhatsApp · Reply within 24 hrs
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── Map ─────────────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section id="map" className="py-16 px-6 sm:px-10" style={{background:'#F8F4EC'}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="divider" />
          <p className="font-script" style={{fontSize:'2.2rem',color:'#8A5A35',lineHeight:1.1}}>Find Our Studio</p>
          <h2 className="font-display" style={{fontSize:'2.2rem',fontWeight:700,color:'#302319',marginTop:'.25rem'}}>Visit Us in Prayagraj</h2>
          <p style={{color:'#6A4936',fontFamily:'Jost',fontSize:'.88rem',marginTop:'.5rem'}}>
            12A, 1, Lukarganj, Prayagraj, Uttar Pradesh 211001
          </p>
        </div>
        <div className="map-wrap reveal" style={{height:420}}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d81.85!3d25.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb3b21e72b83%3A0x1!2sLukarganj%2C+Prayagraj%2C+Uttar+Pradesh+211001!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
            width="100%" height="100%" style={{border:0,display:'block'}}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Ayushi Makeup Studio — Lukarganj, Prayagraj" />
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative py-24 overflow-hidden text-center noise"
      style={{background:'linear-gradient(135deg,#8A5A35 0%,#B88A55 50%,#8A5A35 100%)',backgroundSize:'200% 200%',animation:'gradShift 6s ease infinite'}}>
      <div className="blur-orb" style={{width:420,height:420,top:'-100px',left:'-100px',background:'rgba(255,255,255,.1)'}} />
      <div className="blur-orb" style={{width:320,height:320,bottom:'-80px',right:'-80px',background:'rgba(0,0,0,.1)'}} />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-5xl mb-5 reveal">💄</div>
        <p className="font-script reveal" style={{fontSize:'2.8rem',color:'rgba(255,255,255,.92)',lineHeight:1.1}}>Your Dream Look Awaits</p>
        <h2 className="font-display reveal" style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:800,color:'white',marginTop:'.5rem',marginBottom:'1.5rem'}}>
          Let's Create Magic Together
        </h2>
        <p className="reveal" style={{color:'rgba(255,255,255,.9)',fontFamily:'Jost',fontSize:'1rem',lineHeight:1.88,marginBottom:'2.5rem'}}>
          Whether it's your wedding, engagement, sangeet, or any special occasion — Ayushi Makeup Studio is here to make you look and feel absolutely extraordinary. Serving all brides across Prayagraj and Uttar Pradesh.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <a href="https://wa.me/917617055381" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white font-semibold px-9 py-4 rounded-full text-sm hover:scale-105 transition-transform"
            style={{color:'#8A5A35',fontFamily:'Jost'}}>
            <span>💬</span> Chat on WhatsApp
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-9 py-4 rounded-full text-sm hover:bg-white transition-all"
            style={{fontFamily:'Jost'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#8A5A35')}
            onMouseLeave={e=>(e.currentTarget.style.color='white')}>
            <span>📸</span> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const go = (id:string) => document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:'smooth'})
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden" style={{background:'#20170F'}}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="font-script" style={{fontSize:'2.6rem',color:'#B88A55',lineHeight:1}}>Ayushi</div>
            <div style={{fontFamily:'Jost',fontSize:'.5rem',letterSpacing:'.24em',color:'#E6D5BE',textTransform:'uppercase',fontWeight:700}}>
              Makeup Studio · Prayagraj
            </div>
            <p style={{color:'rgba(244,184,206,.58)',fontFamily:'Jost',fontSize:'.8rem',lineHeight:1.82,marginTop:'1rem'}}>
              Prayagraj's most trusted bridal makeup studio. Crafting timeless, flawless looks for every bride with artistry, love, and precision since 2017.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://wa.me/917617055381" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform" style={{background:'#25D366'}}>💬</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform"
                style={{background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}}>📸</a>
              <a href="tel:+917617055381"
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform" style={{background:'#8A5A35'}}>📞</a>
            </div>
          </div>
          <div>
            <h4 className="font-display" style={{fontWeight:700,color:'white',marginBottom:'1rem'}}>Quick Links</h4>
            <ul className="space-y-2">
              {['Services','Gallery','Reviews','FAQ','Contact'].map(l => (
                <li key={l}>
                  <button onClick={() => go(l)} style={{color:'rgba(244,184,206,.65)',fontFamily:'Jost',fontSize:'.84rem'}}
                    className="hover:text-pink-300 transition-colors">→ {l}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display" style={{fontWeight:700,color:'white',marginBottom:'1rem'}}>Studio Contact</h4>
            <div className="space-y-3">
              <p style={{color:'rgba(244,184,206,.65)',fontFamily:'Jost',fontSize:'.8rem',lineHeight:1.72}}>
                📍 12A, 1, Lukarganj,<br />Prayagraj, Uttar Pradesh 211001
              </p>
              <p style={{color:'rgba(244,184,206,.65)',fontFamily:'Jost',fontSize:'.8rem'}}>📞 07617055381</p>
              <p style={{color:'rgba(244,184,206,.65)',fontFamily:'Jost',fontSize:'.8rem'}}>📸 instagram.com</p>
            </div>
          </div>
        </div>
        <div className="pt-6 text-center" style={{borderTop:'1px solid rgba(184,138,85,.12)'}}>
          <p style={{color:'rgba(244,184,206,.34)',fontFamily:'Jost',fontSize:'.7rem'}}>
            © 2025 Ayushi Makeup Studio · Lukarganj, Prayagraj, UP · All Rights Reserved · Made with 💕
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating action buttons ──────────────────────────────────────────────────
function FloatingButtons() {
  return (
    <>
      <a href="https://wa.me/917617055381" target="_blank" rel="noopener noreferrer"
        className="float-btn" style={{bottom:88,right:20,background:'#25D366'}} title="WhatsApp Ayushi Makeup Studio">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
        className="float-btn" style={{bottom:24,right:20,background:'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'}} title="Instagram">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal()
  return (
    <div style={{position:'relative',minHeight:'100vh',overflow:'hidden'}}>
      <FloatingBalls />
      <div style={{position:'relative',zIndex:1}}>
        <Navbar />
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <WhyChooseUs />
        <Compliments />
        <Reviews />
        <FAQ />
        <Appointment />
        <MapSection />
        <CTA />
        <Footer />
      </div>
      <FloatingButtons />
    </div>
  )
}
