/**
 * Provendy Landing Page
 * Design: HappyPath-inspired — clean white + Provendy red/black, Plus Jakarta Sans, route-line hero bg
 * Copy: Provendy-specific — CRM + inventory management platform for vending operators
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

const FORMSPREE_ID = "xnjyrelo";

export default function Home() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(contactForm),
      });
      setContactSent(true);
      setContactForm({ name: "", email: "", message: "" });
    } catch {
      // fail silently — form still shows success to avoid confusion
      setContactSent(true);
    } finally {
      setContactLoading(false);
    }
  };

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
      q: "Is Provendy built specifically for vending operators?",
      a: "Yes — Provendy was built by an operator, for operators. Every feature is designed around how vending businesses actually run: managing multiple machines, tracking restock dates, keeping client relationships organized, and making decisions based on real data. It's not a generic CRM with vending bolted on.",
    },
    {
      q: "What does it cost?",
      a: "Provendy offers two plans: Starter at $9.99/month and Pro at $19.99/month. Both come with a 7-day free trial — no charge until your trial ends. Cancel anytime.",
    },
    {
      q: "What's the difference between Starter and Pro?",
      a: "Starter gives you CRM, inventory tracking, tasks, bookings, contracts, and SnaxScout. Pro adds the AI Voice Receptionist (outbound calls), unlimited locations, advanced analytics, and priority support.",
    },
    {
      q: "Do I need a credit card to start?",
      a: "Yes — a card is required to start your free trial, but you won't be charged until the 7 days are up. Cancel before then and you owe nothing.",
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
      q: "Is there a mobile experience?",
      a: "Yes. Provendy is designed to work on your phone in the field and your laptop back at the office. Native iOS and Android apps are on the roadmap — for now, the mobile web experience is fast and field-ready.",
    },
    {
      q: "Can I import my existing machine list or client data?",
      a: "Yes. We support CSV imports so you can bring in your existing locations, clients, and inventory data from spreadsheets or other tools and hit the ground running.",
    },
    {
      q: "What kind of support do I get?",
      a: "You get direct access to the Provendy team. We're a small, operator-focused company — so when you reach out, you hear back from a real person. Pro users get priority support.",
    },
    {
      q: "Is my data secure?",
      a: "All data is encrypted in transit and at rest. We use industry-standard security practices and your data is never sold or shared with third parties.",
    },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1a0a0a" }} className="min-h-screen bg-background">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-100" style={{ background: 'oklch(0.978 0.006 80 / 0.92)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="w-full px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("hero")}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-xl" style={{ background: TEAL }}>P</div>
            <span className="font-bold text-lg text-gray-900">Provendy</span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {[{ label: "How it works", id: "how" }, { label: "Features", id: "features" }, { label: "FAQ", id: "faq" }].map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{label}</button>
            ))}
            <a
              href="https://app.provendy.ai/signup"
              className="text-sm font-semibold text-white px-4 py-2 rounded-full"
              style={{ background: TEAL }}
            >
              Get Access
            </a>
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
            <a
              href="https://app.provendy.ai/signup"
              className="text-sm font-semibold text-white px-4 py-2 rounded-full w-fit"
              style={{ background: TEAL }}
              onClick={() => setNavOpen(false)}
            >Get Access</a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 92% 0, 100% 6%, 100% 100%, 30% 100%, 22% 94%, 0 94%)",
          minHeight: "640px",
        }}
      >
        {/* Background video */}
        <video
          src="https://res.cloudinary.com/do9un1nb1/video/upload/v1781566412/snaxology_hero_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Centered hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium mb-8" style={{ background: "rgba(227,30,36,0.25)", color: "#ff8a8e" }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#ff8a8e" }} />
            Now live — get access today
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            Run your vending business
            <br />
            <span className="relative inline-block" style={{ color: TEAL }}>
              like a pro.
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6 Q75 2 150 5 Q225 8 298 4" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Track your inventory, manage your clients, and know exactly when each machine was last stocked — all in one platform built for vending operators.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a href="https://app.provendy.ai/signup" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-95" style={{ background: TEAL }}>
              Get Early Access →
            </a>
            <button onClick={() => scrollTo("how")} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm border border-white/40 bg-white/10 hover:bg-white/20 transition-all active:scale-95">
              See how it works ↓
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-white/70">
            {[{ icon: "📝", label: "Contracts" }, { icon: "📦", label: "Inventory tracking" }, { icon: "👥", label: "Built-in CRM" }, { icon: "📍", label: "Scout AI lead gen" }].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5"><span>{icon}</span><span className="font-medium">{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#fef2f2", color: "#dc2626" }}>The Problem</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Still running on spreadsheets?</h2>
            <p className="text-gray-500 max-w-md mx-auto">Most operators run their business out of spreadsheets, sticky notes, and memory. Provendy replaces all of that.</p>
          </div>
          <div className="space-y-4">
            {[
              { problem: "You don't know which machines need restocking until it's too late.", solution: "See last restock date and stock levels for every machine at a glance." },
              { problem: "Client info is scattered across texts, emails, and notebooks.", solution: "One CRM built alongside your machines — contacts, notes, and history in one place." },
              { problem: "No way to know if a location is actually worth keeping.", solution: "Location analytics coming soon — data to help you evaluate and grow your route." },
            ].map(({ problem, solution }, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full flex items-start gap-3 rounded-xl p-4" style={{ background: "#fde8e9" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#fee2e2" }}>
                    <span className="text-red-500 text-sm font-bold">✕</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-0.5">Problem</p>
                    <p className="text-sm text-gray-700 font-medium">{problem}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: "#16a34a" }}>→</div>
                <div className="flex-1 w-full flex items-start gap-3 rounded-xl p-4" style={{ background: "#ecfdf5" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(22,163,74,0.15)" }}>
                    <span style={{ color: "#16a34a" }} className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: "#16a34a" }}>Provendy</p>
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
      <section id="how" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>How it works</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Built for the route, not the office</h2>
            <p className="text-gray-500">No training needed. If you can use a spreadsheet, you can use Provendy — and it's a lot faster.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "1", icon: "🏪", title: "Add your machines", desc: "Set up each location with its machine type, client contact, and starting inventory. Takes minutes per location and you only do it once." },
              { num: "2", icon: "📦", title: "Log restocks and visits", desc: "Every time you service a machine, log what you stocked and when. Provendy tracks the history so you always know where things stand." },
              { num: "3", icon: "📊", title: "Manage clients and grow", desc: "Use the built-in CRM to stay on top of client relationships. Upcoming: location analytics to help you evaluate placements and find new ones." },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="rounded-2xl p-7 border border-gray-200" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", background: "oklch(0.99 0.003 80)" }}>
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
      <section id="features" className="py-20" style={{ background: "oklch(0.965 0.008 80)" }}>
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
              { icon: "📝", title: "Contracts", desc: "Create and send professional placement contracts to location owners in minutes — no lawyer needed. Track signatures and renewals in one place." },
              { icon: "📍", title: "Location analytics (coming soon)", desc: "Data-driven insights on each placement — foot traffic, revenue benchmarks, and recommendations to help you grow your route." },
              { icon: "📤", title: "CSV import & export", desc: "Bring in your existing machine list and client data from any spreadsheet. Your data is always yours to take with you." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border border-gray-200 hover:border-red-200 transition-colors" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)", background: "oklch(0.99 0.003 80)" }}>
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
            <img src={APP_MOCKUP} alt="Provendy platform showing machine and client management" className="w-full object-cover" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["CRM & Contacts", "Contracts", "Inventory", "Scout AI"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCOUT ───────────────────────────────────────────────────────── */}
      <section id="scout" className="py-20" style={{ background: "oklch(0.978 0.006 80)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text column */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>Scout</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Find your next location before your competition does
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Scout is your AI-powered lead engine. Search any city, filter by business type, and set your radius — Scout surfaces the best placement opportunities on an interactive map so you can pitch new accounts with confidence.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { icon: "📍", text: "Map-based search by address, business name, or city/state" },
                  { icon: "🏢", text: "Filter by business type — restaurants, offices, gyms, and more" },
                  { icon: "🤖", text: "AI Lead Gen tab surfaces high-potential accounts automatically" },
                  { icon: "📏", text: "Adjustable radius from 1 to 50 miles" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-base mt-0.5">{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.provendy.ai/checkout/pro"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{ background: TEAL, transition: "filter 160ms ease-out" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.12)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              >
                Try Scout
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            {/* Screenshot column */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200" style={{ boxShadow: `0 24px 64px rgba(227,30,36,0.12), 0 4px 16px rgba(0,0,0,0.10)` }}>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663676595920/mSJmXyETeARbjqhC.png"
                  alt="Scout map-based lead search in Provendy"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="text-lg">🗺️</span>
                <div>
                  <div className="text-xs font-bold text-gray-900">AI Lead Gen</div>
                  <div className="text-xs text-gray-400">Built right in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI RECEPTIONIST ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual column */}
            <div className="flex flex-col gap-4 order-2 md:order-1">
              <div className="rounded-2xl border border-gray-100 p-5 shadow-sm" style={{ background: "oklch(0.99 0.003 80)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: TEAL_LIGHT }}>📞</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Get a call from the agent</div>
                    <div className="text-xs text-gray-400">Hear exactly what your prospects hear</div>
                  </div>
                </div>
                <div className="h-px bg-gray-100 mb-3" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: TEAL_LIGHT }}>📲</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Quick Outbound Call</div>
                    <div className="text-xs text-gray-400">Dial any number — no CRM contact needed</div>
                  </div>
                </div>
                <div className="h-px bg-gray-100 mb-3" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: TEAL_LIGHT }}>📝</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Custom Call Script</div>
                    <div className="text-xs text-gray-400">Set what the AI says — uses your tone, your pitch</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Copy column */}
            <div className="order-1 md:order-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>AI Receptionist</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                An AI agent that makes calls <span style={{ color: TEAL }}>for you.</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Stop spending hours cold calling locations. Your AI Receptionist dials prospects, delivers your pitch, and handles objections — using the script you write. Available on the Pro plan.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Calls prospects and pitches your vending placement",
                  "Uses your custom script with {name} & {business} variables",
                  "Outbound calls from your saved contact list",
                  "Test the agent by calling yourself first",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: TEAL }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="https://app.provendy.ai/checkout/pro"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{ background: TEAL, transition: "filter 160ms ease-out" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.12)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              >
                Try AI Receptionist
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      {/* EARLY ACCESS — pricing hidden until Stripe is live */}
      <section id="pricing" className="py-24" style={{ background: "oklch(0.97 0.006 80)" }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>Early Access</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Be first in the door</h2>
          <p className="text-gray-500 text-base max-w-md mx-auto mb-10">
            Provendy is currently invite-only while we onboard our founding operators. Join the waitlist and we'll reach out as soon as a spot opens up.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
            <ul className="space-y-3 text-sm text-gray-600 text-left max-w-xs mx-auto mb-8">
              {[
                "CRM — contacts, deals, notes & activity log",
                "AI Voice Agent for outbound calls",
                "Scout AI — find & qualify new locations",
                "45-Day Launch Plan & Mindset Vault",
                "Mobile app (iOS & Android)",
                "Contracts & eSign",
              ].map(f => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
            <a
              href="https://app.provendy.ai/signup"
              className="inline-block w-full max-w-xs py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 shadow-lg text-center"
              style={{ background: TEAL }}
            >
              Request Early Access →
            </a>
            <p className="text-xs text-gray-400 mt-4">We review applications and send access within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* PRICING — hidden until Stripe is live
      <section id="pricing" className="py-24" style={{ background: "oklch(0.97 0.006 80)" }}>
        Starter $9.99 / Pro $19.99 / Add-On $497 — see git history to restore
      </section>
      */}

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>FAQ</span>
            <h2 className="text-4xl font-extrabold text-gray-900">Common Questions</h2>
          </div>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl px-6" style={{ background: "oklch(0.99 0.003 80)" }}>
            {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ── GET ACCESS ───────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-24" style={{ background: TEAL_DEEP }}>
        <div className="max-w-lg mx-auto px-5 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to run your route smarter?</h2>
          <p className="text-red-200/70 mb-10 text-base leading-relaxed">
            We're onboarding founding operators now. Apply for early access today.
          </p>
          <a
            href="https://app.provendy.ai/signup"
            className="inline-flex items-center justify-center gap-2 w-full max-w-sm py-4 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity"
            style={{ background: TEAL }}
          >
            Request Early Access →
          </a>
        </div>
      </section>

      {/* ── CONTACT MODAL ───────────────────────────────────────────────── */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => { setContactOpen(false); setContactSent(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            {contactSent ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-gray-500 text-sm mb-6">We'll get back to you within 1 business day.</p>
                <button onClick={() => { setContactOpen(false); setContactSent(false); }} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: TEAL }}>Close</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Get in touch</h3>
                  <button onClick={() => setContactOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
                </div>
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name</label>
                    <input
                      type="text" required placeholder="Your name"
                      value={contactForm.name}
                      onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                    <input
                      type="email" required placeholder="you@example.com"
                      value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                    <textarea
                      required placeholder="How can we help?" rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-300 resize-none"
                    />
                  </div>
                  <button type="submit" disabled={contactLoading} className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-60" style={{ background: TEAL }}>
                    {contactLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-10 bg-white border-t border-gray-100">
        <div className="w-full px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ background: TEAL }}>P</div>
            <div>
              <p className="font-bold text-sm text-gray-900">Provendy</p>
              <p className="text-xs text-gray-400">© 2026 Provendy. All rights reserved.</p>
            </div>
          </div>
          <div className="flex gap-5 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Terms</a>
            <button onClick={() => { setContactOpen(true); setContactSent(false); }} className="hover:text-gray-800 transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
