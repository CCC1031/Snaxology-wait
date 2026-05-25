import React, { useState } from "react";
import { ProcessPhase } from "@/data/processPhases";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as LucideIcons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ProcessPhaseCardProps {
  phase: ProcessPhase;
  index: number;
}

export default function ProcessPhaseCard({ phase, index }: ProcessPhaseCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[phase.icon] || LucideIcons.Package;

  // Status icon
  const StatusIcon =
    phase.status === "completed"
      ? CheckCircle
      : phase.status === "in-progress"
        ? Clock
        : AlertCircle;

  const statusColor =
    phase.status === "completed"
      ? "text-teal-500"
      : phase.status === "in-progress"
        ? "text-red-500"
        : "text-gray-400";

  return (
    <>
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        style={{
          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
        }}
      >
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          {/* Accent bar */}
          <div
            className="absolute top-0 left-0 h-1 w-full"
            style={{ backgroundColor: phase.color }}
          />

          {/* Icon Badge */}
          <div className="mb-4 flex items-center justify-between">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${phase.color}15`,
                border: `2px solid ${phase.color}`,
              }}
            >
              <IconComponent size={24} style={{ color: phase.color }} />
            </div>
            <StatusIcon size={20} className={statusColor} />
          </div>

          {/* Phase Number */}
          <div className="mb-2">
            <span className="text-xs font-accent uppercase tracking-widest text-gray-500">
              Phase {phase.id}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-display font-bold text-gray-900">
            {phase.title}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm font-body text-gray-600 line-clamp-2">
            {phase.description}
          </p>

          {/* Duration Badge */}
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: phase.color,
                color: phase.color,
              }}
            >
              {phase.duration}
            </Badge>
            <span className="text-xs text-gray-400">
              {phase.substeps.length} steps
            </span>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-xs font-accent text-gray-400">Click for details →</span>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${phase.color}15`,
                  border: `2px solid ${phase.color}`,
                }}
              >
                <IconComponent size={28} style={{ color: phase.color }} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-display">
                  {phase.title}
                </DialogTitle>
                <p className="text-sm text-gray-500">Phase {phase.id}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-gray-700 font-body">{phase.description}</p>
            </div>

            {/* Duration and Status */}
            <div className="flex gap-4">
              <Badge variant="outline">{phase.duration}</Badge>
              <Badge
                variant="outline"
                style={{
                  borderColor: phase.color,
                  color: phase.color,
                }}
              >
                {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
              </Badge>
            </div>

            {/* Sub-steps */}
            <div>
              <h4 className="mb-3 font-accent text-lg font-semibold text-gray-900">
                Key Steps
              </h4>
              <div className="space-y-3">
                {phase.substeps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div
                      className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: phase.color }}
                    />
                    <div>
                      <p className="font-accent font-semibold text-gray-900">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 font-body">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="mb-3 font-accent text-lg font-semibold text-gray-900">
                Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {phase.deliverables.map((deliverable, idx) => (
                  <Badge key={idx} variant="secondary">
                    {deliverable}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
