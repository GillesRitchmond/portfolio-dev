"use client"
import { useState, useMemo } from "react"

interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubContributionStats {
  totalContributions: number
  weeks: Array<{ contributionDays: GitHubContribution[] }>
}

interface ContributionCalendarProps {
  stats: GitHubContributionStats
}

export function ContributionCalendar({ stats }: ContributionCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<GitHubContribution | null>(null)

  // Calculer des statistiques supplémentaires
  const extendedStats = useMemo(() => {
    const allDays = stats.weeks.flatMap(week => week.contributionDays)
    
    // Streak actuel (jours consécutifs avec contributions)
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Calculer les streaks en partant d'aujourd'hui vers le passé
    const sortedDays = [...allDays].reverse()
    let streakBroken = false
    
    for (const day of sortedDays) {
      const dayDate = new Date(day.date)
      dayDate.setHours(0, 0, 0, 0)
      
      if (day.count > 0) {
        tempStreak++
        if (!streakBroken) {
          currentStreak = tempStreak
        }
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak
        }
      } else {
        if (!streakBroken) {
          streakBroken = true
        }
        tempStreak = 0
      }
    }
    
    // Jour le plus productif
    const mostProductiveDay = allDays.reduce((max, day) => 
      day.count > max.count ? day : max
    , allDays[0])
    
    // Moyenne par jour
    const averagePerDay = (stats.totalContributions / allDays.length).toFixed(1)
    
    // Contributions par mois
    const monthlyContributions = allDays.reduce((acc, day) => {
      const month = day.date.substring(0, 7) // YYYY-MM
      acc[month] = (acc[month] || 0) + day.count
      return acc
    }, {} as Record<string, number>)
    
    const mostProductiveMonth = Object.entries(monthlyContributions).reduce((max, [month, count]) => 
      count > max.count ? { month, count } : max
    , { month: '', count: 0 })
    
    // Jours actifs (avec au moins 1 contribution)
    const activeDays = allDays.filter(day => day.count > 0).length
    
    return {
      currentStreak,
      longestStreak,
      mostProductiveDay,
      averagePerDay,
      mostProductiveMonth,
      activeDays,
      totalDays: allDays.length
    }
  }, [stats])

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">{stats.totalContributions}</p>
          <p className="text-xs text-muted-foreground">Contributions totales</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">{extendedStats.currentStreak}</p>
          <p className="text-xs text-muted-foreground">Jours consécutifs</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">{extendedStats.longestStreak}</p>
          <p className="text-xs text-muted-foreground">Record de jours</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">{extendedStats.averagePerDay}</p>
          <p className="text-xs text-muted-foreground">Moyenne/jour</p>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Jours actifs</span>
          <span className="font-medium">{extendedStats.activeDays} / {extendedStats.totalDays}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Jour le plus productif</span>
          <span className="font-medium">
            {new Date(extendedStats.mostProductiveDay.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short"
            })} ({extendedStats.mostProductiveDay.count} contributions)
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Mois le plus productif</span>
          <span className="font-medium">
            {extendedStats.mostProductiveMonth.month ? 
              `${months[parseInt(extendedStats.mostProductiveMonth.month.split('-')[1]) - 1]} (${extendedStats.mostProductiveMonth.count} contributions)` 
              : 'N/A'}
          </span>
        </div>
      </div>

      {/* Calendrier de contributions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Activité sur les 12 derniers mois
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Moins</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor: level === 0 ? "var(--muted)" : `hsl(var(--primary) / ${0.2 + level * 0.2})`,
                  }}
                />
              ))}
            </div>
            <span>Plus</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1 w-full">
            {stats.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.contributionDays.map((day) => {
                  const date = new Date(day.date)
                  const isToday = date.toDateString() === new Date().toDateString()
                  
                  return (
                    <div
                      key={day.date}
                      className="group relative h-3 w-3 rounded-sm transition-all hover:ring-2 hover:ring-primary/50 cursor-pointer"
                      style={{
                        backgroundColor:
                          day.level === 0 ? "var(--muted)" : `hsl(var(--primary) / ${0.2 + day.level * 0.2})`,
                      }}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {isToday && (
                        <div className="absolute -inset-0.5 rounded-sm border-2 border-primary animate-pulse" />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip pour le jour survolé */}
        {hoveredDay && (
          <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
            <p className="text-sm font-medium">
              {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(hoveredDay.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}