"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      checkUserAndRedirect();
    }
  }, [status]);

  const checkUserAndRedirect = async () => {
    const email = session.user.email;

    const res = await fetch(`/api/get-user?email=${email}`);
    const user = await res.json();

    if (user?.handle) {
      // ✅ Existing user → go to studion
      router.push(`/studion/${user.handle}`);
    } else {
      // 🆕 New user → go to create page
      router.push("/create");
    }
  };

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/create");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

      {/* CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* LOGO */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Log in
        </button>

        {/* DIVIDER */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={() => signIn("google")}
          className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-black font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}