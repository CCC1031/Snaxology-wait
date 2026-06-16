export interface SubStep {
  title: string;
  description: string;
}

export interface ProcessPhase {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  status: "pending" | "in-progress" | "completed";
  substeps: SubStep[];
  deliverables: string[];
}

export const processPhases: ProcessPhase[] = [
  {
    id: 1,
    title: "Initial Contact",
    description: "Reach out to property managers and decision makers to introduce Provendy solutions.",
    icon: "Phone",
    color: "#E31E24",
    duration: "1-2 weeks",
    status: "completed",
    substeps: [
      { title: "Identify Target Properties", description: "Research luxury apartments and commercial spaces" },
      { title: "Outreach Campaign", description: "Phone calls, emails, and personalized pitches" },
      { title: "Schedule Discovery Call", description: "Book initial consultation with decision maker" },
    ],
    deliverables: ["Contact list", "Pitch deck", "Scheduled meetings"],
  },
  {
    id: 2,
    title: "Site Assessment & Renderings",
    description: "Visit the property, assess the space, and create custom machine placement renderings.",
    icon: "MapPin",
    color: "#0EA5A0",
    duration: "2-3 weeks",
    status: "completed",
    substeps: [
      { title: "On-Site Visit", description: "Evaluate space layout, foot traffic, and placement options" },
      { title: "3D Renderings", description: "Create photorealistic renderings of machine placement" },
      { title: "Site Report", description: "Document findings and recommendations" },
    ],
    deliverables: ["Site assessment report", "3D renderings", "Placement recommendations"],
  },
  {
    id: 3,
    title: "Proposal & Contract",
    description: "Present customized proposal with revenue share terms and contract agreement.",
    icon: "FileText",
    color: "#E31E24",
    duration: "1-2 weeks",
    status: "in-progress",
    substeps: [
      { title: "Create Custom Proposal", description: "Tailor terms based on property specifics" },
      { title: "Revenue Share Negotiation", description: "Discuss profit-sharing model" },
      { title: "Contract Preparation", description: "Prepare legal agreement for signature" },
    ],
    deliverables: ["Proposal document", "Contract", "Revenue share details"],
  },
  {
    id: 4,
    title: "Contract Signed",
    description: "Property manager signs the contract, officially partnering with Provendy.",
    icon: "CheckCircle",
    color: "#0EA5A0",
    duration: "1 day",
    status: "pending",
    substeps: [
      { title: "Signature Collection", description: "Obtain authorized signatures" },
      { title: "Contract Finalization", description: "File and archive agreement" },
      { title: "Kickoff Meeting", description: "Schedule implementation timeline" },
    ],
    deliverables: ["Signed contract", "Implementation schedule", "Kickoff notes"],
  },
  {
    id: 5,
    title: "Marketing Materials",
    description: "Develop branded marketing content to promote the Provendy experience to residents.",
    icon: "Palette",
    color: "#E31E24",
    duration: "2-3 weeks",
    status: "pending",
    substeps: [
      { title: "Design Assets", description: "Create posters, digital ads, and signage" },
      { title: "Resident Communications", description: "Draft emails and announcements" },
      { title: "Social Media Content", description: "Prepare launch posts and stories" },
    ],
    deliverables: ["Marketing collateral", "Digital assets", "Communication templates"],
  },
  {
    id: 6,
    title: "Machine Order & Manufacturing",
    description: "Order custom-configured machines with curated products for the property.",
    icon: "Package",
    color: "#0EA5A0",
    duration: "4-6 weeks",
    status: "pending",
    substeps: [
      { title: "Finalize Specifications", description: "Confirm machine type, color, and branding" },
      { title: "Product Curation", description: "Select premium snacks and beverages" },
      { title: "Manufacturing & Assembly", description: "Build and test machines" },
    ],
    deliverables: ["Custom machines", "Product inventory", "Quality assurance report"],
  },
  {
    id: 7,
    title: "Installation & Setup",
    description: "Professional installation of machines with zero disruption to the property.",
    icon: "Wrench",
    color: "#E31E24",
    duration: "1-2 days",
    status: "pending",
    substeps: [
      { title: "Delivery & Placement", description: "Transport and position machines" },
      { title: "Electrical & Network Setup", description: "Connect power and AI systems" },
      { title: "Staff Training", description: "Brief property staff on operations" },
    ],
    deliverables: ["Installed machines", "Training documentation", "Setup photos"],
  },
  {
    id: 8,
    title: "Launch & Operations",
    description: "Official launch with 24/7 AI-powered operations and ongoing support.",
    icon: "Zap",
    color: "#0EA5A0",
    duration: "Ongoing",
    status: "pending",
    substeps: [
      { title: "Grand Opening Event", description: "Celebrate with residents" },
      { title: "Real-Time Monitoring", description: "AI tracks inventory and sales" },
      { title: "Ongoing Support", description: "Restocking and maintenance" },
    ],
    deliverables: ["Launch event", "Operations dashboard", "Support protocols"],
  },
];
