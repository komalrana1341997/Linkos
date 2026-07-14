"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react";


const Navbar = ({ username = null }) => {

  const pathname = usePathname()
  const router = useRouter()
  const isHomepage = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");
  const isCreate = pathname.startsWith("/create");

  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
  <nav
  className={`flex justify-between items-center px-6 py-4 z-50
  ${isHomepage
    ? "absolute top-0 left-0 w-full text-white"
    : "w-full bg-[#111111] border-b"
  }`}
>
      {/* LEFT SIDE */}
      <div className="logo cursor-pointer flex gap-10 items-center">

        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-green-600 font-bold">
              <img src="/Nlogo.jpg" alt="" />
            </div>
            <span className="text-5xl font-bold bg-gradient-to-r from-white to-white/80  tracking-wide cursor-pointer hover:scale-105 transition bg-clip-text text-transparent">
              Link<span className="font-bold text-yellow-300">OS</span>
            </span></div>
        </Link>

        {/* MENU */}
        {isHomepage && (
          <ul className='hidden md:flex gap-8 cursor-pointer text-white/90 text-sm'>
            <Link href={"/"}><li className='hover:text-white font-medium'>Templates</li></Link>
            <Link href={"/"}><li className='hover:text-white font-medium'>MarketPlace</li></Link>
            <Link href={"/"}><li className='hover:text-white font-medium'>Discover</li></Link>
            <Link href={"/"}><li className='hover:text-white font-medium'>Pricing</li></Link>
            <Link href={"/learn"}><li className='hover:text-white font-medium'>Learn</li></Link>
          </ul>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-3">
  {session ? (
    <>
      <div
        onClick={() => {
          const username = session.user.name
            ?.toLowerCase()
            .replace(/\s+/g, "");
          router.push(`/studio/${username}`);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Dashboard
      </div>

      <div
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Logout
      </div>
    </>
  ) : (
    <>
      <div
        onClick={() => router.push("/login")}
        className="px-4 py-2 font-medium rounded-full cursor-pointer text-black bg-white hover:bg-gray-200 transition"
      >
        Login
      </div>

      <div
        onClick={() => router.push("/signup")}
        className="bg-yellow-200 text-black px-5 py-2 rounded-full font-semibold cursor-pointer hover:scale-105 transition"
      >
        Sign up Free
      </div>
    </>
  )}
</div>
    </nav>
  )
}

export default Navbar