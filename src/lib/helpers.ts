// helpers.ts

/**
 * Retire toutes les enveloppes CDATA.
 */
 function stripCdata(input: string): string {
   return input.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
 }

/**
 * Decode basique des entités HTML (suffisant pour Medium RSS).
 */
function decodeHtml(input: string): string {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Supprime les tags HTML + decode + strip CDATA.
 */
function stripHtml(html: string): string {
  const noCdata = stripCdata(html);
  const textOnly = noCdata.replace(/<[^>]*>/g, "");
  return decodeHtml(textOnly);
}

/**
 * Extrait la première image (Medium met souvent une <img> dans content:encoded).
 */
function extractThumbnail(content: string): string | undefined {
  const c = stripCdata(content);
  const match =
    c.match(/<img[^>]+src="([^">]+)"/i) ||
    c.match(/<img[^>]+data-src="([^">]+)"/i);
  return match ? match[1] : undefined;
}

export { stripCdata, decodeHtml, stripHtml, extractThumbnail };
