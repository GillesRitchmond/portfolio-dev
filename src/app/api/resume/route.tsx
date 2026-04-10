import { renderToBuffer } from "@react-pdf/renderer"
import { ResumePDF } from "./resume-pdf"

export async function GET() {
  const buffer = await renderToBuffer(<ResumePDF />)
  const uint8 = new Uint8Array(buffer)

  return new Response(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ritchmond_Gilles_CV.pdf"',
    },
  })
}
