/**
 * Snaxology Landing Page
 * Design: HappyPath-inspired — clean white + Snaxology red/black, Plus Jakarta Sans, route-line hero bg
 * Copy: Snaxology-specific — CRM + inventory management platform for vending operators
 */
import { useState } from "react";
import ClippedVideoTab from "@/components/ui/clipped-video-tab";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663676595920/8BWP2AddNeLcVoRQGif8V3/snaxology-hero-bg-red-NwwgpHGHvtSYgTRFLB9aav.webp";
const APP_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663676595920/8BWP2AddNeLcVoRQGif8V3/snaxology-app-mockup-v3-KTBwzTLaMHLnuryAASwghL.webp";

const TEAL = "#E31E24";
const TEAL_LIGHT = "#fde8e9";
const TEAL_DARK = "#b81519";
const TEAL_DEEP = "#1a0505";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-5 text-left gap-4 group">
        <span className="font-semibold text-gray-900 group-hover:text-[#E31E24] transition-colors text-[15px] leading-snug">{q}</span>
        <span className="text-[#E31E24] text-xl flex-shrink-0 transition-transform duration-200" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </button>
      {open && <p className="pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const toggleInterest = (v: string) =>
    setInterests((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

  const SHEET_URL = "https://script.google.com/macros/s/AKfycby1nik5Zya205VV_8NQl3961eZ-MXU7bsgkJU1TPCtEErDIwK0ZLBlb-3WoIPTVeU3u/exec";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Save to Google Sheet (fire and forget — don't block UI)
    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, interests }),
    }).catch(() => {}); // silently ignore network errors
    setSubmitted(true);
    setEmail("");
    setInterests([]);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const faqs = [
    {
      q: "Is Snaxology built specifically for vending operators?",
      a: "Yes — Snaxology was built by an operator, for operators. Every feature is designed around how vending businesses actually run: managing multiple machines, tracking restock dates, keeping client relationships organized, and making decisions based on real data. It's not a generic CRM with vending bolted on.",
    },
    {
      q: "Can I manage both micro markets and traditional vending machines?",
      a: "Absolutely. Snaxology supports smart micro markets and AI vending coolers alongside traditional machines. Whether you're running a single cooler or a full mixed-format route, the platform keeps everything organized in one place.",
    },
    {
      q: "How does inventory tracking work?",
      a: "Each machine has its own inventory profile. You can log stock levels, track what was restocked and when, and see at a glance which locations are due for a visit. No more guessing or relying on memory — every restock is logged and timestamped.",
    },
    {
      q: "What does the CRM side of the platform include?",
      a: "The CRM lets you manage your client relationships alongside your machines. Store contact info, log conversations, track follow-up dates, and see the full history of each account — all linked directly to the machines at that location.",
    },
    {
      q: "What is location data and analytics, and when is it coming?",
      a: "Location analytics will give operators data-driven insights on each placement — foot traffic estimates, demographic fit, revenue benchmarks for similar locations, and more. It's designed to help you evaluate whether a location is worth keeping and identify where to expand next. This feature is on the roadmap and coming soon.",
    },
    {
      q: "Is there a mobile experience?",
      a: "Yes. Snaxology is designed to work on your phone in the field and your laptop back at the office. Native iOS and Android apps are on the roadmap — for now, the mobile web experience is fast and field-ready.",
    },
    {
      q: "Can I import my existing machine list or client data?",
      a: "Yes. We support CSV imports so you can bring in your existing locations, clients, and inventory data from spreadsheets or other tools and hit the ground running.",
    },
    {
      q: "Is my data secure?",
      a: "All data is encrypted in transit and at rest. We use industry-standard security practices and your data is never sold or shared with third parties.",
    },
    {
      q: "What does it cost?",
      a: "We're in early access right now. Join the waitlist and you'll be among the first to know about pricing — early access members get a special founding member rate.",
    },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }} className="min-h-screen bg-white">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("hero")}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-base" style={{ background: TEAL }}>S</div>
            <span className="font-bold text-lg text-gray-900">Snaxology</span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {[{ label: "How it works", id: "how" }, { label: "Features", id: "features" }, { label: "FAQ", id: "faq" }].map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{label}</button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="text-sm font-semibold text-white px-4 py-2 rounded-full"
              style={{
                background: TEAL,
                transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms cubic-bezier(0.23,1,0.32,1), filter 160ms cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04) translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(227,30,36,0.45)";
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
              }}
              onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04) translateY(-1px)"; }}
            >
              Join waitlist
            </button>
          </div>
          <button className="md:hidden p-2 text-gray-600" onClick={() => setNavOpen(!navOpen)}>
            <div className="w-5 h-0.5 bg-current mb-1" /><div className="w-5 h-0.5 bg-current mb-1" /><div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
            {["how", "features", "faq"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-700 text-left">
                {id === "how" ? "How it works" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="text-sm font-semibold text-white px-4 py-2 rounded-full w-fit"
              style={{
                background: TEAL,
                transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms cubic-bezier(0.23,1,0.32,1), filter 160ms cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04) translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(227,30,36,0.45)";
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
              }}
              onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04) translateY(-1px)"; }}
            >Join waitlist</button>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden bg-[#f5f5f3]">
        {/* Hero text overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(227,30,36,0.08)", color: TEAL }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: TEAL }} />
                Early access now open
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5 text-gray-900">
                Run your vending business
                <br />
                <span className="relative inline-block" style={{ color: TEAL }}>
                  like a pro.
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6 Q75 2 150 5 Q225 8 298 4" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
                Track your inventory, manage your clients, and know exactly when each machine was last stocked — all in one platform built for vending operators.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={() => scrollTo("waitlist")} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-95" style={{ background: "#111827" }}>
                  Get early access →
                </button>
                <button onClick={() => scrollTo("how")} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-gray-700 text-sm border border-gray-300 bg-white hover:border-gray-400 transition-all active:scale-95">
                  See how it works ↓
                </button>
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                {[{ icon: "🏪", label: "Micro markets & vending" }, { icon: "📦", label: "Inventory tracking" }, { icon: "👥", label: "Built-in CRM" }].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5"><span>{icon}</span><span className="font-medium">{label}</span></div>
                ))}
              </div>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
        {/* Video tab component as the visual centerpiece */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <ClippedVideoTab />
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#fef2f2", color: "#dc2626" }}>The Problem</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Sound familiar?</h2>
            <p className="text-gray-500 max-w-md mx-auto">Most operators run their business out of spreadsheets, sticky notes, and memory. Snaxology replaces all of that.</p>
          </div>
          <div className="space-y-4">
            {[
              { problem: "You don't know which machines need restocking until it's too late.", solution: "See last restock date and stock levels for every machine at a glance." },
              { problem: "Client info is scattered across texts, emails, and notebooks.", solution: "One CRM built alongside your machines — contacts, notes, and history in one place." },
              { problem: "No way to know if a location is actually worth keeping.", solution: "Location analytics coming soon — data to help you evaluate and grow your route." },
            ].map(({ problem, solution }, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full flex items-start gap-3 rounded-xl p-4" style={{ background: "#fef2f2" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#fee2e2" }}>
                    <span className="text-red-500 text-sm font-bold">✕</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-0.5">Problem</p>
                    <p className="text-sm text-gray-700 font-medium">{problem}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: "#16a34a" }}>→</div>
                <div className="flex-1 w-full flex items-start gap-3 rounded-xl p-4" style={{ background: "#f0fdf4" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(22,163,74,0.15)" }}>
                    <span style={{ color: "#16a34a" }} className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: "#16a34a" }}>Snaxology</p>
                    <p className="text-sm text-gray-700 font-medium">{solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: TEAL_DEEP }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-red-300 mb-3 uppercase tracking-widest">From operators in the field</p>
            <h2 className="text-4xl font-extrabold text-white mb-3">Stop running your route on guesswork</h2>
            <p className="text-red-200/70 text-sm">Based on early operator conversations.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: "I used to drive to a machine and realize I forgot to bring the right product. Now I check stock levels before I leave the house.", label: "Inventory management" },
              { quote: "Having my client contacts and machine locations in the same place saves me from digging through my phone every time I need to follow up.", label: "CRM + machine management" },
              { quote: "I finally know which locations are pulling their weight and which ones I should reconsider. The data makes the decision obvious.", label: "Location performance" },
            ].map(({ quote, label }, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-white/90 text-sm leading-relaxed mb-4">"{quote}"</p>
                <p className="text-red-300 text-xs font-semibold uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>How it works</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Simple enough to use on the route</h2>
            <p className="text-gray-500">No training needed. If you can use a spreadsheet, you can use Snaxology — and it's a lot faster.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "1", icon: "🏪", title: "Add your machines", desc: "Set up each location with its machine type, client contact, and starting inventory. Takes minutes per location and you only do it once." },
              { num: "2", icon: "📦", title: "Log restocks and visits", desc: "Every time you service a machine, log what you stocked and when. Snaxology tracks the history so you always know where things stand." },
              { num: "3", icon: "📊", title: "Manage clients and grow", desc: "Use the built-in CRM to stay on top of client relationships. Upcoming: location analytics to help you evaluate placements and find new ones." },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="rounded-2xl p-7 border border-gray-100" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-5" style={{ background: TEAL }}>{num}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: TEAL_LIGHT }}>{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section id="features" className="py-20" style={{ background: "#f9fafb" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>Features</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">The tools your spreadsheet wishes it had</h2>
            <p className="text-gray-500">Built around how vending operators actually run their business</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "📦", title: "Inventory tracking", desc: "Know exactly what's in each machine and when it was last restocked. No more guessing or surprise empty slots." },
              { icon: "🗓", title: "Restock date tracking", desc: "See the last service date for every location at a glance. Never let a machine go stale because it slipped your mind." },
              { icon: "👥", title: "Built-in CRM", desc: "Manage client contacts, log conversations, and track follow-ups — all linked directly to the machines at each location." },
              { icon: "🏪", title: "Micro market & vending support", desc: "Works for smart micro markets, AI vending coolers, and traditional machines. One platform for your whole operation." },
              { icon: "📍", title: "Location analytics (coming soon)", desc: "Data-driven insights on each placement — foot traffic, revenue benchmarks, and recommendations to help you grow your route." },
              { icon: "📤", title: "CSV import & export", desc: "Bring in your existing machine list and client data from any spreadsheet. Your data is always yours to take with you." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition-colors" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: TEAL_LIGHT }}>{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP PREVIEW ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: TEAL_DARK }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>Preview</span>
            <h2 className="text-4xl font-extrabold text-white mb-3">See it in action</h2>
            <p className="text-red-200/70 text-sm">Works on your phone in the field and your laptop back at the office</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src={APP_MOCKUP} alt="Snaxology platform showing machine and client management" className="w-full object-cover" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Micro markets", "AI coolers", "Traditional vending", "Any location type"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>FAQ</span>
            <h2 className="text-4xl font-extrabold text-gray-900">Questions we get a lot</h2>
          </div>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl px-6">
            {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ─────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-20" style={{ background: TEAL_DEEP }}>
        <div className="max-w-lg mx-auto px-5 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-3">Join the waitlist</h2>
          <p className="text-red-200/70 mb-10 text-sm leading-relaxed">
            Early access is limited. Get in now and be first to know when we launch — plus a special founding member rate for operators who join early.
          </p>
          {submitted ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5" style={{ background: "rgba(34,197,94,0.2)", border: "2px solid rgba(34,197,94,0.5)" }}>✓</div>
              <h3 className="text-white font-bold text-2xl mb-2">You're on the list!</h3>
              <p className="text-green-300 font-semibold text-sm mb-3">We got you. 🎉</p>
              <p className="text-red-200/70 text-sm max-w-xs mx-auto">We'll reach out as soon as early access opens. Keep running your route — Snaxology is almost ready.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl p-8 text-left space-y-5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email <span className="text-red-300">*</span></label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-red-300 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-3">I'm most interested in:</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Inventory tracking", "Client management", "Location analytics", "Growing my route"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                      <div onClick={() => toggleInterest(opt)} className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer" style={{ background: interests.includes(opt) ? TEAL : "rgba(255,255,255,0.1)", border: interests.includes(opt) ? `2px solid ${TEAL}` : "2px solid rgba(255,255,255,0.25)" }}>
                        {interests.includes(opt) && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors" onClick={() => toggleInterest(opt)}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm relative overflow-hidden group"
                style={{
                  background: TEAL,
                  transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms cubic-bezier(0.23,1,0.32,1), filter 160ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02) translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px rgba(227,30,36,0.45)`;
                  (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
                }}
                onMouseDown={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97) translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
                onMouseUp={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02) translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px rgba(227,30,36,0.45)`;
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Join the waitlist
                  <span
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    style={{ fontSize: "1rem" }}
                  >→</span>
                </span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ background: TEAL }}>S</div>
            <div>
              <p className="font-bold text-sm text-gray-900">Snaxology</p>
              <p className="text-xs text-gray-400">© 2026 Snaxology. All rights reserved.</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">Built by an operator who was tired of running a vending business on spreadsheets.</p>
          <div className="flex gap-5 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
