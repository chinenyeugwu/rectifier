import { NextResponse } from "next/server"
import  prisma  from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { content } = await req.json()

    // Validate the content
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid content provided" }, { status: 400 })
    }

    // Save to database
    const saved = await prisma.text.create({
      data: { content },
    })

    // Return success response
    return NextResponse.json({ success: true, id: saved.id }, { status: 201 })
  } catch (error) {
    console.error("Error saving text:", error)

    // Return error response
    return NextResponse.json({ error: "Failed to save text" }, { status: 500 })
  }
}
