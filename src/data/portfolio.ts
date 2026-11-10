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
  actions: ContactAction[];
  colophon: {
    copyright: string;
    tagline: string;
  };
}

export interface PortfolioData {
  name: string;
  title: string;
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
    lead: "I build cross-platform mobile apps and web platforms, handling the whole process from database design to shipping on the App Store and Google Play.",
    paragraphs: [
      "On the frontend, I work heavily with React and React Native for iOS and Android. For the backend, I choose the tool that fits the workload, mostly building clean, fast services with Go or Node.js, backed by PostgreSQL, MongoDB, or Firebase.",
      "I don't just write application code; I set up and maintain the infrastructure too. That means managing cloud environments on AWS and Azure, configuring CI/CD pipelines, and seeing mobile apps through review and release on Google Play and the Apple App Store.",
      "Basically, as long as my coffee mug is full, I keep things shipping.",
    ],
    motto: "Basically, as long as my coffee mug is full, I keep things shipping.",
    mottoAuthor: "ANTHONY • FULL-STACK & MOBILE DEVELOPER",
    focusPillars: [
      {
        number: "01",
        tag: "MOBILE & WEB",
        description: "React Native for iOS and Android, React & Next.js for web",
        color: "#8ddd8d",
      },
      {
        number: "02",
        tag: "BACKEND & DATA",
        description: "Go, Node.js, PostgreSQL, MongoDB & Firebase",
        color: "#6066ee",
      },
      {
        number: "03",
        tag: "CLOUD & DEPLOYMENT",
        description: "AWS, Azure, CI/CD, App Store & Google Play",
        color: "#e0e055",
      },
    ],
    portrait: {
      image: "/avatar.webp",
      fallbackImage: "/avatar.svg",
      alt: "Anthony, Full-Stack & Mobile Software Developer",
      objectPosition: "center 38%",
      locationTag: "AVAILABLE FOR WORK",
      // locationTag: "",
      locationColor: "#8ddd8d",
      badgeName: "ANTHONY",
      badgeStatus: "FULL-STACK & MOBILE",
      badgeColor: "#8ddd8d",
    },
    statusBar: {
      text: "FULL-STACK WEB • CROSS-PLATFORM MOBILE • CLOUD & STORE RELEASES",
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
      role: "Full-Stack & Mobile Developer",
      period: "Client Project • Saudi Arabia",
      accentColor: "#8ddd8d",
      description:
        "A car rental marketplace in Saudi Arabia. I built the platform from scratch across three portals: an admin panel for operations, a vendor portal for rental companies to manage fleets, and a mobile app for customers to book cars.",
      highlights: [
        "Built three distinct portals: an operations admin panel in React, a fleet vendor portal in React, and the customer mobile app in React Native for iOS and Android.",
        "Developed the backend with Go and PostgreSQL to handle real-time vehicle availability, booking state machines, and vendor fleet management.",
        "Integrated PayFort (Amazon Payment Services) for card payments, and handled deployments to the App Store and Google Play.",
      ],
      tags: ["React", "React Native", "Go", "PostgreSQL", "PayFort", "iOS & Android", "App Store", "Google Play"],
      demoUrl: "https://ajerlycarrental.com",
      actionLabel: "Visit Ajerly",
      featured: true,
    },
    {
      id: "jasmine-trades",
      title: "Jasmine Trades",
      role: "Full-Stack & Mobile Developer",
      period: "Client Project • Global B2B",
      accentColor: "#6066ee",
      description:
        "A B2B commodity trading platform that brings together suppliers, buyers, and traders. Built with Vue and wrapped with Capacitor to deliver both a web portal and publishable mobile apps.",
      highlights: [
        "Implemented a single portal with role-based dashboards for three user types: platform admins, commodity suppliers, and buyers/traders.",
        "Built the frontend with Vue and used Capacitor to package it into native iOS and Android apps for the App Store and Google Play.",
        "Wrote backend services in Go with PostgreSQL for trading orders, RFQ workflows, audit logging, and automated deployment pipelines.",
      ],
      tags: ["Vue.js", "Capacitor", "Go", "PostgreSQL", "B2B Marketplace", "Cross-Platform", "App Store", "Google Play"],
      demoUrl: "https://www.jasminetrades.com/",
      actionLabel: "Visit Jasmine Trades",
      featured: true,
    },
    {
      id: "growreach-saas",
      title: "GrowReach",
      role: "Full-Stack Engineer",
      period: "Company Product • SaaS",
      accentColor: "#faaafa",
      description:
        "A SaaS tool built to help creators and sales teams grow their LinkedIn presence and generate inbound leads through automated, contextual engagement.",
      highlights: [
        "Built the web dashboard with React and TypeScript, including creator targeting, scheduled comment queues, and a unified lead inbox.",
        "Wrote Go backend workers and PostgreSQL schemas to handle background scheduling, lead scoring, and rate-limit safety checks.",
        "Integrated Stripe for recurring subscription billing and PostHog to track user activity, feature adoption, and onboarding funnels.",
      ],
      tags: ["React", "Go", "PostgreSQL", "Stripe", "PostHog", "LinkedIn Automation", "SaaS"],
      demoUrl: "https://growreach.app/",
      actionLabel: "Visit GrowReach",
      featured: true,
    },
    {
      id: "groweasy-business",
      title: "GrowEasy for Business",
      role: "Mobile & Full-Stack Developer",
      period: "Company Product • Mobile App",
      accentColor: "#e0e055",
      description:
        "An appointment and business management platform for salons and spas. Features an admin portal with role-based access for salon staff and an intuitive booking app for clients.",
      highlights: [
        "Built two separate portals: a role-based admin dashboard for salon owners, managers, and stylists, alongside a customer booking interface.",
        "Maintained and published the mobile app on Google Play and the App Store for live roster management, appointment updates, and client notes.",
        "Designed backend services in Go with PostgreSQL, using role-based permissions to keep staff data and financial reports secure.",
      ],
      tags: ["React Native", "Go", "PostgreSQL", "RBAC", "Google Play", "App Store", "Salon Management"],
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
