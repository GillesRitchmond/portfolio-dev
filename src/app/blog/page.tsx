import { Suspense } from "react"
import { getMediumArticles } from "@/lib/medium"
import { BlogContent } from "@/components/blog-content"
import { Skeleton } from "@/components/ui/skeleton"

export default async function BlogPage() {
  const articles = await getMediumArticles()

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Blog</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          Mes articles et réflexions sur le développement web, les bonnes pratiques et les technologies modernes.
          Publiés sur Medium.
        </p>
      </div>

      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent articles={articles} />
      </Suspense>
    </div>
  )
}

function BlogSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-96" />
      ))}
    </div>
  )
}
