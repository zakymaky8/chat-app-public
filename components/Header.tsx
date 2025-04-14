"use client"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-[#0e2917] p-6 pt-10 b-10 flex justify-between items-center flex-wrap gap-5">
        <Link href="/" className="text-4xl hover:opacity-70">Chatter</Link>
        <div className="flex gap-10">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <Link href="/chats#chats" className="hover:opacity-70">Chats</Link>
          <Link href="/search" className="hover:opacity-70">Search User</Link>
        </div>

    </header>
  )
}

export default Header