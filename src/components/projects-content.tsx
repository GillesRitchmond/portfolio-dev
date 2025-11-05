"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, GitFork, ExternalLink, Search } from "lucide-react"
import type { GitHubRepo } from "@/lib/types"

interface ProjectsContentProps {
  repos: GitHubRepo[]
}

export function ProjectsContent({ repos }: ProjectsContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  // Extract unique languages
  const languages = useMemo(() => {
    const langs = new Set<string>()
    repos.forEach((repo) => {
      if (repo.language) langs.add(repo.language)
    })
    return Array.from(langs).sort()
  }, [repos])

  // Filter repos based on search and language
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        searchQuery === "" ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.topics?.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLanguage = selectedLanguage === null || repo.language === selectedLanguage

      return matchesSearch && matchesLanguage
    })
  }, [repos, searchQuery, selectedLanguage])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedLanguage === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLanguage(null)}
          >
            Tous ({repos.length})
          </Button>
          {languages.map((lang) => {
            const count = repos.filter((r) => r.language === lang).length
            return (
              <Button
                key={lang}
                variant={selectedLanguage === lang ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredRepos.length} projet{filteredRepos.length !== 1 ? "s" : ""} trouvé
        {filteredRepos.length !== 1 ? "s" : ""}
      </div>

      {/* Projects grid */}
      {filteredRepos.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Aucun projet trouvé avec ces critères.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <Card key={repo.id} className="group flex flex-col transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1 text-balance group-hover:text-primary">
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {repo.name}
                      <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 text-pretty">
                  {repo.description || "Pas de description disponible"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{repo.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-primary" />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                {/* Updated date */}
                <div className="text-xs text-muted-foreground">
                  Mis à jour le{" "}
                  {new Date(repo.updated_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
