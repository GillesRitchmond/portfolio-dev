import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Database,
  TestTube,
  Rocket,
  Heart,
  Target,
  Zap,
  Briefcase,
  GraduationCap,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react"
import type { Metadata } from "next"
import { SITE_CONFIG, TECH_STACK } from "@/lib/constants"
import { RESUME_DATA } from "@/lib/resume-data"

export const metadata: Metadata = {
  title: "À propos - " + SITE_CONFIG.name,
  description: "Découvrez mon parcours, mes compétences et ma passion pour le développement web.",
}

export default function AboutPage() {
  const techByCategory = TECH_STACK.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) acc[tech.category] = []
      acc[tech.category].push(tech.name)
      return acc
    },
    {} as Record<string, string[]>,
  )

  const { experiences, education, languages } = RESUME_DATA

  return (
    <div className="container py-12 md:py-24 mx-auto">
      {/* Hero Section */}
      <section className="mb-16 space-y-6 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">À propos de moi</h1>
        <p className="max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed md:text-xl">
          Je suis <span className="font-semibold text-foreground">{SITE_CONFIG.author.name}</span>, développeur web
          full-stack passionné par la création de solutions techniques robustes et scalables. Spécialisé en TypeScript,
          Node.js et Next.js, je me concentre sur le développement d&apos;APIs performantes, l&apos;automatisation des processus
          et l&apos;implémentation de tests automatisés pour garantir la qualité du code.
        </p>
      </section>

      {/* Stats rapides */}
      <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border/40 bg-muted/30 p-6 text-center">
            <p className="text-3xl font-bold text-primary">+4</p>
            <p className="mt-1 text-sm text-muted-foreground">Années d&apos;expérience</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-muted/30 p-6 text-center">
            <p className="text-3xl font-bold text-primary">Bac+5</p>
            <p className="mt-1 text-sm text-muted-foreground">Niveau d&apos;études</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-muted/30 p-6 text-center">
            <p className="text-3xl font-bold text-primary">3</p>
            <p className="mt-1 text-sm text-muted-foreground">Langues parlées</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-muted/30 p-6 text-center">
            <p className="text-3xl font-bold text-primary">Full-Stack</p>
            <p className="mt-1 text-sm text-muted-foreground">Profil technique</p>
          </div>
        </div>
      </section>

      {/* Parcours professionnel */}
      <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="mb-8 flex items-center gap-3">
          <Briefcase className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Parcours professionnel</h2>
        </div>

        <div className="relative space-y-0">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-[23px]" />

          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12 pb-10 last:pb-0 md:pl-16">
              <div className="absolute left-2.5 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-3.5 md:h-5 md:w-5" />

              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <p className="mt-1 font-semibold text-primary">{exp.company}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-muted-foreground leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="mb-8 flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Formation</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                <p className="font-semibold text-primary">{edu.school}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {edu.location}
                  </span>
                </div>
              </CardHeader>
              {edu.description && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Stack technique</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Code2 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Langages & Frameworks</CardTitle>
              <CardDescription>Technologies que j&apos;utilise au quotidien</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techByCategory.language?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
                {techByCategory.framework?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
                {techByCategory.runtime?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Database className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Bases de données</CardTitle>
              <CardDescription>Gestion et optimisation des données</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techByCategory.database?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <TestTube className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Tests & DevOps</CardTitle>
              <CardDescription>Qualité et déploiement continu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techByCategory.testing?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
                {techByCategory.devops?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
                {techByCategory.platform?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Langues */}
      <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <div className="mb-8 flex items-center gap-3">
          <Globe className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Langues</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {languages.map((lang) => (
            <Card key={lang.name} className="text-center transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <span className="text-4xl">{lang.flag}</span>
                <p className="mt-3 text-lg font-semibold">{lang.name}</p>
                <p className="text-sm text-muted-foreground">{lang.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Domaines d&apos;expertise</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Rocket className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Développement d&apos;APIs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Conception et développement d&apos;APIs REST et SOAP robustes, scalables et bien documentées. Expertise en
                architecture microservices, gestion des erreurs et optimisation des performances.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>CI/CD & Automatisation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Mise en place de pipelines CI/CD avec GitHub Actions, Azure DevOps et Docker. Automatisation des tests,
                du déploiement et de la surveillance pour garantir une livraison continue de qualité.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <TestTube className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Tests automatisés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Implémentation de stratégies de tests complètes avec Playwright pour les tests E2E et Jest pour les
                tests unitaires. Garantie de la qualité du code et réduction des régressions.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Database className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Architecture & Bases de données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Conception d&apos;architectures scalables et maintenables. Expertise en modélisation de données, optimisation
                de requêtes et gestion de bases MongoDB et MySQL.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values & Approach */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Ma philosophie</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Heart className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Qualité du code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Je crois fermement en l&apos;importance d&apos;un code propre, testé et maintenable. Chaque ligne de code doit
                être écrite avec soin et dans le respect des bonnes pratiques.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Target className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Apprentissage continu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Le monde du développement évolue rapidement. Je reste constamment à jour avec les dernières technologies
                et meilleures pratiques pour offrir des solutions modernes.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Performance & Scalabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Chaque projet doit être conçu pour évoluer. J&apos;accorde une attention particulière à l&apos;optimisation des
                performances et à la scalabilité des solutions développées.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-lg border border-border/40 bg-muted/50 p-8 text-center md:p-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Intéressé par mon profil ?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground text-pretty">
          Je suis ouvert aux opportunités de collaboration et aux projets stimulants. N&apos;hésitez pas à me contacter pour
          discuter de vos besoins.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Me contacter
          </a>
          <a
            href="/resume"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Voir mon CV
          </a>
        </div>
      </section>
    </div>
  )
}
