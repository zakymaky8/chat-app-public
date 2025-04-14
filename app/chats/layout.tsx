import { getCurrentUser } from "@/actions/fetches"
import Logout from "@/components/Logout"
import ModalBackdrop from "@/components/ModalBackdrop"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const ChatLayout = async ({children}: {children: ReactNode}) => {
  const {success, message, redirectUrl, data} = await getCurrentUser()
  if (!success && redirectUrl !== null) {
    redirect(redirectUrl)
  }

  if (!success && redirectUrl === null) {
    return <div>{message}</div>
  }

  const { current } = data

  return (
    <>
      <div className={`flex flex-col self-center  h-[95vh] w-[95%] sm:w-[540px] md:w-[590px] lg:w-[70%] ${current.preferences.theme === "light" ? "border-green-950" : "border-black"} rounded-3xl border- border-[10px] mx-2 mt-10 mb-10`}>
      <div className={`${current.preferences.theme === "light" ? "bg-green-950" : "bg-black" } p-4 sticky top-0 flex justify-between flex-wrap gap-1 pl-2 pr-2 items-center`}>
        <Link href="#chats" id="#chats" className='flex flex-col'>
            <strong className="text-3xl">Chats</strong>
            <em className="text-[13px] text-center text-[green]">{current.username}</em>
        </Link>
        <Link href="/chats#chats" className="text-[11px] hover:opacity-70" title="friends">🫂Friends</Link>
        <Link href="/search" className="text-[11px] hover:opacity-70" title="search user">🔎search</Link>
        <Link href="/setting#setting" className="text-[11px] text-green-500  hover:opacity-70" title="setting">⚙️setting</Link>
        {/* <Link href="/alerts" title="alerts" className="text-[11px] text-yellow-500  hover:opacity-70">📢alert</Link> When user's setting is with_request */}
        <Logout />
      </div>
        {children}
      </div>
      <ModalBackdrop />
    </>
  )
}

export default ChatLayout

