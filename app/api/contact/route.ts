import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

// The recipient is fixed on the server so the form can't be used to send mail elsewhere
const RECIPIENT = process.env.CONTACT_TO ?? "admin@yarndev.co.uk"

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().default(""),
  projectType: z.string().trim().max(100),
  description: z.string().trim().min(1).max(5000),
})

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 })
  }
  const { name, email, company, projectType, description } = parsed.data

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: email,
      subject: `New enquiry: ${projectType} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        `Project type: ${projectType}`,
        "",
        description,
      ].join("\n"),
      html: `
        <h2>New enquiry</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Company:</strong> ${escape(company || "Not provided")}</p>
        <p><strong>Project type:</strong> ${escape(projectType)}</p>
        <p style="white-space:pre-wrap">${escape(description)}</p>
      `,
    })

    return NextResponse.json({ message: "Sent" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
