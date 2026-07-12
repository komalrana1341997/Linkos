import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const handle = searchParams.get("handle");

        const client = await clientPromise;
        const db = client.db("linkify");

        const analytics = await db
            .collection("analytics")
            .find({ handle })
            .toArray();

        return NextResponse.json({ analytics });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error fetching analytics" });
    }
}