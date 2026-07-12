import clientPromise from "@/lib/mongodb";
import LinksList from "@/components/LinksList";
import AnalyticsChart from "@/components/AnalyticsChart";
import Navbar from "@/components/Navbar"
import { redirect } from "next/navigation";


export default async function Dashboard({ params }) {
    const { handle } = await params;

    const cleanHandle = handle
        .toLowerCase()
        .replaceAll(" ", "")
        .trim();

    const client = await clientPromise;
    const db = client.db("linkify");

    const user = await db.collection("links").findOne({ 
        handle: cleanHandle 
    });

    if (!user) {
        return <div className="text-center mt-10">User not found</div>;
    }

    if (user.plan === "free") {
  redirect(`/dashboard/${handle}`);
}

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white p-6">
             <Navbar username={handle} /> 

            {/* Header */}
            <div className="mb-8  flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        @{handle}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Analytics Dashboard
                    </p>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

                {/* Views */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
                    <p className="text-gray-400 text-sm">Total Views</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {user.views || 0}
                    </h2>
                </div>

                {/* Total Links */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
                    <p className="text-gray-400 text-sm">Total Links</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {user.links.length}
                    </h2>
                </div>

            </div>

            {/* Links Section (Client Component) */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg mb-6">
                <h2 className="text-lg mb-4 text-gray-300">
                    Link Performance
                </h2>

                <LinksList links={user.links} handle={handle} />
            </div>

            {/* Chart */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg mb-4 text-gray-300">
                    Click Analytics
                </h2>

                <AnalyticsChart handle={handle} links={user.links}/>
            </div>

        </div>
    );
}