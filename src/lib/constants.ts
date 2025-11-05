export const SITE_CONFIG = {
  name: "Ritchmond GILLES",
  title: "Ritchmond GILLES - Développeur Web TypeScript/Node/Next.js",
  description:
    "Développeur Web spécialisé en TypeScript, Node.js et Next.js. APIs REST/SOAP, MongoDB/MySQL, CI/CD, tests automatisés.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gillesritchmond.vercel.app",
  author: {
    name: "Ritchmond GILLES",
    github: "GillesRitchmond",
    linkedin: "ritchmond-gilles",
    email: "gillesritchmond@gmail.com",
    medium: "gritchmond", // Added Medium username for RSS feed integration
    bio: "Développeur Web Full-Stack spécialisé en TypeScript, Node.js et Next.js. Passionné par la création d'APIs robustes, l'automatisation et les bonnes pratiques de développement.",
  },
  social: {
    github: "https://github.com/GillesRitchmond",
    linkedin: "https://linkedin.com/in/ritchmond-gilles",
    email: "gillesritchmond@gmail.com",
  },
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "shadcn/ui",
    "Playwright",
    "Jest",
    "MongoDB",
    "MySQL",
    "REST API",
    "SOAP",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "GCP",
    "Azure DevOps",
    "Vercel",
    "Resend"
  ],
}

export const TECH_STACK = [
  { name: "TypeScript", category: "language" },
  { name: "Node.js", category: "runtime" },
  { name: "Next.js", category: "framework" },
  { name: "React", category: "framework" },
  { name: "Tailwind CSS", category: "styling" },
  { name: "MongoDB", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Playwright", category: "testing" },
  { name: "Jest", category: "testing" },
  { name: "Docker", category: "devops" },
  { name: "Vercel", category: "platform" },
  { name: "Resend", category: "email" },
]

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/activity", label: "Activité" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "À propos" },
  { href: "/resume", label: "CV" },
  { href: "/contact", label: "Contact" },
]
