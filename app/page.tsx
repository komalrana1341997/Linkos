"use client"
import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import LinkCard from "@/components/LinkCard";
import { useSession, signOut } from "next-auth/react";




const home = () => {

  const router = useRouter()
  const { data: session, status } = useSession();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/create"); // ✅ direct redirect
    }
  }, []);

  return (
    <main>
      <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 overflow-hidden min-h-screen">

        <Navbar />

        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-screen">

          {/* TEXT */}
          <div className="z-10">
            <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm inline-block mb-6">
              ✨ Your Personal Link Hub
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              One Link. <br />
              All Your Content. <br />
              <span className="text-yellow-300">In One Place.</span>
            </h1>

            <p className="text-white/90 mt-6 max-w-xl mx-auto">
              Create your beautiful link-in-bio page and share everything
              with a single link.
            </p>

            <button
              onClick={() => {
                if (session) {
                  if (session?.user?.name) {
                    const username = session.user.name
                      .toLowerCase()
                      .replace(/\s+/g, "");

                    router.push(`/studio/${username}`);
                  }
                } else {
                  router.push("/signup");
                }
              }}
              className="mt-8 bg-white cursor-pointer text-green-600 px-8 py-3 rounded-full font-semibold shadow-lg">
              Sign up Free 🚀
            </button>

  
          </div>

          <div className="w-full flex justify-center items-end mt-24 relative">

            {/* WAVE BACKGROUND */}
            <div className="absolute bottom-0 w-[120%] h-[160px] bg-white rounded-t-[100%]" />

            {/* CARDS */}
            <div className="relative flex items-end justify-center w-[500px] h-[300px]">


              {/* LEFT */}
              <div className="card left-card relative w-44 h-64 rounded-2xl overflow-hidden shadow-xl">

                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* LIGHT OVERLAY (IMPORTANT FIX) */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="relative z-10 p-4 text-white">

                  <div className="flex flex-col items-center mb-3">
                    <img
                      src="https://i.pravatar.cc/80?img=12"
                      className="w-12 h-12 rounded-full border-2 border-white shadow"
                    />
                    <p className="text-sm mt-1 font-semibold">Jenny</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-md">📸 Instagram</p>
                    <p className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-md">🎥 YouTube</p>
                    <p className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-md">💼 Portfolio</p>
                  </div>

                </div>
              </div>

              {/* CENTER */}
              {/* CENTER */}
              <div className="card center-card relative w-52 h-72 rounded-2xl overflow-hidden shadow-2xl scale-110 z-10">

                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* VERY LIGHT OVERLAY */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Content */}
                <div className="relative z-10 p-5 text-white">

                  <div className="flex flex-col items-center mb-3">
                    <img
                      src="https://i.pravatar.cc/80?img=5"
                      className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
                    />
                    <p className="font-semibold mt-2 text-lg">Olivia</p>
                    <p className="text-xs opacity-90">@olivia</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-md">🎥 YouTube</p>
                    <p className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-md">📸 Instagram</p>
                    <p className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-md">💼 LinkedIn</p>
                  </div>

                </div>
              </div>


              {/* RIGHT */}
              <div className="card right-card relative w-44 h-64 rounded-2xl overflow-hidden shadow-xl">

                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* LIGHT OVERLAY */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="relative z-10 p-4 text-white">

                  <div className="flex flex-col items-center mb-3">
                    <img
                      src="https://i.pravatar.cc/80?img=8"
                      className="w-12 h-12 rounded-full border-2 border-white shadow"
                    />
                    <p className="text-sm mt-1 font-semibold">Ryan</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-md">🛒 Store</p>
                    <p className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-md">🎵 Spotify</p>
                    <p className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-md">📩 Contact</p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </section>
      </div>

      <section className="py-20 px-6 text-center bg-gray-50">

        <h2 className="text-3xl md:text-4xl font-bold">
          Everything You Need in One Link 🔗
        </h2>

        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          Share your social media, portfolio, store, and more — all from one simple, beautiful page.
        </p>

        {/* FEATURES */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-2xl">🎯</p>
            <h3 className="font-semibold mt-2">All-in-One Link</h3>
            <p className="text-sm text-gray-500 mt-1">Combine all your links in one place</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-2xl">⚡</p>
            <h3 className="font-semibold mt-2">Fast & Simple</h3>
            <p className="text-sm text-gray-500 mt-1">Create your page in seconds</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-2xl">🎨</p>
            <h3 className="font-semibold mt-2">Beautiful Design</h3>
            <p className="text-sm text-gray-500 mt-1">Clean and modern UI</p>
          </div>

        </div>

      </section>

      <section className="py-24 px-6 bg-white text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold">
          Powerful Features to Grow Your Presence ⚡
        </h2>

        <p className="mt-4 text-gray-600 text-lg">
          Simple tools to help you share, grow, and monetize your links.
        </p>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

          {/* Card 1 */}
          <div className="p-6 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <div className="text-3xl">🔗</div>
            <h3 className="mt-4 text-xl font-semibold">More Links</h3>
            <p className="mt-2 text-gray-600">
              Add up to 20 links.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <div className="text-3xl">💰</div>
            <h3 className="mt-4 text-xl font-semibold">Affordable Pricing</h3>
            <p className="mt-2 text-gray-600">
              Only ₹199/month — powerful features at a lower cost.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <div className="text-3xl">🎨</div>
            <h3 className="mt-4 text-xl font-semibold">Custom Design</h3>
            <p className="mt-2 text-gray-600">
              Personalize your page with themes, colors, and styles.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <div className="text-3xl">⚡</div>
            <h3 className="mt-4 text-xl font-semibold">Lightning Fast</h3>
            <p className="mt-2 text-gray-600">
              Optimized for speed so your audience never waits.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <div className="text-3xl">📊</div>
            <h3 className="mt-4 text-xl font-semibold">Analytics</h3>
            <p className="mt-2 text-gray-600">
              Track clicks and understand your audience better.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <div className="text-3xl">🚀</div>
            <h3 className="mt-4 text-xl font-semibold">Easy Setup</h3>
            <p className="mt-2 text-gray-600">
              Create your page and go live in under 2 minutes.
            </p>
          </div>

        </div>

      </section>

      <section className="py-24 px-6 bg-gray-50 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold">
          Choose Your Perfect Style 🎨
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Beautiful, ready-to-use templates designed to match your personality
        </p>

        {/* Templates Grid */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

          {/* TEMPLATE 1 - Light */}
          <div className="p-4 bg-white rounded-3xl shadow-xl hover:scale-105 transition">
            <div className="bg-gray-100 rounded-2xl p-4 text-center">
              <img src="https://i.pravatar.cc/80?img=12" className="w-16 h-16 rounded-full mx-auto" />
              <h3 className="mt-2 font-semibold">@creator</h3>
              <div className="mt-4 space-y-2">
                <div className="bg-black text-white py-2 rounded-full text-sm">My Website</div>
                <div className="bg-gray-200 py-2 rounded-full text-sm">Instagram</div>
                <div className="bg-gray-200 py-2 rounded-full text-sm">YouTube</div>
              </div>
            </div>
          </div>

          {/* TEMPLATE 2 - Dark */}
          <div className="p-4 bg-black rounded-3xl shadow-xl text-white hover:scale-105 transition">
            <div className="bg-gray-900 rounded-2xl p-4 text-center">
              <img src="https://i.pravatar.cc/80?img=22" className="w-16 h-16 rounded-full mx-auto" />
              <h3 className="mt-2 font-semibold">@artist</h3>
              <div className="mt-4 space-y-2">
                <div className="bg-white text-black py-2 rounded-full text-sm">Portfolio</div>
                <div className="bg-gray-700 py-2 rounded-full text-sm">Shop</div>
                <div className="bg-gray-700 py-2 rounded-full text-sm">Contact</div>
              </div>
            </div>
          </div>

          {/* TEMPLATE 3 - Colorful */}
          <div className="p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl shadow-xl text-white hover:scale-105 transition">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
              <img src="https://i.pravatar.cc/80?img=32" className="w-16 h-16 rounded-full mx-auto border-2 border-white" />
              <h3 className="mt-2 font-semibold">@influencer</h3>
              <div className="mt-4 space-y-2">
                <div className="bg-white text-black py-2 rounded-full text-sm">TikTok</div>
                <div className="bg-white text-black py-2 rounded-full text-sm">Reels</div>
                <div className="bg-white text-black py-2 rounded-full text-sm">Collab</div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <button className="mt-12 bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition">
          Explore All Templates
        </button>

      </section>

      <section className="py-24 px-6 bg-gray-50 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold">
          Simple, Transparent Pricing 💰
        </h2>

        <p className="mt-4 text-gray-600 text-lg">
          Start free. Upgrade when you’re ready to grow.
        </p>

        {/* Cards */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">

          {/* FREE PLAN */}
          <div className="bg-white p-8 rounded-3xl shadow-md border hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold">Free</h3>
            <p className="mt-2 text-gray-500">Perfect for getting started</p>

            <p className="mt-6 text-5xl font-bold">₹0</p>

            <ul className="mt-8 space-y-4 text-gray-600 text-left">
              <li>✅ Up to 20 Links</li>
              <li>✅ Basic Themes</li>
              <li>✅ Mobile Optimized</li>
              <li>✅ Includes Linkora branding</li>
              <li>❌ No Analytics</li>

            </ul>

            <button className="mt-10 w-full border border-black py-3 rounded-full font-medium hover:bg-black hover:text-white transition">
              Start for Free
            </button>
          </div>


          {/* PRO PLAN */}
          <div className="relative bg-white p-10 rounded-3xl shadow-2xl border-2 border-green-500 scale-105">

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-green-100 blur-2xl opacity-30"></div>

            {/* Badge */}
            <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
              MOST POPULAR 🔥
            </span>

            <div className="relative">
              <h3 className="text-2xl font-semibold">Pro</h3>
              <p className="mt-2 text-gray-500">For creators who want more</p>

              <p className="mt-6 text-5xl font-bold">
                ₹199<span className="text-lg font-medium">/month</span>
              </p>

              <ul className="mt-8 space-y-4 text-gray-700 text-left">
                <li>✅ Unlimited Links</li>
                <li>✅ Premium Themes</li>
                <li>✅ Analytics Dashboard</li>
                <li>✅ Custom Branding</li>
                <li>✅ Remove Watermark</li>
                <li>⚡ Priority Support</li>
              </ul>

              <button className="mt-10 w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition shadow-lg">
                Upgrade to Pro 🚀
              </button>
            </div>
          </div>

        </div>

        {/* Trust Line */}
        <p className="mt-10 text-sm text-gray-500">
          No credit card required • Cancel anytime
        </p>

      </section>


      <section className="py-24 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center px-6">

        <div className="max-w-3xl mx-auto">

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Audience Is Waiting. <br /> Don’t Lose Them 🚀
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-lg text-green-100">
            Build your link page in minutes. Share everything. Grow faster.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition">
              Create Your Page Free
            </button>

            <button className="border border-white px-8 py-4 rounded-full text-lg hover:bg-white hover:text-black transition">
              View Templates
            </button>

          </div>

          {/* Trust Line */}
          <p className="mt-6 text-sm text-green-200">
            ⚡ No credit card required • Start in 30 seconds
          </p>

        </div>

      </section>


    </main>
  )
}

export default home
