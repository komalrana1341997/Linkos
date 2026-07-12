"use client";

export default function CopyButton({ url }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        alert("Link copied 🚀");
      }}
      className="mt-3 px-4 py-2 bg-gray-400 cursor-pointer  text-black font-medium rounded"
    >
      Copy Link
    </button>
  );
}