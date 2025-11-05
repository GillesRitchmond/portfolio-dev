import type {
  GitHubRepo,
  GitHubCommit,
  GitHubEvent,
  ActivityItem,
  GitHubContributionStats,
  CollaborativeRepo,
  GitHubContribution,
} from "./types"

const GITHUB_API = "https://api.github.com"
const GITHUB_GRAPHQL = "https://api.github.com/graphql"
const USERNAME = process.env.GITHUB_USERNAME || "GillesRitchmond"
const TOKEN = process.env.GITHUB_TOKEN

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
}

const graphqlHeaders: HeadersInit = {
  "Content-Type": "application/json",
  ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
}

// Featured repositories
const FEATURED_REPOS = [
  "web-data-toolkit",
  "digital-signature-app",
  "next-wgg-auth-package",
  "deliveryManagementSystem",
  "gillesritchmond.github.io",
]

export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()
    const filtered = repos.filter((repo) => !repo.private)

    return filtered.sort((a, b) => {
      const aFeatured = FEATURED_REPOS.includes(a.name)
      const bFeatured = FEATURED_REPOS.includes(b.name)

      if (aFeatured && !bFeatured) return -1
      if (!aFeatured && bFeatured) return 1

      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
  } catch (error) {
    console.error("Error fetching repos:", error)
    return []
  }
}

export async function getRepo(repoName: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${USERNAME}/${repoName}`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Error fetching repo:", error)
    return null
  }
}

export async function getRepoCommits(repoName: string, limit = 5): Promise<GitHubCommit[]> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${USERNAME}/${repoName}/commits?per_page=${limit}`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Error fetching commits:", error)
    return []
  }
}

export async function getUserEvents(): Promise<GitHubEvent[]> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}/events/public?per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export async function getActivityFeed(limit = 20): Promise<ActivityItem[]> {
  const events = await getUserEvents()
  const activities: ActivityItem[] = []

  for (const event of events) {
    if (activities.length >= limit) break

    if (event.type === "PushEvent" && event.payload.commits) {
      for (const commit of event.payload.commits.slice(0, 2)) {
        activities.push({
          id: `${event.id}-${commit.sha}`,
          type: "commit",
          repo: event.repo.name.split("/")[1],
          repoUrl: `https://github.com/${event.repo.name}`,
          title: commit.message.split("\n")[0],
          description: commit.message,
          url: commit.url.replace("api.github.com/repos", "github.com").replace("/commits/", "/commit/"),
          date: event.created_at,
          author: {
            name: event.actor.login,
            avatar: event.actor.avatar_url,
          },
        })
      }
    }

    if (event.type === "PullRequestEvent" && event.payload.pull_request) {
      activities.push({
        id: event.id,
        type: "pr",
        repo: event.repo.name.split("/")[1],
        repoUrl: `https://github.com/${event.repo.name}`,
        title: event.payload.pull_request.title,
        url: event.payload.pull_request.html_url,
        date: event.created_at,
        author: {
          name: event.actor.login,
          avatar: event.actor.avatar_url,
        },
      })
    }
  }

  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
}

export async function getRepoReadme(repoName: string): Promise<string | null> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${USERNAME}/${repoName}/readme`, {
      headers: {
        ...headers,
        Accept: "application/vnd.github.raw",
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null
    return response.text()
  } catch (error) {
    console.error("Error fetching README:", error)
    return null
  }
}

// Fonction améliorée utilisant GraphQL pour obtenir les vraies contributions
export async function getContributionStats(): Promise<GitHubContributionStats | null> {
  if (!TOKEN) {
    console.warn("GitHub token required for contribution stats. Falling back to REST API approximation.")
    return getContributionStatsREST()
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  contributionLevel
                }
              }
            }
            commitContributionsByRepository(maxRepositories: 100) {
              repository {
                name
                owner {
                  login
                }
              }
              contributions(first: 100) {
                totalCount
              }
            }
            pullRequestContributionsByRepository(maxRepositories: 100) {
              repository {
                name
              }
              contributions(first: 100) {
                totalCount
              }
            }
            issueContributionsByRepository(maxRepositories: 100) {
              repository {
                name
              }
              contributions(first: 100) {
                totalCount
              }
            }
            pullRequestReviewContributionsByRepository(maxRepositories: 100) {
              repository {
                name
              }
              contributions(first: 100) {
                totalCount
              }
            }
          }
        }
      }
    `

    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: graphqlHeaders,
      body: JSON.stringify({
        query,
        variables: { username: USERNAME },
      }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.warn("GraphQL request failed, falling back to REST API")
      return getContributionStatsREST()
    }

    const data = await response.json()

    if (data.errors) {
      console.error("GraphQL errors:", data.errors)
      return getContributionStatsREST()
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar

    // Mapper les niveaux GraphQL (NONE, FIRST_QUARTILE, etc.) vers 0-4
    const mapLevel = (level: string): 0 | 1 | 2 | 3 | 4 => {
      switch (level) {
        case "NONE":
          return 0
        case "FIRST_QUARTILE":
          return 1
        case "SECOND_QUARTILE":
          return 2
        case "THIRD_QUARTILE":
          return 3
        case "FOURTH_QUARTILE":
          return 4
        default:
          return 0
      }
    }

    const weeks = calendar.weeks.map((week: any) => ({
      contributionDays: week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: mapLevel(day.contributionLevel),
      })),
    }))

    return {
      totalContributions: calendar.totalContributions,
      weeks,
    }
  } catch (error) {
    console.error("Error fetching contribution stats with GraphQL:", error)
    return getContributionStatsREST()
  }
}

// Fallback REST API (ancienne méthode)
async function getContributionStatsREST(): Promise<GitHubContributionStats | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}/events/public?per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null

    const events: GitHubEvent[] = await response.json()
    const contributionMap = new Map<string, number>()

    events.forEach((event) => {
      if (!event || !event.created_at) return
      const date = new Date(event.created_at).toISOString().split("T")[0]
      contributionMap.set(date, (contributionMap.get(date) ?? 0) + 1)
    })

    const weeks: Array<{ contributionDays: GitHubContribution[] }> = []
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    let currentWeek: GitHubContribution[] = []
    let totalContributions = 0

    const getLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
      if (count === 0) return 0
      if (count <= 2) return 1
      if (count <= 5) return 2
      if (count <= 10) return 3
      return 4
    }

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      const count = contributionMap.get(dateStr) ?? 0
      totalContributions += count

      currentWeek.push({
        date: dateStr,
        count,
        level: getLevel(count),
      })

      if (d.getDay() === 6 || d.getTime() === today.getTime()) {
        weeks.push({ contributionDays: currentWeek })
        currentWeek = []
      }
    }

    return {
      totalContributions,
      weeks,
    }
  } catch (error) {
    console.error("Error fetching contribution stats:", error)
    return null
  }
}

// Nouvelle fonction pour obtenir un aperçu détaillé de l'activité
export async function getActivityOverview(): Promise<
  | {
      commits: number
      issues: number
      pullRequests: number
      codeReviews: number
      repositoriesContributed: number
      commitsByRepo: { name: string; owner: string; count: number }[]
    }
  | null
> {
  if (!TOKEN) {
    return null
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            totalRepositoriesWithContributedCommits
            totalRepositoriesWithContributedIssues
            totalRepositoriesWithContributedPullRequests
            totalRepositoriesWithContributedPullRequestReviews
            commitContributionsByRepository(maxRepositories: 100) {
              repository {
                name
                owner {
                  login
                }
              }
              contributions(first: 1) {
                totalCount
              }
            }
          }
        }
      }
    `

    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: graphqlHeaders,
      body: JSON.stringify({
        query,
        variables: { username: USERNAME },
      }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null

    const data = await response.json()
    if (data.errors) {
      console.error("GraphQL errors:", data.errors)
      return null
    }

    const collection = data?.data?.user?.contributionsCollection
    if (!collection) return null

    type RepoContributionItem = {
      repository?: {
        name?: string
        owner?: {
          login?: string
        }
      } | null
      contributions?: {
        totalCount?: number
      } | null
    }

    const commitsByRepo =
      Array.isArray(collection.commitContributionsByRepository) ?
        collection.commitContributionsByRepository.map((item: RepoContributionItem) => {
          const name = item.repository?.name ?? ""
          const owner = item.repository?.owner?.login ?? ""
          const count = item.contributions?.totalCount ?? 0
          return { name, owner, count }
        }) :
        []

    return {
      commits: Number(collection.totalCommitContributions) || 0,
      issues: Number(collection.totalIssueContributions) || 0,
      pullRequests: Number(collection.totalPullRequestContributions) || 0,
      codeReviews: Number(collection.totalPullRequestReviewContributions) || 0,
      repositoriesContributed: Number(collection.totalRepositoriesWithContributedCommits) || 0,
      commitsByRepo,
    }
  } catch (error) {
    console.error("Error fetching activity overview:", error)
    return null
  }
}

export async function getCollaborativeRepos(): Promise<CollaborativeRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}/events/public?per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []

    const events: GitHubEvent[] = await response.json()
    const repoContributions = new Map<string, number>()

    events.forEach((event) => {
      const repoName = event.repo.name
      if (!repoName.startsWith(`${USERNAME}/`)) {
        repoContributions.set(repoName, (repoContributions.get(repoName) || 0) + 1)
      }
    })

    const collaborativeRepos: CollaborativeRepo[] = []
    const topRepos = Array.from(repoContributions.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    for (const [repoFullName, contributions] of topRepos) {
      try {
        const repoResponse = await fetch(`${GITHUB_API}/repos/${repoFullName}`, {
          headers,
          next: { revalidate: 3600 },
        })

        if (repoResponse.ok) {
          const repo: GitHubRepo = await repoResponse.json()
          collaborativeRepos.push({
            ...repo,
            contributions,
            role: "Contributor",
          })
        }
      } catch (error) {
        console.error(`Error fetching repo ${repoFullName}:`, error)
      }
    }

    return collaborativeRepos
  } catch (error) {
    console.error("Error fetching collaborative repos:", error)
    return []
  }
}

// Nouvelle fonction pour obtenir les statistiques mensuelles détaillées
export async function getMonthlyContributions() {
  try {
    const stats = await getContributionStats()
    if (!stats) return null

    const monthlyData = new Map<string, { commits: number; activeDays: number }>()

    stats.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        const month = day.date.substring(0, 7) // YYYY-MM
        const existing = monthlyData.get(month) || { commits: 0, activeDays: 0 }
        monthlyData.set(month, {
          commits: existing.commits + day.count,
          activeDays: existing.activeDays + (day.count > 0 ? 1 : 0),
        })
      })
    })

    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month,
        ...data,
      }))
      .sort((a, b) => b.month.localeCompare(a.month))
  } catch (error) {
    console.error("Error calculating monthly contributions:", error)
    return null
  }
}

export const getGitHubRepos = getRepos
export const getGitHubActivity = getUserEvents