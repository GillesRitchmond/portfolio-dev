import { ContactEmail } from "@/components/contact-email";
import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(request: NextRequest) {
  try {
    const contactEmail = process.env.CONTACT_EMAIL;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    console.log("Received form data:", { name, email, subject, message, contactEmail });
    
    if (!contactEmail) {
      return NextResponse.json(
        { error: "CONTACT_EMAIL is not configured" },
        { status: 500 },
      );
    }
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: contactEmail,
      to: "gritchmond@gmail.com",
      subject: subject,
      react: ContactEmail({ name, email, subject, message }),
    });
    
    console.log('Email sent successfully:', data);
    console.log('Error:', error);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message ?? String(err) },
      { status: 500 },
    );
  }
}
