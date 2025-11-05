import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, Code2, Briefcase, Users } from "lucide-react"
import { getGitHubRepos, getGitHubActivity, getContributionStats, getCollaborativeRepos } from "@/lib/github"
import { SITE_CONFIG } from "@/lib/constants"
import { ContributionCalendar } from "@/components/contribution-calendar"

export default async function Page() {
  const [repos, activity, contributionStats, collaborativeRepos] = await Promise.all([
    getGitHubRepos(),
    getGitHubActivity(),
    getContributionStats(),
    getCollaborativeRepos(),
  ])

  const featuredRepos = repos.slice(0, 3)
  const recentActivity = activity.slice(0, 5)

  return (
    <div className="container p-12 mx-auto">
      {/* Hero Section */}
      <section className="mb-16 space-y-6 text-center md:mb-24">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          Bonjour, je suis <span className="text-primary">{SITE_CONFIG.author.name}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
          {SITE_CONFIG.author.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">
              Voir mes projets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </div>
      </section>

      {contributionStats && (
        <section className="mb-16 md:mb-24">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Contributions GitHub</h2>
            <p className="mt-2 text-muted-foreground">Mon activité de développement sur GitHub</p>
          </div>
          <Card>
            <CardContent className="p-6">
              <ContributionCalendar stats={contributionStats} />
            </CardContent>
          </Card>
        </section>
      )}

      {/* Featured Projects */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projets en vedette</h2>
            <p className="mt-2 text-muted-foreground">Découvrez mes derniers projets open source</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/projects">
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredRepos.map((repo) => (
            <Card key={repo.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1">{repo.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    <Github className="mr-1 h-3 w-3" />
                    {repo.stargazers_count}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {repo.description || "Pas de description disponible"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                  {repo.topics?.slice(0, 2).map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {collaborativeRepos.length > 0 && (
        <section className="mb-16 md:mb-24">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Projets collaboratifs</h2>
            <p className="mt-2 text-muted-foreground">Projets open source auxquels je contribue</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collaborativeRepos.map((repo) => (
              <Card key={repo.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {repo.name}
                      </a>
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      <Users className="mr-1 h-3 w-3" />
                      {repo.contributions}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {repo.description || "Pas de description disponible"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">{repo.role}</Badge>
                    {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                    {repo.topics?.slice(0, 1).map((topic) => (
                      <Badge key={topic} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Activité récente</h2>
          <p className="mt-2 text-muted-foreground">Mes dernières contributions sur GitHub</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((event, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className="flex items-start gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-relaxed">
                      {event.type === "PushEvent" && (
                        <>
                          Pushed to{" "}
                          <Link
                            href={`https://github.com/${event.repo.name}`}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.repo.name}
                          </Link>
                        </>
                      )}
                      {event.type === "CreateEvent" && (
                        <>
                          Created repository{" "}
                          <Link
                            href={`https://github.com/${event.repo.name}`}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.repo.name}
                          </Link>
                        </>
                      )}
                      {event.type === "WatchEvent" && (
                        <>
                          Starred{" "}
                          <Link
                            href={`https://github.com/${event.repo.name}`}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.repo.name}
                          </Link>
                        </>
                      )}
                      {!["PushEvent", "CreateEvent", "WatchEvent"].includes(event.type) && (
                        <>
                          Activity on{" "}
                          <Link
                            href={`https://github.com/${event.repo.name}`}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.repo.name}
                          </Link>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg border border-border/40 bg-muted/50 p-8 text-center md:p-12">
        <Briefcase className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Travaillons ensemble</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground text-pretty">
          Je suis toujours ouvert à de nouvelles opportunités et collaborations. N'hésitez pas à me contacter pour
          discuter de vos projets.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Me contacter
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
