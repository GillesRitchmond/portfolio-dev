import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, TestTube, Rocket, Heart, Target, Zap } from "lucide-react"
import type { Metadata } from "next"
import { SITE_CONFIG, TECH_STACK } from "@/lib/constants"

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

  return (
    <div className="container py-12 md:py-24 mx-auto">
      {/* Hero Section */}
      <section className="mb-16 space-y-6 md:mb-24">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">À propos de moi</h1>
        <p className="max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed md:text-xl">
          Je suis <span className="font-semibold text-foreground">{SITE_CONFIG.author.name}</span>, développeur web
          full-stack passionné par la création de solutions techniques robustes et scalables. Spécialisé en TypeScript,
          Node.js et Next.js, je me concentre sur le développement d&apos;APIs performantes, l&apos;automatisation des processus
          et l&apos;implémentation de tests automatisés pour garantir la qualité du code.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Stack technique</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
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

          <Card>
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

          <Card>
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

      {/* Expertise Areas */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Domaines d&apos;expertise</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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
          <Card>
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

          <Card>
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

          <Card>
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
