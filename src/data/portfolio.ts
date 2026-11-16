/**
 * =============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * =============================================================================
 * Every section's content, copy, links, projects, and tech stack are defined here.
 * Written in direct, human, and authentic engineer voice (no AI buzzwords).
 * =============================================================================
 */

export interface SocialLink {
  label: string;
  platform: "github" | "linkedin" | "instagram" | "email";
  url: string;
}

export interface NavItem {
  index: number;
  label: string;
  color: string;
}

export interface HeroData {
  greeting: string;
  title: string;
  description: string;
  exploreButtonText: string;
  contactButtonText: string;
  marqueeItems: string[];
}

export interface FocusPillar {
  number: string;
  tag: string;
  description: string;
  color: string;
}

export interface PortraitData {
  image: string;
  fallbackImage: string;
  alt: string;
  objectPosition?: string;
  locationTag: string;
  locationColor: string;
  badgeName: string;
  badgeStatus: string;
  badgeColor: string;
}

export interface AboutData {
  sectionTag: string;
  sectionTitle: string;
  locationStatus: string;
  lead: string;
  paragraphs: string[];
  motto: string;
  mottoAuthor: string;
  focusPillars: FocusPillar[];
  portrait: PortraitData;
  statusBar: {
    text: string;
    hint: string;
  };
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  actionLabel?: string;
  featured: boolean;
  accentColor: string;
}

export interface WorksSectionData {
  sectionTag: string;
  sectionTitle: string;
  projects: Project[];
}

export interface CapabilitySkill {
  name: string;
  isKey?: boolean;
}

export interface CapabilityColumn {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  color: string;
  skills: CapabilitySkill[];
}

export interface CapabilitiesData {
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  columns: CapabilityColumn[];
  legend: { label: string; color: string }[];
  hint: string;
}

export interface ContactAction {
  label: string;
  platform: "linkedin" | "github" | "instagram";
  url: string;
  isPrimary?: boolean;
}

export interface ContactData {
  sectionTag: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  email: string;
  actions: ContactAction[];
  colophon: {
    copyright: string;
    tagline: string;
  };
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  tagline: string;
  bio: string;
  navigation: NavItem[];
  socials: SocialLink[];
  hero: HeroData;
  about: AboutData;
  featuredProjects: Project[];
  capabilities: CapabilitiesData;
  contact: ContactData;
}

export const personalData: PortfolioData = {
  // --- Global Identity ---
  name: "Anthony",
  title: "Software Developer",
  email: "anthonyyjoee@gmail.com",
  location: "Indonesia",
  availability: "Full-Stack Web & Mobile Development",
  tagline:
    "Full-stack and mobile developer building apps with React Native, backends with Go and Postgres, and deploying to cloud infrastructure.",
  bio: "Software developer based in Indonesia, fueled by coffee. I build mobile apps with React Native, web platforms with React, and backend services with Go and PostgreSQL.",

  // --- Top Navigation Island ---
  navigation: [
    { index: 1, label: "ABOUT", color: "#faaafa" },
    { index: 2, label: "WORKS", color: "#6066ee" },
    { index: 3, label: "CAPABILITIES", color: "#8ddd8d" },
    { index: 4, label: "CONTACT", color: "#e0e055" },
  ],

  // --- Social Accounts ---
  socials: [
    {
      label: "GitHub",
      platform: "github",
      url: "https://github.com/anthonyyjoee",
    },
    {
      label: "LinkedIn",
      platform: "linkedin",
      url: "https://www.linkedin.com/in/anthonyyjoee/",
    },
    {
      label: "Instagram",
      platform: "instagram",
      url: "https://www.instagram.com/anthonyyjoee/",
    },
    {
      label: "Email",
      platform: "email",
      url: "mailto:anthonyyjoee@gmail.com",
    },
  ],

  // =========================================================================
  // SCREEN 0: HERO SECTION
  // =========================================================================
  hero: {
    greeting: "HI, I'M ANTHONY.",
    title: "SOFTWARE DEVELOPER.",
    description:
      "Full-stack and mobile developer based in Indonesia, fueled by coffee. I build mobile apps with React Native, web apps with React, and backend services with Go and PostgreSQL.",
    exploreButtonText: "Explore Works",
    contactButtonText: "Get in Touch",
    marqueeItems: [
      "• REACT NATIVE (IOS & ANDROID)",
      "• GO & POSTGRESQL",
      "• REACT & NEXT.JS",
      "• CLOUD INFRASTRUCTURE (AWS & AZURE)",
      "• CI/CD & STORE RELEASES",
      "• FUELED BY COFFEE ☕",
      "• REACT NATIVE (IOS & ANDROID)",
      "• GO & POSTGRESQL",
      "• REACT & NEXT.JS",
      "• CLOUD INFRASTRUCTURE (AWS & AZURE)",
      "• CI/CD & STORE RELEASES",
      "• FUELED BY COFFEE ☕",
    ],
  },

  // =========================================================================
  // SCREEN 1: ABOUT ME SECTION
  // =========================================================================
  about: {
    sectionTag: "01 / ABOUT",
    sectionTitle: "About Me",
    locationStatus: "[SOFTWARE DEVELOPER]",
    lead: "Instead of wondering what I can do, just tell me what you need built. I take ownership of projects end-to-end, delivering software with sharp technical execution and refined product taste.",
    paragraphs: [
      "I focus on complete, end-to-end delivery. You don't have to micromanage the process or worry about how the pieces connect—give me the goal, and I'll architect the solution, make sound technical trade-offs, and carry it through to a dependable, production-ready release.",
      "Great software requires more than clean code; it demands genuine taste. I care deeply about user experience, visual hierarchy, and the subtle interactions that make an interface feel alive and effortless. Combined with clear, proactive communication, I ensure you always know where things stand and can trust the final outcome to perform at the highest level.",
    ],
    motto: "Instead of asking what I can do, just tell me what you need built.",
    mottoAuthor: "ANTHONY • SOFTWARE DEVELOPER",
    focusPillars: [
      {
        number: "01",
        tag: "END-TO-END OWNERSHIP",
        description: "From initial concept and architecture to polish and production release.",
        color: "#8ddd8d",
      },
      {
        number: "02",
        tag: "UI CRAFT & TASTE",
        description: "Thoughtful visual hierarchy and software that feels exceptional to use.",
        color: "#6066ee",
      },
      {
        number: "03",
        tag: "PROACTIVE & RELIABLE",
        description: "Clear communication, transparent progress, and dependable execution.",
        color: "#e0e055",
      },
    ],
    portrait: {
      image: "/avatar.webp",
      fallbackImage: "/avatar.svg",
      alt: "Anthony, Software Developer",
      objectPosition: "center 38%",
      // locationTag: "AVAILABLE FOR WORK",
      locationTag: "",
      locationColor: "#8ddd8d",
      badgeName: "ANTHONY",
      badgeStatus: "PRODUCT & ENGINEERING",
      badgeColor: "#8ddd8d",
    },
    statusBar: {
      text: "",
      hint: "SCROLL TO VIEW PROJECTS",
    },
  },

  // =========================================================================
  // SCREEN 2: SELECTED WORKS
  // =========================================================================
  featuredProjects: [
    {
      id: "ajerly-car-rental",
      title: "Ajerly",
      role: "Mobile & Frontend Developer",
      period: "Client Project • Saudi Arabia",
      accentColor: "#8ddd8d",
      description:
        "A car rental marketplace in Saudi Arabia. I contributed to designing the core application architecture and built the user-facing platforms from scratch across an operations admin panel, a fleet vendor portal, and a customer mobile app.",
      highlights: [
        "Contributed to designing the core application architecture across three distinct client platforms: an operations admin dashboard in React, a fleet vendor portal in React, and the customer mobile app in React Native.",
        "Implemented real-time vehicle discovery, dynamic multi-step booking flows, interactive vehicle status tracking, and vendor fleet management interfaces.",
        "Integrated PayFort (Amazon Payment Services) for secure card checkouts, and handled deployments to the App Store and Google Play.",
      ],
      tags: ["React Native", "React", "TypeScript", "PayFort", "Application Architecture", "Mobile UI/UX", "iOS & Android", "App Store", "Google Play"],
      demoUrl: "https://ajerlycarrental.com",
      actionLabel: "Visit Ajerly",
      featured: true,
    },
    {
      id: "jasmine-trades",
      title: "Jasmine Trades",
      role: "Frontend & Mobile Developer",
      period: "Client Project • Global B2B",
      accentColor: "#6066ee",
      description:
        "A B2B commodity trading platform connecting suppliers, buyers, and traders. Built with Vue and wrapped with Capacitor to deliver both a responsive web portal and publishable mobile apps.",
      highlights: [
        "Implemented a unified client application with role-based dashboards for three user types: platform admins, commodity suppliers, and buyers/traders.",
        "Built interactive commodity trading workflows, dynamic RFQ negotiation forms, product catalogs, and real-time transaction activity feeds.",
        "Developed the cross-platform application with Vue and Capacitor, packaging and publishing native builds for the App Store and Google Play.",
      ],
      tags: ["Vue.js", "Capacitor", "TypeScript", "B2B Marketplace", "Cross-Platform", "Mobile UI/UX", "App Store", "Google Play"],
      demoUrl: "https://www.jasminetrades.com/",
      actionLabel: "Visit Jasmine Trades",
      featured: true,
    },
    {
      id: "growreach-saas",
      title: "GrowReach",
      role: "Frontend Engineer",
      period: "Company Product • SaaS",
      accentColor: "#faaafa",
      description:
        "A SaaS tool built to help creators and sales teams grow their LinkedIn presence and generate inbound leads through automated, contextual engagement. I helped design the core product architecture and led frontend development.",
      highlights: [
        "Helped design the core product architecture and built the web dashboard with React and TypeScript, including creator targeting, scheduled comment queues, and a unified lead inbox.",
        "Engineered campaign configuration interfaces, interactive lead scoring tables, live queue visualizers, and safety limit status monitors.",
        "Integrated Stripe for recurring subscription billing and PostHog product analytics to track user onboarding funnels and feature adoption.",
      ],
      tags: ["React", "TypeScript", "Tailwind CSS", "Stripe", "PostHog", "Product Architecture", "Dashboard UI", "SaaS"],
      demoUrl: "https://growreach.app/",
      actionLabel: "Visit GrowReach",
      featured: true,
    },
    {
      id: "groweasy-business",
      title: "GrowEasy for Business",
      role: "Mobile & Frontend Developer",
      period: "Company Product • Mobile App",
      accentColor: "#e0e055",
      description:
        "An appointment and business management platform for salons and spas. I contributed to designing the multi-tier application architecture across a multi-role web portal for salon staff and an intuitive mobile booking app for clients.",
      highlights: [
        "Contributed to designing the multi-tier application architecture and built two client interfaces: a role-based admin dashboard for salon owners and stylists, alongside a customer booking app.",
        "Created interactive calendar scheduling views, role-gated navigation, live staff roster management, and visual revenue performance metrics.",
        "Integrated Stripe for seamless client checkouts and PostHog for in-app product analytics, maintaining and publishing the mobile app on Google Play and the App Store.",
      ],
      tags: ["React Native", "React", "TypeScript", "Stripe", "PostHog", "Application Architecture", "Mobile UI/UX", "Google Play", "App Store"],
      demoUrl: "https://play.google.com/store/apps/details?id=groweasy.salon.business&hl=id",
      actionLabel: "View on Google Play",
      featured: true,
    },
  ],

  // =========================================================================
  // SCREEN 3: CAPABILITIES & ENGINEERING STACK
  // =========================================================================
  capabilities: {
    sectionTag: "03 / CAPABILITIES & STACK",
    sectionTitle: "Engineering Stack",
    sectionSubtitle: "[FRONTEND • BACKEND • CLOUD INFRASTRUCTURE]",
    columns: [
      {
        id: "mobile-web",
        number: "01",
        tag: "MOBILE & WEB",
        title: "React Native & Web",
        description:
          "Cross-platform mobile apps for iOS and Android using React Native, alongside responsive web applications built with React and Next.js.",
        color: "#8ddd8d",
        skills: [
          { name: "React Native (iOS & Android)", isKey: true },
          { name: "React 19 & Next.js 16", isKey: true },
          { name: "TypeScript & Tailwind CSS", isKey: true },
          { name: "Mobile UI/UX & Design Systems", isKey: false },
        ],
      },
      {
        id: "backend-systems",
        number: "02",
        tag: "BACKEND & SYSTEMS",
        title: "Go & Node.js",
        description:
          "Clean backend services, RESTful APIs, and background queue workers designed for speed, concurrency, and reliability.",
        color: "#6066ee",
        skills: [
          { name: "Go (Golang)", isKey: true },
          { name: "Node.js & Express", isKey: true },
          { name: "PostgreSQL & MongoDB", isKey: true },
          { name: "Firebase (Auth, Firestore, Functions)", isKey: false },
        ],
      },
      {
        id: "cloud-stores",
        number: "03",
        tag: "CLOUD & STORES",
        title: "Cloud & App Stores",
        description:
          "Managing cloud setups on AWS and Azure, building automated CI/CD pipelines, and shipping mobile apps directly to the stores.",
        color: "#e0e055",
        skills: [
          { name: "AWS & Azure Infrastructure", isKey: true },
          { name: "Docker & CI/CD Pipelines", isKey: true },
          { name: "Apple App Store Publishing", isKey: true },
          { name: "Google Play Console Deployment", isKey: false },
        ],
      },
    ],
    legend: [
      { label: "MOBILE", color: "#8ddd8d" },
      { label: "BACKEND", color: "#6066ee" },
      { label: "CLOUD", color: "#e0e055" },
      // { label: "COFFEE ☕", color: "#faaafa" },
    ],
    hint: "SCROLL OR USE ARROWS TO ADVANCE",
  },

  // =========================================================================
  // SCREEN 4: CONTACT & CONNECT
  // =========================================================================
  contact: {
    sectionTag: "04 / CONTACT",
    headingPrefix: "HAVE A PROJECT IN MIND?",
    headingHighlight: "LET'S TALK.",
    email: "anthonyyjoee@gmail.com",
    description:
      "Whether you're looking for a full-stack engineer, need a cross-platform mobile app built from scratch, or want to scale your backend, feel free to reach out.",
    actions: [
      {
        label: "Connect on LinkedIn",
        platform: "linkedin",
        url: "https://www.linkedin.com/in/anthonyyjoee/",
        isPrimary: true,
      },
      {
        label: "GitHub Profile",
        platform: "github",
        url: "https://github.com/anthonyyjoee",
        isPrimary: false,
      },
      {
        label: "Instagram",
        platform: "instagram",
        url: "https://www.instagram.com/anthonyyjoee/",
        isPrimary: false,
      },
    ],
    colophon: {
      copyright: "Built by Johan Anthony",
      tagline: "",
    },
  },
};

export const portfolioData = personalData;
