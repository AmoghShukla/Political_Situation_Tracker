export type PromiseStatus =
  | "Completed"
  | "In Progress"
  | "Delayed"
  | "Partially Completed"
  | "Not Started"
  | "Abandoned";

export type SourceCredibility =
  | "primary"
  | "primary-claim"
  | "secondary"
  | "verified-media";

export type EvidenceSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: string;
  credibility: SourceCredibility;
  publishedAt: string;
  summary: string;
};

export type PromiseTimelineItem = {
  date: string;
  label: string;
  type: string;
};

export type TrackedPromise = {
  id: string;
  slug: string;
  category: string;
  title: string;
  originalWording: string;
  coalitionSource: string;
  status: PromiseStatus;
  completion: number;
  department: string;
  ministry: string;
  districts: string[];
  budgetAllocatedCrore: number;
  budgetSpentCrore: number;
  deadline: string;
  lastUpdated: string;
  evidenceLevel: string;
  risk: string;
  timeline: PromiseTimelineItem[];
  sources: string[];
  officialLinks: string[];
  newsLinks: string[];
  tenderLinks: string[];
  rtiReferences: string[];
  citizenVerification: {
    openReports: number;
    verifiedReports: number;
    lastFieldCheck: string;
  };
};

export type MegaProject = {
  id: string;
  name: string;
  category: string;
  status: PromiseStatus;
  completion: number;
  district: string;
  originalEstimateCrore: number;
  currentEstimateCrore: number;
  costEscalationPercent: number;
  contractor: string;
  originalDeadline: string;
  revisedDeadline: string;
  delayMonths: number;
  politicalAnnouncements: number;
  verifiedMilestones: number;
  map: { lat: number; lng: number };
  summary: string;
  sources: string[];
};

export type BudgetData = {
  fiscalYear: string;
  currency: string;
  lastUpdated: string;
  summary: {
    totalExpenditure: number;
    revenueReceipts: number;
    capitalOutlay: number;
    fiscalDeficit: number;
    debtToGsdpPercent: number;
  };
  departments: Array<{
    name: string;
    allocation: number;
    spent: number;
    capitalShare: number;
  }>;
  trends: Array<{
    year: string;
    debt: number;
    fiscalDeficit: number;
    capex: number;
  }>;
  districtDistribution: Array<{
    district: string;
    allocation: number;
    utilization: number;
  }>;
  sources: string[];
};

export type Leader = {
  id: string;
  name: string;
  party: string;
  partyColor: "bjp" | "ncp" | "shivsena";
  role: string;
  portfolio: string[];
  swornIn: string;
  image?: {
    src: string;
    alt: string;
    credit: string;
    sourceId: string;
  };
  profile: string;
  indicators: Array<{ label: string; value: number }>;
  announcements: string[];
  sources: string[];
};

export type District = {
  id: string;
  name: string;
  region: string;
  projects: number;
  roadsKm: number;
  hospitals: number;
  schools: number;
  waterProjects: number;
  investmentsCrore: number;
  unemploymentPercent: number;
  budgetUtilization: number;
  risk: string;
};
