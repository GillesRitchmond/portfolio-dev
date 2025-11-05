"use client"

import { useState } from "react"
import type { MediumArticle } from "@/lib/types"
import { formatMediumDate, calculateReadingTime } from "@/lib/medium"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Calendar, Clock, Search } from "lucide-react"
import Image from "next/image"

interface BlogContentProps {
  articles: MediumArticle[]
}

export function BlogContent({ articles }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = articles.filter((article) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      article.title.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower) ||
      article.categories.some((cat) => cat.toLowerCase().includes(searchLower))
    )
  })

  if (articles.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Aucun article trouvé</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Les articles Medium n'ont pas pu être chargés. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Aucun résultat</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Aucun article ne correspond à votre recherche &quot;{searchQuery}&quot;
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.guid} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

function ArticleCard({ article }: { article: MediumArticle }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      {/*{article.thumbnail && (*/}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={"https://images.unsplash.com/photo-1733244949334-9f60e7ead112?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"}
            alt={article.title}
            // fill
            height={400}
            width={400}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      {/*)}*/}

      <CardHeader>
        <CardTitle className="line-clamp-2 text-balance leading-tight">{article.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-pretty">{article.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {article.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatMediumDate(article.pubDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{calculateReadingTime(article.content)}</span>
          </div>
        </div>

        <Button asChild className="w-full">
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Lire sur Medium
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
