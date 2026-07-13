"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    FaPlus,
    FaTrash,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLink,
    FaLinkedin,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react";

import {
    DragDropContext,
    Droppable,
    Draggable
} from "@hello-pangea/dnd";


export default function CreatePage() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const editHandle = searchParams.get("handle");


    const username = session?.user?.name; // or handle
    const router = useRouter();
    const [handle, setHandle] = useState("");
    const [image, setImage] = useState(null);
    const [desc, setdesc] = useState("");
    const [links, setLinks] = useState([
        { id: Date.now(), title: "", url: "", active: true }
    ]);
    const [theme, setTheme] = useState("dark");
    const [customColor, setCustomColor] = useState("#000000");
    const [bgImage, setBgImage] = useState(null);
    const [plan, setPlan] = useState("free"); // "free" or "pro"

    const PLAN_LIMITS = {
    free: 20,
    pro: Infinity
};

   useEffect(() => {
  if (editHandle) {
    fetch(`/api/getUser?handle=${editHandle}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setHandle(data.handle || "");
          setdesc(data.desc || "");

          // ✅ FIX LINKS HERE
          const formattedLinks = (data.links || []).map((link, index) => ({
            id: Date.now() + index, // required for React
            title: link.title || "",
            url: link.url || "",
            active: true, // default
            clicks: link.clicks || 0
          }));

          setLinks(formattedLinks);

          setImage(data.image || null);
          setTheme(data.theme || "dark");
          setCustomColor(data.customColor || "#000000");
          setBgImage(data.bgImage || null);
        }
      });
  }
}, [editHandle]);



    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }


    // 🔥 Auto icon logic
    const getIcon = (url) => {
        if (url.includes("youtube")) return <FaYoutube />;
        if (url.includes("instagram")) return <FaInstagram />;
        if (url.includes("twitter") || url.includes("x.com"))
            return <FaTwitter />;
        if (url.includes("linkedin")) return <FaLinkedin />;
        return <FaLink />;
    };

    const themes = {
        light: {
            bg: "bg-white",
            text: "text-black",
            card: "bg-gray-100",
            button: "bg-black text-white"
        },

        dark: {
            bg: "bg-black",
            text: "text-white",
            card: "bg-gray-800",
            button: "bg-white text-black"
        },

        purple: {
            bg: "bg-purple-600",
            text: "text-white",
            card: "bg-purple-500",
            button: "bg-white text-purple-600"
        },

        // 🎨 CUSTOM COLOR (you already use customColor)
        custom: {
            bg: "", // handled via inline style
            text: "text-white",
            card: "bg-white/20 backdrop-blur-md",
            button: "bg-white text-black"
        },

        // 🌈 GRADIENT
        gradient: {
            bg: "", // handled via inline style
            text: "text-white",
            card: "bg-white/20 backdrop-blur-md",
            button: "bg-white text-black"
        },

        // 🖼 IMAGE BACKGROUND
        image: {
            bg: "", // handled via inline style
            text: "text-white",
            card: "bg-white/30 backdrop-blur-md",
            button: "bg-white text-black"
        },

        // 🔥 NEW PREMIUM THEMES

        glass: {
            bg: "bg-white/10 backdrop-blur-xl",
            text: "text-white",
            card: "bg-white/20 backdrop-blur-md border border-white/20",
            button: "bg-white/30 text-white"
        },

        neon: {
            bg: "bg-black",
            text: "text-green-400",
            card: "bg-black border border-green-400 shadow-[0_0_10px_#00ff99]",
            button: "bg-green-400 text-black shadow-[0_0_15px_#00ff99]"
        },

        minimal: {
            bg: "bg-gray-50",
            text: "text-gray-800",
            card: "bg-white border",
            button: "bg-gray-800 text-white"
        }
    };

    const gradients = [
        "linear-gradient(135deg, #667eea, #764ba2)",
        "linear-gradient(135deg, #ff7e5f, #feb47b)",
        "linear-gradient(135deg, #43cea2, #185a9d)",
        "linear-gradient(135deg, #f7971e, #ffd200)",
        "linear-gradient(135deg, #ff4e50, #f9d423)",
    ];

    const presetBackgrounds = [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    ];


   const addLink = () => {
    const limit = PLAN_LIMITS[plan];

    if (links.length >= limit) {
        return alert("Upgrade to Pro for unlimited links 🚀");
    }

    setLinks([...links, { title: "", url: "" }]);
};

    const removeLink = (index) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const updateLink = (index, field, value) => {
        const updated = [...links];
        updated[index][field] = value;
        setLinks(updated);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) setImage(URL.createObjectURL(file));
    };

   const submitLinks = async () => {
    const cleanHandle = handle
        .toLowerCase()
        .replaceAll(" ", "")
        .trim();

    const data = {
        handle: cleanHandle,
        image: image?.startsWith("blob:") ? null : image, // ✅ FIX
        desc,
        links: links.map(link => ({
            ...link,
            clicks: link.clicks || 0
        })),
        theme,
        customColor,
        bgImage,
        views: editHandle ? undefined : 0, // ✅ FIX
    };

    try {
        const res = await fetch("/api/links", {
            method: editHandle ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
     
            if (result.success) {
                const cleanHandle = handle
                    .toLowerCase()
                    .replaceAll(" ", "")
                    .trim();

                // ✅ Create public link
                const link = `${window.location.origin}/${cleanHandle}`;
                setdesc("");

                // ✅ Copy to clipboard
                navigator.clipboard.writeText(link);

                alert("Link copied 🚀 Now share it!");

                // ✅ Redirect to profile page
                router.push(`/${cleanHandle}`);

            } else {
                alert("Error saving");
            }
        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 animate-fadeIn flex flex-col">
            <Navbar username={username} />
            <div className="flex justify-center mt-10 px-4 w-full">

                <div className="w-full max-w-6xl mx-auto flex gap-10 justify-center">

                    {/* LEFT PANEL */}
                    <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-xl">

                        <h1 className="text-2xl font-bold mb-6">
                            Customize your page
                        </h1>

                        {/* PROFILE */}
                        <div className="flex flex-col items-center mb-6">
                            <label className="cursor-pointer group">
                                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center group-hover:scale-105 transition">
                                    {image ? (
                                        <img
                                            src={image}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500 text-sm">
                                            Upload
                                        </span>
                                    )}
                                </div>
                                <input type="file" hidden onChange={handleImage} />
                            </label>

                            <input
                                type="text"
                                placeholder="@username"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                className="mt-3 p-2 border-2 border-green-600  rounded-lg w-full text-center"
                            />

                            <input
                                className="w-full mt-2 border-2 text-center border-green-600 px-4 py-2 rounded-lg"
                                type="text"
                                value={desc}
                                onChange={(e) => setdesc(e.target.value)}
                                placeholder="Description"
                            />
                        </div>

                        <div className="mt-5">
                            <p className="font-semibold">Choose Theme</p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {Object.keys(themes).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`px-3 py-1 rounded-full border text-sm capitalize 
                ${theme === t ? "bg-black text-white" : "bg-gray-200"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* GRADIENT PICKER */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-1 mt-2">Gradients</h3>

                            <div className="flex gap-2 flex-wrap">
                                {gradients.map((g, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setTheme("gradient");
                                            setCustomColor(g);
                                        }}
                                        className="w-10 h-10 rounded-full border"
                                        style={{ background: g }}
                                    />
                                ))}
                            </div>
                        </div>



                        {/* PRESET BACKGROUNDS */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Choose Background</h3>

                            <div className="grid grid-cols-2 gap-3">
                                {presetBackgrounds.map((bg, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setBgImage(bg);
                                            setTheme("image");
                                        }}
                                        className="h-24 rounded-xl cursor-pointer bg-cover bg-center hover:scale-105 transition"
                                        style={{ backgroundImage: `url(${bg})` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* LINKS */}
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

                            {links.map((link, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-4  rounded-xl shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex items-center  gap-2 mb-2">
                                        {getIcon(link.url)}
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={link.title}
                                            onChange={(e) =>
                                                updateLink(index, "title", e.target.value)
                                            }
                                            className="w-full p-2 border-2 border-green-500 rounded-md"
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="https://yourlink.com"
                                        value={link.url}
                                        onChange={(e) =>
                                            updateLink(index, "url", e.target.value)
                                        }
                                        className="w-full p-2 border-2 border-green-500 rounded-md"
                                    />

                                    <button
                                        onClick={() => removeLink(index)}
                                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addLink}
                                className="w-full py-3 bg-green-500 text-black font-semibold rounded-xl flex justify-center items-center gap-2 hover:bg-green-400 cursor-pointer transition"
                            >
                                <FaPlus /> Add Link
                            </button>
                        </div>

                        {/* SAVE */}
                        <button
                            onClick={submitLinks}
                            className={`w-full border-2 cursor-pointer border-green-300 mt-6 py-3 rounded-xl 
hover:opacity-90 transition font-semibold 
${themes[theme].button}`}
                        >
                            Save & Publish 🚀
                        </button>
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="hidden md:flex w-1/2 justify-center items-start">
                        <div
                            className={`w-80 rounded-3xl p-5 shadow-2xl 
${themes[theme].bg} ${themes[theme].text}`}
                            style={{
                                backgroundColor:
                                    !bgImage && (theme === "custom" || theme === "gradient")
                                        ? customColor
                                        : undefined,

                                backgroundImage:
                                    theme === "image"
                                        ? `url(${bgImage})`
                                        : theme === "gradient"
                                            ? customColor
                                            : undefined,

                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >

                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden animate-pulse hover:scale-110 transition">
                                    {image && (
                                        <img
                                            src={image}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <h2 className="mt-3 font-bold">
                                    {handle || "@username"}
                                </h2>

                                {/* ✅ ADD DESCRIPTION HERE */}
                                <p className="text-sm font-medium opacity-100  text-white  text-center mt-1 max-w-xs leading-relaxed">
                                    {desc || "Your description..."}
                                </p>
                            </div>



                            <div className="mt-5 space-y-3">
                                {links.map((link, i) => (
                                    <div
                                        key={i}
                                        className={`py-3 px-4 rounded-xl flex items-center gap-3 
            transition-all duration-300 hover:scale-105 hover:shadow-xl 
            active:scale-95 ${themes[theme].card}`}
                                    >
                                        {getIcon(link.url)}
                                        <span>{link.title || "Your Link"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </Suspense>

    )
}
