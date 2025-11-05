export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
}

// GitHub API Types
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  topics: string[]
  private: boolean
}

export interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
  author: {
    login: string
    avatar_url: string
  } | null
}

export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  state: "open" | "closed"
  html_url: string
  created_at: string
  updated_at: string
  user: {
    login: string
    avatar_url: string
  }
  merged_at: string | null
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
    url: string
  }
  payload: {
    action?: string
    ref?: string
    ref_type?: string
    commits?: Array<{
      sha: string
      message: string
      url: string
    }>
    pull_request?: {
      number: number
      title: string
      html_url: string
    }
  }
  created_at: string
}

// Activity Feed Types
export interface ActivityItem {
  id: string
  type: "commit" | "pr" | "release"
  repo: string
  repoUrl: string
  title: string
  description?: string
  url: string
  date: string
  author: {
    name: string
    avatar: string
  }
}

// Blog Types
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  published: boolean
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

// Medium article types
export interface MediumArticle {
  title: string
  link: string
  pubDate: string
  author: string
  thumbnail?: string
  description: string
  content: string
  categories: string[]
  guid: string
}

// GitHub contributions types
export interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubContributionStats {
  totalContributions: number
  weeks: Array<{
    contributionDays: GitHubContribution[]
  }>
}

export interface CollaborativeRepo extends GitHubRepo {
  contributions: number
  role: string
}

// Ajoutez ces types à votre fichier types.ts existant

export interface ActivityOverview {
  commits: number
  issues: number
  pullRequests: number
  codeReviews: number
  repositoriesContributed: number
  commitsByRepo: Array<{
    name: string
    owner: string
    count: number
  }>
}

export interface MonthlyContribution {
  month: string
  commits: number
  activeDays: number
}

// const MEDIUM_RSS_URL = `https://medium.com/feed/@${SITE_CONFIG.author.medium}`

export interface RSSItem {
  title: string[]
  link: string[]
  pubDate: string[]
  "dc:creator": string[]
  guid: string[]
  description: string[]
  "content:encoded": string[]
  category?: string[]
  thumbnail?: Array<{ $: { url: string } }>
}

export interface RSSFeed {
  rss: {
    channel: Array<{
      item: RSSItem[]
    }>
  }
}