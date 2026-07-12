import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle");
    const index = parseInt(searchParams.get("index"));

    if (!handle || index === undefined) {
      return new Response("Missing data", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("linkify");

    const user = await db.collection("links").findOne({ handle });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const link = user.links[index];


    // ✅ increment clicks
    await db.collection("links").updateOne(
      { handle },
      {
        $inc: {
          [`links.${index}.clicks`]: 1,
        },
      }
    );

    // ✅ NEW: store analytics event
    // await db.collection("analytics").insertOne({
    //   handle,
    //   linkTitle: user.links[index].title,
    //   timestamp: new Date(),
    // });
    // ✅ 3. redirect
    return Response.redirect(link.url, 302);

  } catch (error) {
    console.error("Click API Error:", error);
    return new Response("Server error", { status: 500 });
  }
}