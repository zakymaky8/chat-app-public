
import { getAccessToken } from "@/utils/lib/server-only";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {

  const token = await getAccessToken()

  if (token) {
    redirect("/chats#chats")
  }
  return (
    <div className="flex justify-center gap-20 items-center min-h-[70vh] flex-col">
      <div className="self-start ml-10">
          <h2 className="text-3xl mb-4 text-[#09213a] font-medium">Chatter</h2>
          <p className="italic text-[#85a7c8]">The place where you can chat with whoever born here!</p>
      </div>
      <div className="flex gap-10">
        <Link href="/login#login" className="opacity-70 hover:opacity-100">Login</Link>
        <span>or</span>
        <Link href="/signup#signup" className="opacity-70 hover:opacity-100">Sign Up</Link>
      </div>
    </div>
  );
}
