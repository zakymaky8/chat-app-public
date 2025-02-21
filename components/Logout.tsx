"use client"

import { useRouter } from "next/navigation"
import { socket } from "./WriteMessage"
import { TUser } from "@/utils/types/type"
import { logout } from "@/actions/logout"


const Logout = ({current}: {current: TUser}) => {
    const router = useRouter()
  return (
    <div>
        <button title="logout" onClick={async () => {
          socket.emit("go offline", current?._id)
          await logout()
          router.push("/login");
        }} className="text-[11px]  text-[red]  hover:opacity-70">Logout</button>
    </div>

  )
}

export default Logout
