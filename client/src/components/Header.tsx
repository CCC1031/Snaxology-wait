import React from "react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/do9un1nb1/image/upload/v1781570351/provendy_logo.png"
            alt="Provendy logo"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="text-xl font-display font-bold text-gray-900">Provendy</h1>
            <p className="text-xs text-gray-500 font-body">Business Process Map</p>
          </div>
        </div>

        {/* Right Section - Contact Info + CRM Button */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-right">
              <p className="font-accent font-semibold text-gray-900">305-527-0879</p>
              <p className="text-gray-500 font-body">Schedule a consultation</p>
            </div>
          </div>
          
          {/* CRM Dashboard Button */}
          <a
            href="https://snaxolgy-production.up.railway.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-red-600 transition-colors whitespace-nowrap"
          >
            CRM Dashboard
          </a>
        </div>
      </div>
    </header>
  );
}
