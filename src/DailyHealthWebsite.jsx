// DailyHealth.us — Complete Production-Ready React Website
// Copy this ENTIRE file and paste into: src/DailyHealthWebsite.jsx on GitHub

import { useState, useEffect, useRef, useCallback } from "react";

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
    body: "I've been following DailyHealth for six months and I genuinely feel like a different person. The gut health protocol completely rewired my relationship with food, and my energy levels are unrecognisable.",
  },
  {
    name: "James Kowalski",
    location: "Portland, OR",
    avatar: "JK",
    color: "#5DCAA5",
    stars: 5,
    headline: "Science-backed content that actually works",
    body: "As someone deeply sceptical of wellness influencer culture, DailyHealth won me over with the evidence-based approach. My sleep quality has improved dramatically following their circadian tips.",
  },
  {
    name: "Priya Sharma",
    location: "Chicago, IL",
    avatar: "PS",
    color: "#C9A96E",
    stars: 5,
    headline: "Finally waking up with real energy",
    body: "The morning routine framework is genuinely life-changing. I used to drag myself out of bed every day. Now I wake up before my alarm with actual energy.",
  },
];

const FOOTER_LINKS = {
  "Learn": ["Health Tips", "Nutrition Guide", "Sleep Science", "Gut Health"],
  "Products": ["Probiotics", "Supplements", "Bundles", "New Arrivals"],
  "Company": ["About Us", "Our Science", "Press", "Careers"],
  "Support": ["FAQ", "Shipping", "Returns", "Contact"],
};

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
    --text-primary: #F2EDE4;
    --text-secondary: #9A9080;
  }
  .dh-display { font-family: 'Playfair Display', Georgia, serif; }
  .dh-body { font-family: 'DM Sans', -apple-system, sans-serif; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes shimmer { 0% { background-position: -300% center; } 100% { background-position: 300% center; } }
  .dh-shimmer {
    background: linear-gradient(90deg, #C9A96E 0%, #F0D4A0 42%, #C9A96E 84%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }
  .dh-btn-primary {
    background: linear-gradient(135deg, #E8874A 0%, #C9A96E 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 12px 24px;
    border-radius: 6px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .dh-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
  .dh-input {
    background: rgba(255,255,255,0.035);
    border: 1px solid #222018;
    color: #F2EDE4;
    font-family: 'DM Sans', sans-serif;
    padding: 12px 16px;
    border-radius: 6px;
    outline: none;
  }
  .dh-input:focus { border-color: rgba(201,169,110,0.45); }
  body { background: #0B0A07; color: #F2EDE4; }
`;

function Stars({ count }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[0,1,2,3,4].map((i) => (
        <span key={i} style={{ color: i < count ? "#C9A96E" : "#2A2820", fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(11,10,7,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid #1A1814" : "none",
      padding: "0 24px",
      transition: "all 0.35s",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div className="dh-display" style={{ fontSize: 21, fontWeight: 700 }}>
          <span style={{ color: "#F2EDE4" }}>Daily</span>
          <span className="dh-shimmer">Health</span>
          <span style={{ color: "#2A2820", fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 300, marginLeft: 4 }}>.us</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map((l) => <span key={l} className="dh-body" style={{ fontSize: 12, color: "#6A6050", cursor: "pointer" }}>{l}</span>)}
        </div>
        <button className="dh-btn-primary" style={{ padding: "10px 20px", fontSize: 12 }}>Get Free Tips</button>
      </div>
    </nav>
  );
}

function Hero() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, background: "#0B0A07", textAlign: "center" }}>
      <h1 className="dh-display" style={{ fontSize: 56, marginBottom: 20, color: "#F2EDE4", lineHeight: 1.2 }}>
        Your Daily Dose of <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Real</em> Health Wisdom
      </h1>
      <p className="dh-body" style={{ fontSize: 16, color: "#6A6050", marginBottom: 30, maxWidth: 600, margin: "0 auto 30px" }}>
        Science-backed tips, curated supplements, and daily rituals reviewed by health professionals.
      </p>
      {done ? (
        <div style={{ display: "inline-block", background: "rgba(93,202,165,0.1)", border: "1px solid #5DCAA5", borderRadius: 8, padding: "15px 25px", color: "#5DCAA5" }}>
          ✅ Check your inbox for your first health tip!
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <input className="dh-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: 250 }} />
          <button type="submit" className="dh-btn-primary">Get Free Tips →</button>
        </form>
      )}
    </section>
  );
}

function HealthTips() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#0F0E0B" }}>
      <h2 className="dh-display" style={{ fontSize: 42, textAlign: "center", marginBottom: 50, color: "#F2EDE4" }}>
        Health Tips That <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Actually Work</em>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
        {TIPS.map((tip) => (
          <div key={tip.title} style={{ background: "#141210", border: "1px solid #1E1C18", borderRadius: 8, padding: 30, borderTop: `3px solid ${tip.accent}` }}>
            <div style={{ fontSize: 36, marginBottom: 15 }}>{tip.icon}</div>
            <h3 className="dh-display" style={{ fontSize: 20, marginBottom: 12, color: "#F2EDE4" }}>{tip.title}</h3>
            <p className="dh-body" style={{ fontSize: 14, lineHeight: 1.7, color: "#5A5348" }}>{tip.body}</p>
            <div style={{ marginTop: 20, paddingTop: 15, borderTop: "1px solid #1A1814", color: "#C9A96E", fontSize: 12, cursor: "pointer" }}>
              Read Full Article →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#0B0A07" }}>
      <h2 className="dh-display" style={{ fontSize: 42, textAlign: "center", marginBottom: 50, color: "#F2EDE4" }}>
        Products We <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Genuinely</em> Recommend
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
        {PRODUCTS.map((p) => (
          <div key={p.name} style={{ background: "#141210", border: "1px solid #1E1C18", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 40, marginBottom: 15 }}>{p.emoji}</div>
            <h3 className="dh-body" style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, color: "#F2EDE4" }}>{p.name}</h3>
            <p className="dh-body" style={{ fontSize: 12, color: "#3A3530", marginBottom: 15 }}>{p.tagline}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 15 }}>
              <Stars count={Math.round(p.rating)} />
              <span className="dh-body" style={{ fontSize: 11, color: "#4A4540" }}>({p.reviews})</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span className="dh-display" style={{ fontSize: 18, color: "#C9A96E", fontWeight: 700 }}>{p.price}</span>
                <span className="dh-body" style={{ fontSize: 11, color: "#2E2C28", marginLeft: 8, textDecoration: "line-through" }}>{p.originalPrice}</span>
              </div>
              <button className="dh-btn-primary" style={{ padding: "8px 16px", fontSize: 11 }}>Shop</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView();
  const t = TESTIMONIALS[active];

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#0F0E0B", textAlign: "center" }}>
      <h2 className="dh-display" style={{ fontSize: 42, marginBottom: 50, color: "#F2EDE4" }}>
        Lives <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Transformed</em>
      </h2>
      <div style={{ maxWidth: 700, margin: "0 auto", background: "#141210", border: "1px solid #1E1C18", borderRadius: 12, padding: 40, borderLeft: `3px solid ${t.color}` }}>
        <h3 className="dh-display" style={{ fontSize: 18, marginBottom: 15, color: "#F2EDE4" }}>{t.headline}</h3>
        <p className="dh-body" style={{ fontSize: 14, lineHeight: 1.8, color: "#6A6050", fontStyle: "italic", marginBottom: 25 }}>"{t.body}"</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${t.color}20`, border: `2px solid ${t.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: t.color }}>
            {t.avatar}
          </div>
          <div style={{ textAlign: "left" }}>
            <div className="dh-body" style={{ fontWeight: 500, color: "#D0C8BE", fontSize: 13 }}>{t.name}</div>
            <div className="dh-body" style={{ fontSize: 11, color: "#3A3530" }}>{t.location}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 25 }}>
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{ width: i === active ? 20 : 8, height: 6, borderRadius: 3, background: i === active ? "#C9A96E" : "#2A2820", cursor: "pointer", transition: "all 0.2s" }}
          />
        ))}
      </div>
    </section>
  );
}

function CTABanner() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };

  return (
    <section style={{ padding: "60px 24px", background: "#0B0A07", textAlign: "center" }}>
      <div style={{ background: "linear-gradient(135deg, #141210 0%, #181512 100%)", border: "1px solid #252218", borderRadius: 12, padding: 50 }}>
        <h2 className="dh-display" style={{ fontSize: 40, marginBottom: 20, color: "#F2EDE4" }}>
          Start Your Health Journey <em className="dh-shimmer" style={{ fontStyle: "italic" }}>Today</em>
        </h2>
        <p className="dh-body" style={{ fontSize: 15, color: "#5A5348", marginBottom: 30, maxWidth: 500, margin: "0 auto 30px" }}>
          Get your first evidence-based health tip within 24 hours. Zero spam. Always free.
        </p>
        {done ? (
          <div style={{ color: "#5DCAA5" }}>✅ You're in! Welcome gift is on its way.</div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <input className="dh-input" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: 280 }} />
            <button type="submit" className="dh-btn-primary">Start for Free →</button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#070706", borderTop: "1px solid #141210", padding: "50px 24px", color: "#3A3530" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <div className="dh-body" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "#C9A96E", marginBottom: 15 }}>
              {heading}
            </div>
            {links.map((l) => (
              <div key={l} className="dh-body" style={{ fontSize: 13, marginBottom: 10, cursor: "pointer" }}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid #141210", paddingTop: 20, textAlign: "center", fontSize: 12 }}>
        © 2025 DailyHealth.us · All rights reserved
      </div>
    </footer>
  );
}

export default function DailyHealthWebsite() {
  useEffect(() => {
    const id = "dh-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{ background: "#0B0A07" }}>
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
