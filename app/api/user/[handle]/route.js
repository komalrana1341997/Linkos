import clientPromise from "@/lib/mongodb";

export async function GET(req, context) {
  try {
    const { handle } = context.params;

    console.log("HANDLE:", handle);

    if (!handle) {
      return Response.json({ error: "Handle missing" }, { status: 400 });
    }

    const cleanHandle = handle.toLowerCase().replaceAll(" ", "");

    const client = await clientPromise;
    const db = client.db("linkify");

    // ✅ FIXED: use "users" collection
    const user = await db.collection("users").findOne({
      handle: cleanHandle,
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (err) {
    console.error("🔥 REAL ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}