import clientPromise from "@/lib/mongodb";

export async function PUT(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("linkify");

    // 1. Get user plan (for now assume from body)
    const plan = body.plan || "free";

    // 2. 🚨 LIMIT CHECK
    if (plan === "free" && body.links.length > 20) {
      return Response.json({
        success: false,
       message: "Upgrade to Pro 🚀 to add more links",
      }, { status: 403 });
    }

    // 3. Update
    const result = await db.collection("links").updateOne(
      { handle: body.handle },
      {
        $set: {
          image: body.image,
          desc: body.desc,
          links: body.links,
          theme: body.theme,
          customColor: body.customColor,
          bgImage: body.bgImage,
          updatedAt: new Date(),
        },
      }
    );

    return Response.json({
      success: true,
      message: "Updated successfully",
      result,
    });

  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}