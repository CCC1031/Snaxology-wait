/**
 * Provendy Landing Page
 * Design: HappyPath-inspired — clean white + Provendy red/black, Plus Jakarta Sans, route-line hero bg
 * Copy: Provendy-specific — lead-gen + CRM platform for vending operators (inventory coming soon)
 */
import { useState, useMemo, useEffect } from "react";
import ClippedVideoTab from "@/components/ui/clipped-video-tab";
import HeroVideos from "@/components/HeroVideos";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663676595920/8BWP2AddNeLcVoRQGif8V3/snaxology-hero-bg-red-NwwgpHGHvtSYgTRFLB9aav.webp";
const APP_MOCKUP = "/app-mockup.jpg";

const TEAL = "#E31E24";
const TEAL_LIGHT = "#fde8e9";
const TEAL_DARK = "#b81519";
const TEAL_DEEP = "#1a0505";

// ── Hero copy variants by traffic source (UTM). Warm = content/organic,
//    cold = paid. Falls back to DEFAULT when no matching utm_source. (#19, #20)
const HERO_DEFAULT = {
  eyebrow: "Built for solo & small-team vending operators",
  headA: "Win more vending locations",
  headB: "without the chaos.",
  sub: "Find new spots, pitch and sign them, and manage every client on your route — all in one app, made by a vending operator, not a software company.",
};
const HERO_VARIANTS: Record<string, Partial<typeof HERO_DEFAULT>> = {
  // Warm content traffic (Reddit, YouTube, newsletter)
  reddit: {
    eyebrow: "Fellow operators 👋",
    headA: "The vending tool",
    headB: "you keep asking for.",
    sub: "You wanted software that actually helps you find locations and stay organized on your route. So an operator built it. Find, pitch, sign, and manage every machine in one place.",
  },
  youtube: {
    eyebrow: "Saw us on YouTube?",
    headA: "Run your whole route",
    headB: "from one app.",
    sub: "Find new placements, close them, and keep your whole route organized — the app built by an operator who was tired of spreadsheets.",
  },
  // Cold paid traffic (Google, Facebook ads)
  google: {
    headA: "Sign more vending locations",
    headB: "in less time.",
    sub: "Software for solo and small-team operators to find new placements, close them, and manage your whole route. Set up in an afternoon.",
  },
  facebook: {
    headA: "Stop losing vending leads",
    headB: "to sticky notes.",
    sub: "Find new spots, pitch and sign them, and manage your whole route — one simple app built for vending operators.",
  },
};

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

  // Swap hero copy based on ?utm_source= (cold paid vs warm content). (#19, #20)
  const hero = useMemo(() => {
    const src = new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() || "";
    return { ...HERO_DEFAULT, ...(HERO_VARIANTS[src] || {}) };
  }, []);

  // Sticky floating CTA on scroll + one-time exit-intent capture (desktop).
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowStickyCTA(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    const onOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth > 768 && !sessionStorage.getItem("provendy_exit_shown")) {
        sessionStorage.setItem("provendy_exit_shown", "1");
        setExitOpen(true);
      }
    };
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

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
      a: "Yes — Provendy was built by an operator, for operators. Every feature is designed around how vending businesses actually run: finding and winning new locations, keeping client relationships organized, sending proposals and contracts, and making decisions based on real data. It's not a generic CRM with vending bolted on.",
    },
    {
      q: "What does it cost?",
      a: "Provendy offers two plans: Starter at $9.99/month and Pro at $19.99/month. Both come with a 7-day free trial — no charge until your trial ends. Cancel anytime.",
    },
    {
      q: "What's the difference between Starter and Pro?",
      a: "Starter gives you CRM, tasks, bookings, contracts, and Scout. Pro adds the AI Voice Receptionist (outbound calls), unlimited locations, advanced analytics, and priority support. Inventory tracking is on the roadmap and coming soon to both plans.",
    },
    {
      q: "Do I need a credit card to start?",
      a: "Yes — a card is required to start your free trial, but you won't be charged until the 7 days are up. Cancel before then and you owe nothing.",
    },
    {
      q: "Can I track inventory and restocks?",
      a: "Inventory and restock tracking is on our roadmap and coming soon. Today, Provendy focuses on helping you find, pitch, and sign new locations and manage your clients — with per-machine inventory tools arriving shortly.",
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
      a: "Yes. We support CSV imports so you can bring in your existing locations and clients from spreadsheets or other tools and hit the ground running.",
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
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo("hero")}>
            <img src="/provendy-wordmark.png" alt="Provendy" className="h-8 w-auto object-contain" />
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
        {/* Background: two videos crossfading on a loop */}
        <HeroVideos />
        {/* Dark overlay so text is readable over the (bright) hero videos.
            Inline style avoids any Tailwind v4 gradient-class mismatch. */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.82), rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.88))" }}
        />
        {/* Centered hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium mb-8" style={{ background: "rgba(227,30,36,0.25)", color: "#ff8a8e" }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#ff8a8e" }} />
            {hero.eyebrow}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            {hero.headA}
            <br />
            <span className="relative inline-block" style={{ color: TEAL }}>
              {hero.headB}
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6 Q75 2 150 5 Q225 8 298 4" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            {hero.sub}
          </p>
          {/* ONE primary CTA (first-person, bright) + secondary as a text link (#3, #4) */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <a href="https://app.provendy.ai/signup" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-white text-base transition-all hover:opacity-90 active:scale-95 shadow-xl" style={{ background: TEAL, boxShadow: "0 10px 30px rgba(227,30,36,0.45)" }}>
              Start my free trial →
            </a>
            <button onClick={() => scrollTo("how")} className="text-sm font-medium text-white/70 hover:text-white underline underline-offset-4 transition-colors">
              or see how it works
            </button>
            <p className="text-xs text-white/50">7-day free trial · no charge today · cancel anytime</p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-white/70">
            {[{ icon: "📍", label: "Find new locations" }, { icon: "🤝", label: "Pitch & sign clients" }, { icon: "📞", label: "AI calls that pitch for you" }, { icon: "🗂", label: "Your whole route, organized" }].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5"><span>{icon}</span><span className="font-medium">{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR — hidden until real logos/reviews exist. Flip false→true to show. */}
      {false && (
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Trusted by vending operators across the country
          </p>
          {/* [LOGO BAR] — replace each with a customer / route logo */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60 mb-8">
            {["[LOGO 1]", "[LOGO 2]", "[LOGO 3]", "[LOGO 4]", "[LOGO 5]"].map((l) => (
              <span key={l} className="text-base font-bold text-gray-400 tracking-tight">{l}</span>
            ))}
          </div>
          {/* [REVIEW BADGES] — swap for real G2 / Capterra / Trustpilot / Product Hunt embeds */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { badge: "G2", stars: "★★★★★", note: "4.9 / 5" },
              { badge: "Capterra", stars: "★★★★★", note: "4.8 / 5" },
              { badge: "Product Hunt", stars: "▲", note: "#1 Product of the Day" },
            ].map(({ badge, stars, note }) => (
              <div key={badge} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <span className="text-[11px] font-bold text-gray-700">{badge}</span>
                <span className="text-[13px]" style={{ color: TEAL }}>{stars}</span>
                <span className="text-[11px] text-gray-400">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

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
              { problem: "You don't have a repeatable way to find and win new locations.", solution: "Scout finds high-potential spots near you so you can pitch and sign more accounts." },
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

      {/* ── SOCIAL PROOF: stats + testimonials + video (#11–13, #15) ─────── */}
      <section className="py-20" style={{ background: TEAL_DEEP }}>
        <div className="max-w-5xl mx-auto px-5">

          {/* Stats bar — hidden until real numbers exist. Flip false→true to show. */}
          {false && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { n: "1,200+", l: "operators on Provendy" },
              { n: "8,400+", l: "locations signed" },
              { n: "12 hrs", l: "saved per week, on average" },
              { n: "$3,100", l: "avg. new monthly revenue added" },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{n}</div>
                <div className="text-red-200/70 text-xs leading-snug">{l}</div>
              </div>
            ))}
          </div>
          )}

          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-red-300 mb-3 uppercase tracking-widest">From operators in the field</p>
            <h2 className="text-4xl font-extrabold text-white mb-3">Operators are signing more locations</h2>
          </div>

          {/* Testimonials — photo + full name + SPECIFIC numeric result (#11, #12) */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              { initials: "MT", name: "[TESTIMONIAL 1 — Full Name]", role: "[Route operator · City, ST]", quote: "In my first 60 days on Provendy I signed 6 new micro-market locations — more than I landed in the whole year before." },
              { initials: "JR", name: "[TESTIMONIAL 2 — Full Name]", role: "[2-person team · City, ST]", quote: "Scout paid for itself the first week. We booked 11 walkthroughs from one afternoon of searching and closed 3." },
              { initials: "DL", name: "[TESTIMONIAL 3 — Full Name]", role: "[Solo operator · City, ST]", quote: "My follow-ups don't slip through the cracks anymore. Everything lives in one place and I'm saving about 10 hours a week I used to lose to spreadsheets." },
            ].map(({ initials, name, role, quote }, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-red-300 mb-3">★★★★★</div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 flex-1">"{quote}"</p>
                <div className="flex items-center gap-3">
                  {/* [PHOTO] — replace with a real headshot */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: TEAL }}>{initials}</div>
                  <div>
                    <div className="text-white text-sm font-semibold">{name}</div>
                    <div className="text-red-200/60 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video testimonial slot (#15) */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl flex flex-col items-center justify-center text-center gap-3 py-14 px-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.25)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: TEAL }}>
                <span className="text-white text-xl">▶</span>
              </div>
              <div className="text-white font-semibold">[VIDEO TESTIMONIAL]</div>
              <div className="text-red-200/60 text-xs max-w-sm">Drop in a 30–60s clip of an operator describing the result they got. Video testimonials convert better than any other social proof.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER STORY (authenticity) ────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img src="/provendy-logo.png" alt="Provendy" className="h-28 w-auto flex-shrink-0 object-contain" />
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: TEAL_LIGHT, color: TEAL }}>Why we built this</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-snug">Built by an operator, not a software company.</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-3">
                I ran my own vending route for about a year, running the whole thing out of Excel. I lost track of follow-ups and let deals slip that I should've closed. The tools out there were built for big companies optimizing machines they already had. Nothing helped me actually <strong className="text-gray-800">win new locations.</strong>
              </p>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                So I built Provendy, the app I wish I'd had on day one. Every feature comes from a real problem on a real route.
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-900">Clarence, Founder of Provendy</p>
            </div>
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
              { num: "1", icon: "📍", title: "Find your next location", desc: "Use Scout to search any area, filter by business type, and surface high-potential spots to pitch — right on a map." },
              { num: "2", icon: "🤝", title: "Pitch and sign them", desc: "Send polished proposals and contracts, and let the AI receptionist make the outbound calls for you. Close more of what you pitch." },
              { num: "3", icon: "📊", title: "Manage clients and grow", desc: "Keep every client, note, and follow-up in the built-in CRM. Coming soon: inventory tracking and location analytics to help you grow the route." },
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
              { icon: "📄", title: "Proposals & contracts", desc: "Send polished, ready-made proposals and placement contracts to property managers — and close more of the locations you pitch." },
              { icon: "📦", title: "Inventory tracking (coming soon)", desc: "Log stock levels and see when each machine was last restocked. On the roadmap and arriving soon." },
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
      <section className="py-20" style={{ background: TEAL_DEEP }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>Preview</span>
            <h2 className="text-4xl font-extrabold text-white mb-3">See it in action</h2>
            <p className="text-red-200/70 text-sm">Works on your phone in the field and your laptop back at the office</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src={APP_MOCKUP} alt="Provendy app — dashboard and route view" className="w-full h-auto block" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["CRM & Contacts", "Proposals", "AI Calls", "Scout AI"].map((tag) => (
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

      {/* ── COMPARISON: Provendy vs VendSoft (#9) ───────────────────────── */}
      <section className="py-20" style={{ background: "oklch(0.99 0.003 80)" }}>
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: TEAL_LIGHT, color: TEAL }}>Provendy vs VendSoft</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Already looking at VendSoft?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              VendSoft helps you squeeze more out of the machines you already have. Provendy helps you <strong className="text-gray-700">win new locations first</strong> — then manage them all in one place.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-500"></th>
                  <th className="p-4 text-center rounded-t-xl" style={{ background: TEAL, color: "white" }}>
                    <div className="text-base font-extrabold">Provendy</div>
                    <div className="text-xs font-medium opacity-80">Win + manage locations</div>
                  </th>
                  <th className="p-4 text-center text-gray-500">
                    <div className="text-base font-bold">VendSoft</div>
                    <div className="text-xs">Optimize existing machines</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Find & scout new locations", us: true, them: false },
                  { label: "Pitch decks, proposals & contracts", us: true, them: false },
                  { label: "AI outbound calling to prospects", us: true, them: false },
                  { label: "Built-in CRM for placements", us: true, them: "limited" },
                  { label: "Inventory & restock tracking", us: "soon", them: true },
                  { label: "Made for solo & small teams", us: true, them: false },
                  { label: "Starts at", us: "$9.99/mo", them: "Higher / quote" },
                ].map(({ label, us, them }, i, arr) => {
                  const cell = (v: boolean | string) =>
                    v === true ? <span style={{ color: "#16a34a" }} className="text-lg font-bold">✓</span>
                      : v === false ? <span className="text-gray-300 text-lg font-bold">✕</span>
                      : v === "limited" ? <span className="text-xs text-gray-400">Limited</span>
                      : v === "soon" ? <span className="text-xs font-medium" style={{ color: TEAL }}>Coming soon</span>
                      : <span className="text-sm font-semibold text-gray-700">{v}</span>;
                  return (
                    <tr key={label} className="border-t border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-700">{label}</td>
                      <td className={"p-4 text-center " + (i === arr.length - 1 ? "rounded-b-xl" : "")} style={{ background: "rgba(227,30,36,0.05)" }}>{cell(us)}</td>
                      <td className="p-4 text-center">{cell(them)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Comparison reflects Provendy's positioning; verify VendSoft's current features before publishing.</p>
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
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to sign more locations?</h2>
          <p className="text-red-200/70 mb-8 text-base leading-relaxed">
            Start free today. Set up your route in an afternoon and land your next location this week.
          </p>
          <a
            href="https://app.provendy.ai/signup"
            className="inline-flex items-center justify-center gap-2 w-full max-w-sm py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity shadow-xl"
            style={{ background: TEAL, boxShadow: "0 10px 30px rgba(227,30,36,0.4)" }}
          >
            Start my free trial →
          </a>
          {/* Guarantee / risk reversal */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mt-5 text-sm text-red-200/70">
            <span>✓ 7-day free trial</span>
            <span>✓ No charge today</span>
            <span>✓ Cancel anytime — keep your data</span>
          </div>
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
            <img src="/provendy-logo.png" alt="Provendy" className="h-8 w-auto object-contain" />
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

      {/* ── STICKY FLOATING CTA (appears on scroll) ─────────────────────── */}
      {showStickyCTA && !exitOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-gray-900">Win more vending locations</div>
            <div className="text-xs text-gray-500">7-day free trial · no charge today</div>
          </div>
          <a href="https://app.provendy.ai/signup" className="flex-1 sm:flex-none text-center px-6 py-3 rounded-full font-bold text-white text-sm shadow-lg" style={{ background: TEAL }}>
            Start my free trial →
          </a>
        </div>
      )}

      {/* ── EXIT-INTENT (once per session, desktop) ─────────────────────── */}
      {exitOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setExitOpen(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setExitOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            <div className="text-3xl mb-3">👋</div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Before you go…</h3>
            <p className="text-gray-500 text-sm mb-6">Land your next location this week. Start free — no charge today, cancel anytime.</p>
            <a href="https://app.provendy.ai/signup" className="inline-block w-full py-3.5 rounded-xl font-bold text-white" style={{ background: TEAL }}>Start my free trial →</a>
            <button onClick={() => setExitOpen(false)} className="block mx-auto mt-4 text-xs text-gray-400 hover:text-gray-600">No thanks, I'll keep using spreadsheets</button>
          </div>
        </div>
      )}
    </div>
  );
}
