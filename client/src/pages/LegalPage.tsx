import type { ReactNode } from "react";

/**
 * Shared layout for legal pages (Privacy, Terms). Matches the landing-page
 * typography and branding; plain <a> nav keeps it simple and robust.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1a0a0a" }} className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center cursor-pointer">
            <img src="/provendy-wordmark.png" alt="Provendy" className="h-7 w-auto object-contain" />
          </a>
          <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">← Back to home</a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: {updated}</p>
        <div className="text-[15px] leading-relaxed text-gray-700">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-3xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/provendy-logo.png" alt="Provendy" className="h-6 w-auto object-contain" />
            <span>© 2026 Provendy. All rights reserved.</span>
          </div>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-700 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Small shared building blocks for legal copy
export const H = ({ children }: { children: ReactNode }) => (
  <h2 className="text-lg font-bold text-gray-900 mt-9 mb-3">{children}</h2>
);
export const P = ({ children }: { children: ReactNode }) => <p className="mb-4">{children}</p>;
export const UL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-5 mb-4 space-y-1.5">{children}</ul>
);
