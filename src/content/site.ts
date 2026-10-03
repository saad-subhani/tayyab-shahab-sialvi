import type { GalleryCategory, Logo, OfficialLink, ProjectStatus } from "@/lib/types";
import { greet } from "@/lib/whatsapp";

/* ───────────────────────── IDENTITY ───────────────────────── */

export const site = {
  name: "Muhammad Tayyab Shahab Sialvi",
  nameLines: ["Muhammad", "Tayyab Shahab", "Sialvi"],
  tagline: "Official Personal • Professional • Social Website",
  purpose:
    "A central personal digital profile connecting Tayyab Shahab Sialvi’s social work, professional career, businesses, projects, achievements, media/gallery and official external platforms.",
  identity: [
    "District Nazim, ATI Faisalabad",
    "Entrepreneur",
    "Education & Social Development Professional",
    "Law Student",
  ],
  intro:
    "Muhammad Tayyab Shahab Sialvi is an education, media, business and social-development professional with experience in organizational work, public relations, youth engagement, business development and welfare initiatives.",
  /** Real cut-out portrait. Swap this ONE line to replace the portrait. */
  heroImage: "/images/tayyab-hero.webp",
  heroAlt: "Portrait of Muhammad Tayyab Shahab Sialvi",
  /**
   * Bottom hero strip. Omitted by default — set to e.g. "Faisalabad, Pakistan"
   * only once the owner approves publishing the location.
   */
  location: null as string | null,
  homepageSections: [
    "Profile Snapshot",
    "Current Roles",
    "Social Work",
    "Professional Journey",
    "Businesses & Ventures",
    "Current Projects",
    "Achievements",
    "MOU/Partnerships",
    "Media Gallery",
    "Connect",
  ],
};

/* ───────────────────────── NAVIGATION ───────────────────────── */

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "social-work", label: "Social Work" },
  { id: "career", label: "Professional Career" },
  { id: "ventures", label: "Businesses & Ventures" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "partnerships", label: "MOU & Partnerships" },
  { id: "gallery", label: "Media & Gallery" },
  { id: "connect", label: "Connect" },
] as const;

/* ───────────────────────── ABOUT / EDUCATION ───────────────────────── */

export const about = {
  body:
    "Muhammad Tayyab Shahab Sialvi is associated with education, youth development, social work, media/PR and entrepreneurship. His work includes organizational leadership, student-focused initiatives, welfare activities, business development and digital/educational projects.",
  education: [
    {
      title: "IUB Law Student",
      institution: "The Islamia University of Bahawalpur",
      period: null as string | null,
    },
    {
      title: "BS Islamic Studies",
      institution: "Government Graduate Islamia College Faisalabad (Affiliated with GCUF)",
      period: "2021–2025",
    },
    {
      title: "Digital Marketing & Shopify Store Management",
      institution: "Peak Solutions / Sol Tekkers",
      period: null as string | null,
    },
  ],
};

/* ───────────────────────── CURRENT ROLES (snapshot) ───────────────────────── */

export const currentRoles = [
  {
    title: "District Nazim",
    org: "Anjuman Talba Islam (ATI), District Faisalabad",
    waMessage: greet("I would like to know more about ATI Faisalabad."),
  },
  {
    title: "Founder & CEO",
    org: "Shahab Group",
    waMessage: greet("I would like to know more about Shahab Group."),
  },
  {
    title: "Law Student",
    org: "The Islamia University of Bahawalpur",
    waMessage: greet("I would like to connect with you."),
  },
];

/* ───────────────────────── SOCIAL WORK (ATI) ───────────────────────── */

export const socialWork = {
  role: "District Nazim",
  org: "Anjuman Talba Islam (ATI), District Faisalabad",
  logo: { src: "/images/logos/ati.webp", width: 900, height: 902 } as Logo | null,
  focus:
    "student affairs, youth development, educational/organizational activities and welfare initiatives.",
  bullets: [
    "Student-focused initiatives and digital/skills development programs.",
    "Blood-support / blood-donation welfare initiatives.",
  ],
  cta: "Visit ATI Faisalabad",
  waMessage: greet("I would like to know more about ATI Faisalabad."),
  // OWNER TO SUPPLY: official ATI website / social links
  links: [] as OfficialLink[],
};

/* ───────────────────────── PROFESSIONAL CAREER ───────────────────────── */

/**
 * AIMS is a FORMER role after September 2026 unless the owner supplies a newer employment status.
 */
export const career = [
  {
    role: "Administrator & PR Officer",
    org: "AIMS International School & College",
    former: true,
  },
  {
    role: "Branch Incharge",
    org: "Saylani International (DHQ Hospital)",
    former: true,
  },
  {
    role: "Branch Incharge",
    org: "Al-Mustafa Welfare Society (FIC Hospital)",
    former: true,
  },
  {
    role: "Manager / Cashier",
    org: "Food Business",
    former: false,
  },
];

/* ───────────────────────── BUSINESSES & VENTURES ───────────────────────── */

export interface Venture {
  id: string;
  name: string;
  role?: string;
  description: string;
  logo: Logo | null; // OWNER TO SUPPLY → "/images/logos/xyz.webp"
  large?: boolean;
  links: OfficialLink[];
  waMessage: string;
}

export const ventures: Venture[] = [
  {
    id: "shahab-group",
    name: "Shahab Group",
    role: "Founder & CEO",
    description: "Founder & CEO", // short description pending from owner
    logo: null,
    large: true,
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "other", label: "Social", url: null },
    ],
    waMessage: greet("I would like to know more about Shahab Group."),
  },
  {
    id: "shahab-foods",
    name: "Shahab Foods",
    description: "Natural/organic products venture",
    logo: { src: "/images/logos/shahab-foods.webp", width: 900, height: 500 },
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "facebook", label: "Facebook", url: null },
      { kind: "instagram", label: "Instagram", url: null },
      { kind: "whatsapp", label: "WhatsApp", url: null },
    ],
    waMessage: greet("I would like to inquire about Shahab Foods products."),
  },
  {
    id: "evergreen-talks",
    name: "Evergreen Talks",
    description: "Media / content / interview-oriented project",
    logo: null,
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "other", label: "Social", url: null },
    ],
    waMessage: greet("I would like to know more about Evergreen Talks."),
  },
  {
    id: "the-cciu",
    name: "THE CCIU / Code Converse International University",
    description: "Education/digital initiative",
    logo: { src: "/images/logos/the-cciu.webp", width: 487, height: 523 },
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "other", label: "Social", url: null },
    ],
    waMessage: greet(
      "I would like to know more about THE CCIU (Code Converse International University).",
    ),
  },
  {
    id: "consulting",
    name: "Consulting / Business Development Services",
    description: "Consulting / business development services",
    logo: null,
    links: [],
    waMessage: greet(
      "I am interested in your consulting and business development services.",
    ),
  },
];

/* ───────────────────────── PROJECTS ───────────────────────── */

export interface Project {
  id: string;
  name: string;
  description: string | null;
  role: string | null; // hide when null (owner to confirm)
  partners: string[];
  status: ProjectStatus;
  hasGallery: boolean;
  links: OfficialLink[];
  waMessage: string;
}

export const projects: Project[] = [
  {
    id: "ati-digital-skills",
    name: "ATI Digital Skills Program",
    description:
      "Digital skills, communication skills and personality-development/student support initiatives.",
    role: "District Nazim, ATI Faisalabad",
    partners: ["ATI Faisalabad", "Sol Tekkers"],
    status: "Featured",
    hasGallery: true,
    links: [],
    waMessage: greet("I would like to know about the ATI Digital Skills Program."),
  },
  {
    id: "student-affairs",
    name: "Student Affairs / Educational Support Initiatives",
    description:
      "Student affairs, youth development and educational/organizational activities.",
    role: null,
    partners: [],
    status: "Current",
    hasGallery: true,
    links: [],
    waMessage: greet(
      "I would like to know about the Student Affairs and educational support initiatives.",
    ),
  },
  {
    id: "blood-support",
    name: "Blood-Support / Donation Initiative",
    description: "Blood-support / blood-donation welfare initiatives.",
    role: null,
    partners: [],
    status: "Current",
    hasGallery: true,
    links: [],
    waMessage: greet("I need blood support / I would like to donate blood."),
  },
  {
    id: "upcoming",
    name: "Upcoming Projects",
    description: "Coming Soon section to be updated by administrator.",
    role: null,
    partners: [],
    status: "Coming Soon",
    hasGallery: false,
    links: [],
    waMessage: greet("please keep me updated about upcoming projects."),
  },
];

/* ───────────────────────── ACHIEVEMENTS ───────────────────────── */

export interface Achievement {
  id: string;
  label: string;
  /** Provide only when the figure is documented. */
  value?: number;
  suffix?: string;
  note?: string;
}

export const achievements: Achievement[] = [
  { id: "best-management", label: "Best Management Award" },
  { id: "interviews", label: "Interviews", value: 100, suffix: "+" },
  { id: "medical-camps", label: "Free Medical Camps", value: 100, suffix: "+" },
  {
    id: "blood",
    label: "Blood donation campaigns and welfare activities",
  },
];

/* ───────────────────────── PARTNERSHIPS & MOUs ───────────────────────── */

export const mou = {
  title: "ATI Faisalabad × Sol Tekkers — Digital Skills Program MOU",
  participantsLabel: "MOU participants/representation",
  participants: [
    {
      name: "Muhammad Tayyab Shahab Sialvi",
      role: "District Nazim, ATI Faisalabad",
    },
    { name: "Farrukh Sheikh", role: "Director Academics, Sol Tekkers" },
  ],
  relatedLabel: "Related presentation/coverage may include",
  related: [
    { name: "Dr. Mudassar Shakoor", role: "CEO, Sol Tekkers" },
    {
      name: "Muhammad Owais Ali Awan",
      role: "District General Secretary, ATI Faisalabad",
    },
    { name: "Abbas Ali Haider", role: "City Convenor, ATI Faisalabad" },
  ],
  /** OWNER TO SUPPLY: MOU signing photos → /images/gallery/mou-1.webp … */
  photos: [] as { src: string; alt: string }[],
  partnerLinks: [] as OfficialLink[],
  waMessage: greet("I would like to discuss a partnership or MOU."),
};

/* ───────────────────────── MEDIA & GALLERY ───────────────────────── */

export const galleryCategories: GalleryCategory[] = [
  "Social Work",
  "ATI",
  "Education",
  "Business",
  "Media",
  "MOUs",
  "Events",
  "Achievements",
];

export interface GalleryItem {
  id: string;
  caption: string;
  category: GalleryCategory;
  src: string | null; // null → neutral placeholder tile
  alt?: string;
}

export const gallery: GalleryItem[] = [
  { id: "g1", caption: "MOU signing photographs", category: "MOUs", src: null },
  {
    id: "g2",
    caption: "ATI events and student activities",
    category: "ATI",
    src: null,
  },
  {
    id: "g3",
    caption: "Media interviews / press appearances",
    category: "Media",
    src: null,
  },
  {
    id: "g4",
    caption: "Social-work and welfare activities",
    category: "Social Work",
    src: null,
  },
  {
    id: "g5",
    caption: "Training / digital-skills program activities",
    category: "Education",
    src: null,
  },
  {
    id: "g6",
    caption: "Business/project events",
    category: "Business",
    src: null,
  },
  {
    id: "g7",
    caption: "Achievements and recognition",
    category: "Achievements",
    src: null,
  },
  { id: "g8", caption: "Events", category: "Events", src: null },
];

/* ───────────────────────── OFFICIAL LINKS PORTAL ───────────────────────── */

export interface Platform {
  id: string;
  name: string;
  logo: Logo | null;
  links: OfficialLink[];
  waMessage: string;
}

const generic: OfficialLink[] = [
  { kind: "website", label: "Official website", url: null },
  { kind: "other", label: "Official social platforms", url: null },
];

export const platforms: Platform[] = [
  {
    id: "ati",
    name: "ATI",
    logo: { src: "/images/logos/ati.webp", width: 900, height: 902 },
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "facebook", label: "Facebook", url: null },
      { kind: "instagram", label: "Instagram", url: null },
      { kind: "whatsapp-channel", label: "WhatsApp Channel", url: null },
      { kind: "youtube", label: "YouTube", url: null },
    ],
    waMessage: greet("I would like the official links for ATI Faisalabad."),
  },
  {
    id: "shahab-foods",
    name: "Shahab Foods",
    logo: { src: "/images/logos/shahab-foods.webp", width: 900, height: 500 },
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "facebook", label: "Facebook", url: null },
      { kind: "instagram", label: "Instagram", url: null },
      { kind: "whatsapp", label: "WhatsApp", url: null },
    ],
    waMessage: greet("I would like the official links for Shahab Foods."),
  },
  {
    id: "sol-tekkers",
    name: "Sol Tekkers",
    logo: { src: "/images/logos/sol-tekkers.webp", width: 182, height: 332 },
    links: generic,
    waMessage: greet("I would like the official links for Sol Tekkers."),
  },
  {
    id: "aims",
    name: "AIMS",
    logo: null,
    links: generic,
    waMessage: greet("I would like the official links for AIMS."),
  },
  {
    id: "cciu",
    name: "THE CCIU",
    logo: { src: "/images/logos/the-cciu.webp", width: 487, height: 523 },
    links: generic,
    waMessage: greet("I would like the official links for THE CCIU."),
  },
  {
    id: "evergreen",
    name: "Evergreen Talks",
    logo: null,
    links: generic,
    waMessage: greet("I would like the official links for Evergreen Talks."),
  },
];

/* ───────────────────────── CONNECT ───────────────────────── */

export const contact = {
  /** OWNER TO SUPPLY: current official email before launch. null → hidden. */
  email: null as string | null,
  /** Verified URLs only; WhatsApp is always shown. */
  socials: [
    { kind: "facebook", label: "Facebook", url: null as string | null },
    { kind: "instagram", label: "Instagram", url: null as string | null },
    { kind: "linkedin", label: "LinkedIn", url: null as string | null },
    { kind: "youtube", label: "YouTube", url: null as string | null },
  ],
  subjects: [
    "Social work / ATI",
    "Business / Ventures",
    "Consulting",
    "Partnership / MOU",
    "Media / Interview",
    "Other",
  ],
};

/* ───────────────────────── COMING SOON ───────────────────────── */

export const comingSoon = {
  title: "New projects, partnerships and initiatives are on the way.",
  waMessage: greet("please keep me updated about upcoming projects."),
};
