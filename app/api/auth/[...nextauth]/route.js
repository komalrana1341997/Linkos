import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db("linkify");

        const existingUser = await db
          .collection("accounts")
          .findOne({ email: user.email });

        if (!existingUser) {
          await db.collection("accounts").insertOne({
            name: user.name,
            email: user.email,
            image: user.image || "",
            password: null,
            provider: "google",

            // ✅ ADD THESE
            plan: "free",
            handle: "", // will be set later on create page

            createdAt: new Date(),
          });
        }

        return true;
      } catch (error) {
        console.log("SIGNIN ERROR:", error); // 👈 add this
        return false;
      }
    },

    async redirect({ baseUrl, url }) {
      return baseUrl + "/create";
    }
  },
});

export { handler as GET, handler as POST };