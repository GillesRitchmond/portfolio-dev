// medium.ts
import type { MediumArticle, RSSFeed, RSSItem } from "./types"
import { SITE_CONFIG } from "./constants"
import { stripCdata, stripHtml, extractThumbnail, decodeHtml } from "./helpers"

/**
 * Parser RSS maison (regex) + décapsulage CDATA.
 */
async function parseXML(xmlString: string): Promise<RSSFeed> {
  const items: RSSItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g

  for (const match of xmlString.matchAll(itemRegex)) {
    const itemXml = match[1]

    const getTagContent = (tag: string): string => {
      const regex = new RegExp(`<${tag}(?:[^>]*)>([\\s\\S]*?)<\\/${tag}>`, "i")
      const m = itemXml.match(regex)
      return m ? stripCdata(m[1].trim()) : ""
    }

    const getAllTagContent = (tag: string): string[] => {
      const regex = new RegExp(`<${tag}(?:[^>]*)>([\\s\\S]*?)<\\/${tag}>`, "gi")
      return Array.from(itemXml.matchAll(regex), (m) => stripCdata(m[1].trim()))
    }

    const getThumbnail = (): string | undefined => {
      const m = itemXml.match(/<media:thumbnail[^>]*url="([^"]+)"/i)
      return m ? m[1] : undefined
    }

    items.push({
      title: [getTagContent("title")],
      link: [getTagContent("link")],
      pubDate: [getTagContent("pubDate")],
      "dc:creator": [getTagContent("dc:creator")],
      guid: [getTagContent("guid")],
      description: [getTagContent("description")],
      "content:encoded": [getTagContent("content:encoded")],
      category: getAllTagContent("category"),
      thumbnail: getThumbnail() ? [{ $: { url: getThumbnail()! } }] : undefined,
    })
  }

  return { rss: { channel: [{ item: items }] } }
}

const MEDIUM_RSS_URL = `https://medium.com/feed/@${SITE_CONFIG.author.medium}`

export async function getMediumArticles(): Promise<MediumArticle[]> {
  try {
    const res = await fetch(MEDIUM_RSS_URL, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Failed to fetch Medium RSS: ${res.statusText}`)

    const xmlText = await res.text()
    const feed = await parseXML(xmlText)
    const items = (feed.rss.channel[0].item ?? []) as RSSItem[]

    return items.map((item: RSSItem) => {
      const rawTitle = item.title[0]
      const title = decodeHtml(rawTitle)            // ✅ plus de <![CDATA[...]]>

      const link = item.link[0]
      const pubDate = item.pubDate[0]
      const author = decodeHtml(item["dc:creator"][0])

      const content = item["content:encoded"][0]    // déjà stripCdata dans parseXML
      const descriptionText = stripHtml(item.description[0])
      const description =
        descriptionText.slice(0, 200) + (descriptionText.length > 200 ? "..." : "")

      const thumbnail =
        item.thumbnail?.[0]?.$?.url || extractThumbnail(content)

      const categories = (item.category || []).map(decodeHtml) // ✅ tags propres

      return {
        title,
        link,
        pubDate,
        author,
        thumbnail,
        description,
        content,
        categories,
        guid: item.guid[0],
      }
    })
  } catch (e) {
    console.error("Error fetching Medium articles:", e)
    return []
  }
}

/**
 * Formatage date FR stable SSR/CSR (OK).
 */
export function formatMediumDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * Lecture estimée (200 wpm).
 */
export function calculateReadingTime(content: string): string {
  const text = stripHtml(content)
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min de lecture`
}
