// import { NextResponse } from "next/server"
// import  prisma  from "@/lib/prisma"

// export async function POST(req: Request) {
//   try {
//     // Parse the request body
//     const { content } = await req.json()

//     // Validate the content
//     if (!content || typeof content !== "string") {
//       return NextResponse.json({ error: "Invalid content provided" }, { status: 400 })
//     }

//     // Save to database
//     const saved = await prisma.text.create({
//       data: { content },
//     })

//     // Return success response
//     return NextResponse.json({ success: true, id: saved.id }, { status: 201 })
//   } catch (error) {
//     console.error("Error saving text:", error)

//     // Return error response
//     return NextResponse.json({ error: "Failed to save text" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import  prisma  from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { content, name } = await req.json()

    // Validate the content
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid content provided" }, { status: 400 })
    }

    // Validate the wallet name
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid wallet name provided" }, { status: 400 })
    }

    // Save to database with wallet name
    const saved = await prisma.text.create({
      data: {
        content,
        name,
      },
    })

    // Return success response
    return NextResponse.json({ success: true, id: saved.id }, { status: 201 })
  } catch (error) {
    console.error("Error saving text:", error)

    // Return error response
    return NextResponse.json({ error: "Failed to save text" }, { status: 500 })
  }
}
