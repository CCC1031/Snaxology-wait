import React from "react";
import { Mail, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
                <span className="text-lg font-bold text-white font-display">P</span>
              </div>
              <span className="text-lg font-display font-bold text-gray-900">Provendy</span>
            </div>
            <p className="text-sm text-gray-600 font-body">
              Luxury meets convenience through AI-powered smart markets.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-accent font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                <a href="tel:305-527-0879" className="text-sm text-gray-600 hover:text-red-500 font-body">
                  305-527-0879
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                <span className="text-sm text-gray-600 font-body">
                  ccolin@snaxologyvending.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-red-500" />
                <a href="https://snaxologyvending.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-500 font-body">
                  snaxologyvending.com
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-accent font-semibold text-gray-900 mb-2">Ready to Start?</h3>
            <p className="text-sm text-gray-600 font-body mb-4">
              Schedule your free site assessment today.
            </p>
            <button className="w-full bg-red-500 text-white py-2 rounded-lg font-accent font-semibold text-sm hover:bg-red-600 transition-colors">
              Schedule Now
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600 font-body">
            © 2026 Provendy. All rights reserved. | Elevating luxury spaces with AI-powered convenience.
          </p>
        </div>
      </div>
    </footer>
  );
}
