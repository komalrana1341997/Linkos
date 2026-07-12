"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

export default function StudionPage({ params }) {

  const [qrUrl, setQrUrl] = useState("");
  const { handle } = use(params);

  const cleanHandle = decodeURIComponent(handle)
    .toLowerCase()
    .replaceAll(" ", "");

  useEffect(() => {
    if (cleanHandle) {
      setQrUrl(`${window.location.origin}/${cleanHandle}`);
    }
  }, [cleanHandle]);




  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {


        const res = await fetch(`/api/user/${cleanHandle}`);

        if (!res.ok) {
          const errText = await res.text();
          console.error("API failed:", errText);
          return;
        }

        const text = await res.text();
        console.log("RAW RESPONSE:", text);

        if (!text) {
          console.error("Empty response");
          return;
        }

        const result = JSON.parse(text);
        setData(result);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [handle]);



  const { data: session, status } = useSession();
  const router = useRouter();

  // ⏳ Loading state
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // 🔐 Not logged in
  if (!session) {
    router.push("/login");
    return null;
  }

  // 🧠 Normalize username (IMPORTANT FIX)
  const username = session?.user?.name
    ?.toLowerCase()
    .replace(/\s+/g, ""); // removes spaces

  // 🚫 Authorization check
  //   if (username !== handle) {
  //     return (
  //       <div className="text-center mt-10 text-red-500">
  //         Not authorized
  //       </div>
  //     );
  //   }

  const totalClicks =
    data?.links?.reduce((acc, link) => acc + (link.clicks || 0), 0) || 0;

  const totalViews = data?.views || 0;

  const ctr =
    totalViews > 0
      ? ((totalClicks / totalViews) * 100).toFixed(1)
      : 0;

  const topLinks =
    data?.links
      ?.sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 5) || [];

  console.log("HANDLE VALUE:", cleanHandle);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

      {/* 🔝 HEADER */}
      <  div className="flex justify-between items-center mb-8">
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full  flex items-center justify-center text-green-600 font-bold">
              <img src="/Nlogo.jpg" alt="" />
            </div>
            <span className="text-5xl font-bold bg-gradient-to-r from-white to-white/80  tracking-wide cursor-pointer hover:scale-105 transition bg-clip-text text-transparent">
              Link<span className="font-bold text-yellow-300">OS</span>
            </span></div>
        </Link>

        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 cursor-pointer px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* 👋 HERO SECTION */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold">
          Welcome, {session.user.name} 👋
        </h2>

        <p className="text-gray-300 mt-2">
          Manage your digital identity in one place
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-400">@{cleanHandle}</p>
          <p className="text-blue-400">
            linkify.vercel.app/{cleanHandle}
          </p>
        </div>



        <button
          onClick={() => router.push(`/${cleanHandle}`)}
          className="mt-4 cursor-pointer bg-white text-black px-5 py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          🌐 View Live Page
        </button>
      </div>

      {/* ⚡ ACTION BUTTONS */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-5 mb-8">

        <div
          onClick={() => router.push(`/create?handle=${handle}`)}
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-xl hover:scale-105 transition shadow-lg"
        >
          <h3 className="text-lg font-semibold">✏️ Edit Page</h3>
          <p className="text-sm text-gray-200">Update your links</p>
        </div>

        <div
          onClick={() => {
            const link = `${window.location.origin}/${handle}`;
            navigator.clipboard.writeText(link);
            alert("Link copied 🚀");
          }}
          className="cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-500 p-5 rounded-xl hover:scale-105 transition shadow-lg"
        >
          <h3 className="text-lg font-semibold">📋 Copy Link</h3>
          <p className="text-sm text-gray-200">Share your page instantly</p>
        </div>

        <div
          onClick={() => router.push(`/dashboard/${cleanHandle}`)}
          className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-600 p-5 rounded-xl hover:scale-105 transition shadow-lg"
        >
          <h3 className="text-lg font-semibold">📊 Analytics</h3>
          <p className="text-sm text-gray-200">Track performance</p>
        </div>

        <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-5 rounded-xl opacity-70 cursor-not-allowed">
          <h3 className="text-lg font-semibold">⚙️ Settings</h3>
          <p className="text-sm text-gray-300">Coming soon</p>
        </div>

      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 mt-2 mb-3 rounded-xl shadow-lg flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-2">📱 QR Code</h3>

        <div className="bg-white p-2 rounded-lg">
          {qrUrl && (
            <QRCodeCanvas
              value={qrUrl}
              size={90}
            />
          )}
        </div>

        <p className="text-xs mt-2 text-gray-200 text-center">
          Scan to open your page
        </p>
      </div>

      📊 STATS CARDS
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* 👁 VIEWS */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600">
          <div className="bg-[#0B0F19] rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">TOTAL VIEWS</p>
                <h2 className="text-3xl font-bold mt-2 text-white">
                  {totalViews}
                </h2>
              </div>

              <div className="bg-purple-500/20 p-3 rounded-xl">
                👁
              </div>
            </div>

            <p className="text-green-400 text-sm mt-4">
              +12.5% vs last period
            </p>
          </div>
        </div>

        {/* 🔗 CLICKS */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
          <div className="bg-[#0B0F19] rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">TOTAL CLICKS</p>
                <h2 className="text-3xl font-bold mt-2 text-white">
                  {totalClicks}
                </h2>
              </div>

              <div className="bg-blue-500/20 p-3 rounded-xl">
                🔗
              </div>
            </div>

            <p className="text-green-400 text-sm mt-4">
              +8.2% vs last period
            </p>
          </div>
        </div>

        {/* 📈 CTR */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">
          <div className="bg-[#0B0F19] rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">CTR</p>
                <h2 className="text-3xl font-bold mt-2 text-white">
                  {ctr}%
                </h2>
              </div>

              <div className="bg-green-500/20 p-3 rounded-xl">
                📈
              </div>
            </div>

            <p className="text-green-400 text-sm mt-4">
              +2.1% vs last period
            </p>
          </div>
        </div>

      </div>

      {/* 📎 LINKS PREVIEW */}
      <div className="bg-[#0B0F19] border border-white/10 p-6 rounded-2xl shadow-lg">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">
            🔗 Your Top Links
          </h3>
        </div>

        <div className="space-y-5">
          {topLinks.length > 0 ? (
            topLinks.map((link, index) => {
              const maxClicks = topLinks[0]?.clicks || 1;
              const width = ((link.clicks || 0) / maxClicks) * 100;

              return (
                <div key={index} className="space-y-2">

                  {/* Title + clicks */}
                  <div className="flex justify-between text-sm text-gray-300">
                    <span className="truncate">{link.title}</span>
                    <span>{link.clicks || 0} clicks</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>

                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No links yet</p>
          )}
        </div>
      </div>

    </div>
  );
}