export default function LearnPage() {

    const articles = [
  {
    title: "How to Grow Your Instagram Using Link-in-Bio",
    desc: "Learn how to turn your bio link into a growth machine.",
    category: "Growth",
  },
  {
    title: "Best Bio Link Ideas for Creators",
    desc: "Creative ways to use your link page effectively.",
    category: "Tips",
  },
  {
    title: "How to Make Money from Your Bio Link",
    desc: "Start earning using your link-in-bio page.",
    category: "Monetization",
  },
];

  return (
   <section className="py-20 text-center bg-gradient-to-b from-gray-50 to-white">
  <h1 className="text-5xl font-bold">Learn & Grow 🚀</h1>
  <p className="mt-4 text-gray-600 text-lg">
    Master your link-in-bio and grow faster
  </p>

  <div className="mt-8 max-w-lg mx-auto">
    <input
      type="text"
      placeholder="Search guides, tips..."
      className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-black outline-none"
    />
  </div>

  <div className="flex justify-center gap-4 mt-10 flex-wrap">
  {["All", "Growth", "Instagram", "Monetization", "Design"].map((cat) => (
    <button
      key={cat}
      className="px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
    >
      {cat}
    </button>
  ))}
</div>

<div className="max-w-6xl mx-auto mt-16 px-6">
  <div className="p-10 rounded-3xl bg-black text-white flex flex-col md:flex-row gap-6">

    <div className="flex-1">
      <span className="text-sm text-gray-400">🔥 Featured</span>
      <h2 className="text-3xl font-bold mt-2">
        How to Turn Your Bio Link into a Money Machine 💰
      </h2>
      <p className="mt-4 text-gray-300">
        Learn how top creators convert clicks into income using smart link strategies.
      </p>

      <button className="mt-6 bg-white text-black px-6 py-3 rounded-full">
        Read Article →
      </button>
    </div>

    <div className="flex-1 bg-gray-800 rounded-xl" />
  </div>
</div>

<div className="max-w-6xl mx-auto mt-20 px-6">
  <h3 className="text-2xl font-semibold mb-6">🔥 Trending</h3>

  <div className="grid md:grid-cols-3 gap-6">
    {["Best Bio Ideas", "Grow on Instagram", "Earn from Links"].map((t, i) => (
      <div key={i} className="p-5 border rounded-xl hover:shadow-md cursor-pointer">
        <p className="text-sm text-gray-500">Guide</p>
        <h4 className="font-semibold mt-2">{t}</h4>
      </div>
    ))}
  </div>
</div>

<div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">

  {articles.map((item, i) => (
    <div
      key={i}
      className="p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2 bg-white"
    >
      <div className="h-40 bg-gray-100 rounded-xl mb-4" />

      <span className="text-sm text-gray-500">{item.category}</span>

      <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>

      <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
    </div>
  ))}

</div>

<section className="mt-24 py-20 text-center bg-black text-white">
  <h2 className="text-4xl font-bold">Start building your link page 🚀</h2>
  <p className="mt-4 text-gray-300">Grow faster with Linkora</p>

  <button className="mt-8 bg-white text-black px-8 py-3 rounded-full">
    Get Started Free
  </button>
</section>
</section>


  );
}