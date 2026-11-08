// DEMO DATA ONLY. All profiles below are fictional examples.
// They must never be presented as real people, real reviews or real verifications.

import type { VerificationStatus } from "./verification";

export type Label = { en: string; ar: string };
export type PricingModel = "fixed" | "quote";
export type Service = Label & { pricing: PricingModel; price?: number };

export type ProProfile = {
  id: string;
  name: Label;
  initials: string;
  color: string;
  category: string; // key of CATEGORIES
  city: string; // key of CITIES
  areas: string[]; // keys of CITIES
  experienceYears: number;
  learnedBy: "practice" | "training" | "both";
  description: Label;
  services: Service[];
  qualifications: Label[];
  verification: VerificationStatus;
  isDemo: true;
};

/** Currency used for display. Final currency (SDG / USD) is still a business decision. */
export const CURRENCY = "$";

export const CATEGORIES: Record<string, Label & { icon: string }> = {
  electrician: { en: "Electrician", ar: "كهربائي", icon: "Zap" },
  plumber: { en: "Plumber", ar: "سبّاك", icon: "Wrench" },
  painter: { en: "Painter", ar: "نقّاش / دهّان", icon: "Paintbrush" },
  carpenter: { en: "Carpenter", ar: "نجّار", icon: "Hammer" },
  ac: { en: "AC repair", ar: "صيانة مكيّفات", icon: "Wind" },
  construction: { en: "Building & masonry", ar: "بناء ومباني", icon: "House" },
};

/** Start region is not decided yet; this list is a placeholder. */
export const CITIES: Record<string, Label> = {
  khartoum: { en: "Khartoum", ar: "الخرطوم" },
  omdurman: { en: "Omdurman", ar: "أم درمان" },
  bahri: { en: "Bahri", ar: "بحري" },
  portsudan: { en: "Port Sudan", ar: "بورتسودان" },
  madani: { en: "Wad Madani", ar: "ود مدني" },
  kassala: { en: "Kassala", ar: "كسلا" },
};

export const DEMO_PROS: ProProfile[] = [
  {
    id: "demo-ahmed", name: { en: "Ahmed Hassan", ar: "أحمد حسن" }, initials: "AH", color: "#dcece7",
    category: "electrician", city: "khartoum", areas: ["khartoum", "bahri"], experienceYears: 12, learnedBy: "practice",
    description: { en: "Home electrical installations and repairs. Learned the trade on the job over many years.", ar: "تركيبات وصيانة كهرباء المنازل. اتعلمت الشغل بالممارسة لسنين طويلة." },
    services: [
      { en: "Install a socket", ar: "تركيب بريزة", pricing: "fixed", price: 15 },
      { en: "House wiring", ar: "تمديدات كهرباء للبيت", pricing: "quote" },
    ],
    qualifications: [], verification: "unverified", isDemo: true,
  },
  {
    id: "demo-mohamed", name: { en: "Mohamed Ali", ar: "محمد علي" }, initials: "MA", color: "#e5eaf8",
    category: "plumber", city: "omdurman", areas: ["omdurman"], experienceYears: 8, learnedBy: "both",
    description: { en: "Leaks, taps, water tanks and bathroom work.", ar: "تسريبات، حنفيات، تانكات موية وشغل الحمامات." },
    services: [
      { en: "Fix a leaking tap", ar: "تصليح حنفية بتسرّب", pricing: "fixed", price: 12 },
      { en: "Bathroom renovation", ar: "تجديد حمام", pricing: "quote" },
    ],
    qualifications: [{ en: "Vocational training certificate (example)", ar: "شهادة تدريب مهني (مثال)" }], verification: "unverified", isDemo: true,
  },
  {
    id: "demo-sara", name: { en: "Sara Osman", ar: "سارة عثمان" }, initials: "SO", color: "#fff0d8",
    category: "painter", city: "bahri", areas: ["bahri", "khartoum"], experienceYears: 6, learnedBy: "practice",
    description: { en: "Interior and exterior painting, careful and clean work.", ar: "نقاشة داخلية وخارجية، شغل نضيف ومرتّب." },
    services: [
      { en: "Paint one room", ar: "دهان أوضة واحدة", pricing: "fixed", price: 20 },
      { en: "Paint a full house", ar: "دهان بيت كامل", pricing: "quote" },
    ],
    qualifications: [], verification: "unverified", isDemo: true,
  },
  {
    id: "demo-yousif", name: { en: "Yousif Ibrahim", ar: "يوسف إبراهيم" }, initials: "YI", color: "#f3e6db",
    category: "carpenter", city: "khartoum", areas: ["khartoum"], experienceYears: 15, learnedBy: "practice",
    description: { en: "Doors, windows, cupboards and furniture repair.", ar: "أبواب، شبابيك، دواليب وتصليح عفش." },
    services: [
      { en: "Door repair", ar: "تصليح باب", pricing: "fixed", price: 18 },
      { en: "Custom cupboards", ar: "دواليب حسب الطلب", pricing: "quote" },
    ],
    qualifications: [], verification: "unverified", isDemo: true,
  },
  {
    id: "demo-khalid", name: { en: "Khalid Musa", ar: "خالد موسى" }, initials: "KM", color: "#d9eef2",
    category: "ac", city: "omdurman", areas: ["omdurman", "khartoum"], experienceYears: 9, learnedBy: "training",
    description: { en: "Split and window AC servicing, gas refill and installation.", ar: "صيانة مكيفات اسبليت وشباك، تعبئة غاز وتركيب." },
    services: [
      { en: "AC servicing", ar: "صيانة مكيّف", pricing: "fixed", price: 25 },
      { en: "AC installation", ar: "تركيب مكيّف", pricing: "quote" },
    ],
    qualifications: [{ en: "Refrigeration course (example)", ar: "كورس تبريد وتكييف (مثال)" }], verification: "unverified", isDemo: true,
  },
  {
    id: "demo-fatima", name: { en: "Fatima Adam", ar: "فاطمة آدم" }, initials: "FA", color: "#e9e2f5",
    category: "construction", city: "bahri", areas: ["bahri"], experienceYears: 10, learnedBy: "both",
    description: { en: "Small building repairs, plastering and tiling.", ar: "تصليحات مباني صغيرة، لياسة وبلاط." },
    services: [
      { en: "Small masonry repair", ar: "تصليح مباني صغير", pricing: "fixed", price: 30 },
      { en: "Renovation project", ar: "مشروع ترميم", pricing: "quote" },
    ],
    qualifications: [], verification: "unverified", isDemo: true,
  },
];

export function getDemoPro(id: string) {
  return DEMO_PROS.find((p) => p.id === id);
}

export function startingPrice(p: ProProfile): number | undefined {
  const fixed = p.services.filter((s) => s.pricing === "fixed" && s.price != null).map((s) => s.price!);
  return fixed.length ? Math.min(...fixed) : undefined;
}
