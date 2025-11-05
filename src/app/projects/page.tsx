import { Suspense } from "react"
import { ProjectsContent } from "@/components/projects-content"
import { getGitHubRepos } from "@/lib/github"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ProjectsPage() {
  const repos = await getGitHubRepos()

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Mes Projets</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          Découvrez tous mes projets open source, outils et contributions sur GitHub. Filtrez par langage ou recherchez
          un projet spécifique.
        </p>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent repos={repos} />
      </Suspense>
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-64" />
        <Skeleton className="h-10 w-full md:w-48" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  )
}
