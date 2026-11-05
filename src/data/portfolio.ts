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
  featured: boolean;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level?: string }[];
}

export interface SocialLink {
  label: string;
  platform: "github" | "linkedin" | "instagram" | "email";
  url: string;
}

export const personalData = {
  name: "Anthony",
  title: "Software Engineer",
  tagline: "Passionate about technology with 4 years of engineering experience turning ambitious ideas into reality.",
  location: "Indonesia",
  bio: "Software engineer with 4 years of hands-on experience turning complex technical challenges into dependable digital systems. Passionate about all things tech and committed to high craftsmanship.",
  availability: "Open to opportunities",
  about: {
    lead: "My primary work focuses on building backend systems using Ruby on Rails, where I design and implement reliable services.",
    body: "I work on backend architectures focused on reliability, data consistency, and observability in production environments. I am an AWS Certified Solutions Architect Associate with a strong interest in backend system design and cloud-based infrastructure, engineering resilient services that scale predictably.",
    certification: "AWS Certified Solutions Architect – Associate",
    experience: "4 Years Production Engineering",
    focusPillars: [
      { label: "Reliability", desc: "Fault-tolerant architectures & zero downtime" },
      { label: "Data Consistency", desc: "ACID transactions & idempotency" },
      { label: "Observability", desc: "Structured telemetry, metrics & tracing" },
    ],
    techCategories: [
      { name: "Backend Engines", items: ["Ruby on Rails", "Go", "Node.js"] },
      { name: "Cloud & Infrastructure", items: ["AWS (ECS, S3, RDS, CloudWatch)", "Docker", "CI/CD"] },
      { name: "Datastores & Queues", items: ["PostgreSQL", "Redis", "Sidekiq"] },
      { name: "Frontend & Creative", items: ["Next.js 16", "TypeScript", "Three.js"] },
    ],
  },
  socials: [
    {
      label: "GitHub",
      platform: "github" as const,
      url: "https://github.com/anthonyyjoee",
    },
    {
      label: "LinkedIn",
      platform: "linkedin" as const,
      url: "https://www.linkedin.com/in/anthonyyjoee/",
    },
    {
      label: "Instagram",
      platform: "instagram" as const,
      url: "https://www.instagram.com/anthonyyjoee/",
    },
  ],
  skillGroups: [
    {
      category: "Backend & Systems",
      skills: [
        { name: "Ruby on Rails" },
        { name: "Go (Golang)" },
        { name: "Node.js / Express" },
        { name: "PostgreSQL / MySQL" },
        { name: "Redis & Sidekiq" },
        { name: "RESTful APIs & gRPC" },
      ],
    },
    {
      category: "Cloud & Infrastructure",
      skills: [
        { name: "AWS (Solutions Architect)" },
        { name: "Docker & Containers" },
        { name: "CI/CD Deployment Pipelines" },
        { name: "Observability & Telemetry" },
        { name: "High-Availability Architecture" },
        { name: "Idempotency & Data Consistency" },
      ],
    },
    {
      category: "Frontend & Craft",
      skills: [
        { name: "Next.js 16 (App Router)" },
        { name: "React 19" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Three.js / WebGL" },
        { name: "Clean Architecture" },
      ],
    },
  ],
  featuredProjects: [
    {
      id: "distributed-task-queue",
      title: "Reliable Services & Async Pipeline",
      role: "Lead Backend Engineer",
      period: "2024",
      description:
        "High-reliability backend service built with Ruby on Rails and Sidekiq, engineered for strict ACID data consistency, transactional safety, and high-volume background execution.",
      highlights: [
        "Processes millions of asynchronous operations daily with guaranteed idempotent execution",
        "Multi-layered error handling, dead-letter queues, and automated retry backoffs",
        "Structured logging with production observability telemetry and metrics instrumentation",
      ],
      tags: ["Ruby on Rails", "Sidekiq", "PostgreSQL", "Redis", "AWS", "Docker"],
      githubUrl: "https://github.com/anthonyyjoee",
      featured: true,
    },
    {
      id: "api-gateway-service",
      title: "Microservices API Gateway",
      role: "Backend Architect",
      period: "2024",
      description:
        "Lightweight reverse proxy and API gateway managing rate limiting, JWT authentication validation, request telemetry, and upstream routing.",
      highlights: [
        "Token bucket rate limiting per IP and client API key",
        "Zero-allocation request routing pipeline",
        "Structured logging with OpenTelemetry tracing headers",
      ],
      tags: ["Go", "Node.js", "Docker", "Security", "Microservices"],
      githubUrl: "https://github.com/anthonyyjoee",
      featured: true,
    },
    {
      id: "interactive-analytics-dashboard",
      title: "Real-time Metrics Dashboard",
      role: "Full-Stack Developer",
      period: "2023 - 2024",
      description:
        "Modern analytical interface for monitoring operational metrics, with live WebSocket data streaming, fluid animations, and custom visual charts.",
      highlights: [
        "Sub-100ms real-time metric updates via persistent WebSocket connection",
        "Virtual scroll pagination handling 50k+ log entries smoothly",
        "Custom dark-mode design system with accessible keyboard navigation",
      ],
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
      githubUrl: "https://github.com/anthonyyjoee",
      featured: true,
    },
  ],
};

