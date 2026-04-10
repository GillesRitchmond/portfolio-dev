export interface Experience {
  title: string
  company: string
  location: string
  period: string
  startDate: string
  endDate: string
  description: string
  tasks: string[]
  technologies: string[]
}

export interface Education {
  degree: string
  school: string
  location: string
  period: string
  description?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
  url?: string
}

export interface Language {
  name: string
  level: string
  flag: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone?: string
    location: string
    linkedin: string
    github: string
    website: string
    bio: string
  }
  experiences: Experience[]
  education: Education[]
  certifications: Certification[]
  languages: Language[]
  skills: SkillCategory[]
}

export const RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Ritchmond GILLES",
    title: "Développeur Web Full-Stack TypeScript / Node.js / Next.js",
    email: "gillesritchmond@gmail.com",
    location: "France",
    linkedin: "https://linkedin.com/in/ritchmond-gilles",
    github: "https://github.com/GillesRitchmond",
    website: "https://gillesritchmond.vercel.app",
    bio: "Développeur Web Full-Stack spécialisé en TypeScript, Node.js et Next.js. Passionné par la création d'APIs robustes, l'automatisation des processus et les bonnes pratiques de développement. Sensibilisé au numérique responsable.",
  },

  experiences: [
    {
      title: "Développeur Web Full-Stack",
      company: "Web Goes Green",
      location: "Rennes, France",
      period: "Déc. 2022 – Juin 2023",
      startDate: "2022-12",
      endDate: "2023-06",
      description:
        "Développement d'une plateforme éducative sur l'impact environnemental du numérique dans le cadre du projet ESDAC.",
      tasks: [
        "Conception et développement d'une plateforme web éducative sur le numérique responsable",
        "Implémentation d'un calculateur d'empreinte carbone numérique",
        "Création d'outils d'accessibilité et de contraste de couleurs",
        "Développement de modules interactifs de sensibilisation environnementale",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    },
    {
      title: "Designer / Développeur Frontend",
      company: "Une Robe Un Soir",
      location: "Paris, France",
      period: "2021 – 2022",
      startDate: "2021-01",
      endDate: "2022-12",
      description:
        "Création d'interfaces web et d'expériences utilisateurs pour une plateforme de location de robes de créateurs.",
      tasks: [
        "Conception d'interfaces utilisateur et expériences client",
        "Optimisation des parcours utilisateurs et du tunnel de conversion",
        "Intégration de maquettes responsive et pixel-perfect",
        "Collaboration avec l'équipe marketing pour améliorer la présence digitale",
      ],
      technologies: ["HTML/CSS", "JavaScript", "React", "Adobe XD", "Figma"],
    },
    {
      title: "Graphic Designer",
      company: "FincoPlus",
      location: "Port-au-Prince, Haïti",
      period: "Jan. 2019 – Jan. 2020",
      startDate: "2019-01",
      endDate: "2020-01",
      description:
        "Gestion de l'identité visuelle et de la stratégie marketing digitale d'une entreprise fintech.",
      tasks: [
        "Création et gestion de l'identité visuelle de l'entreprise",
        "Conception de supports marketing print et digitaux",
        "Gestion de la stratégie de communication sur les réseaux sociaux",
        "Création de contenus visuels pour les campagnes publicitaires",
      ],
      technologies: ["Photoshop", "Illustrator", "InDesign", "Mailchimp"],
    },
  ],

  education: [
    {
      degree: "Master (Bac+5) en Design Numérique",
      school: "ESDAC",
      location: "Rennes, France",
      period: "2021 – 2023",
      description:
        "Spécialisation en UX/UI Design et développement web. Projet de fin d'études sur le numérique responsable.",
    },
    {
      degree: "Licence (Bac+3) en Informatique",
      school: "Université",
      location: "France",
      period: "2018 – 2021",
      description:
        "Formation en développement logiciel, bases de données et architecture des systèmes.",
    },
  ],

  certifications: [],

  languages: [
    { name: "Français", level: "Natif", flag: "🇫🇷" },
    { name: "Anglais", level: "Courant (B2/C1)", flag: "🇬🇧" },
    { name: "Créole haïtien", level: "Natif", flag: "🇭🇹" },
  ],

  skills: [
    {
      name: "Langages & Frameworks",
      skills: ["TypeScript", "JavaScript", "Node.js", "Next.js", "React", "PHP"],
    },
    {
      name: "Frontend",
      skills: ["HTML/CSS", "Tailwind CSS", "shadcn/ui", "Bootstrap", "Responsive Design"],
    },
    {
      name: "Backend & APIs",
      skills: ["REST API", "SOAP", "Express.js", "Microservices"],
    },
    {
      name: "Bases de données",
      skills: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      name: "Tests & Qualité",
      skills: ["Playwright", "Jest", "Tests E2E", "Tests unitaires"],
    },
    {
      name: "DevOps & Outils",
      skills: ["Docker", "Git", "GitHub Actions", "Azure DevOps", "CI/CD", "Vercel"],
    },
    {
      name: "Design",
      skills: ["Adobe XD", "Figma", "Photoshop", "Illustrator"],
    },
  ],
}
