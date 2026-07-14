import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const handler = NextAuth({

  adapter: MongoDBAdapter(clientPromise), // 🔥 THIS FIXES EVERYTHING

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

    callbacks: {
    // ✅ Fix session (IMPORTANT)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    // ✅ Add handle to user
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db("linkify");

        const handle = user.name
          ?.toLowerCase()
          .replace(/\s+/g, "");

        await db.collection("users").updateOne(
          { email: user.email },
          {
            $set: {
              handle: handle,
              plan: "free",
            },
          }
        );

        return true;
      } catch (err) {
        console.log("SIGNIN ERROR:", err);
        return true; // don't block login
      }
    },

    // ✅ Redirect logic
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/create";
    },
  },
});

//   callbacks: {
//    async signIn({ user }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("linkify");

//     const existingUser = await db
//       .collection("accounts")
//       .findOne({ email: user.email });

//     if (!existingUser) {
//       await db.collection("accounts").insertOne({
//         name: user.name,
//         email: user.email,
//         image: user.image || "",
//         password: null,
//         provider: "google",
//         plan: "free",
//         handle: "",
//         createdAt: new Date(),
//       });
//     }

//     return true;
//   } catch (error) {
//     console.log("SIGNIN ERROR:", error);

//     // ✅ IMPORTANT: STILL ALLOW LOGIN
//     return true;
//   }
// },
//     async redirect({ url, baseUrl }) {
//   if (url.startsWith("/")) return `${baseUrl}${url}`;
//   if (new URL(url).origin === baseUrl) return url;
//   return baseUrl + "/create";
// }
//   },


export { handler as GET, handler as POST };