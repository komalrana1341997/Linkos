"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"


export default function SignupPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return alert("Fill all fields")
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (data.success) {
      router.push("/create")
    } else {
      alert(data.message)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-green-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold">
          Build Your Link Hub 🚀
        </h1>
        <p className="mt-4 text-green-100 text-center">
          Share all your content in one beautiful page.
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold">
            Start for Free ✨
          </h2>

          <p className="text-gray-500 mt-2">
            Create your account in seconds
          </p>

          {/* 🔥 SOCIAL LOGIN */}
          <div className="mt-6 space-y-3">

            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/create",
                  prompt: "select_account",
                })}
              className="w-full cursor-pointer border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img src="https://img.icons8.com/color/24/google-logo.png" />
              Continue with Google
            </button>

            <button
              onClick={() => signIn("facebook")}
              className="w-full cursor-pointer border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img src="https://img.icons8.com/color/24/facebook.png" />
              Continue with Facebook
            </button>

          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Start for Free 🚀
          </button>

          <p className="text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <span className="text-green-600 cursor-pointer">
              <button
                onClick={() => signIn("google", { callbackUrl: "/create" })}
                className="text-green-600 cursor-pointer"
              >
                Login
              </button>
            </span>
          </p>

        </div>

      </div>

    </div>
  )
}