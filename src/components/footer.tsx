import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 md:py-12 mx-auto">
        <div className="flex w-full justify-between items-center">
          {/* About */}
          {/*<div className="space-y-3">
            <h3 className="text-lg font-semibold">À propos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{SITE_CONFIG.description}</p>
          </div>*/}

          {/* Navigation */}
          {/*<div className="space-y-3">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground transition-colors hover:text-foreground">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>*/}

          {/* Legal */}
          {/*<div className="space-y-3">
            <h3 className="text-lg font-semibold">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-muted-foreground transition-colors hover:text-foreground">
                  Politique des cookies
                </Link>
              </li>
            </ul>
          </div>*/}
          <p>
            © {currentYear} {SITE_CONFIG.author.name}. Tous droits réservés.
          </p>
          
          {/* Social */}
          <div className="space-y-3">
            {/*<h3 className="text-lg font-semibold">Suivez-moi</h3>*/}
            <div className="flex gap-3">
              <Link
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>

        {/*<div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {SITE_CONFIG.author.name}. Tous droits réservés.
          </p>
        </div>*/}
      </div>
    </footer>
  )
}
