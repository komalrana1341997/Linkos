"use client";

import { useState } from "react";

export default function LinksList({ links, handle }) {

    const [loadingIndex, setLoadingIndex] = useState(null);

    const handleClick = async (index) => {
        setLoadingIndex(index);

        await fetch("/api/click", {
            method: "POST",
            body: JSON.stringify({ handle, index })
        });

        setLoadingIndex(null);
    };

    return (
        <div className="space-y-3">
            {links.map((link, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition"
                >
                    <span>{link.title}</span>

                    <span className="text-pink-400 font-bold">
                        {loadingIndex === index ? "..." : `${link.clicks || 0}`}
                    </span>
                </div>
            ))}
        </div>
    );
}