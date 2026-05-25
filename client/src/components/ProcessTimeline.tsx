import React from "react";
import { processPhases } from "@/data/processPhases";
import ProcessPhaseCard from "./ProcessPhaseCard";

export default function ProcessTimeline() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-display font-bold text-gray-900 md:text-5xl">
            Snaxology Business Journey
          </h1>
          <p className="text-lg text-gray-600 font-body">
            From initial contact to 24/7 AI-powered operations
          </p>
        </div>

        {/* Timeline Grid with spine */}
        <div className="relative">
          {/* Timeline spine - only between cards */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-red-500 via-teal-500 to-red-500 pointer-events-none">
            <div className="absolute inset-0 animate-pulse bg-red-400 opacity-50" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {processPhases.map((phase, index) => (
              <ProcessPhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 rounded-lg border-2 border-red-500 bg-red-50 p-8 text-center">
          <h2 className="mb-3 text-2xl font-display font-bold text-gray-900">
            Ready to Transform Your Property?
          </h2>
          <p className="mb-6 text-gray-700 font-body">
            Schedule a free site assessment and discover how Snaxology can elevate your space.
          </p>
          <button className="inline-block rounded-lg bg-red-500 px-8 py-3 font-accent font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg">
            Schedule Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
