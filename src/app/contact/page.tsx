import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE_CONFIG } from "@/lib/constants"
import { Mail, Github, Linkedin } from "lucide-react"
import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact - " + SITE_CONFIG.name,
  description: "Contactez-moi pour discuter de vos projets ou opportunités de collaboration.",
}

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24 mx-auto">
      {/* Hero Section */}
      <section className="mb-16 space-y-6 text-center md:mb-24">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">Contactez-moi</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
          Une question, un projet ou une opportunité ? Je serais ravi d'échanger avec vous. N'hésitez pas à me contacter
          via le formulaire ci-dessous ou directement par email.
        </p>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-moi un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire et je vous répondrai dans les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
              <CardDescription>Retrouvez-moi également sur ces plateformes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="flex items-center gap-3 rounded-lg border border-border/40 p-4 transition-colors hover:bg-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium">Email</p>
                  <p className="truncate text-sm text-muted-foreground">{SITE_CONFIG.social.email}</p>
                </div>
              </a>

              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border/40 p-4 transition-colors hover:bg-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="truncate text-sm text-muted-foreground">@{SITE_CONFIG.author.github}</p>
                </div>
              </a>

              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border/40 p-4 transition-colors hover:bg-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="truncate text-sm text-muted-foreground">{SITE_CONFIG.author.linkedin}</p>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temps de réponse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Je m'efforce de répondre à tous les messages dans un délai de 24 à 48 heures. Pour les demandes
                urgentes, n'hésitez pas à me contacter directement par email.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
