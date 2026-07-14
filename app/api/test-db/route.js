import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";
console.log("API HIT");

export async function GET() {
  try {
    await connectDB();

    console.log("DB NAME:", mongoose.connection.name);

    await mongoose.connection.db.collection("test").insertOne({
      name: "komal",
      time: new Date(),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message });
  }
}