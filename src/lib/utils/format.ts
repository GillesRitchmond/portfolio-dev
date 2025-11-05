export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d)
}

export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) return "à l'instant"
  if (diffInSeconds < 3600) return `il y a ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `il y a ${Math.floor(diffInSeconds / 3600)}h`
  if (diffInSeconds < 604800) return `il y a ${Math.floor(diffInSeconds / 86400)}j`

  return formatDate(d)
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + "..."
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min de lecture`
}
