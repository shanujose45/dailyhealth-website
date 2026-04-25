// DailyHealth.us — Complete Production-Ready React Website
// ─────────────────────────────────────────────────────────
// SETUP: Add to your index.html <head>:
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
//
// USAGE: import DailyHealthWebsite from './DailyHealthWebsite';
//        Then render <DailyHealthWebsite /> in your App.jsx

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Benefits", "Tips", "Products", "Testimonials", "Blog"];

const TIPS = [
  {
    icon: "🫀",
    tag: "Gut & Digestion",
    title: "Heal Your Gut First",
    body: "Your gut microbiome is the master controller of immunity, mood, and metabolism. Daily fermented foods — kefir, kimchi, live yogurt — can transform your entire wellbeing within 30 days.",
    accent: "#E8874A",
    delay: 0,
  },
  {
    icon: "💧",
    tag: "Hydration",
    title: "The Morning Water Ritual",
    body: "Before coffee, before screens — 500ml of water with fresh lemon. This single habit flushes overnight toxins, ignites metabolism, and sharpens mental clarity for hours.",
    accent: "#5DCAA5",
    delay: 120,
  },
  {
    icon: "🧠",
    tag: "Sleep Science",
    title: "Sleep Is Your Superpower",
    body: "During deep sleep your brain activates its glymphatic cleaning system, flushing toxins linked to cognitive decline. 7–9 hours in a dark, cool room isn't a luxury — it's medicine.",
    accent: "#C9A96E",
    delay: 240,
  },
  {
    icon: "☀️",
    tag: "Circadian Health",
    title: "10 Minutes of Morning Sun",
    body: "Direct sunlight within 60 minutes of waking sets your master circadian clock, triggers serotonin production, and regulates every hormone that governs energy and sleep.",
    accent: "#AFA9EC",
    delay: 360,
  },
];

const PRODUCTS = [
  {
    emoji: "🦠",
    name: "Gut Restore Probiotic Complex",
    tagline: "50B CFU · 11 Strains · Clinical Grade",
    price: "$34.99",
    originalPrice: "$44.99",
    rating: 4.9,
    reviews: 1842,
    badge: "Best Seller",
    badgeColor: "#E8874A",
    savings: "Save 22%",
  },
  {
    emoji: "🌙",
    name: "Deep Sleep Magnesium Blend",
    tagline: "Glycinate + L-Threonate · 200mg",
    price: "$29.99",
    originalPrice: "$38.99",
    rating: 4.8,
    reviews: 1203,
    badge: "Top Rated",
    badgeColor: "#5DCAA5",
    savings: "Save 23%",
  },
  {
    emoji: "🥬",
    name: "Morning Energy Greens",
    tagline: "37 Superfoods · Adaptogens · Enzymes",
    price: "$44.99",
    originalPrice: "$54.99",
    rating: 4.7,
    reviews: 967,
    badge: "New Formula",
    badgeColor: "#AFA9EC",
    savings: "Save 18%",
  },
  {
    emoji: "🐟",
    name: "Wild Krill Oil Omega-3",
    tagline: "Superior Bioavailability · Astaxanthin",
    price: "$39.99",
    originalPrice: "$49.99",
    rating: 4.8,
    reviews: 2104,
    badge: "Heart Health #1",
    badgeColor: "#C9A96E",
    savings: "Save 20%",
  },
  {
    emoji: "✨",
    name: "Collagen Peptides + Vitamin C",
    tagline: "Type I & III · Grass-Fed · Unflavoured",
    price: "$36.99",
    originalPrice: "$46.99",
    rating: 4.6,
    reviews: 784,
    badge: "Skin & Joints",
    badgeColor: "#F0997B",
    savings: "Save 21%",
  },
  {
    emoji: "🌸",
    name: "Cortisol & Stress Support",
    tagline: "KSM-66 Ashwagandha · Rhodiola · L-Theanine",
    price: "$32.99",
    originalPrice: "$42.99",
    rating: 4.7,
    reviews: 1556,
    badge: "Editor's Pick",
    badgeColor: "#85B7EB",
    savings: "Save 23%",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    location: "Austin, TX",
    avatar: "SM",
    color: "#E8874A",
    stars: 5,
    headline: "Complete life transformation in 90 days",
    body: "I've been following DailyHealth for six months and I genuinely feel like a different person. The gut health protocol completely rewired my relationship with food, and my energy levels are unrecognisable. I've recommended this to everyone I know.",
  },
  {
    name: "James Kowalski",
    location: "Portland, OR",
    avatar: "JK",
    color: "#5DCAA5",
    stars: 5,
    headline: "Science-backed content that actually works",
    body: "As someone deeply sceptical of wellness influencer culture, DailyHealth won me over immediately with the evidence-based approach. My sleep quality has improved dramatically following their circadian tips. This is legitimate health education.",
  },
  {
    name: "Priya Sharma",
    location: "Chicago, IL",
    avatar: "PS",
    color: "#C9A96E",
    stars: 5,
    headline: "Finally waking up with real energy",
    body: "The morning routine framework is genuinely life-changing. I used to drag myself out of bed every single day. Now I wake up before my alarm with actual energy. The probiotic recommendation also cleared up a bloating issue I'd suffered with for years.",
  },
  {
    name: "Marcus Thompson",
    location: "New York, NY",
    avatar: "MT",
    color: "#AFA9EC",
    stars: 5,
    headline: "Lost 18 lbs following the nutrition guidance",
    body: "What sets DailyHealth apart is that every recommendation is grounded in research. I applied the metabolic reset protocol and lost 18 lbs in 12 weeks without feeling like I was dieting. The Omega-3 supplement also eliminated my brain fog completely.",
  },
  {
    name: "Elena Vasquez",
    location: "Miami, FL",
    avatar: "EV",
    color: "#F0997B",
    stars: 5,
    headline: "My skin is glowing and I sleep like a baby",
    body: "The collagen and sleep magnesium combo has done more for my skin than any topical I've ever tried. After three months I'm sleeping seven to eight hours uninterrupted and people keep asking me what skincare I'm using. It's supplements and sleep!",
  },
];

const FOOTER_LINKS = {
  "Learn": ["Health Tips", "Nutrition Guide", "Sleep Science", "Gut Health", "Fitness"],
  "Products": ["Probiotics", "Supplements", "Bundles", "New Arrivals", "Best Sellers"],
  "Company": ["About Us", "Our Science", "Press", "Careers", "Contact"],
  "Support": ["FAQ", "Shipping", "Returns", "Track Order", "Wholesale"],
};

const SOCIAL_ICONS = ["📷", "🎵", "▶️", "📌"];

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  :root {
    --amber: #C9A96E;
    --orange: #E8874A;
    --teal: #5DCAA5;
    --lavender: #AFA9EC;
    --bg-0: #0B0A07;
    --bg-1: #0F0E0B;
    --bg-2: #141210;
    --bg-3: #1A1814;
    --border: #1E1C18;
    --border-hover: #2E2C28;
    --text-primary: #F2EDE4;
    --text-secondary: #9A9080;
    --text-muted: #5A5348;
  }

  .dh-display { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; }
  .dh-body { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes shimmer {
    0%   { background-position: -300% center; }
    100% { background-position: 300% center; }
  }
  @keyframes orbDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(25px,-18px) scale(1.04); }
    66%      { transform: translate(-18px,12px) scale(0.97); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-7px); }
  }

  .dh-shimmer {
    background: linear-gradient(90deg, #C9A96E 0%, #F0D4A0 42%, #C9A96E 84%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  .dh-nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    color: #6A6050;
    cursor: pointer;
    transition: color 0.2s;
    text-decoration: none;
  }
  .dh-nav-link:hover { color: #C9A96E; }

  .dh-btn-primary {
    background: linear-gradient(135deg, #E8874A 0%, #C9A96E 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(232,135,74,0.22);
  }
  .dh-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(232,135,74,0.3); }
  .dh-btn-primary:active { transform: scale(0.98); }

  .dh-btn-ghost {
    background: transparent;
    color: #C9A96E;
    border: 1px solid rgba(201,169,110,0.3);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;
  }
  .dh-btn-ghost:hover { background: rgba(201,169,110,0.07); border-color: rgba(201,169,110,0.55); }

  .dh-input {
    background: rgba(255,255,255,0.035);
    border: 1px solid #222018;
    color: #F2EDE4;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .dh-input:focus { border-color: rgba(201,169,110,0.45); background: rgba(255,255,255,0.055); }
  .dh-input::placeholder { color: #3A3530; }

  .dh-tip-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }
  .dh-tip-card:hover { border-color: var(--border-hover); transform: translateY(-5px); box-shadow: 0 18px 55px rgba(0,0,0,0.42); }

  .dh-product-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
  }
  .dh-product-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(140deg, transparent 55%, rgba(201,169,110,0.04) 100%);
    pointer-events: none;
  }
  .dh-product-card:hover { border-color: rgba(201,169,110,0.22); transform: translateY(-4px); box-shadow: 0 14px 48px rgba(0,0,0,0.44); }

  .dh-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    animation: orbDrift 14s ease-in-out infinite;
  }

  .dh-dot {
    height: 6px;
    border-radius: 3px;
    background: #2A2820;
    cursor: pointer;
    transition: background 0.25s, width 0.3s;
  }
  .dh-dot-active { background: #C9A96E !important; }

  .dh-footer-link {
    color: #3A3530;
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    transition: color 0.2s;
    cursor: pointer;
    display: block;
  }
  .dh-footer-link:hover { color: #C9A96E; }

  .dh-section-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #080807; }
  ::-webkit-scrollbar-thumb { background: #222018; border-radius: 3px; }

  @media (max-width: 900px) {
    .dh-products-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .dh-hero-inner { flex-direction: column !important; gap: 48px !important; }
    .dh-hero-h1 { font-size: 40px !important; letter-spacing: -1px !important; }
    .dh-section-h2 { font-size: 34px !important; letter-spacing: -0.8px !important; }
    .dh-tips-grid { grid-template-columns: 1fr !important; }
    .dh-products-grid { grid-template-columns: 1fr 1fr !important; }
    .dh-footer-cols { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    .dh-footer-inner { flex-direction: column !important; gap: 40px !important; }
    .dh-bundle-row { flex-direction: column !important; }
    .dh-cta-form { flex-direction: column !important; align-items: stretch !important; }
    .dh-cta-form input { width: 100% !important; }
    .dh-testimonial-card-inner { padding: 32px 24px !important; }
    .dh-cta-inner { padding: 44px 28px !important; }
    .dh-bottom-bar { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }
    .dh-bottom-links { flex-wrap: wrap !important; gap: 12px !important; }
  }
  @media (max-width: 480px) {
    .dh-products-grid { grid-template-columns: 1fr !important; }
    .dh-hero-h1 { font-size: 34px !important; }
    .dh-stats-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Stars({ count, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[0,1,2,3,4].map((i) => (
        <span key={i} style={{ color: i < count ? "#C9A96E" : "#2A2820", fontSize: size }}>★</span>
      ))}
    </span>
  );
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const fade = (inView, delay = 0, extra = {}) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(22px)",
  transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  ...extra,
});

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navBg = scrolled
    ? { background: "rgba(11,10,7,0.93)", backdropFilter: "blur(18px)", borderBottom: "1px solid #1A1814" }
    : { background: "transparent", borderBottom: "1px solid transparent" };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      transition: "background 0.35s, border-color 0.35s",
      padding: "0 max(24px, calc((100% - 1240px) / 2))",
      ...navBg,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div className="dh-display" style={{ fontSize: 21, fontWeight: 700, cursor: "pointer", userSelect: "none", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#F2EDE4" }}>Daily</span>
          <span className="dh-shimmer">Health</span>
          <span style={{ color: "#2A2820", fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, marginLeft: 1 }}>.us</span>
        </div>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 34 }}>
          {NAV_LINKS.map((l) => <span key={l} className="dh-nav-link">{l}</span>)}
        </div>

        {/* Desktop CTAs */}
        <div className="hide-mobile" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="dh-btn-ghost" style={{ padding: "9px 18px", borderRadius: 5, fontSize: 12 }}>Log In</button>
          <button className="dh-btn-primary" style={{ padding: "10px 20px", borderRadius: 5 }}>Get Free Tips</button>
        </div>

        {/* Mobile toggle */}
        <button
          className="show-mobile"
          onClick={() => setOpen(!open)}
          style={{ display: "none", background: "none", border: "1px solid #222018", color: "#F2EDE4", width: 38, height: 38, borderRadius: 6, alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, flexShrink: 0 }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid #1A1814", padding: "18px 0 24px", display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.2s ease" }}>
          {NAV_LINKS.map((l) => <span key={l} className="dh-nav-link" style={{ fontSize: 14, letterSpacing: 0.8 }}>{l}</span>)}
          <div style={{ display: "flex", gap: 10, paddingTop: 6 }}>
            <button className="dh-btn-ghost" style={{ padding: "10px 18px", borderRadius: 5, flex: 1 }}>Log In</button>
            <button className="dh-btn-primary" style={{ padding: "10px 18px", borderRadius: 5, flex: 2 }}>Get Free Tips</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };

  const STATS = [
    { n: "47K+", l: "Readers",       c: "#E8874A" },
    { n: "4.9★", l: "Avg Rating",    c: "#C9A96E" },
    { n: "200+", l: "Health Tips",   c: "#5DCAA5" },
    { n: "98%",  l: "Recommend",     c: "#AFA9EC" },
  ];

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: 136, paddingBottom: 96, padding: "136px max(24px, calc((100% - 1240px) / 2)) 96px", background: "#0B0A07" }}>
      <div className="dh-orb" style={{ width: 620, height: 620, top: -220, right: -160, background: "rgba(201,169,110,0.07)", animationDelay: "0s" }} />
      <div className="dh-orb" style={{ width: 380, height: 380, bottom: -80, left: "22%", background: "rgba(93,202,165,0.05)", animationDelay: "-5s" }} />
      {/* Subtle grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

      <div className="dh-hero-inner" style={{ display: "flex", alignItems: "center", gap: 80, position: "relative" }}>
        {/* Left */}
        <div style={{ flex: "1 1 540px", maxWidth: 620 }}>
          <div className="dh-section-tag dh-body" style={{ background: "rgba(201,169,110,0.09)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.2)", animation: "fadeUp 0.6s ease both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
            Evidence-Based Wellness
          </div>

          <h1 className="dh-display dh-hero-h1" style={{ fontSize: 64, lineHeight: 1.07, fontWeight: 700, color: "#F2EDE4", letterSpacing: "-2px", marginBottom: 24, animation: "fadeUp 0.65s 80ms ease both" }}>
            Your Daily Dose of{" "}
            <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Real</em>{" "}
            Health Wisdom
          </h1>

          <p className="dh-body" style={{ fontSize: 17, lineHeight: 1.82, color: "#6A6050", marginBottom: 38, fontWeight: 300, animation: "fadeUp 0.65s 160ms ease both" }}>
            Science-backed tips, curated supplements, and daily rituals reviewed
            by registered health professionals — delivered free to your inbox.
          </p>

          {done ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "rgba(93,202,165,0.08)", border: "1px solid rgba(93,202,165,0.22)", borderRadius: 8, padding: "18px 24px", animation: "fadeIn 0.4s ease" }}>
              <span style={{ fontSize: 26 }}>✅</span>
              <div>
                <div className="dh-body" style={{ fontWeight: 500, color: "#5DCAA5", fontSize: 15, marginBottom: 3 }}>You're in! Check your inbox.</div>
                <div className="dh-body" style={{ fontSize: 12, color: "#3A5A4A", fontWeight: 300 }}>First tip arriving within 24 hours.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap", animation: "fadeUp 0.65s 240ms ease both" }}>
              <input className="dh-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: "1 1 200px", padding: "14px 17px", borderRadius: 6 }} />
              <button type="submit" className="dh-btn-primary" style={{ padding: "14px 26px", borderRadius: 6, whiteSpace: "nowrap" }}>Get Free Tips →</button>
            </form>
          )}

          <p className="dh-body" style={{ marginTop: 13, fontSize: 11, color: "#2E2C28", fontWeight: 300, letterSpacing: 0.2, animation: "fadeUp 0.65s 320ms ease both" }}>
            No spam, ever. Unsubscribe in one click. Trusted by 47,000+ readers.
          </p>
        </div>

        {/* Right: stats */}
        <div className="dh-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13, flexShrink: 0, animation: "fadeUp 0.65s 400ms ease both" }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ background: "#141210", border: "1px solid #1E1C18", borderRadius: 8, padding: "22px 16px", textAlign: "center", width: 128 }}>
              <div className="dh-display" style={{ fontSize: 28, fontWeight: 700, color: s.c, marginBottom: 6, lineHeight: 1 }}>{s.n}</div>
              <div className="dh-body" style={{ fontSize: 10, color: "#4A4540", fontWeight: 400, letterSpacing: 0.6, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
          <div style={{ gridColumn: "1/-1", background: "#141210", border: "1px solid #1E1C18", borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>🏥</div>
            <div>
              <div className="dh-body" style={{ fontSize: 11, fontWeight: 500, color: "#C9A96E", marginBottom: 2 }}>Dietitian Reviewed</div>
              <div className="dh-body" style={{ fontSize: 11, color: "#3A3530", fontWeight: 300 }}>All content peer-verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ marginTop: 68, paddingTop: 30, borderTop: "1px solid #1A1814", display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center" }}>
        {["🔬 Peer-Reviewed Sources", "🌿 100% Natural Ingredients", "📦 Free Shipping Over $50", "🔄 60-Day Guarantee", "💬 24/7 Health Support"].map((t) => (
          <span key={t} className="dh-body" style={{ fontSize: 12, color: "#3A3530", fontWeight: 300 }}>{t}</span>
        ))}
      </div>
    </section>
  );
}

// ─── HEALTH TIPS ──────────────────────────────────────────────────────────────

function HealthTips() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="tips" ref={ref} style={{ padding: "96px max(24px, calc((100% - 1240px) / 2))", background: "#0F0E0B", position: "relative", overflow: "hidden" }}>
      <div className="dh-orb" style={{ width: 480, height: 480, top: -80, left: -100, background: "rgba(93,202,165,0.04)", animationDelay: "-2s" }} />

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="dh-section-tag dh-body" style={{ background: "rgba(93,202,165,0.08)", color: "#5DCAA5", border: "1px solid rgba(93,202,165,0.17)", ...fade(inView, 0) }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5DCAA5", flexShrink: 0 }} />
          Daily Wisdom
        </div>
        <h2 className="dh-display dh-section-h2" style={{ fontSize: 44, fontWeight: 700, color: "#F2EDE4", letterSpacing: "-1.5px", marginBottom: 14, lineHeight: 1.1, ...fade(inView, 100) }}>
          Health Tips That <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Actually Work</em>
        </h2>
        <p className="dh-body" style={{ color: "#5A5348", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.8, fontWeight: 300, ...fade(inView, 180) }}>
          Curated from cutting-edge research, refined by 47,000+ readers, and reviewed by registered dietitians.
        </p>
      </div>

      <div className="dh-tips-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {TIPS.map((tip, i) => (
          <div key={tip.title} className="dh-tip-card" style={{ borderRadius: 8, padding: "34px 30px", borderTop: `2px solid ${tip.accent}1E`, ...fade(inView, tip.delay + 200) }}>
            <div style={{ display: "inline-flex", alignItems: "center", background: `${tip.accent}12`, color: tip.accent, borderRadius: 4, padding: "4px 11px", fontSize: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 18 }}>
              {tip.tag}
            </div>
            <div style={{ fontSize: 38, marginBottom: 14, lineHeight: 1, display: "block", animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.6}s infinite` }}>
              {tip.icon}
            </div>
            <h3 className="dh-display" style={{ fontSize: 23, fontWeight: 600, color: "#F2EDE4", marginBottom: 12, lineHeight: 1.3, letterSpacing: "-0.4px" }}>
              {tip.title}
            </h3>
            <p className="dh-body" style={{ fontSize: 14, lineHeight: 1.82, color: "#5A5348", fontWeight: 300, marginBottom: 26 }}>
              {tip.body}
            </p>
            <div style={{ paddingTop: 18, borderTop: "1px solid #1A1814", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="dh-body" style={{ fontSize: 12, color: tip.accent, fontWeight: 500, cursor: "pointer", letterSpacing: 0.3 }}>Read Full Article →</span>
              <span className="dh-body" style={{ fontSize: 11, color: "#2E2C28", fontWeight: 300 }}>5 min read</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button className="dh-btn-ghost" style={{ padding: "13px 34px", borderRadius: 6 }}>View All 200+ Health Tips →</button>
      </div>
    </section>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

function Products() {
  const [ref, inView] = useInView(0.06);
  return (
    <section id="products" ref={ref} style={{ padding: "96px max(24px, calc((100% - 1240px) / 2))", background: "#0B0A07", position: "relative", overflow: "hidden" }}>
      <div className="dh-orb" style={{ width: 560, height: 400, top: "20%", right: -140, background: "rgba(201,169,110,0.06)", animationDelay: "-7s" }} />

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="dh-section-tag dh-body" style={{ background: "rgba(201,169,110,0.08)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.17)", ...fade(inView, 0) }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
          Trusted Supplements
        </div>
        <h2 className="dh-display dh-section-h2" style={{ fontSize: 44, fontWeight: 700, color: "#F2EDE4", letterSpacing: "-1.5px", marginBottom: 14, ...fade(inView, 100) }}>
          Products We <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Genuinely</em> Recommend
        </h2>
        <p className="dh-body" style={{ color: "#5A5348", fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.8, fontWeight: 300, ...fade(inView, 180) }}>
          Independently tested, zero paid placements. We only recommend what we'd give our own families.
        </p>
      </div>

      <div className="dh-products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {PRODUCTS.map((p, i) => (
          <div key={p.name} className="dh-product-card" style={{ borderRadius: 8, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 13, ...fade(inView, i * 75 + 280) }}>
            <div style={{ display: "inline-flex", alignSelf: "flex-start", background: `${p.badgeColor}18`, color: p.badgeColor, fontSize: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: 0.9, textTransform: "uppercase", padding: "3px 9px", borderRadius: 4 }}>
              {p.badge}
            </div>
            <div style={{ width: "100%", height: 76, background: `${p.badgeColor}0D`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
              {p.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="dh-body" style={{ fontSize: 14, fontWeight: 500, color: "#F2EDE4", marginBottom: 5, lineHeight: 1.45 }}>{p.name}</h3>
              <p className="dh-body" style={{ fontSize: 12, color: "#3A3530", fontWeight: 300, lineHeight: 1.6 }}>{p.tagline}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Stars count={Math.round(p.rating)} />
              <span className="dh-body" style={{ fontSize: 11, color: "#4A4540" }}>{p.rating} ({p.reviews.toLocaleString()})</span>
            </div>
            <div style={{ paddingTop: 12, borderTop: "1px solid #1A1814", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="dh-display" style={{ fontSize: 21, fontWeight: 700, color: "#C9A96E" }}>{p.price}</span>
                <span className="dh-body" style={{ fontSize: 11, color: "#2E2C28", marginLeft: 7, textDecoration: "line-through" }}>{p.originalPrice}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                <span className="dh-body" style={{ fontSize: 10, color: "#5DCAA5", fontWeight: 500, letterSpacing: 0.3 }}>{p.savings}</span>
                <button className="dh-btn-ghost" style={{ padding: "5px 14px", borderRadius: 4, fontSize: 11 }}>Shop →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle banner */}
      <div className="dh-bundle-row" style={{ marginTop: 44, background: "linear-gradient(135deg, #141210 0%, #181512 100%)", border: "1px solid #2A2618", borderRadius: 12, padding: "34px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 180, height: 180, borderRadius: "50%", background: "rgba(201,169,110,0.06)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div className="dh-body" style={{ fontSize: 10, color: "#C9A96E", fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 8 }}>Exclusive Bundle</div>
          <h3 className="dh-display" style={{ fontSize: 26, fontWeight: 600, color: "#F2EDE4", letterSpacing: "-0.5px", marginBottom: 7 }}>The Complete Wellness Stack</h3>
          <p className="dh-body" style={{ fontSize: 14, color: "#5A5348", fontWeight: 300 }}>All 6 products bundled — save an extra 15% + free priority shipping.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, flexShrink: 0, position: "relative" }}>
          <div style={{ textAlign: "right" }}>
            <div className="dh-display" style={{ fontSize: 30, fontWeight: 700, color: "#C9A96E" }}>$179.99</div>
            <div className="dh-body" style={{ fontSize: 12, color: "#2E2C28", textDecoration: "line-through" }}>$259.94</div>
          </div>
          <button className="dh-btn-primary" style={{ padding: "13px 26px", borderRadius: 6, whiteSpace: "nowrap" }}>Get the Bundle</button>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView(0.1);
  const timer = useRef(null);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5200);
  }, []);
  useEffect(() => { start(); return () => clearInterval(timer.current); }, [start]);

  const go = (i) => { setActive(i); start(); };
  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" ref={ref} style={{ padding: "96px max(24px, calc((100% - 1240px) / 2))", background: "#0F0E0B", position: "relative", overflow: "hidden" }}>
      <div className="dh-orb" style={{ width: 460, height: 460, bottom: -80, right: -80, background: "rgba(175,169,236,0.04)", animationDelay: "-3s" }} />

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="dh-section-tag dh-body" style={{ background: "rgba(232,135,74,0.08)", color: "#E8874A", border: "1px solid rgba(232,135,74,0.17)", ...fade(inView, 0) }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8874A", flexShrink: 0 }} />
          Real Transformations
        </div>
        <h2 className="dh-display dh-section-h2" style={{ fontSize: 44, fontWeight: 700, color: "#F2EDE4", letterSpacing: "-1.5px", ...fade(inView, 100) }}>
          Lives <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Transformed</em>
        </h2>
      </div>

      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        {/* Main card */}
        <div
          key={active}
          className="dh-testimonial-card-inner"
          style={{ background: "#141210", border: "1px solid #1E1C18", borderLeft: `3px solid ${t.color}`, borderRadius: 12, padding: "44px 46px", animation: "fadeIn 0.4s ease", ...fade(inView, 200) }}
        >
          <div className="dh-display" style={{ fontSize: 72, lineHeight: 0.65, color: t.color, opacity: 0.18, marginBottom: 18, userSelect: "none" }}>"</div>
          <h3 className="dh-display" style={{ fontSize: 21, fontWeight: 600, color: "#F2EDE4", marginBottom: 14, letterSpacing: "-0.3px" }}>{t.headline}</h3>
          <p className="dh-body" style={{ fontSize: 15, lineHeight: 1.88, color: "#6A6050", fontWeight: 300, fontStyle: "italic", marginBottom: 32 }}>"{t.body}"</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${t.color}18`, border: `1.5px solid ${t.color}38`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, color: t.color, flexShrink: 0 }}>{t.avatar}</div>
              <div>
                <div className="dh-body" style={{ fontSize: 14, fontWeight: 500, color: "#D0C8BE", marginBottom: 3 }}>{t.name}</div>
                <div className="dh-body" style={{ fontSize: 12, color: "#3A3530", fontWeight: 300 }}>{t.location}</div>
              </div>
            </div>
            <Stars count={t.stars} size={15} />
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 24, alignItems: "center" }}>
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              className={`dh-dot ${i === active ? "dh-dot-active" : ""}`}
              onClick={() => go(i)}
              style={{ width: i === active ? 22 : 6 }}
            />
          ))}
        </div>

        {/* Mini previews */}
        <div style={{ display: "flex", gap: 10, marginTop: 28, overflowX: "auto", paddingBottom: 4 }}>
          {TESTIMONIALS.map((tt, i) => (
            <div
              key={i}
              onClick={() => go(i)}
              style={{ flexShrink: 0, background: i === active ? "#1A1814" : "#141210", border: `1px solid ${i === active ? tt.color + "38" : "#1E1C18"}`, borderRadius: 7, padding: "10px 14px", cursor: "pointer", transition: "all 0.2s", opacity: i === active ? 1 : 0.45, display: "flex", alignItems: "center", gap: 9, minWidth: 152 }}
            >
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${tt.color}1C`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, color: tt.color, flexShrink: 0 }}>{tt.avatar}</div>
              <div>
                <div className="dh-body" style={{ fontSize: 11, fontWeight: 500, color: "#C0B8AE" }}>{tt.name}</div>
                <div className="dh-body" style={{ fontSize: 10, color: "#3A3530" }}>{tt.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

function CTABanner() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [ref, inView] = useInView(0.18);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };

  return (
    <section ref={ref} style={{ padding: "80px max(24px, calc((100% - 1240px) / 2))", background: "#0B0A07" }}>
      <div className="dh-cta-inner" style={{ background: "linear-gradient(135deg, #0F0D0A 0%, #141210 100%)", border: "1px solid #252218", borderRadius: 16, padding: "62px 58px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, left: "15%", width: 380, height: 260, background: "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, right: "22%", width: 280, height: 180, background: "radial-gradient(ellipse, rgba(232,135,74,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="dh-section-tag dh-body" style={{ background: "rgba(201,169,110,0.09)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.2)", marginBottom: 22, ...fade(inView, 0) }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
          Join 47,000+ Readers
        </div>
        <h2 className="dh-display" style={{ fontSize: 46, fontWeight: 700, color: "#F2EDE4", letterSpacing: "-1.5px", marginBottom: 18, lineHeight: 1.1, ...fade(inView, 100) }}>
          Start Your Health Journey <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Today</em>
        </h2>
        <p className="dh-body" style={{ color: "#5A5348", fontSize: 16, maxWidth: 460, margin: "0 auto 38px", lineHeight: 1.8, fontWeight: 300, ...fade(inView, 180) }}>
          Get your first evidence-based health tip within 24 hours. Zero spam. Always free.
        </p>
        {done ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 13, background: "rgba(93,202,165,0.07)", border: "1px solid rgba(93,202,165,0.2)", borderRadius: 8, padding: "17px 26px", animation: "fadeIn 0.35s ease" }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <span className="dh-body" style={{ fontWeight: 500, color: "#5DCAA5", fontSize: 15 }}>You're in! Welcome gift is on its way.</span>
          </div>
        ) : (
          <form onSubmit={submit} className="dh-cta-form" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input className="dh-input" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "14px 18px", borderRadius: 6, width: 270 }} />
            <button type="submit" className="dh-btn-primary" style={{ padding: "14px 28px", borderRadius: 6, fontSize: 14 }}>Start for Free →</button>
          </form>
        )}
        <p className="dh-body" style={{ marginTop: 15, fontSize: 11, color: "#2A2820", fontWeight: 300 }}>No credit card. No commitment. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const [footerEmail, setFooterEmail] = useState("");
  return (
    <footer style={{ background: "#070706", borderTop: "1px solid #141210", padding: "60px max(24px, calc((100% - 1240px) / 2)) 0" }}>
      <div className="dh-footer-inner" style={{ display: "flex", gap: 56, marginBottom: 48, flexWrap: "wrap" }}>
        {/* Brand */}
        <div style={{ flex: "0 0 250px", maxWidth: 250 }}>
          <div className="dh-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 14 }}>
            <span style={{ color: "#F2EDE4" }}>Daily</span>
            <span className="dh-shimmer">Health</span>
            <span style={{ color: "#1E1C18", fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, marginLeft: 1 }}>.us</span>
          </div>
          <p className="dh-body" style={{ fontSize: 13, lineHeight: 1.82, color: "#3A3530", fontWeight: 300, marginBottom: 22 }}>
            Science-backed health wisdom for everyday people who want to live better, longer, and with more energy.
          </p>
          <div style={{ display: "flex", gap: 9 }}>
            {SOCIAL_ICONS.map((ic, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: 7, background: "#121010", border: "1px solid #1A1814", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#2A2820"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1A1814"}
              >
                {ic}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="dh-footer-cols" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 36, flex: 1 }}>
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <div className="dh-body" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>{heading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {links.map((l) => <span key={l} className="dh-footer-link">{l}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter strip */}
      <div style={{ borderTop: "1px solid #121010", borderBottom: "1px solid #121010", padding: "26px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18, marginBottom: 24 }}>
        <div>
          <div className="dh-body" style={{ fontSize: 13, fontWeight: 500, color: "#7A7060", marginBottom: 3 }}>Weekly Health Digest</div>
          <div className="dh-body" style={{ fontSize: 12, color: "#2E2C28", fontWeight: 300 }}>One email per week. Only the best tips.</div>
        </div>
        <div style={{ display: "flex", gap: 9 }}>
          <input className="dh-input" type="email" placeholder="your@email.com" value={footerEmail} onChange={(e) => setFooterEmail(e.target.value)} style={{ padding: "9px 15px", borderRadius: 5, fontSize: 13, width: 210 }} />
          <button className="dh-btn-primary" style={{ padding: "9px 18px", borderRadius: 5, fontSize: 12, whiteSpace: "nowrap" }}>Subscribe</button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="dh-bottom-bar" style={{ padding: "18px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div className="dh-body" style={{ fontSize: 11, color: "#242220", fontWeight: 300 }}>© 2025 DailyHealth.us · All rights reserved.</div>
        <div className="dh-bottom-links" style={{ display: "flex", gap: 22 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((l) => (
            <span key={l} className="dh-footer-link" style={{ fontSize: 11, color: "#242220" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function DailyHealthWebsite() {
  useEffect(() => {
    const id = "dh-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { const s = document.getElementById(id); if (s) s.remove(); };
  }, []);

  return (
    <div style={{ background: "#0B0A07", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <HealthTips />
      <Products />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
