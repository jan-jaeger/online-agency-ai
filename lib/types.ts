export type FunnelGoal =
  | "seo-geo"
  | "sea-performance"
  | "webdesign-highspeed"
  | "ecommerce-shopsysteme";

export type FunnelSpeed = "express-48h" | "sieben-tage" | "dreissig-tage";

export type FunnelBudget = "1000-3000" | "3000-7000" | "7000-plus";

export interface FunnelContact {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface FunnelPayload {
  goal: FunnelGoal | null;
  speed: FunnelSpeed | null;
  budget: FunnelBudget | null;
  contact: FunnelContact;
  submittedAt: string;
  source: "online-agency.ai-landingpage";
}
