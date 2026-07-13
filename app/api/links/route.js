import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("linkify");

    const cleanHandle = body.handle
      .toLowerCase()
      .replace(/\s+/g, "")
      .trim();

    // 🚨 HANDLE REQUIRED
    if (!cleanHandle) {
      return Response.json({
        success: false,
        message: "Handle is required",
      });
    }

    // 🚨 CHECK IF HANDLE EXISTS
    const existing = await db
      .collection("links")
      .findOne({ handle: cleanHandle });

    if (existing) {
      return Response.json({
        success: false,
        message: "Handle already taken",
      });
    }

    // ✅ CREATE NEW LINK PAGE
    await db.collection("links").insertOne({
      handle: cleanHandle,
      image: body.image || "",
      desc: body.desc || "",
      links: body.links || [],
      theme: body.theme || "light",
      customColor: body.customColor || "",
      bgImage: body.bgImage || "",
      createdAt: new Date(),
    });

    // ✅ 🔥 UPDATE USER HANDLE (VERY IMPORTANT)
    await db.collection("accounts").updateOne(
      { email: body.email }, // must send email from frontend
      {
        $set: {
          handle: cleanHandle,
        },
      }
    );

    return Response.json({
      success: true,
      message: "Created successfully",
    });

  } catch (error) {
    console.log("POST ERROR:", error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("linkify");

    const cleanHandle = body.handle
      .toLowerCase()
      .replace(/\s+/g, "")
      .trim();

    // 🚨 LIMIT CHECK
    const plan = body.plan || "free";
    if (plan === "free" && body.links.length > 20) {
      return Response.json(
        {
          success: false,
          message: "Upgrade to Pro 🚀 to add more links",
        },
        { status: 403 }
      );
    }

    // ✅ UPDATE EXISTING
    const result = await db.collection("links").updateOne(
      { handle: cleanHandle },
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
    console.log("PUT ERROR:", error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}