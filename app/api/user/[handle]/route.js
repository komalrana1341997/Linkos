import clientPromise from "@/lib/mongodb";

export async function GET(req, context) {
  try {
    const { handle } = context.params;

    if (!handle) {
      return Response.json({ error: "Handle missing" }, { status: 400 });
    }

    const cleanHandle = handle.toLowerCase().replaceAll(" ", "");

    const client = await clientPromise;
    const db = client.db("linkify");

    // ✅ FETCH FROM PROFILES (NOT users)
    const user = await db.collection("profiles").findOne({
      handle: cleanHandle,
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}