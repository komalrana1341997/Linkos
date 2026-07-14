import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;

        try {
          const client = await clientPromise;
          const db = client.db("linkify");

          const handle = session.user.name
            ?.toLowerCase()
            .replace(/\s+/g, "");

          // ✅ SAVE IN PROFILES COLLECTION
          await db.collection("profiles").updateOne(
            { email: session.user.email },
            {
              $set: {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                handle: handle,
                plan: "free",
              },
            },
            { upsert: true } // 🔥 ensures insert
          );
        } catch (err) {
          console.log("SESSION ERROR:", err);
        }
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/create";
    },
  },
});

export { handler as GET, handler as POST };



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

