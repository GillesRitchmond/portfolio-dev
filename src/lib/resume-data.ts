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
    title: "Développeur Web Full-Stack TypeScript / Node.js / Next.js & UX/UI Designer",
    email: "gillesritchmond@gmail.com",
    location: "Paris, France",
    linkedin: "https://linkedin.com/in/ritchmondgilles",
    github: "https://github.com/GillesRitchmond",
    website: "https://gillesritchmond.github.io/",
    bio: "Co-fondateur & CTO de Denky et Développeur Frontend Junior chez Elvest. Spécialisé en TypeScript, Node.js et Next.js, je conçois des solutions techniques robustes, scalables et éco-conçues. Mon parcours unit le design UI/UX et la technologie pour concevoir des produits numériques de haute qualité.",
  },

  experiences: [
    {
      title: "Co-fondateur & CTO",
      company: "Denky (ex-Hemera)",
      location: "Paris, France",
      period: "Janv. 2025 – Présent",
      startDate: "2025-01",
      endDate: "2026-07",
      description:
        "Co-fondation et direction technique d'une plateforme d'intermédiation contractuelle et d'optimisation d'énergie pour les entreprises.",
      tasks: [
        "Conception de l'architecture logicielle globale (monorepo NPM Workspaces, Next.js App Router, React 19)",
        "Développement complet du tunnel de signature électronique sécurisé HemeSign avec double authentification OTP et historique d'audit",
        "Intégration d'APIs complexes : Enedis DataConnect (courbes de charge), GRDF Adict et l'API SIRENE (INSEE)",
        "Automatisation et orchestration des flux de tests et de monitoring E2E via Playwright (ACD -> OTP -> Signature)",
        "Mise en conformité réglementaire (Décret Tertiaire, Décret BACS, CEE) via des tableaux de bord analytiques"
      ],
      technologies: ["TypeScript", "Next.js", "React 19", "Node.js", "Better-Auth", "Prisma", "PostgreSQL", "Docker", "Playwright", "Puppeteer"],
    },
    {
      title: "Développeur Front Junior",
      company: "Elvest (Groupe Inter Invest)",
      location: "Paris, France",
      period: "Fév. 2026 – Présent",
      startDate: "2026-02",
      endDate: "2026-07",
      description:
        "Développement d'interfaces et intégration d'applications web financières innovantes au sein du pôle Innovation.",
      tasks: [
        "Développement d'applications web de placement et de défiscalisation (Girardin, Capital Investissement, Crowdfunding)",
        "Intégration de maquettes pixel-perfect en respectant scrupuleusement la charte graphique et le design system d'Elvest",
        "Optimisation des performances web (Core Web Vitals, LCP/INP) et amélioration de l'accessibilité client"
      ],
      technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS", "shadcn/ui", "Figma"],
    },
    {
      title: "Webdesigner (CDI)",
      company: "Inter Invest",
      location: "Paris, France",
      period: "Nov. 2023 – Janv. 2026",
      startDate: "2023-11",
      endDate: "2026-01",
      description:
        "UI/UX Design, graphisme et intégration au sein de l'équipe Marketing et Communication du groupe financier.",
      tasks: [
        "UI/UX Design et prototypage de landing pages et tunnels d'investissements sur Figma",
        "Création graphique de supports publicitaires digitaux et imprimés (trombinoscopes, brochures, visuels de campagnes)",
        "Conception graphique et intégration de newsletters responsives à fort engagement"
      ],
      technologies: ["Figma", "Adobe Suite", "HTML/CSS", "Tailwind CSS", "JavaScript", "Mailchimp", "Vero", "Brevo"],
    },
    {
      title: "Développeur Full-Stack & Designer (Freelance)",
      company: "Missions Indépendantes",
      location: "France",
      period: "Sept. 2023 – Présent",
      startDate: "2023-09",
      endDate: "2026-07",
      description:
        "Accompagnement de professionnels et entreprises dans leur transition numérique (création de sites web et d'outils sur mesure).",
      tasks: [
        "CL-dieteticienne : Création d'un site web vitrine responsive pour une diététicienne avec prise de rendez-vous en ligne",
        "Solène Coaching : Conception et développement complet d'une plateforme d'accompagnement de coaching v1/v2 avec éditeur WYSIWYG (Lexical)",
        "Soin de Plume : Refonte technique, intégration web responsive et optimisation SEO d'un site éditorial",
        "Elcie & Antoine : Développement d'un site de mariage réactif, interactif et personnalisé pour la gestion des invités"
      ],
      technologies: ["TypeScript", "Next.js", "React", "PHP", "MySQL", "Tailwind CSS", "shadcn/ui", "WordPress", "Webflow", "Figma"],
    },
    {
      title: "Intervenant Professionnel / Formateur Web & UI-UX",
      company: "ESDAC / ESIH",
      location: "Rennes & Haïti",
      period: "Sept. 2023 – Présent",
      startDate: "2023-09",
      endDate: "2026-07",
      description:
        "Animation de cours théoriques et pratiques sur le développement web moderne et l'UX/UI Design.",
      tasks: [
        "Cours et ateliers sur l'éco-conception web, l'accessibilité numérique (WCAG) et le prototypage avec Figma",
        "Formation pratique sur l'utilisation des technologies front-end (HTML/CSS, JavaScript, React, Next.js)",
        "Encadrement et évaluation de projets d'études et de workshops collaboratifs"
      ],
      technologies: ["Figma", "Design Systems", "HTML/CSS", "JavaScript", "React", "Eco-conception"],
    },
    {
      title: "Développeur Web Full-Stack",
      company: "Web Goes Green",
      location: "Rennes, France",
      period: "Déc. 2022 – Juin 2023",
      startDate: "2022-12",
      endDate: "2023-06",
      description:
        "Développement d'une plateforme éducative sur l'impact environnemental du numérique dans le cadre de mon projet d'études ESDAC.",
      tasks: [
        "Conception et développement d'une plateforme web éducative sur le numérique responsable",
        "Implémentation d'un calculateur d'empreinte carbone numérique interactif",
        "Création d'outils d'accessibilité et d'analyse des contrastes de couleurs",
        "Développement d'une bibliothèque de ressources graphiques éco-conçues (Lottie Files JSON, SVG, WebP)"
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Lottie"],
    },
    {
      title: "Designer / Développeur Frontend (Alternance & Stage)",
      company: "Une Robe Un Soir",
      location: "Paris, France",
      period: "Fév. 2022 – Sept. 2023",
      startDate: "2022-02",
      endDate: "2023-09",
      description:
        "Création d'interfaces web et d'expériences utilisateurs pour une plateforme e-commerce haut de gamme de location de robes de créateurs.",
      tasks: [
        "Conception d'interfaces utilisateur modernes et optimisation du tunnel de conversion",
        "Optimisation des Core Web Vitals (LCP, CLS) et de la performance d'affichage du site",
        "Intégration de maquettes responsive pixel-perfect et développement de templates de newsletters",
        "Collaboration avec l'équipe marketing pour accroître la présence digitale de la marque"
      ],
      technologies: ["React", "HTML/CSS", "JavaScript", "Adobe XD", "Figma", "Sylius", "WordPress"],
    },
    {
      title: "Graphic Designer",
      company: "FincoPlus",
      location: "Port-au-Prince, Haïti",
      period: "Janv. 2019 – Janv. 2020",
      startDate: "2019-01",
      endDate: "2020-01",
      description:
        "Gestion de l'identité visuelle et de la stratégie de communication digitale d'une entreprise de technologie financière.",
      tasks: [
        "Création et gestion complète de la charte graphique et de l'identité visuelle de la marque",
        "Conception de supports marketing print et digitaux pour les campagnes publicitaires",
        "Gestion, modération et création de contenus hebdomadaires pour les réseaux sociaux"
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
        "Spécialisation en UX/UI Design, développement web et éco-conception numérique. Rédaction d'un mémoire culturel et réalisation du projet Web Goes Green.",
    },
    {
      degree: "Licence (Bac+3) en Sciences Informatiques",
      school: "ESIH (École Supérieure d'Infotronique d'Haïti)",
      location: "Port-au-Prince, Haïti",
      period: "2018 – 2021",
      description:
        "Formation théorique et pratique en algorithmique, développement logiciel, bases de données, réseaux et architecture des systèmes.",
    },
    {
      degree: "DUT en Sciences Informatiques",
      school: "ESIH (École Supérieure d'Infotronique d'Haïti)",
      location: "Port-au-Prince, Haïti",
      period: "2017 – 2019",
      description:
        "Fondements du génie logiciel, développement d'applications de base de données, réseaux et administration système.",
    },
  ],

  certifications: [],

  languages: [
    { name: "Français", level: "Natif / Bilingue", flag: "🇫🇷" },
    { name: "Créole haïtien", level: "Natif", flag: "🇭🇹" },
    { name: "Anglais", level: "Courant (B2/C1)", flag: "🇬🇧" },
    { name: "Italien", level: "Notions (A2)", flag: "🇮🇹" },
  ],

  skills: [
    {
      name: "Langages & Frameworks",
      skills: ["TypeScript", "JavaScript", "Node.js", "Next.js", "React", "PHP", "Symfony"],
    },
    {
      name: "Frontend",
      skills: ["HTML/CSS", "Tailwind CSS", "shadcn/ui", "Bootstrap", "Responsive Design", "Eco-conception"],
    },
    {
      name: "Backend & APIs",
      skills: ["REST API", "SOAP", "Express.js", "Microservices", "BFF (Backend For Frontend)"],
    },
    {
      name: "Bases de données",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Doctrine"],
    },
    {
      name: "Tests & Qualité",
      skills: ["Playwright", "Jest", "Tests E2E", "Tests unitaires", "Accessibilité (WCAG)"],
    },
    {
      name: "DevOps & Outils",
      skills: ["Docker", "Git", "GitHub Actions", "Azure DevOps", "CI/CD", "Vercel", "Better-Auth", "Resend"],
    },
    {
      name: "Design & Création",
      skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "InDesign", "Motion Design"],
    },
  ],
}
