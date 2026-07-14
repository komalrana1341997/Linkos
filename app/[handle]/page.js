import CopyButton from "@/components/CopyButton";
import clientPromise from "@/lib/mongodb";
import { templates } from "@/lib/templates";
import Link from "next/link";



export default async function Page({ params }) {


    try {
        // ✅ Get handle safely
       const { handle } = await params;

        if (!handle) {
            return <div className="text-center mt-10">Invalid URL</div>;
        }


        const cleanHandle = handle
            .toLowerCase()
            .replaceAll(" ", "")
            .trim();

       console.log("Searching for:", cleanHandle);


        // ✅ Connect DB
        const client = await clientPromise;
        const db = client.db("linkify");

        // ✅ Find user
        const userData = await db.collection("links").findOne({ handle: cleanHandle });
console.log("User found:", userData);


        if (!userData) {
            return <div className="text-center mt-10">User not found</div>;
        }

       const theme = templates[userData?.theme] || templates.default;

        // ✅ STEP 2: Increase profile views
        await db.collection("links").updateOne(
            { handle: cleanHandle },
            {
                $inc: { views: 1 },

            }
        );

        return (
            <div
                className="min-h-screen flex flex-col items-center justify-start mt-8"
                style={{
                    backgroundImage: userData.bgImage
                        ? `url(${userData.bgImage})`
                        : undefined,

                    background: userData.bgImage
                        ? undefined
                        : userData.customColor || "#ffffff",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="relative mt-3 z-10 flex flex-col items-center w-full">
                    <div className="relative backdrop-blur-xl bg-black/60 border border-white/20 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
                     


                        {/* Profile Image */}
                        <img
                            src={userData.image && userData.image.startsWith("http")
                                ? userData.image
                                : "https://i.pravatar.cc/150"}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-white shadow-lg"
                        />


                        {/* ✅ Handle */}
                        <h1 className="text-2xl font-bold mt-3 text-white drop-shadow-md">
                            @{userData.handle}
                        </h1>

                        {/* Description */}
                        <div className="max-w-md text-center text-sm font-medium text-white">
                            {userData.desc || "No description added"}
                        </div>

                        {/* <CopyButton url={`https://yourdomain.com/${handle}`} /> */}

                        {/* ✅ Links */}
                        <div className="mt-5 flex flex-col gap-3 w-80">
                            {Array.isArray(userData.links) &&
                                userData.links.map((item, index) => (
                                    <div key={index}>
                                        <a
                                          href={`/api/click?handle=${cleanHandle}&index=${index}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`block p-3 rounded-lg  text-center font-semibold transition transform hover:scale-105 bg-gray-300 ${theme.button}`}
                                        >
                                            {item.title}
                                        </a>

                                       
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.log(error);
        return <div>Error loading page</div>;
    }
}