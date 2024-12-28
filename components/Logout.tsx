"use client"

import { useRouter } from "next/navigation"
import { socket } from "./WriteMessage"
// import { useEffect } from "react"
import { TUser } from "@/utils/types/type"


const Logout = ({current}: {current: TUser}) => {
    const router = useRouter()
  return (
    <div>
            <button title="logout" onClick={() => {
            socket.emit("go offline", current?._id)
            document.cookie = `token=${null}; path=/; secure`
            router.push("/login");
        }} className="text-[14px] text-[red]  hover:opacity-70">Logout</button>
    </div>

  )
}

export default Logout
