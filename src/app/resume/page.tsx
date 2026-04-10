import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  GraduationCap,
  Globe,
  Wrench,
  Calendar,
  MapPin,
  Download,
} from "lucide-react"
import type { Metadata } from "next"
import { RESUME_DATA } from "@/lib/resume-data"
import { SITE_CONFIG } from "@/lib/constants"
import { ResumeDownloadButton } from "@/components/resume-download-button"

export const metadata: Metadata = {
  title: "CV - " + SITE_CONFIG.name,
  description:
    "Parcours professionnel, formation et compétences de " + SITE_CONFIG.name,
}

export default function ResumePage() {
  const { experiences, education, languages, skills } = RESUME_DATA

  return (
    <div className="container py-12 md:py-24 mx-auto">
      {/* Header */}
      <section className="mb-16 space-y-6 md:mb-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Mon parcours
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed md:text-xl">
              {RESUME_DATA.personalInfo.bio}
            </p>
          </div>
          <ResumeDownloadButton />
        </div>
      </section>

      {/* Expériences */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center gap-3">
          <Briefcase className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Expériences professionnelles</h2>
        </div>

        <div className="relative space-y-0">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-[23px]" />

          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12 pb-12 last:pb-0 md:pl-16">
              {/* Timeline dot */}
              <div className="absolute left-2.5 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-3.5 md:h-5 md:w-5" />

              <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <p className="mt-1 font-semibold text-primary">{exp.company}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Formation</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                <p className="font-semibold text-primary">{edu.school}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {edu.location}
                  </span>
                </div>
              </CardHeader>
              {edu.description && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center gap-3">
          <Wrench className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Compétences</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <Card key={category.name} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Langues */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center gap-3">
          <Globe className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Langues</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {languages.map((lang) => (
            <Card key={lang.name} className="text-center transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <span className="text-4xl">{lang.flag}</span>
                <p className="mt-3 text-lg font-semibold">{lang.name}</p>
                <p className="text-sm text-muted-foreground">{lang.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-lg border border-border/40 bg-muted/50 p-8 text-center md:p-12">
        <Download className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          Télécharger mon CV
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground text-pretty">
          Obtenez une version PDF complète de mon CV, générée automatiquement avec les
          informations les plus à jour.
        </p>
        <ResumeDownloadButton />
      </section>
    </div>
  )
}
