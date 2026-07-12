const LinkCard = ({ name, username, links, gradient }) => {
  return (
    <div
      className="w-64 rounded-2xl p-4 shadow-xl backdrop-blur-lg border border-white/20"
      style={{ background: gradient }}
    >
      {/* Profile */}
      <div className="flex flex-col items-center text-center mb-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-16 h-16 rounded-full border-2 border-white shadow-md"
        />
        <h3 className="text-white font-semibold mt-2">{name}</h3>
        <p className="text-white/70 text-sm">@{username}</p>
      </div>

      {/* Links */}
      <div className="space-y-2">
        {links.map((link, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm transition"
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LinkCard;