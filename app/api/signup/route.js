import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return Response.json({ success: false, message: "Missing fields" })
    }

    const client = await clientPromise
    const db = client.db("linkify")

    // 🔍 Check if user exists
    const existingUser = await db
      .collection("accounts")
      .findOne({ email })

    if (existingUser) {
      return Response.json({
        success: false,
        message: "User already exists",
      })
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 💾 Save user
   await db.collection("accounts").insertOne({
  name,
  email,
  password: hashedPassword,

  // ✅ ADD THESE
  handle: "",        // user will set later
  plan: "free",      // default plan

  createdAt: new Date(),
})

    return Response.json({ success: true })

  } catch (error) {
    return Response.json({ success: false, message: error.message })
  }
}